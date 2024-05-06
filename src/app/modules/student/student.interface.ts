import { IAcademicDepartment } from '../academicDepartment/academicDepartment.interface';
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interface';
import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { Model, Types } from 'mongoose';

export type UserName = {
  firstName: string;
  lastName: string;
  middleName: string;
};

export type Guardian = {
  fatherName: string;
  fatherOccupation: string;
  motherName: string;
  motherOccupation: string;
};

export type LocalGuardian = {
  name: string;
  occupation: string;
  contactNumber: string;
};

export type IStudent = {
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
  guardian: Guardian;
  localGuardian: LocalGuardian;
  academicFaculty: Types.ObjectId | IAcademicFaculty;
  academicDepartment: Types.ObjectId | IAcademicDepartment;
  academicSemester: Types.ObjectId | IAcademicSemester;
  profileImage?: string;
};

export type StudentModel = Model<IStudent, Record<string, unknown>>;

export type IStudentFilters = {
  searchTerm?: string;
  id?: string;
  bloodGroup?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
}
