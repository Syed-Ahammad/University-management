import mongoose from 'mongoose';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { IStudent } from '../student/student.interface';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateFacultyId, generateStudentId } from './user.utility';
import { Student } from '../student/student.model';
import httpStatus from 'http-status';

const academicSemester = {year: "2016", code: "01"}

const createStudent = async (student: IStudent, user: IUser): Promise<IUser | null> => {
    // If password is not given,set default password
    if (!user.password) {
      user.password = config.Default_Student_Pass as string;
    }
    // set role
    user.role = 'student';
  
    const academicSemester = await AcademicSemester.findById(
      student.academicSemester
    ).lean();
  
    let newUserAllData = null;
    let session = await mongoose.startSession();

    try {
      session.startTransaction();
      const id = await generateStudentId(academicSemester);
      
      user.id = id;
      student.id = id;
      

     // Create student using session
     const newStudent = await Student.create([student], { session });

     
     
    console.log(newStudent);

    if(!newStudent.length){
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create student");
    }

    // set student _id (reference) into user.student
    user.student = newStudent[0]._id;

    const newUser = await User.create([user], { session });
    console.log(newUser);

    if(!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create User");
    }
    newUserAllData = newUser[0];
    await session.commitTransaction();
    await session.endSession();
  }
  catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if(newUserAllData){
    newUserAllData = await User.findOne({id: newUserAllData.id}).populate({
      path: "student",
      populate: [
        {
          path: "academicSemester",
        },
       { 
        path: "academicFaculty",
      },
      {
        path: "academicDepartment",
      }
      ]
    });
  }
console.log(newUserAllData)
  return newUserAllData;
};

export const UserService = {
  createStudent,
};
