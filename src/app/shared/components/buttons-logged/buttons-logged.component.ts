import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-buttons-logged',
  templateUrl: './buttons-logged.component.html',
  styleUrls: ['./buttons-logged.component.scss']
})
export class ButtonsLoggedComponent implements OnInit {

  nickname : string = this.auth.user.nickname;

  constructor( private auth: AuthService, private router:Router, private sService: SharedService) { }

  ngOnInit(): void {
  }

  logout(){
    this.auth.logout();
    this.router.navigateByUrl('/auth')
  }

}
