import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { UserLoginRequest, INTERNAL_RESPONSE_STATUS } from "src/app/services";
import { emailregex } from "src/app/config/const";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["../auth.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide = true;
  isLoading = false;
  image_url: string;
  private userSub: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.createForm();
    this.userSub = this.authService.user.subscribe(user => {
      if (user) {
        this.router.navigate(["/", "dashboard"]);
      }
    });
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(emailregex)]],
      password: [null, [Validators.required]]
    });
  }

  getErrorEmail() {
    return this.loginForm.get("email").hasError("required")
      ? "Email is required."
      : this.loginForm.get("email").hasError("pattern")
      ? "Not a valid email address (domain must be jcb.com)."
      : "";
  }

  getErrorPassword() {
    return this.loginForm.get("password").hasError("required")
      ? "Password is required"
      : "";
  }

  login(data): void {
    if (data.email && data.password) {
      let loginRequestDetails: UserLoginRequest = {
        email: data.email,
        enableNotification: true,
        os: "Android",
        password: data.password,
        pushNotificationToken: "AGKJHFJAHFLW"
      };
      this.isLoading = true;
      this.authService.loginUser(loginRequestDetails).subscribe(response => {
        if (response) {
          this.isLoading = false;
          this.toastr.error(
            response.success_message
              ? response.success_message
              : response.error_message,
            "Error"
          );
        } else {
          this.isLoading = false;
        }
      });
    }
  }

  onForgotPassword() {
    this.router.navigate(["forgot-password"], { relativeTo: this.route });
  }

  onNewRegister() {
    this.router.navigate(["register"], { relativeTo: this.route });
  }
}
