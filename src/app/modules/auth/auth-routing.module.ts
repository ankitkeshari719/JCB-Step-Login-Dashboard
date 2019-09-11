import { ResetSuccessfulComponent } from "./login/reset-successful/reset-successful.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { RegistrationSuccessfulComponent } from "./register/registration-successful/registration-successful.component";
import { ResetPasswordComponent } from "./login/reset-password/reset-password.component";
import { ForgotPasswordComponent } from "./login/forgot-password/forgot-password.component";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";

import { AuthComponent } from "./auth.component";

const routes: Routes = [
  {
    path: "",
    component: AuthComponent,
    children: [
      { path: "", component: LoginComponent },
      { path: "register", component: RegisterComponent },
      { path: "forgot-password", component: ForgotPasswordComponent },
      { path: "reset-password", component: ResetPasswordComponent },
      {
        path: "registration-successful",
        component: RegistrationSuccessfulComponent
      },
      {
        path: "reset-successful",
        component: ResetSuccessfulComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
