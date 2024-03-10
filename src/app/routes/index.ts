import { AcademicSemesterRoutes } from './../modules/academicSemester/academicSemester.routes';
import express from 'express';
import { UserRoutes } from '../modules/users/user.routes';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.routes';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.routes';

const Routes = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/academic-semester',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRoutes,
  },
];

moduleRoutes.forEach(route => Routes.use(route.path, route.route));

// Routes.use("/users", UserRoutes);

// Routes.use('/academic-semester', AcademicSemesterRoutes);

export default Routes;
