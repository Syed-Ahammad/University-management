import { Request, RequestHandler, Response } from 'express';
import { StudentService } from './student.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constant/pagination';
import { IStudent } from './student.interface';
import { studentFilterableFields } from './student.constant';

/* const createStudent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { student, ...userData } = req.body;
    const result = await UserService.createStudent(student, userData);

    // res.status(200).json({
    //   success: true,
    //   message: 'User created successfully',
    //   data: result,
    // });

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User created successfully',
      data: result,
    });
  }
  ); */
  
  const getAllStudents = catchAsync(async (req: Request, res: Response) => {
    // const paginationOptions = {
    //   page: Number(req.query.page),
    //   limit: Number(req.query.limit),
    //   sortBy: req.query.sortBy,
    //   sortOrder: req.query.sortOrder,
    // };
    const filters = pick(req.query, studentFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);
    const result = await StudentService.getAllStudents(
      filters,
      paginationOptions
    );
  
    sendResponse<IStudent[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student retrieved successfully',
      meta: result.meta,
      data: result.data,
    });
  });
  
const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const result = await StudentService.getSingleStudent(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student founded successfully',
    data: result,
  });
});

const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await StudentService.updateStudent(id, updatedData);


  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student updated successfully !',
    data: result,
  });
});

const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await StudentService.deleteStudent(id);

  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student deleted successfully !',
    data: result,
  });
});

export const StudentController = {
  // createStudent,
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
