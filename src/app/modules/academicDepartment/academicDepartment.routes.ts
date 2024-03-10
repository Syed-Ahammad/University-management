import express from "express";
import { academicDepartmentController } from "./academicDepartment.controller";
import validateRequest from "../../middleware/validationRequest";
import { academicDepartmentValidation } from "./academicDepartment.validation";
const router = express.Router();

router.post("/create-department", 
validateRequest(academicDepartmentValidation.CreateAcademicDepartmentZodSchema) ,academicDepartmentController.createDepartment);

router.get("/:id", academicDepartmentController.getSingleDepartment);
router.get("/", academicDepartmentController.getAllDepartments);
router.patch("/:id", validateRequest(academicDepartmentValidation.UpdateAcademicDepartmentZodSchema), academicDepartmentController.updateDepartment);
router.delete("/:id", academicDepartmentController.deleteDepartment);

export const AcademicDepartmentRoutes = router;