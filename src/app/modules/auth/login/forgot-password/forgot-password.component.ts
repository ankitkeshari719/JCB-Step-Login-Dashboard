import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";

import { AuthService } from "../../auth.service";
import { emailregex, resetPasswordUrl } from "src/app/config/const";
import {
  forgetPasswordRequest,
  INTERNAL_RESPONSE_STATUS
} from "src/app/services";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["../../auth.component.css"]
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
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
    this.forgotPasswordForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(emailregex)]]
    });
  }

  getErrorEmail() {
    return this.forgotPasswordForm.get("email").hasError("required")
      ? "Email is required."
      : this.forgotPasswordForm.get("email").hasError("pattern")
      ? "Not a valid email address (domain must be jcb.com)."
      : "";
  }

  /**
   * Forgets password
   * @param reqData
   */
  forgetPassword(reqData: forgetPasswordRequest) {
    reqData.resetPasswordUrl = resetPasswordUrl;
    this.isLoading = true;
    this.authService.forgotPassword(reqData).subscribe(response => {
      if (response.status === INTERNAL_RESPONSE_STATUS.SUCCESS) {
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
