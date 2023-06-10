import { IGenericErrorMessage } from './../interfaces/error';
import { ZodError, ZodIssue } from 'zod';


const handleZodError = (error: ZodError)=>{
  console.log(error, 'this is a zod errors')
  const errors: IGenericErrorMessage[] = error.issues.map((issue: ZodIssue)=>{
    return {
      path: issue?.path[issue.path.length-1],
      message: issue?.message,
    }; 
  })
  const statusCode = 400;
  return {
    statusCode,
    message: "validation Error",
    errorMessages: errors

  }
}


export default handleZodError;