import { Component, EventEmitter, Inject, OnInit, Output } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-confirm-dialog",
  templateUrl: "./confirm-dialog.component.html",
  styleUrls: ["./confirm-dialog.component.scss"],
})
export class ConfirmDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit(): void {}

  cancelClicked() {
    this.dialogRef.close();
  }

  confirmClicked() {
    this.dialogRef.close(true);
  }
}
