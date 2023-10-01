import { AcademicSemester } from './academicSemester.model';
import {
  IAcademicSemesterCode,
  IAcademicSemesterMonth,
  IAcademicSemesterTitles,
} from './academicSemester.interface';

export const academicSemesterMonths: IAcademicSemesterMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const AcademicSemesterTitle: IAcademicSemesterTitles[] = [
  'Autumn',
  'Summer',
  'Fall',
];
export const AcademicSemesterCode: IAcademicSemesterCode[] = ['01', '02', '03'];

export const AcademicSemesterTitleCodeMapper: { [key: string]: string } = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};

export const andConditionFields = ['title', 'code', 'year'];
