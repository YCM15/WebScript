import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AceEditorModule } from 'ng2-ace-editor';

import { HeaderComponent } from './components/header/header.component';
import { ButtonsUnlogedComponent } from './components/buttons-unloged/buttons-unloged.component';
import { ButtonsLoggedComponent } from './components/buttons-logged/buttons-logged.component';
import { RouterModule } from '@angular/router';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { EditorComponent } from './components/editor/editor.component';
import { ButtonsEditorComponent } from './components/buttons-editor/buttons-editor.component';
import { MaterialModule } from '../material/material.module';

import 'brace';

//MODES
import 'brace/mode/assembly_x86';
import 'brace/mode/c_cpp';
import 'brace/mode/cobol';
import 'brace/mode/css';
import 'brace/mode/django';
import 'brace/mode/fortran';
import 'brace/mode/html';
import 'brace/mode/java';
import 'brace/mode/javascript';
import 'brace/mode/json';
import 'brace/mode/jsp';
import 'brace/mode/jsx';
import 'brace/mode/matlab';
import 'brace/mode/perl';
import 'brace/mode/php';
import 'brace/mode/plain_text';
import 'brace/mode/powershell';
import 'brace/mode/python';
import 'brace/mode/r';
import 'brace/mode/ruby';
import 'brace/mode/sh';
import 'brace/mode/sql';
import 'brace/mode/typescript';
import 'brace/mode/xml';
import 'brace/theme/github';

@NgModule({
  declarations: [
    HeaderComponent,
    ButtonsUnlogedComponent,
    ButtonsLoggedComponent,
    SpinnerComponent,
    EditorComponent,
    ButtonsEditorComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    AceEditorModule,
    MaterialModule
  ],
  exports : [
    HeaderComponent,
    ButtonsUnlogedComponent,
    ButtonsLoggedComponent,
    EditorComponent,
    SpinnerComponent
  ]
})
export class SharedModule { }
