import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SnippetGuard} from '../auth/guards/snippet.guard';
import { StatisticGuard } from '../auth/guards/statistic.guard';
import { FilesComponent } from './pages/files/files.component';
import { MainComponent } from './pages/main/main.component';
import { NewProyectComponent } from './pages/new-proyect/new-proyect.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SnippetsComponent } from './pages/snippets/snippets.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';

const routes: Routes = [
  {
    path:'',
    component: MainComponent,
    children:[
      { path:'profile', component: ProfileComponent },
      { path:'editor', component: NewProyectComponent },
      { path:'editor/:id', component: NewProyectComponent },
      { path:'files', component: FilesComponent },
      { path:'files/:id', component: FilesComponent },
      { path:'snippets', component:SnippetsComponent, canActivate:[SnippetGuard] },
      { path:'snippets/:id', component:SnippetsComponent, canActivate:[SnippetGuard] },
      { path:'statistics', component:StatisticsComponent, canActivate:[StatisticGuard]},
      { path:'**', redirectTo: 'profile'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkSpaceRoutingModule { }
