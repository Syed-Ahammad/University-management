import { Schema, model } from 'mongoose';
import { FacultyModel, IFaculty } from './faculty.interface';
import { bloodGroup, designation, gender } from './faculty.constant';


export const FacultySchema = new Schema<IFaculty, FacultyModel>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: {
      firstName: {
        type: String,
        required: true,
      },
      middleName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      }

    },
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: gender,
  },
  bloodGroup: {
    type: String,
    enum: bloodGroup,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
    unique: true,
  },
  emergencyContactNo: {
    type: String,
    required: true,
    unique: true,
  },
  presentAddress: {
    type: String,
  },
  permanentAddress: {
    type: String,
  },
  designation: {
    type: String,
    enum: designation,
  },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicDepartment',
    required: true,
  },
  // academicFaculty: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'AcademicFaculty ',
  //   required: true,
  // },
  profileImage: {
    type: String,
  }


});

export const Faculty = model<IFaculty, FacultyModel>('Faculty', FacultySchema);