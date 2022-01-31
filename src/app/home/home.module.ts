import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MainComponent } from './main/main.component';
import { TestComponent } from './test/test.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    LandingPageComponent,
    MainComponent,
    TestComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
