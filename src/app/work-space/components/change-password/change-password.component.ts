import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/services/auth.service';
import { WorkSpaceService } from '../../services/work-space.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  hide:boolean = true;
  equals:boolean =true;

  password = new FormControl('', [Validators.required, Validators.minLength(6),Validators.pattern(/(?=[A-Za-z\d#-_]*[a-z])(?=[A-Za-z\d#-_]*[A-Z])(?=[A-Za-z\d#-_]*[0-9])/)])
  newPassword = new FormControl('', [Validators.required, Validators.minLength(6),Validators.pattern(/(?=[A-Za-z\d#-_]*[a-z])(?=[A-Za-z\d#-_]*[A-Z])(?=[A-Za-z\d#-_]*[0-9])/)])
  new2Password = new FormControl('', [Validators.required, Validators.minLength(6),Validators.pattern(/(?=[A-Za-z\d#-_]*[a-z])(?=[A-Za-z\d#-_]*[A-Z])(?=[A-Za-z\d#-_]*[0-9])/)])

  constructor(private wService:WorkSpaceService, private auth: AuthService,
              private dialogRef: MatDialogRef<ChangePasswordComponent>) { }

  ngOnInit(): void {
  }


  campare_Password(){
    this.equals = (this.new2Password.dirty)? this.new2Password.value == this.newPassword.value:false;
  }


  save(){
    if( this.new2Password.invalid || this.newPassword.invalid || this.password.invalid ){
      return;
    }

    this.wService.change_password({password:this.password.value, newPassword:this.newPassword.value})
    .subscribe((res:any)=>{
      if(res){
        this.auth.alert('success', res.message, 1500);
        this.dialogRef.close()
      }else {
        this.auth.alert('error', res.message, 1500);
      }
    });
    
  }


}
