import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }
  private islogged:boolean = false;
  private showEditor:boolean = false;

  set logged(logged:boolean){
    this.islogged = logged;
  }

  get logged(){
    return this.islogged;
  }

  set editor(editor:boolean){
    this.showEditor = editor;
  }

  get editor(){
    return this.showEditor;
  }

}
