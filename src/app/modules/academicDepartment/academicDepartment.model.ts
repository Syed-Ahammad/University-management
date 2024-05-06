import { Schema, model } from 'mongoose';
import {
  AcademicDepartmentModel,
  IAcademicDepartment,
} from './academicDepartment.interface';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const AcademicDepartmentSchema = new Schema<IAcademicDepartment>(
  {
    title: {
      type: String,
      required: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: 'AcademicFaculty',
    },
    syncId: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

AcademicDepartmentSchema.pre('save', async function (next) {
  const isExist = await AcademicDepartment.findOne({ title: this.title });

  if (isExist) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'Academic department already exists'
    );
  }
  next();
});

export const AcademicDepartment = model<
  IAcademicDepartment,
  AcademicDepartmentModel
>('AcademicDepartment', AcademicDepartmentSchema);
