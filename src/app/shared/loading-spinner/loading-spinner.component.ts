import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-loading-spinner",
  template: '<div class="lds-hourglass"></div>',
  styleUrls: ["./loading-spinner.component.css"]
})
export class LoadingSpinnnerComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
