import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';
import validateRequest from '../../middleware/validationRequest';
import { AcademicFacultyValidation } from './academicFaculty.validation';

const router = express.Router();

router.post("/create-faculty",validateRequest(AcademicFacultyValidation.createFacultyZodSchema) ,AcademicFacultyController.createFaculty);


router.get("/:id", AcademicFacultyController.getSingleFaculty);
router.patch("/:id", validateRequest(AcademicFacultyValidation.updateFacultyZodSchema) ,AcademicFacultyController.updateFaculty);

router.delete("/:id", AcademicFacultyController.deleteFaculty);

router.get("/",AcademicFacultyController.getAllFaculties);

export const AcademicFacultyRoutes = router;