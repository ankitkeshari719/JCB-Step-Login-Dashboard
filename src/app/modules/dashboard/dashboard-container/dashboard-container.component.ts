import { DashboardService } from "./../dashboard.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-dashboard-container",
  templateUrl: "./dashboard-container.component.html",
  styleUrls: ["../dashboard.component.css"]
})
export class DashboardContainerComponent implements OnInit {
  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.dashboardService.setTitle("Dashboard");
  }
}
