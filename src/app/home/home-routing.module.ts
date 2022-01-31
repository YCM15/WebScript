import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MainComponent } from './main/main.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  {
    path:'',
    component: MainComponent,
    children:[
      { path:'home', component: LandingPageComponent },
      { path:'test', component: TestComponent },
      { path: '**', redirectTo: 'home' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
