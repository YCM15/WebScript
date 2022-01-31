import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { SharedService } from '../../../shared/services/shared.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private auth: AuthService, private sService: SharedService) {
    sService.logged = true; 
  }

  ngOnInit(): void { }

}
