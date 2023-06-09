import { IGenericErrorMessage } from './../interfaces/error';
import { IGenericErrorResponse } from '../interfaces/common';
import { ZodError, ZodIssue } from 'zod';

const handleZodError = (error: ZodError): IGenericErrorResponse => {
  // console.log(error.issues.map(issue=> issue.path), 'this is a zod errors');
  const errors: IGenericErrorMessage[] = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });
  const statusCode = 400;
  return {
    statusCode,
    message: 'validation Error',
    errorMessages: errors,
  };
};

export default handleZodError;
