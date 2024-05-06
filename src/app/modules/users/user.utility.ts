import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

const findLastStudentId = async (): Promise<string | undefined> => {
  const lastUser = await User.findOne({ role: 'student' }, { id: 1, _id: -1 })
    .sort({ createdAt: -1 })
    .lean();
  return lastUser?.id?.slice(-6);
};

export const generateStudentId = async (
  academicSemester: IAcademicSemester | null
): Promise<string> => {
  const currentId = (await findLastStudentId()) || String(0).padStart(6, '0');
  let incrementId = (parseInt(currentId) + 1).toString().padStart(6, '0');

  incrementId = `${academicSemester?.year.substring(2)}${
    academicSemester?.code
  }${incrementId}`;

  return incrementId; // Return the generated ID with a prefix
};

const findLastFacultyId = async (): Promise<string | undefined> => {
  const lastUser = await User.findOne({ role: 'faculty' }, { id: 1, _id: -1 })
    .sort({ createdAt: -1 })
    .lean();
  return lastUser?.id?.slice(-6);
};

export const generateFacultyId = async (): Promise<string> => {
  const currentId = (await findLastFacultyId()) || String(0).padStart(6, '0');
  let incrementId = (parseInt(currentId) + 1).toString().padStart(6, '0');

  incrementId = `F-${incrementId}`;

  return incrementId;
};
