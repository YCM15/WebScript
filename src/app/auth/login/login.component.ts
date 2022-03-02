import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  nickname = new FormControl('', [Validators.required, Validators.minLength(5),Validators.pattern(/[\w\d]{5,10}/)])
  password = new FormControl('', [Validators.required])//, Validators.minLength(6),Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$#-_!%*?&])[A-Za-z\d$@$#-_!%*?&].{6,10}/)])

  public log:FormGroup = this.fb.group({
    nickname:this.nickname,
    password: this.password
  })

  constructor( private fb: FormBuilder, 
    private auth : AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  logIn(){
    if(this.log.invalid){
      console.log( this.log)
      this.auth.alert('error', 'Complete the Fields required', 1500)
      return;
    }
    this.auth.login(this.log.value).subscribe(res => {
      console.log(res)
      if(res.status){
        Swal.fire({
          icon: 'success',
          title: `Welcome ${res.user.nombre} to WebScript!`,
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigateByUrl('/workSpace')
      }
    })
  }

}
