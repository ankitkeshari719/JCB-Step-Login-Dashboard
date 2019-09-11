import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-reset-successful",
  templateUrl: "./reset-successful.component.html",
  styleUrls: ["../../auth.component.css"]
})
export class ResetSuccessfulComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {}

  backToLogin() {
    this.router.navigate([""], { relativeTo: this.route });
  }
}
