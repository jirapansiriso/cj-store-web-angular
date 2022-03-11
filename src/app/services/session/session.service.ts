import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { HOST, LOGIN_API } from "./../service.config";

@Injectable({ providedIn: "root" })
export class SessionService {
  constructor(private http: HttpClient) {}

  saveAccessToken(accessToken: string){
    localStorage.setItem("accessToken", accessToken);
  }

  getAccessToken(): string{
    return localStorage.getItem("accessToken");
  }

  checkAuthenticated(router: Router) {
    if (!this.checkAuth()) {
      router.navigate(["/pages/authentication/login"]);
    }
    return;
  }

  checkAuth(): boolean {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken == null) {
      return false;
    } else {
      return true;
    }
  }

  logout(router: Router) {
    localStorage.clear();
    router.navigate(["/pages/authentication/login"]);
  }

  login(username: String, password: String): Observable<any> {
    const headers = { "content-type": "application/json" };
    const body = { username: username, password: password };
    return this.http.post(HOST + LOGIN_API, body, {
      headers: headers,
    });
  }
}
