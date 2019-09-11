import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Router, ActivatedRoute } from "@angular/router";

import { AuthService } from "../../auth.service";
import { emailregex } from "src/app/config/const";
import { MustMatch } from "src/app/helpers/must-match.service";
import { InternalResponse, INTERNAL_RESPONSE_STATUS } from "src/app/services";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["../../auth.component.css"]
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  hide = true;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.resetPasswordForm = this.formBuilder.group(
      {
        email: [null, [Validators.required, Validators.pattern(emailregex)]],
        password: [null, [Validators.required, this.checkPassword]],
        confirmPassword: [null, Validators.required]
      },
      {
        validator: MustMatch("password", "confirmPassword")
      }
    );
  }

  getErrorEmail() {
    return this.resetPasswordForm.get("email").hasError("required")
      ? "Email is required."
      : this.resetPasswordForm.get("email").hasError("pattern")
      ? "Not a valid email address (domain must be jcb.com)."
      : "";
  }

  checkPassword(control) {
    let enteredPassword = control.value;
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return !passwordCheck.test(enteredPassword) && enteredPassword
      ? { requirements: true }
      : null;
  }

  getErrorPassword() {
    return this.resetPasswordForm.get("password").hasError("required")
      ? "Field is required (at least eight characters, one uppercase letter and one number)"
      : this.resetPasswordForm.get("password").hasError("requirements")
      ? "Password needs to be at least eight characters, one uppercase letter and one number"
      : "";
  }

  getErrorConfirmPassword() {
    return this.resetPasswordForm.get("confirmPassword").hasError("required")
      ? "This field is required"
      : this.resetPasswordForm.get("confirmPassword").hasError("mustMatch")
      ? "Passwords must match"
      : "";
  }

  resetPassword(data) {
    const reqData = {
      email: data.email,
      newPassword: data.confirmPassword
    };
    this.isLoading = true;
    this.authService.resetPassword(reqData).subscribe(response => {
      let responseData: InternalResponse = response;
      if (responseData.status === INTERNAL_RESPONSE_STATUS.SUCCESS) {
        this.isLoading = false;
        this.toastr.success(response.success_message);
        this.router.navigate([""], { relativeTo: this.route });
      } else {
        this.isLoading = false;
        this.toastr.error(
          response.success_message
            ? response.success_message
            : response.error_message,
          "Error"
        );
      }
    });
  }

  backToLogin() {
    this.router.navigate([""], { relativeTo: this.route });
  }
}
