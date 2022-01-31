import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ChangePasswordComponent } from '../../components/change-password/change-password.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  edit:boolean = false;

  public formProfile : FormGroup = this.fb.group({
    nombre: ['Yunior'],
    apellido: ['Cerrato'],
    mail: ['yuniorcerrato@gmail.com'],
    nickname: ['YMC2022']
  })

  constructor(
    private dialog : MatDialog,
    private fb : FormBuilder,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.formProfile.disable()
    this.setUserInfo();
  }

  setUserInfo(){
    this.formProfile.setValue({
      nombre: this.auth.user.nombre,
      apellido: this.auth.user.apellido,
      mail: this.auth.user.mail,
      nickname: this.auth.user.nickname
    })
  }

  editProfile(){
    this.edit = true;
    this.formProfile.enable();
    this.formProfile.get('nickname')?.disable();
  }

  changePass(){
    const dialogRef = this.dialog.open( ChangePasswordComponent)
    dialogRef.afterClosed().subscribe(res => {
      console.log('Cerrado');
    })
  }

  saveChange(){
    console.log(this.formProfile.value);
  }

}
