import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user";

@Injectable()
export class UserService{
  private urlUser = "/api/user";

  constructor(private http: HttpClient) {
  }

  getUser (){
    return this.http.get(this.urlUser);
  }

  createUser(user: User){
    return this.http.post(this.urlUser, user);
  }

  updateUser(user: User){
    return this.http.put(this.urlUser, user);
  }

  deleteUser(id: number){
    return this.http.delete(this.urlUser + '/' + id);
  }
}
