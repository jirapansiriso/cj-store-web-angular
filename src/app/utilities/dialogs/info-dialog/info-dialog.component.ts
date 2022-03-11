import { Component, EventEmitter, Inject, OnInit, Output } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-info-dialog",
  templateUrl: "./info-dialog.component.html",
  styleUrls: ["./info-dialog.component.scss"],
})
export class InfoDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<InfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit(): void {}

  cancelClicked() {
    this.dialogRef.close(true);
  }
}
