import { z } from 'zod';

const CreateAcademicDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required',
    }),
  }),
});
const UpdateAcademicDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
  }),
});

export const academicDepartmentValidation = {
  CreateAcademicDepartmentZodSchema,
  UpdateAcademicDepartmentZodSchema,
};
