import express from 'express';
import { FacultyController } from './faculty.controller';
import validateRequest from '../../middleware/validationRequest';
import { facultyValidation } from './faculty.validation';


const router = express.Router();
router.get("/", FacultyController.getAllFaculty);
router.get('/:id', FacultyController.getSingleFaculty)
router.patch('/:id', validateRequest(facultyValidation.updateFacultyZodSchema), FacultyController.updateFaculty);


export const FacultyRoutes = router;