import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AddViewComponent } from '../add-view/add-view.component';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import * as StudentActions from 'src/app/state/actions/student.actions';
import { Student } from 'src/app/models/student.model';
import { Observable, Subscription } from 'rxjs';
import {
  selectLoading,
  selectStudents,
  selectScrollAvaliable,
  selectEndOfList,
} from 'src/app/state/selectors/student.selector';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss'],
})
export class ListViewComponent implements OnInit {
  subscriptions: Subscription;
  studentList$: Observable<Student[]>;
  scrollAvailable: boolean;
  endOfList = false;

  constructor(
    private modalService: BsModalService,
    private store: Store<AppState>,
    private spinnerService: SpinnerService
  ) {
    this.subscriptions = new Subscription();
    this.studentList$ = this.store.select(selectStudents);
    this.initSubscription();
  }

  ngOnInit() {
    this.loadInitData();
  }

  loadInitData() {
    this.store.dispatch(StudentActions.loadInitStudents());
    this.store.dispatch(StudentActions.loadTypes());
  }

  initSubscription() {
    this.subscriptions.add(
      this.store.select(selectLoading).subscribe((loading) => {
        loading ? this.spinnerService.show() : this.spinnerService.hide();
      })
    );
    this.subscriptions.add(
      this.store.select(selectScrollAvaliable).subscribe((scrollAvailable) => (this.scrollAvailable = scrollAvailable))
    );
    this.subscriptions.add(this.store.select(selectEndOfList).subscribe((endOfList) => (this.endOfList = endOfList)));
  }

  openAddStudentModal() {
    this.modalService.show(AddViewComponent);
  }

  onScroll() {
    if (this.scrollAvailable && !this.endOfList) {
      this.store.dispatch(StudentActions.loadMoreStudents());
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
