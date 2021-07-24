import {Component, OnInit} from "@angular/core";
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user";

@Component({
  templateUrl: 'profile.component.html',
  providers: [UserService]
})

export class ProfileComponent implements OnInit {

  user: User;
  loaded: boolean = false;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getUser()
      .subscribe((data:User) => {
        this.user = data;
        this.loaded = true;
      });

  }
}
