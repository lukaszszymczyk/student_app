import { Component, OnInit, Input } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DetailsViewComponent } from '../details-view/details-view.component';
import { Student } from 'src/app/models/student.model';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent implements OnInit {
  @Input() student: Student;

  constructor(private modalService: BsModalService) {}

  ngOnInit() {}

  openDetailsModal() {
    const initialState = {
      student: this.student,
    };
    this.modalService.show(DetailsViewComponent, { initialState });
  }
}
