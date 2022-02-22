import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WorkSpaceService } from '../../services/work-space.service';

@Component({
  selector: 'app-new-folder',
  templateUrl: './new-folder.component.html',
  styleUrls: ['./new-folder.component.scss']
})
export class NewFolderComponent implements OnInit {

  idFolder:string = ''

  nameFolder:string='';

  constructor( private dialogRef: MatDialogRef<NewFolderComponent>,
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
    
    this.wServices.createFolder(this.nameFolder, this.idFolder)
    .subscribe((res:any)=>{
      console.log(res);
      
      if(res.status){
        this.dialogRef.close({status:true, folder:res.folder});
      }else{
        this.close();
      }
    }, err => { this.close();})
  }

  close(){
    this.dialogRef.close({status:false})
  }

}
