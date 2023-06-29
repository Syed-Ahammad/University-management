import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import globalErrorHandle from './app/middleware/globalErrors';
import httpStatus from 'http-status';
import Routes from './app/routes';
// import ApiError from './errors/ApiError'
const app: Application = express();

// parser
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application route
app.use("/api/v1", Routes)

// app.use('/api/v1/users', UserRoutes);
// app.use('/api/v1/academic-semester', AcademicSemesterRoutes);

// global error handlers

app.use(globalErrorHandle);


//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});



// testing
/* app.get('/', async (req: Request, res: Response , next: NextFunction ) => {

  // Promise.reject(new Error("unhandled promise Rejection"))
  // throw new ApiError(400, "ore baba Error")
  // next("ore baba Error")
}) */

export default app;
