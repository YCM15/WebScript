import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.scss']
})
export class SingUpComponent implements OnInit {

  hide:boolean =true;

  plains:any = [
    {id:1,name:'Gratis'},
    {id:2, name:'Plus'},
    {id:3, name:'Pro'}
  ]

  nombre = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10), Validators.pattern(/^([a-zA-Z]+)*$/)])
  apellido = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10), Validators.pattern(/^([a-zA-Z]+)*$/)])
  mail = new FormControl('',[Validators.required,Validators.email, Validators.pattern(/^\w+([\.-_]?\w+)*@\w+([\.-_]?\w+)*(\.\w{2,4})+$/)])
  nickname = new FormControl('', [Validators.required, Validators.minLength(5),Validators.pattern(/^([a-zA-Z]+)([a-zA-Z\d]+)*$/)])
  password = new FormControl('', [Validators.required, Validators.minLength(6),Validators.pattern(/(?=[A-Za-z\d#-_]*[a-z])(?=[A-Za-z\d#-_]*[A-Z])(?=[A-Za-z\d#-_]*[0-9])/)])
  plan = new FormControl(1, [Validators.required,Validators.pattern(/[1-3]/)])

  public userSign = this.fb.group({
    nombre: this.nombre,
    apellido: this.apellido,
    nickname: this.nickname,
    password: this.password,
    plan: this.plan,
    mail: this.mail
  })

  constructor( private fb: FormBuilder, private auth: AuthService, private router: Router ) { }

  ngOnInit(): void {
  }

  save(){
    console.log(this.userSign.valid);
    
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
          } else{
            if(res.message){
              this.auth.alert('error', res.message, 2500);  
            }else{
              this.auth.alert('error', 'Error on register', 2500);
            }
          }
      });
    } else {
      this.auth.alert('error', 'Complete the fiels required', 1500);
    }
  }

}
