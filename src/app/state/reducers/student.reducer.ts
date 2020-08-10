import { createReducer, on } from '@ngrx/store';
import { Student, FieldType } from 'src/app/models/student.model';
import * as StudentActions from '../actions/student.actions';

export interface StudentState {
  studentList: Student[];
  facultyTypes: FieldType[];
  loading: boolean;
  scrollAvailable: boolean;
  endOfList: boolean;
  error: string;
}
const initialState: StudentState = {
  studentList: [],
  facultyTypes: [],
  loading: false,
  scrollAvailable: true,
  endOfList: false,
  error: '',
};

export const studentReducer = createReducer<StudentState>(
  initialState,

  on(StudentActions.loadInitStudents, (state) => ({
    ...state,
    loading: true,
  })),
  on(StudentActions.loadInitStudentsSuccess, (state, action) => ({
    ...state,
    studentList: action.studentList,
    loading: false,
    endOfList: action.studentList.length < 10 ? true : false,
    error: '',
  })),
  on(StudentActions.loadInitStudentsError, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  })),

  on(StudentActions.loadMoreStudents, (state) => ({
    ...state,
    loading: true,
    scrollAvailable: false,
  })),
  on(StudentActions.loadMoreStudentsSuccess, (state, action) => ({
    ...state,
    studentList: state.studentList.concat(action.studentList),
    loading: false,
    scrollAvailable: true,
    endOfList: action.studentList.length < 10 ? true : false,
    error: '',
  })),
  on(StudentActions.loadMoreStudentsError, (state, action) => ({
    ...state,
    loading: false,
    scrollAvailable: true,
    error: action.error,
  })),

  on(StudentActions.loadTypesSuccess, (state, action) => ({
    ...state,
    facultyTypes: action.facultyTypes,
    error: '',
  })),
  on(StudentActions.loadTypessError, (state, action) => ({
    ...state,
    error: action.error,
  })),

  on(StudentActions.createStudentSuccess, (state, action) => ({
    ...state,
    studentList: [...state.studentList, action.student],
    error: '',
  })),
  on(StudentActions.createStudentError, (state, action) => ({
    ...state,
    error: action.error,
  })),

  on(StudentActions.deleteStudentSuccess, (state, action) => ({
    ...state,
    studentList: state.studentList.filter((student) => student._id !== action.studentId),
    error: '',
  })),
  on(StudentActions.deleteStudentError, (state, action) => ({
    ...state,
    error: action.error,
  }))
);
