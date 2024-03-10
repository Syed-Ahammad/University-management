import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { AcademicFacultyService } from "./academicFaculty.service";
import { IAcademicFaculty } from "./academicFaculty.interface";
import pick from "../../../shared/pick";
import { paginationFields } from "../../../constant/pagination";
import { academicFacultyFilterableFields } from "./academicFaculty.constant";

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { ...academicFacultyData } = req.body;
  const result = await AcademicFacultyService.createFaculty(academicFacultyData);

  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty created successfully',
    data: result,
  });
});

const getAllFaculties = catchAsync(async (req: Request, res: Response) => {

  const filters = pick(req.query, academicFacultyFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);


  const result = await AcademicFacultyService.getAllFaculty(filters, paginationOptions);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculties fetched successfully',
    data: result,
  });
});

const getSingleFaculty = catchAsync(async(req: Request, res: Response) => {
  const result = await AcademicFacultyService.getSingleFaculty(req.params.id);
sendResponse(res, {
  statusCode: httpStatus.OK,
  success: true,
  message: "Faculty founded successfully.",
  data: result,
})
})
const updateFaculty = catchAsync(async (req: Request, res: Response) => {
const id = req.params.id;
const updateData = req.body;

const result = await AcademicFacultyService.updateFaculty(id, updateData);
sendResponse(res, {
  statusCode: httpStatus.OK,
  success: true,
  message: "Faculty update successfully.",
  data: result,
})
});

const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicFacultyService.deleteFaculty(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty deleted successfully",
    data: result,
  })
})


export const AcademicFacultyController = {
  createFaculty,
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
}