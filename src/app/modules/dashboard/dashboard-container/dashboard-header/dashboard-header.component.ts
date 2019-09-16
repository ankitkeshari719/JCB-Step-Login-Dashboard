import { Component, OnInit } from "@angular/core";

import { DashboardService } from "./../../dashboard.service";
import { Router, ActivatedRoute } from "@angular/router";
@Component({
  selector: "app-dashboard-header",
  templateUrl: "./dashboard-header.component.html",
  styleUrls: ["../../dashboard.component.css"]
})
export class DashboardHeaderComponent implements OnInit {
  title: string;

  constructor(
    private dashBoardService: DashboardService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.dashBoardService.title.subscribe(data => {
      this.title = data;
    });
  }

  backToDashboard() {
    this.router.navigate(["../dashboard"], { relativeTo: this.route });
  }
}
