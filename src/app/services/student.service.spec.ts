import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Student } from '../models/student.model';
import { StudentService } from './student.service';

describe('StudentService Tests', () => {
  let studentService: StudentService;
  let HttpTestingController: HttpTestingController;

  let testStudents: Student[] = [
    {
      _id: '_id1',
      full_name: 'name1',
      field_of_study: { _id: 'typeId1', name: 'type1' },
      faculty: 'faculty1',
      university: 'university1',
    },
    {
      _id: '_id2',
      full_name: 'name2',
      field_of_study: { _id: 'typeId2', name: 'type2' },
      faculty: 'faculty2',
      university: 'university2',
    },
    {
      _id: '_id3',
      full_name: 'name3',
      field_of_study: { _id: 'typeId3', name: 'type3' },
      faculty: 'faculty3',
      university: 'university3',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StudentService],
    });

    studentService = TestBed.get(StudentService);
    HttpTestingController = TestBed.get(HttpTestingController);
  });

  it('should GET all students', () => {
    studentService.getAllStudents().subscribe((data: Student[]) => {
      expect(data.length).toBe(3);
    });

    let studentRequest: TestRequest = HttpTestingController.expectOne('/studentes');
    expect(studentRequest.request.method).toEqual('GET');

    studentRequest.flush(testStudents);
    HttpTestingController.verify();
  });
});
