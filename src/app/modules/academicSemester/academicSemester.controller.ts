import { Request, Response, NextFunction } from 'express';
import { AcademicSemesterService } from './academicSemester.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constant/pagination';

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    );

    // res.status(200).json({
    //   success: true,
    //   message: 'Academic Semester created successfully',
    //   data: result,
    // });

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester created successfully',
      data: result,
    });
    next();
  }
);

const getAllSemesters = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // const paginationOptions = {
    //   page: Number(req.query.page),
    //   limit: Number(req.query.limit),
    //   sortBy: req.query.sortBy,
    //   sortOrder: req.query.sortOrder,
    // };
    const paginationOptions = pick(req.query, paginationFields);
    const result = await AcademicSemesterService.getAllSemesters(
      paginationOptions
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester retrieved successfully',
      data: result,
    });
    // next();
  }
);

export const AcademicSemesterController = {
  createSemester,
  getAllSemesters,
};
