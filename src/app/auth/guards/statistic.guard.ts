import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class StatisticGuard implements CanActivate {
    constructor(private route: Router, private auth:AuthService){}
  canActivate(): Observable<boolean> | boolean {
      if(this.auth.user.admin){
          return true;
    }
    this.route.navigateByUrl("/workSpace/profile")
    return false;
  }
}
