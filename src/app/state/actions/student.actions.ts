import { createAction, props } from '@ngrx/store';
import { Student, FieldType } from 'src/app/models/student.model';

export enum StudentActionsTypes {
  LOAD_INIT = '[STUDENT] LOAD INIT',
  LOAD_INIT_SUCCESS = '[STUDENT] LOAD INIT SUCCESS',
  LOAD_INIT_ERROR = '[STUDENT] LOAD INIT ERROR',
  LOAD_MORE = '[STUDENT] LOAD MORE',
  LOAD_MORE_SUCCESS = '[STUDENT] LOAD MORE SUCCESS',
  LOAD_MORE_ERROR = '[STUDENT] LOAD MORE ERROR',
  LOAD_TYPES = '[STUDENT] LOAD TYPES',
  LOAD_TYPES_SUCCESS = '[STUDENT] LOAD TYPES SUCCESS',
  LOAD_TYPES_ERROR = '[STUDENT] LOAD TYPES ERROR',
  CREATE_STUDENT = '[STUDENT] CREATE STUDENT',
  CREATE_STUDENT_SUCCESS = '[STUDENT] CREATE STUDENT SUCCESS',
  CREATE_STUDENT_ERROR = '[STUDENT] CREATE STUDENT ERROR',
  DELETE_STUDENT = '[STUDENT] DELETE STUDENT',
  DELETE_STUDENT_SUCCESS = '[STUDENT] DELETE STUDENT SUCCESS',
  DELETE_STUDENT_ERROR = '[STUDENT] DELETE STUDENT ERROR',
}

export const loadInitStudents = createAction(StudentActionsTypes.LOAD_INIT);

export const loadInitStudentsSuccess = createAction(StudentActionsTypes.LOAD_INIT_SUCCESS, props<{ studentList: Student[] }>());

export const loadInitStudentsError = createAction(StudentActionsTypes.LOAD_INIT_SUCCESS, props<{ error: string }>());

export const loadMoreStudents = createAction(StudentActionsTypes.LOAD_MORE);

export const loadMoreStudentsSuccess = createAction(StudentActionsTypes.LOAD_MORE_SUCCESS, props<{ studentList: Student[] }>());

export const loadMoreStudentsError = createAction(StudentActionsTypes.LOAD_MORE_ERROR, props<{ error: string }>());

export const loadTypes = createAction(StudentActionsTypes.LOAD_TYPES);

export const loadTypesSuccess = createAction(StudentActionsTypes.LOAD_TYPES_SUCCESS, props<{ facultyTypes: FieldType[] }>());

export const loadTypessError = createAction(StudentActionsTypes.LOAD_TYPES_ERROR, props<{ error: string }>());

export const createStudent = createAction(StudentActionsTypes.CREATE_STUDENT, props<{ student: Student }>());

export const createStudentSuccess = createAction(StudentActionsTypes.CREATE_STUDENT_SUCCESS, props<{ student: Student }>());

export const createStudentError = createAction(StudentActionsTypes.CREATE_STUDENT_ERROR, props<{ error: string }>());

export const deleteStudent = createAction(StudentActionsTypes.DELETE_STUDENT, props<{ studentId: string }>());

export const deleteStudentSuccess = createAction(StudentActionsTypes.DELETE_STUDENT_SUCCESS, props<{ studentId: string }>());

export const deleteStudentError = createAction(StudentActionsTypes.DELETE_STUDENT_ERROR, props<{ error: string }>());
