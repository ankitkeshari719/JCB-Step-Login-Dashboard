import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/auth",
    pathMatch: "full"
  },
  {
    path: "auth",
    loadChildren: () =>
      import("./modules/auth/auth.module").then(mod => mod.AuthModule)
  },
  {
    path: "dashboard",
    loadChildren: () =>
      import("./modules/dashboard/dashboard.module").then(
        mod => mod.DashboardModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
