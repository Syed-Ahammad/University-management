import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { FacultyService } from "./faculty.services";
import pick from "../../../shared/pick";
import { paginationFields } from "../../../constant/pagination";
import { IFaculty } from "./faculty.interface";


const getAllFaculty = catchAsync(async (req: Request, res:Response) => {
  const filters = pick(req.query, ["searchTerm"]);
  const PaginationOptions = pick(req.query, paginationFields);

const result = await FacultyService.getAllFaculty(filters, PaginationOptions);

sendResponse(res, {
  statusCode: httpStatus.OK,
  success: true,
  message: "Faculty founded Successfully.",
  data: result,
})

})
const getSingleFaculty = catchAsync(async (req: Request, res: Response)=>{
  const result = await FacultyService.getSingleFaculty(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty founded Successfully.",
    data: result,
  });
});

const updateFaculty = catchAsync(async (req: Request, res: Response)=>{
  const id = req.params.id;
  const updatedData = req.body;
  const result = await FacultyService.updateFaculty(id, updatedData);

  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty Updated Successfully.",
    data: result,
  })
})

export const FacultyController = {
  getSingleFaculty,
  getAllFaculty,
  updateFaculty,
}