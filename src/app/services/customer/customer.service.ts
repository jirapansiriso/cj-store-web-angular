import { SessionService } from "app/services/session/session.service";
import { CustomerInterface } from "./customer.model";
import { CUSTOMER_API, HOST } from "./../service.config";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class CustomerService {
  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {}

  addCustomer(body: any): Observable<any> {
    const session = localStorage.getItem("session");
    const headers = {
      "Content-type": "application/json",
      "Authorization": this.sessionService.getAccessToken(),
    };
    return this.http.post(HOST + CUSTOMER_API, body, {
      headers: headers,
    });
  }
}
