import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  DatabaseUrl: process.env.DB_LINK,
  Default_Student_Pass: process.env.DEFAULT_STUDENT_PASS,
};
