import { AcademicSemesterController } from './academicSemester.controller';
import express from 'express';
import validateRequest from '../../middleware/validationRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';

const router = express.Router();

router.post('/create-semester', validateRequest(AcademicSemesterValidation.CreateAcademicSemesterZodSchema), AcademicSemesterController.createSemester);

export const AcademicSemesterRoutes = router;
