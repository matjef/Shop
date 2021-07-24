import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html'
})

export class NavMenuComponent {

  constructor(private authService: AuthService) {
  }

  public get isLoggedIn(): boolean {
    return this.authService.isUserAuthenticated();
  }

  logOut() {
    this.authService.logOut();
  }
}
