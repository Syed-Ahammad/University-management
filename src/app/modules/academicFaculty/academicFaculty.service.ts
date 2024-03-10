import { IAcademicFaculty, IAcademicFacultyFilters } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/common";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { academicFacultySearchableFields } from "./academicFaculty.constant";
import { SortOrder } from "mongoose";

const createFaculty = async(payload: IAcademicFaculty): Promise<IAcademicFaculty> =>{
  const result = await AcademicFaculty.create(payload);
  return result;
}

const updateFaculty = async(id: string, payload: IAcademicFaculty): Promise<IAcademicFaculty | null>=>{
  const result = await AcademicFaculty.findOneAndUpdate({_id: id}, payload, {new: true});
  return result;
}

const getAllFaculty = async (filters: IAcademicFacultyFilters, paginationOptions: IPaginationOptions): Promise<IGenericResponse<IAcademicFaculty[]>> => {

  const { searchTerms ,...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculationPagination(paginationOptions);

    const andConditions = [];

  // Search needs $or for searching in specified fields
  if (searchTerms) {
    andConditions.push({
      $or: academicFacultySearchableFields.map(field => ({
        [field]: {
          $regex: searchTerms,
          $options: 'i',
        },
      })),
    });
  };

  // Filters needs $and to fulfill all the conditions
  // console.log(filtersData)
  // if (Object.keys(filtersData).length) {
  //   andConditions.push({
  //     $and: Object.entries(filtersData).map(([field, value]) => ({
  //       [field]: value,
  //     })),
  //   });
  // }

  // Dynamic sort needs  fields to  do sorting
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  // If there is no condition , put {} to give all data
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await AcademicFaculty.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await AcademicFaculty.countDocuments(whereConditions);


  // const andConditions = [
  //   {
  //     $or: [
  //       {
  //         title: {
  //           $regex: searchTerms,
  //           $options: 'i',
  //         }
  //       },
  //       {
  //         code: {
  //           $regex: searchTerms,
  //           $options: 'i',
  //         }
  //       },
  //       {
  //         year: {
  //           $regex: searchTerms,
  //           $options: 'i',
  //         }
  //       },

  //     ]
  //   }
  // ]
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleFaculty = async (id: String): Promise<IAcademicFaculty | null> => {
const result = await AcademicFaculty.findById(id)

return result;
};

const deleteFaculty = async (id: String): Promise<IAcademicFaculty | null>=> {
  const result = await AcademicFaculty.findByIdAndDelete(id);
  return result;
}

export const AcademicFacultyService = {
  createFaculty,
  getAllFaculty,
  updateFaculty,
  getSingleFaculty,
  deleteFaculty
}