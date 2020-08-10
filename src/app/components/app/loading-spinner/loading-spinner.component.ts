import { Component, OnInit, Input } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { SpinnerService } from "src/app/services/spinner.service";

const MESSAGE_SPINNER = "Loading...";

@Component({
  selector: "app-loading-spinner",
  templateUrl: "./loading-spinner.component.html",
  styleUrls: ["./loading-spinner.component.scss"],
  providers: [NgxSpinnerService],
})
export class LoadingSpinnerComponent implements OnInit {
  @Input() show: boolean;
  MESSAGE_SPINNER: string;

  constructor(private spinner: NgxSpinnerService, private spinnerService: SpinnerService) {}

  ngOnInit() {
    this.MESSAGE_SPINNER = MESSAGE_SPINNER;
    this.spinnerService.getData().subscribe((data) => {
      data
        ? this.spinner.show()
        : setTimeout(() => {
            this.spinner.hide();
          }, 500);
    });
  }
}
