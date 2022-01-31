import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilesComponent } from './pages/files/files.component';
import { MainComponent } from './pages/main/main.component';
import { NewProyectComponent } from './pages/new-proyect/new-proyect.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SnippetsComponent } from './pages/snippets/snippets.component';

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
      { path:'snippets', component:SnippetsComponent },
      { path:'snippets/:id', component:SnippetsComponent },
      { path:'**', redirectTo: 'profile'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkSpaceRoutingModule { }
