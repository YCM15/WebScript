import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AceEditorModule } from 'ng2-ace-editor';

import { WorkSpaceRoutingModule } from './work-space-routing.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { SnippetsComponent } from './pages/snippets/snippets.component';
import { FilesComponent } from './pages/files/files.component';
import { ModalSaveCodeComponent } from './components/modal-save-code/modal-save-code.component';
import { MainComponent } from './pages/main/main.component';
import { MaterialModule } from '../material/material.module';

import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { SharedModule } from '../shared/shared.module';
import { NewProyectComponent } from './pages/new-proyect/new-proyect.component';

import 'brace';
// import 'brace/mode/text';
import 'brace/mode/html';
import 'brace/mode/javascript';
import 'brace/mode/css';
import 'brace/theme/github';
import { NewFolderComponent } from './components/new-folder/new-folder.component';

@NgModule({
  declarations: [
    ProfileComponent,
    SnippetsComponent,
    FilesComponent,
    ModalSaveCodeComponent,
    MainComponent,
    ChangePasswordComponent,
    NewProyectComponent,
    NewFolderComponent
  ],
  imports: [
    CommonModule,
    WorkSpaceRoutingModule,
    RouterModule,
    AceEditorModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule
  ]
})
export class WorkSpaceModule { }
