import { z } from 'zod';
import { bloodGroup, gender } from './../student/student.constant';
import { designation } from '../faculty/faculty.constant';

const createStudentZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),

    student: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First name is required',
        }),
        lastName: z.string({
          required_error: 'Last name is required',
        }),
        middleName: z.string().optional(),
      }),
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'Gender is required',
      }),
      dateOfBirth: z.string({
        required_error: 'Date of Birth is required',
      }),
      email: z.string({ required_error: 'Email is required' }).email(),
      contactNo: z.string({ required_error: 'Contact Number is required' }),
      emergencyContactNo: z.string({
        required_error: 'Emergency Contact Number is required',
      }),
      bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
      presentAddress: z.string({
        required_error: 'Present Address is required',
      }),
      guardian: z.object({
        fatherName: z.string({ required_error: 'Father Name is required' }),
        fatherOccupation: z.string({
          required_error: 'Father Occupation is required',
        }),
        motherName: z.string({ required_error: 'Mother Name is required' }),
        motherOccupation: z.string({
          required_error: 'Mother Occupation is required',
        }),
      }),
      localGuardian: z.object({
        name: z.string({ required_error: 'Local Guardian Name is required' }),
        occupation: z.string({
          required_error: 'Local Guardian Occupation is required',
        }),
        contactNumber: z.string({
          required_error: 'Local Guardian contact number is required',
        }),
      }),
      academicSemester: z.string({
        required_error: 'Academic Semester is required',
      }),
      academicDepartment: z.string({
        required_error: 'Academic Department is required',
      }),
      academicFaculty: z.string({
        required_error: 'Academic Faculty is required',
      }),

      profileImage: z.string().optional(),
    }),
  }),
});
const createFacultyZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),

    faculty: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First name is required',
        }),
        lastName: z.string({
          required_error: 'Last name is required',
        }),
        middleName: z.string().optional(),
      }),
      dateOfBirth: z.string({
        required_error: 'Date of Birth is required',
      }),
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'Gender is required',
      }),
      bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
      email: z.string({ required_error: 'Email is required' }).email(),
      contactNo: z.string({ required_error: 'Contact Number is required' }),
      emergencyContactNo: z.string({
        required_error: 'Emergency Contact Number is required',
      }),
      presentAddress: z.string({
        required_error: 'Present Address is required',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent Address is required',
      }),
      designation: z.enum([...designation] as [string, ...string[]]).optional(),
      academicDepartment: z.string({
        required_error: 'Academic Department is required',
      }),
      profileImage: z.string().optional(),
    }),
  }),
});

export const UserValidation = {
  createStudentZodSchema,
  createFacultyZodSchema,
};
