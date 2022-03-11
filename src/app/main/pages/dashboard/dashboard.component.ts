import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SessionService } from "app/services/session/session.service";

@Component({
  selector: "app-home",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router, private sessionService: SessionService) {}

  public contentHeader: object;

  checkAuthenticated() {
    this.sessionService.checkAuthenticated(this.router);
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit() {
    this.checkAuthenticated();
    this.contentHeader = {
      headerTitle: "Dashboard",
      actionButton: false,
    };
  }
}
