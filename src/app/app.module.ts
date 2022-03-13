import { InfoDialogComponent } from "./utilities/dialogs/info-dialog/info-dialog.component";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import "hammerjs";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule } from "@ngx-translate/core";
import { ToastrModule } from "ngx-toastr"; // For auth after login toast
import { CoreModule } from "@core/core.module";
import { CoreCommonModule } from "@core/common.module";
import { CoreSidebarModule, CoreThemeCustomizerModule } from "@core/components";
import { coreConfig } from "app/app-config";
import { AppComponent } from "app/app.component";
import { LayoutModule } from "app/layout/layout.module";
import { SampleModule } from "app/main/home/home.module";
import { ConfirmDialogComponent } from "./utilities/dialogs/confirm-dialog/confirm-dialog.component";
import { AddCustomerFormComponent } from "./utilities/forms/add-customer-form/add-customer-form.component";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { ListViewModule } from "@syncfusion/ej2-angular-lists";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DataTablesModule } from "angular-datatables";
// import { MatSelectModule } from "@angular/material/select";

const appRoutes: Routes = [
  {
    path: "pages",
    loadChildren: () =>
      import("./main/pages/pages.module").then((m) => m.PagesModule),
  },
  {
    path: "",
    redirectTo: "/dashboard",
    pathMatch: "full",
  },
  {
    path: "**",
    redirectTo: "/pages/miscellaneous/error", //Error 404 - Page not found
  },
];

@NgModule({
  declarations: [
    AppComponent,
    ConfirmDialogComponent,
    InfoDialogComponent,
    AddCustomerFormComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ListViewModule,
    MatButtonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {
      scrollPositionRestoration: "enabled", // Add options right here
      relativeLinkResolution: "legacy",
    }),
    TranslateModule.forRoot(),

    //NgBootstrap
    NgbModule,
    ToastrModule.forRoot(),

    // Core modules
    CoreModule.forRoot(coreConfig),
    CoreCommonModule,
    CoreSidebarModule,
    CoreThemeCustomizerModule,

    // App modules
    LayoutModule,
    SampleModule,

    // dialog
    MatDialogModule,

    // datatable
    DataTablesModule,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
