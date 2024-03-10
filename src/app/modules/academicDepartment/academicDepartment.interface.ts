import { Model, Types } from "mongoose";
import { IAcademicFaculty } from "../academicFaculty/academicFaculty.interface";

export type IAcademicDepartment = {
  title: string;
  syncId: string;
  academicFaculty: Types.ObjectId | IAcademicFaculty;
};


export type IAcademicDepartmentFilters = {
  searchTerms?: string;
  title?: string;
}


export type AcademicDepartmentModel = Model<IAcademicDepartment, Record<string,unknown>>;