import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { AcademicSemesterTitleCodeMapper } from './academicSemester.constant';
import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';
import httpStatus from 'http-status';

const createSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (AcademicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'invalid semester code....');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};




const getAllSemesters = async (paginationOptions: IPaginationOptions):Promise<IGenericResponse<IAcademicSemester[]>> => {



  const {page, limit, skip, sortBy, sortOrder} = paginationHelper.calculationPagination(paginationOptions)
  const sortCondition: {[key:string]:SortOrder} = {}

  if(sortBy && sortOrder){
    sortCondition[sortBy] = sortOrder;
  }
  console.log(sortCondition)
 
  const result = await AcademicSemester.find().sort(sortCondition).skip(skip).limit(limit);


 const total = await AcademicSemester.countDocuments()

 return {
  meta: {
    page,
    limit,
    total
  },
  data: result
}
};

export const AcademicSemesterService = {
  createSemester,
  getAllSemesters,
};
