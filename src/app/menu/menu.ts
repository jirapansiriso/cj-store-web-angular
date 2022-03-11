import { CoreMenu } from "@core/types";

export const menu: CoreMenu[] = [
  {
    id: "dashboard",
    title: "สรุป",
    type: "item",
    icon: "home",
    url: "dashboard",
  },
  {
    id: "customer",
    title: "ลูกค้า",
    type: "item",
    icon: "user",
    url: "customer",
  },
  {
    id: "order",
    title: "ออร์เดอร์",
    type: "item",
    icon: "shopping-cart",
    url: "order",
  },
];
