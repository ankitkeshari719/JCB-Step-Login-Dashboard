import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { Subscription } from "rxjs";
import { MediaMatcher } from "@angular/cdk/layout";
import { AuthService } from "../../auth/auth.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { InternalResponse, INTERNAL_RESPONSE_STATUS } from "src/app/services";

@Component({
  selector: "app-sidebar-nav",
  templateUrl: "./sidebar-nav.component.html",
  styleUrls: ["../dashboard.component.css"]
})
export class SidebarNavComponent implements OnInit {
  mobileQuery: MediaQueryList;
  fillerNav = [
    { nav: "Home", link: "/Charts" },
    { nav: "S", link: "/flexbox" }
  ];
  private _mobileQueryListener: () => void;
  private userSub: Subscription;
  isAuthenticated: boolean = false;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.mobileQuery = media.matchMedia("(max-width: 700px)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !user ? false : true;
    });
  }

  logout() {
    this.authService.logout().subscribe(response => {
      let responseData: InternalResponse = response;
      // STORING IN SERVICE IF ALL API RETURNED SUCCESS DATA
      if (responseData.status === INTERNAL_RESPONSE_STATUS.SUCCESS) {
        this.toastr.success(response.success_message);
        this.router.navigate(["/", "auth"]);
        localStorage.removeItem("userData");
      } else {
        this.toastr.error(
          response.success_message
            ? response.success_message
            : response.error_message,
          "Error"
        );
      }
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.userSub.unsubscribe();
  }

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h =>
    h.test(window.location.host)
  );
}
