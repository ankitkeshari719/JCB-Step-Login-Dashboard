import { DashboardContainerComponent } from "./dashboard-container/dashboard-container.component";
import { DashboardComponent } from "./dashboard.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NewProjectComponent } from './projects/new-project/new-project.component';

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    children: [
      { path: "", component: DashboardContainerComponent },
      { path: "projects/new-project", component: NewProjectComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
