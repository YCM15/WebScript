import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SingUpComponent } from './sing-up/sing-up.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: '',
    component:MainComponent,
    children:[
      { path:"login", component: LoginComponent },
      { path:'singup',component:SingUpComponent },
      {path:'**', redirectTo:'login'}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
