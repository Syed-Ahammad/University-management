import { SortOrder } from 'mongoose';
import { paginationFields } from './../../../constant/pagination';
import catchAsync from "../../../shared/catchAsync";
import { IAcademicDepartment, IAcademicDepartmentFilters } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { andConditionFields } from './academicDepartment.constant';

const createDepartment = async (payload: IAcademicDepartment, ): Promise<IAcademicDepartment> =>{
  const result = (await AcademicDepartment.create(payload)).populate("academicFaculty");

  return result;
};

const getAllDepartments = async(filters:IAcademicDepartmentFilters, paginationOptions: IPaginationOptions) : Promise<IGenericResponse<IAcademicDepartment[]>> =>{
const {searchTerms} = filters;
const {page, limit, skip, sortBy, sortOrder} = paginationHelper.calculationPagination(paginationOptions);

const andConditions = [];
if (searchTerms) {
  andConditions.push({
    $or: andConditionFields.map(field =>({
      [field]: {
        $regex: searchTerms,
        $options: 'i'
      }
    }))
  })
}

const sortCondition : {[key: string]: SortOrder} = {};

if (sortBy && sortOrder) {
  sortCondition[sortBy] = sortOrder;
}

const whereCondition = andConditions.length > 0 ? {$and: andConditions} : {}
;
const result = await AcademicDepartment.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await AcademicDepartment.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleDepartment = async(id: string): Promise<IAcademicDepartment | null> =>{

  const result = await AcademicDepartment.findById(id);
  return result;
};

const updateDepartment = async(id: string, payload: Partial<IAcademicDepartment>): Promise<IAcademicDepartment | null> =>{
  const result = await AcademicDepartment.findOneAndUpdate({_id: id}, payload, {new: true});

  return result;
}

const deleteDepartment = async(id: string): Promise<IAcademicDepartment | null> =>{
  const result = await AcademicDepartment.findByIdAndDelete(id);

  return result;
}



export const academicDepartmentService = {
  createDepartment,
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
}