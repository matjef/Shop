import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs";
import {Token} from "../models/token";
import {tap} from "rxjs/operators";
import {JwtHelperService} from "@auth0/angular-jwt";
import {User} from "../models/user";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  private urlApi = "/api/auth/login";
  user: User;

  constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService, private userService: UserService) {
  }

  login(username: string,password: string): Observable<Token> {
    return this.http.post<Token>(this.urlApi, {username,password})
      .pipe(
        tap(token => {
          localStorage.setItem("jwt", token.access_token);
          this.userService.getUser().subscribe((data:User) => this.user = data);
        })
      )
  }

  isUserAuthenticated(){
    const token: string | null = localStorage.getItem("jwt");
    return token && !this.jwtHelper.isTokenExpired(token);
  }

  isUserAdmin(){
    if(this.isUserAuthenticated()){
      const token = localStorage.getItem("jwt");
      const decodedToken = this.jwtHelper.decodeToken(token);
      const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
      return role === 'admin';
    }
  }

  logOut() {
    localStorage.removeItem("jwt");
    this.router.navigate(["/"])
  }
}
