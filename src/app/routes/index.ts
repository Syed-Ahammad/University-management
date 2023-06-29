import { AcademicSemesterRoutes } from './../modules/academicSemester/academicSemester.routes';
import express from 'express';
import { UserRoutes } from '../modules/users/user.routes';

const Routes = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes
  },
  {
    path: '/academic-semester',
    route: AcademicSemesterRoutes
  }
];

moduleRoutes.forEach(route => Routes.use(route.path, route.route))


// Routes.use("/users", UserRoutes);

// Routes.use('/academic-semester', AcademicSemesterRoutes);

export default Routes;