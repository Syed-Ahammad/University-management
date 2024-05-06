import { Model, Types } from "mongoose";
import { IAcademicDepartment } from "../academicDepartment/academicDepartment.interface";
// import { IAcademicFaculty } from "../academicFaculty/academicFaculty.interface";

export type UserName = {
  firstName: string;
  lastName: string;
  middleName: string;
};

export type IFaculty = {
  id: string;
  name: UserName;
  dateOfBirth: string;
  gender: 'male' | 'female';
  bloodGroup: 'A+' | 'B+' | 'A-' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  designation: "lecturer"| "assistant professor"|" associate professor" | "professor";
  academicDepartment: Types.ObjectId | IAcademicDepartment;
  // academicFaculty: Types.ObjectId | IAcademicFaculty;
  profileImage?: string;
};

export type FacultyModel = Model<IFaculty, Record<string, unknown>>;

export type IFacultyFilters = {
  searchTerm?: string;
  id?: string;
  bloodGroup?: string;
  email?: string;
  contactNo?: string;
  designation?: string;
}
