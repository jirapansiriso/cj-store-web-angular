import { CustomerInterface } from "./../../../services/customer/customer.model";
import { AddCustomerFormComponent } from "../../../utilities/forms/add-customer-form/add-customer-form.component";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { SessionService } from "app/services/session/session.service";

@Component({
  selector: "app-home",
  templateUrl: "./customer.component.html",
  styleUrls: ["./customer.component.scss"],
})
export class CustomerComponent implements OnInit {
  loading = false;
  displayedColumns: string[] = ["id", "firstname", "lastname", "phone"];
  data: CustomerInterface[] = [
    {
      id: 1,
      firstname: "ประยุทธ์",
      lastname: "จันโอชา",
      phone_number: "0881545656",
    },
    {
      id: 2,
      firstname: "ประวิทย์",
      lastname: "วงค์สุวรรณ",
      phone_number: "0881545654",
    },
    {
      id: 3,
      firstname: "ปารีณา",
      lastname: "ไกรคุปส์",
      phone_number: "0881545456",
    },
    {
      id: 4,
      firstname: "สิระ",
      lastname: "เจนจาคะ",
      phone_number: "0881575656",
    },
    {
      id: 5,
      firstname: "อนุทิน",
      lastname: "ชาญวีระกูล",
      phone_number: "0881845656",
    },
  ];

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private sessionService: SessionService
  ) {}

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
      headerTitle: "Customer",
      actionButton: false,
      breadcrumb: {
        type: "",
        links: [
          {
            name: "list",
            isLink: false,
          },
        ],
      },
    };
  }

  addClicked() {
    const dialogRef = this.dialog.open(AddCustomerFormComponent, {
      width: "auto",
      maxWidth: "95vw",
      height: "auto",
      disableClose: true,
      panelClass: "disable-overflow",
      // data: 500,
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res != null) {
        console.log(res);
      }
    });
  }
}
