import {z} from "zod"
import { AcademicSemesterCode, AcademicSemesterTitle, academicSemesterMonths } from "./academicSemester.constant"

const CreateAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...AcademicSemesterTitle] as [string, ...string[]],{
      required_error: "code is required"
    }),
    year: z.number({
      required_error: "year is required"
    }),
    code: z.enum([...AcademicSemesterCode] as [string, ...string[]],{
      required_error: "code is required"
    }),
    startMonth: z.enum([...academicSemesterMonths] as [string, ...string[]],{
      required_error: "start month is needed",
    }),
    endMonth: z.enum([...academicSemesterMonths] as [string, ...string[]],{
      required_error: "end month is needed"}),
  })
});


///  Ensure 1: Route Level : Update -->  Give me title and code both , neither

// const updateAcademicSemesterZodSchema = z
//   .object({
//     body: z.object({
//       title: z
//         .enum([...AcademicSemesterTitle] as [string, ...string[]], {
//           required_error: 'Title is required',
//         })
//         .optional(),
//       year: z
//         .string({
//           required_error: 'Year is required ',
//         })
//         .optional(),
//       code: z
//         .enum([...AcademicSemesterCode] as [string, ...string[]])
//         .optional(),
//       startMonth: z
//         .enum([...academicSemesterMonths] as [string, ...string[]], {
//           required_error: 'Start month is needed',
//         })
//         .optional(),
//       endMonth: z
//         .enum([...academicSemesterMonths] as [string, ...string[]], {
//           required_error: 'End month is needed',
//         })
//         .optional(),
//     }),
//   })
//   .refine(
//     data =>
//       (data.body.title && data.body.code) ||
//       (!data.body.title && !data.body.code),
//     {
//       message: 'Either both title and code should be provided or neither',
//     }
//   );

export const AcademicSemesterValidation = {
  CreateAcademicSemesterZodSchema,
  // updateAcademicSemesterZodSchema,
}