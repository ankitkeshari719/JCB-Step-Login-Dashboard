import { BehaviorSubject } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class DashboardService {
  title = new BehaviorSubject<string>("");

  constructor() {}

  public setTitle(newTitle: string) {
    this.title.next(newTitle);
  }

  getAllActivity() {
    
  }
}
