import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { ToastrModule } from "ngx-toastr";

import { AppRoutingModule } from "./app-routing.module";
import { MaterialModule } from "./material.module";
import { SharedModule } from "./shared/shared.module";
import { AppComponent } from "./app.component";
import { httpInterceptorProviders } from "./services/interceptors";
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: "toast-top-right",
      preventDuplicates: true
    })
  ],
  providers: [
    httpInterceptorProviders
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: appAuthInitializer,
    //   multi: true,
    //   deps: []
    // },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
