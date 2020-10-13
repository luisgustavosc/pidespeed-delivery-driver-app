import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { tap, map } from "rxjs/operators";
import { Observable, BehaviorSubject, pipe } from "rxjs";
import { isNullOrUndefined } from "util";
import { JwtHelperService } from "@auth0/angular-jwt";

let headers = new HttpHeaders({
  "Content-Type": "application/json",
  authorization: `bearer ${localStorage.getItem("ACCESS_TOKEN")}`
});
let options = { headers: headers };
@Injectable({
  providedIn: "root"
})
export class AuthService {
  AUTH_SERVER: string = "https://ssl.pidespeed.com";
  public token: string;
  public user: Object;
  tokenAdmin: string;
  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) {}

  login(user) {
    return this.http.post(
      `${this.AUTH_SERVER}/sesiones/loginEmpresa`,
      user,
      options
    );
  }
  logout(): void {
    this.token = "";
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("TOKEN_ADMIN");
    localStorage.removeItem("USER_ADMIN");
  }
  getCurrentUser() {
    let user_string = localStorage.getItem("USER_ADMIN");
    if (!isNullOrUndefined(user_string)) {
      let user = JSON.parse(user_string);
      return user;
    } else {
      return null;
    }
  }
  public setUser(user: Object): void {
    let user_string = JSON.stringify(user);
    localStorage.setItem("USER_ADMIN", user_string);
  }

  public saveToken(token: string, tokenAdmin: string): void {
    this.token = token;
    this.tokenAdmin = tokenAdmin;
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("TOKEN_ADMIN", tokenAdmin);
  }

  public getAccessToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem("ACCESS_TOKEN");
    }
    return this.token;
  }

  public getAdminToken(): string {
    if (!this.tokenAdmin) {
      this.tokenAdmin = localStorage.getItem("TOKEN_ADMIN");
    }
    return this.tokenAdmin;
  }

  public checktoken(token) {
    return this.jwtHelper.isTokenExpired(token);
  }
}
