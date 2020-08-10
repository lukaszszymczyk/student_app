import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { selectTypes } from 'src/app/state/selectors/student.selector';
import { FieldType } from 'src/app/models/student.model';
import { createStudent } from 'src/app/state/actions/student.actions';

@Component({
  selector: 'app-add-view',
  templateUrl: './add-view.component.html',
  styleUrls: ['./add-view.component.scss'],
})
export class AddViewComponent implements OnInit {
  submitted = false;
  studentForm = new FormGroup({
    full_name: new FormControl('', Validators.required),
    field_of_study: new FormControl('', Validators.required),
    faculty: new FormControl('', Validators.required),
    university: new FormControl('', Validators.required),
  });
  fieldTypes$: Observable<FieldType[]>;

  constructor(private bsModalRef: BsModalRef, private store: Store<AppState>) {}

  ngOnInit() {
    this.fieldTypes$ = this.store.select(selectTypes);
  }

  onSubmit() {
    this.submitted = true;
    if (this.studentForm.invalid) {
      return;
    }
    this.store.dispatch(createStudent({ student: this.studentForm.value }));
    this.bsModalRef.hide();
  }

  get fullName() {
    return this.studentForm.get('full_name');
  }

  get fieldOfStudy() {
    return this.studentForm.get('field_of_study');
  }

  get faculty() {
    return this.studentForm.get('faculty');
  }

  get university() {
    return this.studentForm.get('university');
  }
}
