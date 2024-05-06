import { IFaculty, IFacultyFilters } from "./faculty.interface";
import { Faculty } from "./faculty.model";
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { facultySearchableFields } from './faculty.constant';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { object } from "zod";


const getAllFaculty = async(filters:IFacultyFilters, paginationOptions: IPaginationOptions ): Promise<IGenericResponse<IFaculty[]>>=>{

const {searchTerm, ...filtersData} = filters;
const {page, limit, skip, sortBy, sortOrder} = paginationHelper.calculationPagination(paginationOptions);

const andConditions = [];
console.log(searchTerm);

if(searchTerm){
  andConditions.push({
    $or: facultySearchableFields.map(field =>({
      [field] : {
        $regex: searchTerm,
        $options: "i"
      }
    }))
  })
}

if(Object.keys(filtersData).length){
  andConditions.push({
    $and: Object.entries(filtersData).map(([field ,value])=>({
      [field]: value,
    })),
  });
}

const sortCondition: {[key: string]: SortOrder} = {};

if(sortBy && sortOrder){
  sortCondition[sortBy] = sortOrder;
}

const whereCondition = andConditions.length > 0 ? {$and: andConditions} : {};


  const result = await Faculty.find(whereCondition).populate({path: "academicDepartment",
    populate: {
      path: "academicFaculty"
    }
  }).sort(sortCondition)
  .skip(skip)
  .limit(limit);

const total = await Faculty.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
}
const getSingleFaculty = async (id: string): Promise<IFaculty | null>=>{
  const result = await Faculty.findById(id).populate({path: "academicDepartment",
    populate: [
      {path: "academicFaculty",}
    ]
  })

  return result;
};

const updateFaculty = async (id: string, payload: Partial<IFaculty>): Promise<IFaculty | null>=>{
  const isExist = await Faculty.findOne({id});
  
  if(!isExist){
    throw new ApiError(httpStatus.NOT_FOUND, "Faculty not found");
  };
  // console.log(isExist);

  const {name, ...facultyData} = payload;

  const updatedFacultyData: Partial<IFaculty> = {...facultyData};
  if(name && Object.keys(name).length > 0){
    Object.keys(name).forEach((key)=>{
      const nameKey = `name.${key}`;
      (updatedFacultyData as any)[nameKey] = name[key as keyof typeof name];
    })
  }

  const result = await Faculty.findOneAndUpdate({id: id}, updatedFacultyData, {new: true});
  return result;
}

export const FacultyService = {
  getSingleFaculty,
  getAllFaculty,
  updateFaculty,
}