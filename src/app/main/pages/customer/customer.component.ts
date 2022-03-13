import { CustomerService } from "./../../../services/customer/customer.service";
import { CustomerInterface } from "./../../../services/customer/customer.model";
import { AddCustomerFormComponent } from "../../../utilities/forms/add-customer-form/add-customer-form.component";
import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { SessionService } from "app/services/session/session.service";
import { InfoDialogComponent } from "app/utilities/dialogs/info-dialog/info-dialog.component";

@Component({
  selector: "app-home",
  templateUrl: "./customer.component.html",
  styleUrls: ["./customer.component.scss"],
})
export class CustomerComponent implements OnInit, OnDestroy {
  loading = false;
  customers: CustomerInterface[] = [];
  keyword: string = "";
  limit: number = 20;
  offset: number = 0;
  isNoMore: boolean = false;
  filters = [
    {
      id: 1,
      name: "ชื่อ",
    },
    {
      id: 2,
      name: "นามสกุล",
    },
    {
      id: 3,
      name: "เบอร์มือถือ",
    },
  ];

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private sessionService: SessionService,
    private customerService: CustomerService
  ) {}

  public contentHeader: object;

  checkAuthenticated() {
    this.sessionService.checkAuthenticated(this.router);
  }

  reset() {
    this.customers = [];
    this.isNoMore = false;
    this.offset = 0;
  }

  onAddClicked() {
    this.showCustomerDialog(null);
  }

  onMoreClicked() {
    this.getCustomers();
  }

  showCustomerDialog(customer: CustomerInterface) {
    const dialogRef = this.dialog.open(AddCustomerFormComponent, {
      width: "auto",
      maxWidth: "95vw",
      height: "auto",
      disableClose: true,
      panelClass: "disable-overflow",
      data: customer,
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res != null) {
        if (res) {
          this.reset();
          this.getCustomers();
        }
      }
    });
  }

  customerClicked(customer: CustomerInterface) {
    this.showCustomerDialog(customer);
  }

  getCustomers(): void {
    this.customerService
      .getCustomers(this.keyword, this.limit, this.offset)
      .subscribe(
        (data) => {
          // stop loading
          this.loading = false;

          // check success
          if (data["success"]) {
            const items = data["customers"];

            items.forEach((element) => {
              this.customers.push(element);
            });

            if (items.length < this.limit) {
              this.isNoMore = true;
            }

            this.offset += this.limit;
          }
        },
        (error) => {
          this.showErrorDialog();
        }
      );
  }

  showErrorDialog() {
    const data = {
      title: "ผิดพลาด",
      description: "พบข้อผิดพลาดบางอย่างในระหว่างเชื่อมต่อข้อมูล",
    };
    const dialogRef = this.dialog.open(InfoDialogComponent, {
      width: "450px",
      maxWidth: "95vw",
      height: "auto",
      panelClass: "disable-overflow",
      data: data,
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        // something
      }
    });
  }

  onSearchEnter() {
    this.keyword = (<HTMLInputElement>document.getElementById("search")).value;
    this.reset();
    this.getCustomers();
  }


  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */

  ngOnInit() {
    this.checkAuthenticated();
    this.contentHeader = {
      headerTitle: "ลูกค้า",
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
    this.getCustomers();
  }

  ngOnDestroy(): void {}
}
