import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-registration-successful",
  templateUrl: "./registration-successful.component.html",
  styleUrls: ["../../auth.component.css"]
})
export class RegistrationSuccessfulComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {}

  backToLogin() {
    this.router.navigate([""], { relativeTo: this.route });
  }
}
