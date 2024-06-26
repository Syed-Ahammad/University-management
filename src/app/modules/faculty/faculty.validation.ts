import { z } from "zod";
import { bloodGroup, designation, gender } from "./faculty.constant";

const updateFacultyZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      middleName: z.string().optional(),
    }).optional(),
    dateOfBirth: z.string().optional(),
    gender: z.enum([...gender] as [string, ...string[]]).optional(),
    bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
    email: z.string().email().optional(),
    contactNo: z.string().optional(),
    emergencyContactNo: z.string().optional(),
    presentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
    designation: z.enum([...designation] as [string, ...string[]]).optional(),
    academicDepartment: z.string().optional(),
    profileImage: z.string().optional(),
  }),
});
 

export const facultyValidation = {
  updateFacultyZodSchema,
};
