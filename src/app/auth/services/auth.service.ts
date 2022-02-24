import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, tap } from "rxjs/operators";
import Swal, { SweetAlertPosition } from 'sweetalert2';
import { environment } from '../../../environments/environment';
import { SharedService } from '../../shared/services/shared.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user:any;
  private baseUrl = environment.baseUrl;

  constructor( private http : HttpClient, private sService: SharedService) { }

  set user( user:any){
    this._user = user;
  }

  get user(){
    return { ...this._user};
  }

  // ALERT
  alert(icon: any, message: any, timer: number = 3000, position: SweetAlertPosition = "bottom-right", showConfirmButton: boolean = false, timerProgressBar: boolean = true) {

    const sweet = Swal.mixin({
      toast: true,
      position: position,
      showConfirmButton: showConfirmButton,
      timer: timer,
      timerProgressBar: timerProgressBar,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    sweet.fire({
      icon: icon,
      title: message,
      text: undefined
    })

  }

  login(obj:any){
    const url = `${this.baseUrl}/logIn`;
    return this.http.post(url, obj).pipe(
      tap( (res:any) => {
        if(res.token){
          localStorage.setItem('access_token', res.token);
          this.user = res.user;
        }
      })
    )
  }

  signup(obj:any){
    const url = `${this.baseUrl}/signUp`;
    return this.http.post(url, obj).pipe(
      tap( (res:any) => {
        if(res.token){
          localStorage.setItem('access_token', res.token);
          this.user = res.user;
        }
      })
    )
  }

  authenticate(){
    const url = `${this.baseUrl}/autenticated`;
    return this.http.get(url).pipe(
      map((res:any)=>{
        this.user = res.user;
        return res.status? true:false;
      }),
      catchError(err => of(false))
    );
  }

  updateInfoUser(body:any){
    const url = `${this.baseUrl}/usuario/actualizar`;
    return this.http.post(url, body).pipe(
      tap( (res:any)=>{
        if(res.status){
          this.user = res.user;
        }
      })
    )
  }

  logout(){
    if(localStorage.getItem('access_token')){
      localStorage.removeItem('access_token');
    }
    this.sService.logged=false;
  }

  getToken(){
    return localStorage.getItem('access_token');
  }



}
