import cors from 'cors';
import express, { Application } from 'express';
import globalErrorHandle from './app/middlewares/globalErrors';
import { UserRoutes } from './app/modules/users/user.routes';
// import ApiError from './errors/ApiError'
const app: Application = express();

// parser
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application route

app.use('/api/v1/users', UserRoutes);

// global error handlers

app.use(globalErrorHandle);

// testing
/* app.get('/', async (req: Request, res: Response , next: NextFunction ) => {

  // Promise.reject(new Error("unhandled promise Rejection"))
  // throw new ApiError(400, "ore baba Error")
  // next("ore baba Error")
}) */

export default app;
