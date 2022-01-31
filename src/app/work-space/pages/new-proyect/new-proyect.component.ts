import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkSpaceService } from '../../services/work-space.service';

@Component({
  selector: 'app-new-proyect',
  templateUrl: './new-proyect.component.html',
  styleUrls: ['./new-proyect.component.scss']
})
export class NewProyectComponent implements OnInit {

  textJs:string = `let saludo="Hola mundo"`;
  textCss:string = '#div1{color:rgb(175,12,208);}';
  textHtml: string = '<div id="div1">Hola Mundo</div>';

  constructor(private activateRouter: ActivatedRoute,
              private wService : WorkSpaceService ) { }

  ngOnInit(): void {
    this.activateRouter.params.subscribe(({id})=>{
      if(id){
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
    console.log(event);
    
  }

}
