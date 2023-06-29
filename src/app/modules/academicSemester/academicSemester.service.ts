import ApiError from "../../../errors/ApiError";
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

export const AcademicSemesterService = {
  createSemester,
}