import ApiError from "../../../errors/ApiError";
import {IPaginationOptions } from "../../../interfaces/pagination";
import { AcademicSemesterTitleCodeMapper } from "./academicSemester.constant";
import { IAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";
import httpStatus from "http-status";

const createSemester = async (payload: IAcademicSemester): Promise <IAcademicSemester> =>{

  if(AcademicSemesterTitleCodeMapper[payload.title ]!== payload.code){
    throw new ApiError(httpStatus.BAD_REQUEST, "invalid semester code....")
  }
  const result = await AcademicSemester.create(payload);
  return result;
}

const getAllSemesters = (paginationOptions: IPaginationOptions)=>{
  console.log(paginationOptions)

  const {page=1, limit=5} = paginationOptions;

  const skip = (page -1)*limit;

  console.log(skip)


}

export const AcademicSemesterService = {
  createSemester,getAllSemesters
}