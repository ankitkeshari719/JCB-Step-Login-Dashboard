import { SharedModule } from "./../../shared/shared.module";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { MaterialModule } from "./../../material.module";
import { AuthRoutingModule } from "./auth-routing.module";
import { LoginComponent } from "./login/login.component";
import { AuthComponent } from "./auth.component";
import { RegisterComponent } from "./register/register.component";
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './login/reset-password/reset-password.component';
import { RegistrationSuccessfulComponent } from './register/registration-successful/registration-successful.component';
import { ResetSuccessfulComponent } from './login/reset-successful/reset-successful.component';

@NgModule({
  declarations: [LoginComponent, AuthComponent, RegisterComponent, ForgotPasswordComponent, ResetPasswordComponent, RegistrationSuccessfulComponent, ResetSuccessfulComponent],
  imports: [
    AuthRoutingModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AuthModule {}
