import { ConfirmDialogComponent } from './../../dialogs/confirm-dialog/confirm-dialog.component';
import { CustomerInterface } from "./../../../services/customer/customer.model";
import { InfoDialogComponent } from "./../../dialogs/info-dialog/info-dialog.component";
import { CustomerService } from "./../../../services/customer/customer.service";
import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";

@Component({
  selector: "app-add-customer-form",
  templateUrl: "./add-customer-form.component.html",
  styleUrls: ["./add-customer-form.component.scss"],
})
export class AddCustomerFormComponent implements OnInit {
  addCustomerForm: FormGroup;
  submitted = false;
  loading = false;
  customer: CustomerInterface = null;

  constructor(
    public dialogRef: MatDialogRef<AddCustomerFormComponent>,
    private _formBuilder: FormBuilder,
    private customerService: CustomerService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: CustomerInterface
  ) {}

  cancelClicked() {
    this.dialogRef.close();
  }

  get f() {
    return this.addCustomerForm.controls;
  }

  onDeleteClicked(customer: CustomerInterface){
    if(customer != null){
      this.showConfirmDeleteCustomerDialog();
    }
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.addCustomerForm.invalid) {
      return;
    }

    if (this.customer == null) {
      // add customer
      this.loading = true;
      this.addCustomer();
    }else{
      // update customer
      this.loading = true;
      this.updateCustomer();
    }
  }

  addCustomer(){
    const customer = {
      firstname: this.addCustomerForm.value.firstname,
      lastname: this.addCustomerForm.value.lastname,
      phone_number: this.addCustomerForm.value.phone,
    };
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
        // stop loading
        this.loading = false;

        this.showErrorDialog();
      }
    );
  }

  updateCustomer(){
    const customer = {
      id: this.customer.id,
      firstname: this.addCustomerForm.value.firstname,
      lastname: this.addCustomerForm.value.lastname,
      phone_number: this.addCustomerForm.value.phone.toString(),
    };
    this.customerService.updateCustomer(customer).subscribe(
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
        // stop loading
        this.loading = false;
        
        this.showErrorDialog();
      }
    );
  }

  deleteCustomer(){
    const customer = {
      id: this.customer.id,
    };
    this.customerService.deleteCustomer(customer).subscribe(
      (data) => {
        // stop loading
        this.loading = false;

        // check success
        if (data["success"]) {
          this.dialogRef.close(true);
        }
      },
      (error) => {
        // stop loading
        this.loading = false;
        
        this.showErrorDialog();
      }
    );
  }

  showConfirmDeleteCustomerDialog() {
    const data = {
      title: "ลบลูกค้า",
      description: "กด ยืนยัน เพื่อลบข้อมูลลูกค้า",
    };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "450px",
      maxWidth: "95vw",
      height: "auto",
      panelClass: "disable-overflow",
      data: data,
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.deleteCustomer();
      }
    });
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
    // set customer
    this.customer = this.data;

    // set form
    this.addCustomerForm = this._formBuilder.group({
      firstname: [
        this.customer != null ? this.customer.firstname : "",
        Validators.required,
      ],
      lastname: [
        this.customer != null ? this.customer.lastname : "",
        Validators.required,
      ],
      phone: [
        this.customer != null ? this.customer.phone_number : "",
        [Validators.required, Validators.pattern],
      ],
    });
  }
}
function MD_DIALOG_DATA(MD_DIALOG_DATA: any) {
  throw new Error("Function not implemented.");
}
