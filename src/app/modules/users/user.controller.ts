import { UserService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';

const createUser = 
 catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { user } = req.body;
  console.log(user);
  const result = await UserService.createUser(user);
 
 
  // res.status(200).json({
  //   success: true,
  //   message: 'User created successfully',
  //   data: result,
  // });

  sendResponse(res,{statusCode: httpStatus.OK, success: true, message: 'User created successfully', data: result});
  next();
 });

export const UserController = {
  createUser,
};
