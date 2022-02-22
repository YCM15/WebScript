import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SnippetGuard implements CanActivate {
    constructor(private route: Router, private auth:AuthService){}
  canActivate(): Observable<boolean> | boolean {
      if(this.auth.user.plan!="3"){
          this.route.navigateByUrl("/workSpace/profile")
          return false;
      }
    return true;
  }
}
