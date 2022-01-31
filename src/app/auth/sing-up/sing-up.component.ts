import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.scss']
})
export class SingUpComponent implements OnInit {

  inputPass:string = 'password';

  plains:any = [
    {id:1,name:'Gratis'},
    {id:2, name:'Plus'},
    {id:3, name:'Pro'}
  ]

  public userSign = this.fb.group({
    nombre:['', [Validators.required, Validators.minLength(3),Validators.pattern('[a-zA-Z ]*')]],
    apellido:['', [Validators.required, Validators.minLength(3),Validators.pattern('[a-zA-Z ]*')]],
    nickname:['', [Validators.required, Validators.minLength(5),Validators.pattern('[a-zA-Z1-9 ]*')]],
    password:['', [Validators.required, Validators.minLength(6),Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,10}')]],
    plan:[1, [Validators.required,Validators.pattern('[1-9]')]],
    mail:['',[Validators.required,Validators.email, Validators.pattern("[a-z0-9_\.-]+@[\da-z\.-]+\.([a-z\.]{2,6})$")]]
  })

  constructor( private fb: FormBuilder, private auth: AuthService, private router: Router ) { }

  ngOnInit(): void {
  }

  save(){
    console.log(this.userSign);
    
    if(this.userSign.valid){
      this.auth.signup(this.userSign.value).subscribe((res:any) => {
          if(res.status){
              Swal.fire({
                  icon: 'success',
                  title: `Welcome ${res.user.nombre} to WebScript!`,
                  showConfirmButton: false,
                  timer: 1500
              })
              this.router.navigateByUrl('/workSpace')
          }
      });
    } else {
      this.auth.alert('error', 'Complete the fiels required', 1500);
    }
  }

  showPassword(check:boolean){
    this.inputPass = check? 'text':'password';
  }
}
