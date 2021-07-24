import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  constructor(private routes: Router) {
  }

  isUserAuthenticated(){
    const token: string | null = localStorage.getItem("jwt");
    return !!token;
  }

  logOut() {
    localStorage.removeItem("jwt");
  }
}
