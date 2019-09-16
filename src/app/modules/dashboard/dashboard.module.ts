import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "./../../material.module";
import { SidebarNavComponent } from "./dashboard-container/sidebar-nav/sidebar-nav.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./dashboard.component";
import { DashboardContainerComponent } from "./dashboard-container/dashboard-container.component";
import { DashboardHeaderComponent } from "./dashboard-container/dashboard-header/dashboard-header.component";
import { ProjectsComponent } from "./projects/projects.component";
import { NewProjectComponent } from "./projects/new-project/new-project.component";

@NgModule({
  declarations: [
    DashboardComponent,
    SidebarNavComponent,
    DashboardHeaderComponent,
    DashboardContainerComponent,
    ProjectsComponent,
    NewProjectComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule {}
