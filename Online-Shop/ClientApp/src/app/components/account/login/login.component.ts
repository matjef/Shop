import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {User} from "../../../models/user";

@Component({
  selector:'login',
  templateUrl: 'login.component.html'
})

export class LoginComponent{

  invalidLogin : boolean;
  user: User = new User();

  constructor(private router: Router, private authService:AuthService) {
  }

  login(form: NgForm) {
    this.authService.login(form.value.username, form.value.password)
      .subscribe(data => {
        this.invalidLogin = false;
        this.router.navigate(["/catalog"]);
      }, err => {
        this.invalidLogin = true;
      })
  }

}
