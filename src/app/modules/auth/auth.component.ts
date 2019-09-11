import { login_page_image } from './../../config/const';
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"]
})
export class AuthComponent implements OnInit {
  image_url: string;
  constructor() {}

  ngOnInit() {
    this.image_url = login_page_image;
  }
}
