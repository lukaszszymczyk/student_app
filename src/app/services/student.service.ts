import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Student, FieldType } from '../models/student.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private apiUrl = environment.apiUrl;
  private pageSize = environment.pageSize;

  constructor(private http: HttpClient) {}

  getFieldTypes(): Observable<FieldType[]> {
    return this.http.get<FieldType[]>(this.apiUrl + '/dict/field-types').pipe(catchError(this.handleError));
  }

  getStudents(skip: number): Observable<Student[]> {
    const params = new HttpParams().set('limit', this.pageSize.toString()).set('skip', skip.toString());
    return this.http
      .get<Student[]>(this.apiUrl + '/students', { params })
      .pipe(catchError(this.handleError));
  }

  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl + '/students').pipe(catchError(this.handleError));
  }

  createStudent(student: Student): Observable<Student> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post<Student>(this.apiUrl + '/students', student, { headers })
      .pipe(catchError(this.handleError));
  }

  deleteStudent(id: string): Observable<{}> {
    return this.http.delete(this.apiUrl + `/students/${id}`).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }

    return throwError('Error');
  }

  get getItemsCount() {
    return this.pageSize;
  }
}
