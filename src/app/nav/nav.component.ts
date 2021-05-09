import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Users} from '../models/User';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  userName: string;
  loggedIn: Boolean = false;
  constructor(public auth: AuthService) { }

  ngOnInit() {
    this.auth.sessionUser.subscribe(data => {
    this.userName = data.userName; 
    if (this.userName != null) {
      this.loggedIn = true;
    }
    });



  }

}
