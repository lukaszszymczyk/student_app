import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { deleteStudent } from 'src/app/state/actions/student.actions';
import { Student } from 'src/app/models/student.model';

@Component({
  selector: 'app-details',
  templateUrl: './details-view.component.html',
  styleUrls: ['./details-view.component.scss'],
})
export class DetailsViewComponent implements OnInit {
  student: Student;

  constructor(private bsModalRef: BsModalRef, private store: Store<AppState>) {}

  ngOnInit() {}

  deleteStudent() {
    this.store.dispatch(deleteStudent({ studentId: this.student._id }));
    this.bsModalRef.hide();
  }
}
