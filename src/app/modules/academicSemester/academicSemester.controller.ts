import { Request, Response, NextFunction } from 'express';
import { AcademicSemesterService } from './academicSemester.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const createSemester = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  
  const {...academicSemesterData } = req.body;
  const result = await AcademicSemesterService.createSemester(academicSemesterData);


  // res.status(200).json({
  //   success: true,
  //   message: 'Academic Semester created successfully',
  //   data: result,
  // });
  
  sendResponse(res,{statusCode: httpStatus.OK, success: true, message: 'Academic Semester created successfully', data: result});
  next();

})

export const AcademicSemesterController = {
  createSemester,
};
