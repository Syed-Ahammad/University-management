import mongoose, { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import {
  AcademicSemesterTitleCodeMapper,
  andConditionFields,
} from './academicSemester.constant';
import {
  IAcademicSemester,
  IAcademicSemesterFilters,
} from './academicSemester.interface';
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

const getAllSemesters = async (
  filters: IAcademicSemesterFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { searchTerms } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculationPagination(paginationOptions);

  const andConditions = [];

  if (searchTerms) {
    andConditions.push({
      $or: andConditionFields.map(field => ({
        [field]: {
          $regex: searchTerms,
          $options: 'i',
        },
      })),
    });
  }
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
  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const whereCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await AcademicSemester.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await AcademicSemester.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleSemester = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findById(id);
  console.log(id);
  return result;
};
const updateSemester= async (id: string, payload: Partial<IAcademicSemester>) :Promise<IAcademicSemester | null> => {
  if (payload.title && payload.code && AcademicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'invalid semester code....');
  }
  const result = await AcademicSemester.findOneAndUpdate({_id:id}, payload, {
    new: true
  });
  return result;
 
};

const deleteSemester = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findByIdAndDelete(id);
  return result;
};

export const AcademicSemesterService = {
  createSemester,
  getAllSemesters,
  getSingleSemester,
  updateSemester,
  deleteSemester,
};
