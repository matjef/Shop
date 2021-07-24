import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user";


@Component({
  selector: 'signup',
  templateUrl: 'signup.component.html'
})

export class SignupComponent{
  invalidLogin : boolean = false;
  user: User = new User();
  constructor(private userService: UserService, private router: Router) {
  }

  save(){
    this.userService.createUser(this.user).subscribe(
      data => {
        this.router.navigateByUrl("/login");
        this.invalidLogin = false;
      },
        error => this.invalidLogin= true);
  }
}
