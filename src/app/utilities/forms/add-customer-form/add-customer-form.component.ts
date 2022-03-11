import { InfoDialogComponent } from "./../../dialogs/info-dialog/info-dialog.component";
import { first } from "rxjs/operators";
import { CustomerService } from "./../../../services/customer/customer.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-add-customer-form",
  templateUrl: "./add-customer-form.component.html",
  styleUrls: ["./add-customer-form.component.scss"],
})
export class AddCustomerFormComponent implements OnInit {
  addCustomerForm: FormGroup;
  submitted = false;
  loading = false;

  constructor(
    public dialogRef: MatDialogRef<AddCustomerFormComponent>,
    private _formBuilder: FormBuilder,
    private customerService: CustomerService,
    private dialog: MatDialog
  ) {}

  cancelClicked() {
    this.dialogRef.close();
  }
  
  get f() {
    return this.addCustomerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.addCustomerForm.invalid) {
      return;
    }

    // add customer
    this.loading = true;
    const customer = {
      firstname: this.addCustomerForm.value.firstname,
      lastname: this.addCustomerForm.value.lastname,
      phone_number: this.addCustomerForm.value.phone.toString(),
    };
    // this.customerService.addCustomer(customer).pipe(first()).subscribe((data) => {

    //   // stop loading
    //   this.loading = false;

    //   // check success
    //   if (data["success"]) {
    //     const customer = data["customer"];
    //   }
    // });
    this.customerService.addCustomer(customer).subscribe(
      (data) => {
        // stop loading
        this.loading = false;

        // check success
        if (data["success"]) {
          const customer = data["customer"];
          this.dialogRef.close(true);
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

  ngOnInit(): void {
    this.addCustomerForm = this._formBuilder.group({
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      phone: ["", Validators.required],
    });
  }
}
