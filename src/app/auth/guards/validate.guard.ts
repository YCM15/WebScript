import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidateGuard implements CanActivate, CanLoad {
  constructor(private router: Router, private auth: AuthService){}
  canActivate(): Observable<boolean> | boolean {
    if(this.auth.getToken() != null){
      this.router.navigateByUrl('/workSpace')
    }
    return true;
  }
  canLoad(): Observable<boolean> | boolean {
    if(this.auth.getToken() != null){
      this.router.navigateByUrl('/workSpace')
    }
    return true;
  }
}
