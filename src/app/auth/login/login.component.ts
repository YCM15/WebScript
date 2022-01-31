import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public log:FormGroup = this.fb.group({
    nickname:['', [Validators.required, Validators.minLength(5),Validators.pattern('[a-zA-Z0-9 ]*')]],
    password:['', [Validators.required, Validators.minLength(3),Validators.pattern('[a-zA-Z0-9 ]*')]]
  })

  constructor( private fb: FormBuilder, 
    private auth : AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  logIn(){
    if(this.log.invalid){
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
