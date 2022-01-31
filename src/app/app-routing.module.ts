import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { ValidateGuard } from './auth/guards/validate.guard';

const routes: Routes = [
  {
    path:'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [ValidateGuard],
    canLoad:[ValidateGuard]
  },
  {
    path:'workSpace',
    loadChildren: () => import('./work-space/work-space.module').then(m => m.WorkSpaceModule),
    canActivate: [AuthGuard],
    canLoad:[AuthGuard]
  },
  {
    path:'',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
