import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {AuthService} from 'src/app/auth/services/auth.service';
import {WorkSpaceService} from '../../services/work-space.service';

@Component({
  selector: 'app-modal-save-code',
  templateUrl: './modal-save-code.component.html',
  styleUrls: ['./modal-save-code.component.scss']
})
export class ModalSaveCodeComponent implements OnInit {

  folders:any[]=[]
  nombre:string='';
  idCarpeta:string="";

  constructor(private wService: WorkSpaceService, 
             @Inject(MAT_DIALOG_DATA) public data: any, 
             private dialogRef: MatDialogRef<ModalSaveCodeComponent>,
             private auth: AuthService) { }

  ngOnInit(): void {
    this.getFolders();
  }
    
  getFolders(){
      this.wService.getFolders().subscribe((res:any)=>{
          if(res.status){
              this.folders = res.folders;
          }
      })
  }

  save(){
      const body = {...this.data.code, id:this.data.id, nombre:this.nombre, idCarpeta:this.idCarpeta}
      if(this.idCarpeta=="" && this.data.id==null){
          this.auth.alert("error", "Select a folder", 1500);
          return;
      }
      console.log(body)
      if(this.data.option==1){
          this.saveProyect(body);
      }else{
          this.saveSnippet(body);
      }
  }

  saveProyect(body:any){
      if(this.data.id){
          this.updateProyect(body)
      }else{
        this.wService.saveProyect(body).subscribe((res:any)=>{
          if(res.status){
              this.auth.alert("success", "Proyect save", 1500);
              this.dialogRef.close(res);
          }else{
              this.auth.alert("error", "Error on save proyect", 1500);
              this.close();
          }
        })
      }
      
  }

  updateProyect(body:any){
    this.wService.updateProyect(body).subscribe((res:any)=>{
        if(res.status){
            this.auth.alert("success", "Proyect updated", 1500);
            this.dialogRef.close(res);
        }else{
          this.auth.alert("error", "Error on update snippet", 1500);
          this.close();
        }
    })
  }

  saveSnippet(body:any){
      if(this.data.id){
          this.updateSnippet(body)
      }else{
        this.wService.saveSnippet(body).subscribe((res:any)=>{
            if(res.status){
              this.auth.alert("success", "Snippet save", 1500);
              this.dialogRef.close(res);
            }else{
              this.auth.alert("error", "Error on save snippet", 1500);
              this.close();
            }
        })  
      }
    
  }

  updateSnippet(body:any){
    this.wService.updateSnippet(body).subscribe((res:any)=>{
        if(res.status){
            this.auth.alert("success", "Snippet update", 1500);
            this.dialogRef.close(res);
        }else{
          this.auth.alert("error", "Error on save snippet", 1500);
          this.close();
        }
    })
  }

  close(){
    this.dialogRef.close({staus:false})
  }

}
