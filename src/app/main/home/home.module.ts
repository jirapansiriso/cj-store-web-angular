import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";

import { CoreCommonModule } from "@core/common.module";

import { ContentHeaderModule } from "app/layout/components/content-header/content-header.module";

import { DashboardComponent } from "../pages/dashboard/dashboard.component";
import { OrderComponent } from "../pages/order/order.component";
import { CustomerComponent } from "../pages/customer/customer.component";

const routes = [
  {
    path: "order",
    component: OrderComponent,
    data: { animation: "order" },
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    data: { animation: "dashboard" },
  },
  {
    path: "customer",
    component: CustomerComponent,
    data: { animation: "customer" },
  },
];

@NgModule({
  declarations: [DashboardComponent, OrderComponent, CustomerComponent],
  imports: [
    RouterModule.forChild(routes),
    ContentHeaderModule,
    TranslateModule,
    CoreCommonModule,
  ],
  exports: [DashboardComponent, OrderComponent, CustomerComponent],
})
export class SampleModule {}
