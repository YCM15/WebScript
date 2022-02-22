import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkSpaceService } from '../../services/work-space.service';
import { MatDialog } from '@angular/material/dialog';
import {ModalSaveCodeComponent} from '../../components/modal-save-code/modal-save-code.component';

@Component({
  selector: 'app-new-proyect',
  templateUrl: './new-proyect.component.html',
  styleUrls: ['./new-proyect.component.scss']
})
export class NewProyectComponent implements OnInit {
  idUrl:any=null;
  textJs:string = `let saludo="Hola mundo"`;
  textCss:string = '#div1{color:rgb(175,12,208);}';
  textHtml: string = '<div id="div1">Hola Mundo</div>';

  constructor(private activateRouter: ActivatedRoute,
              private wService : WorkSpaceService,
             private dialog: MatDialog,
             private router:Router) { }

  ngOnInit(): void {
    this.activateRouter.params.subscribe(({id})=>{
      if(id){
          this.idUrl = id;
        this.wService.getProyectById(id).subscribe((res:any) => {
          if(res.status){
            this.textHtml = res.proyecto.html
            this.textCss = res.proyecto.css
            this.textJs = res.proyecto.js
          }
        })
      }
    })
  }

  saveProyect(event:any){
    const dialogRef = this.dialog.open(ModalSaveCodeComponent, {
          data:{code:event, id:this.idUrl, option:1}
      });

      dialogRef.afterClosed().subscribe((res:any)=>{
        if(!res){
          return;
        }
        if(res.status){
          this.router.navigateByUrl(`/workSpace/editor/${res.proyect}`)
        }
      })
  }
}
