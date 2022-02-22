import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WorkSpaceService } from '../../services/work-space.service';

@Component({
  selector: 'app-modal-new-proyect',
  templateUrl: './modal-new-proyect.component.html',
  styleUrls: ['./modal-new-proyect.component.scss']
})
export class ModalNewProyectComponent implements OnInit {

  idFolder:string = ''

  nameProyect:string='';

  constructor( private dialogRef: MatDialogRef<ModalNewProyectComponent>,
    private wServices: WorkSpaceService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data);
      
      if(data != undefined || data !==null){
        this.idFolder = data;
      }
    }

  ngOnInit(): void {
  }

  save(){

    const body:any ={
      nombre: this.nameProyect,
      html:'',
      css:'',
      js:'',
      idCarpeta:this.idFolder
    }
    
    this.wServices.saveProyect(body)
    .subscribe((res:any)=>{
      
      if(res.status){
        this.dialogRef.close(true);
      }else{
        this.dialogRef.close(false);
      }
    }, err => { this.dialogRef.close({status:false});})
  }


}
