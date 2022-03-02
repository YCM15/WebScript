import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ChangePasswordComponent } from '../../components/change-password/change-password.component';
import { WorkSpaceService } from '../../services/work-space.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  edit:boolean = false;
  plan:any='';

  nombre = new FormControl('Yunior', [Validators.required, Validators.minLength(5),Validators.pattern(/[a-zA-Z ]*/)])
  apellido = new FormControl('Cerrato', [Validators.required, Validators.minLength(5),Validators.pattern(/[a-zA-Z ]*/)])
  mail = new FormControl('yuniorcerrato@gmail.com',[Validators.required,Validators.email, Validators.pattern(/^\w+([\.-_]?\w+)*@\w+([\.-_]?\w+)*(\.\w{2,4})+$/)])
  nickname = new FormControl('YMC2022')

  public formProfile : FormGroup = this.fb.group({
    nombre: this.nombre,
    apellido: this.apellido,
    mail: this.mail,
    nickname: this.nickname
  })

  constructor(
    private dialog : MatDialog,
    private fb : FormBuilder,
    private auth: AuthService,
    private wService: WorkSpaceService
  ) { }

  ngOnInit(): void {
    this.formProfile.disable()
    this.setUserInfo();
  }

  setUserInfo(){
      this.plan = this.auth.user.plan;
      this.nombre.setValue( this.auth.user.nombre),
      this.apellido.setValue( this.auth.user.apellido),
      this.mail.setValue( this.auth.user.mail),
      this.nickname.setValue( this.auth.user.nickname)
  }

  editProfile(){
    if(this.edit){
      this.setUserInfo();
      this.edit = !this.edit;
      this.formProfile.disable();
      return;
    }
    this.edit = !this.edit;
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
    // console.log(this.formProfile.valid)
    if(this.formProfile.invalid){
      this.formProfile.markAllAsTouched();
      return;
    };
    const body:any ={...this.formProfile.value, plan: this.plan};
    this.auth.updateInfoUser(body).subscribe( (res:any) =>{
      if(res.status){
        this.auth.alert('success', 'Information udated', 1500)
        this.editProfile();
      }else{
        this.auth.alert('error', 'Error on update information', 1500);
      }
    })
    
  }

}
