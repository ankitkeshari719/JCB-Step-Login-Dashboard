import { MaterialModule } from "./../../material.module";
import { SidebarNavComponent } from "./sidebar-nav/sidebar-nav.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./dashboard.component";
import { DashboardContainerComponent } from "./dashboard-container/dashboard-container.component";
import { ProjectListComponent } from "./project-list/project-list.component";
import { DashboardHeaderComponent } from "./dashboard-container/dashboard-header/dashboard-header.component";
import { ProjectsComponent } from './projects/projects.component';

@NgModule({
  declarations: [
    DashboardComponent,
    SidebarNavComponent,
    DashboardHeaderComponent,
    DashboardContainerComponent,
    ProjectListComponent,
    ProjectsComponent
  ],
  imports: [CommonModule, DashboardRoutingModule, MaterialModule]
})
export class DashboardModule {}
