import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input('showBtnsEditor') editor :boolean =  false;
  @Input('isLogged') logged :boolean =  false;

  constructor( private auth: AuthService ) { }

  ngOnInit(): void {
  }

}
