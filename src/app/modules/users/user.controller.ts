import { UserService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from './user.interface';

const createStudent: RequestHandler = catchAsync(
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
);

const createFaculty: RequestHandler = catchAsync(async(req: Request, res: Response)=>{
  const {faculty, ...userData} = req.body;
  const result = await UserService.createFaculty(faculty, userData);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty created successfully.",
    data: result,
  })
})

export const UserController = {
  createStudent,
  createFaculty,
};
