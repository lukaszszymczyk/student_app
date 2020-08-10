import { Injectable } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as StudentActions from '../actions/student.actions';
import { of } from 'rxjs';
import { mergeMap, map, catchError, withLatestFrom, concatMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { selectStudents } from '../selectors/student.selector';

@Injectable()
export class StudentEffects {
  constructor(private action$: Actions, private store: Store<AppState>, private studentService: StudentService) {}

  loadInitStudents$ = createEffect(() => {
    return this.action$.pipe(
      ofType(StudentActions.loadInitStudents),
      mergeMap(() =>
        this.studentService.getStudents(0).pipe(
          map((studentList) => StudentActions.loadInitStudentsSuccess({ studentList })),
          catchError((error) => of(StudentActions.loadInitStudentsError({ error })))
        )
      )
    );
  });

  loadMoreStudents$ = createEffect(() => {
    return this.action$.pipe(
      ofType(StudentActions.loadMoreStudents),
      withLatestFrom(this.store.select(selectStudents)),
      mergeMap(([action, students]) =>
        this.studentService.getStudents(students.length).pipe(
          map((studentList) => StudentActions.loadMoreStudentsSuccess({ studentList })),
          catchError((error) => of(StudentActions.loadMoreStudentsError({ error })))
        )
      )
    );
  });

  loadTypes$ = createEffect(() => {
    return this.action$.pipe(
      ofType(StudentActions.loadTypes),
      mergeMap(() =>
        this.studentService.getFieldTypes().pipe(
          map((facultyTypes) => StudentActions.loadTypesSuccess({ facultyTypes })),
          catchError((error) => of(StudentActions.loadTypessError({ error })))
        )
      )
    );
  });

  createStudent$ = createEffect(() => {
    return this.action$.pipe(
      ofType(StudentActions.createStudent),
      concatMap((action) =>
        this.studentService.createStudent(action.student).pipe(
          map((student) => StudentActions.createStudentSuccess({ student })),
          catchError((error) => of(StudentActions.createStudentError({ error })))
        )
      )
    );
  });

  createStudentSuccess$ = createEffect(() =>
    this.action$.pipe(
      ofType(StudentActions.createStudentSuccess),
      map(() => StudentActions.loadInitStudents())
    )
  );

  deleteStudent$ = createEffect(() => {
    return this.action$.pipe(
      ofType(StudentActions.deleteStudent),
      concatMap((action) =>
        this.studentService.deleteStudent(action.studentId).pipe(
          map(() => StudentActions.deleteStudentSuccess({ studentId: action.studentId })),
          catchError((error) => of(StudentActions.deleteStudentError({ error })))
        )
      )
    );
  });

  deleteStudentSuccess$ = createEffect(() =>
    this.action$.pipe(
      ofType(StudentActions.deleteStudentSuccess),
      map(() => StudentActions.loadInitStudents())
    )
  );
}
