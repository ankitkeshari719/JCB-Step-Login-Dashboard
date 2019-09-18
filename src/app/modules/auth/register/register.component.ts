import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import {
  RoleType,
  Locations,
  UserRegistrationRequest,
  InternalResponse,
  INTERNAL_RESPONSE_STATUS
} from "src/app/services";
import { ToastrService } from "ngx-toastr";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../auth.service";
import { emailregex, login_url } from "src/app/config/const";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["../auth.component.css"]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isLoading = false;

  // MANUAL DATA (NEED TO CHANGE ONCE API READY)
  roles: RoleType[] = [
    { value: "Test Engineer", viewValue: "Test Engineer" },
    { value: "Other JCB User", viewValue: "Other JCB User" }
  ];

  // MANUAL DATA (NEED TO CHANGE ONCE API READY)
  locations: Locations[] = [
    { value: "Pune, Maharashtra", viewValue: "Pune, Maharashtra" },
    { value: "Baramati, Maharashtra", viewValue: "Baramati, Maharashtra" },
    { value: "Navi Mumbai, Maharashtra", viewValue: "Navi Mumbai, Maharashtra" }
  ];

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
    this.registerForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(emailregex)]],
      firstName: [null, [Validators.required, Validators.minLength(3)]],
      lastName: [null, [Validators.required, Validators.minLength(3)]],
      location: [null, Validators.required],
      roleName: [null, Validators.required]
    });
  }

  get firstName() {
    return this.registerForm.get("firstName") as FormControl;
  }

  get lastName() {
    return this.registerForm.get("lastName") as FormControl;
  }

  get roleName() {
    return this.registerForm.get("roleName") as FormControl;
  }

  get location() {
    return this.registerForm.get("location") as FormControl;
  }

  getErrorFirstName() {
    return this.registerForm.get("firstName").hasError("required")
      ? "First Name is required."
      : this.registerForm.get("firstName").hasError("minlength")
      ? "Minimum 3 character required."
      : "";
  }

  getErrorLastName() {
    return this.registerForm.get("lastName").hasError("required")
      ? "Last Name is required."
      : this.registerForm.get("lastName").hasError("minlength")
      ? "Minimum 3 character required."
      : "";
  }

  getErrorEmail() {
    return this.registerForm.get("email").hasError("required")
      ? "Email is required."
      : this.registerForm.get("email").hasError("pattern")
      ? "Not a valid email address (domain must be jcb.com)."
      : "";
  }

  /**
   * Determines whether submit on
   * @param reqDetails OLDS THE DATA FOR  REGISTER REQUEST
   * @returns  SUCCESSFUL / FAILED MESSAGE RESPONSE
   */
  onSubmit(reqDetails: UserRegistrationRequest) {
    if (!this.registerForm.valid) {
      return;
    }
    reqDetails.loginUrl = login_url;
    this.isLoading = true;
    this.authService.registerUser(reqDetails).subscribe(response => {
      let responseData: InternalResponse = response;
      // STORING IN SERVICE IF ALL API RETURNED SUCCESS DATA
      if (responseData.status === INTERNAL_RESPONSE_STATUS.SUCCESS) {
        this.isLoading = false;
        this.toastr.success(
          "Your account info and default password will be sent to your email address.",
          response.success_message
        );
        this.router.navigate(["../registration-successful"], {
          relativeTo: this.route
        });
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
    this.registerForm.reset();
  }

  backToLogin() {
    this.router.navigate([""], { relativeTo: this.route });
  }
}
