import {
  IAcademicSemesterCodes,
  IAcademicSemesterMonths,
  IAcademicSemesterTitles,
} from './academicSemester.interface';

export const academicSemesterMonths: IAcademicSemesterMonths[] = [
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
export const AcademicSemesterCode: IAcademicSemesterCodes[] = [
  '01',
  '02',
  '03',
];

export const AcademicSemesterTitleCodeMapper: { [key: string]: string } = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};

export const andConditionFields = ['title', 'code', 'year'];

export const academicSemesterFilterableFields = ['searchTerms','title', 'code', 'year'];
