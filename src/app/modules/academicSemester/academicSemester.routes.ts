import { AcademicSemesterController } from './academicSemester.controller';
import express from 'express';
import validateRequest from '../../middleware/validationRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';
const router = express.Router();

router.post(
  '/create-semester',
  validateRequest(AcademicSemesterValidation.CreateAcademicSemesterZodSchema),
  AcademicSemesterController.createSemester
);

router.get('/:id', AcademicSemesterController.getSingleSemester);
router.patch('/:id',validateRequest(AcademicSemesterValidation.UpdateAcademicSemesterZodSchema), AcademicSemesterController.updateSemester);
router.delete("/:id", AcademicSemesterController.deleteSemester);
router.get('/', AcademicSemesterController.getAllSemesters);

export const AcademicSemesterRoutes = router;
