import express from 'express';
import validateRequest from '../../middleware/validationRequest';
import { StudentController } from './student.controller';
import { studentValidation } from './student.validation';

const router = express.Router();

router.get('/:id', StudentController.getSingleStudent)
router.get('/', StudentController.getAllStudents)
router.get('/:id', StudentController.deleteStudent)


router.patch('/:id',
validateRequest(studentValidation.updateStudentZodSchema),
  StudentController.updateStudent
);

export const StudentsRoutes = router;