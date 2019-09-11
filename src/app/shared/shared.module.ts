import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LoadingSpinnnerComponent } from "./loading-spinner/loading-spinner.component";
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [LoadingSpinnnerComponent, NotFoundComponent],
  imports: [CommonModule],
  exports: [CommonModule, LoadingSpinnnerComponent, NotFoundComponent]
})
export class SharedModule {}
