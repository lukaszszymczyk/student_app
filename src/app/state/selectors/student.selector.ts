import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

const selectStudentState = (state: AppState) => state.students;

export const selectStudents = createSelector(selectStudentState, (state) => state.studentList);

export const selectTypes = createSelector(selectStudentState, (state) => state.facultyTypes);

export const selectLoading = createSelector(selectStudentState, (state) => state.loading);

export const selectScrollAvaliable = createSelector(selectStudentState, (state) => state.scrollAvailable);

export const selectEndOfList = createSelector(selectStudentState, (state) => state.endOfList);
