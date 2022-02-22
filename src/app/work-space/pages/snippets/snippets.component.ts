import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {ModalSaveCodeComponent} from '../../components/modal-save-code/modal-save-code.component';
import { WorkSpaceService } from '../../services/work-space.service';

@Component({
  selector: 'app-snippets',
  templateUrl: './snippets.component.html',
  styleUrls: ['./snippets.component.scss']
})
export class SnippetsComponent implements OnInit {

  lang: string = 'javascript';
  textSnippet:string = 'New Snippet';
  nameSnippet:string = 'New Snippet';
  idUrl:any=null;

  languages = [
    {mode:"assembly_x86", language:"ENSAMBLADOR"},
    {mode:"c_cpp", language:"C++"},
    {mode:"cobol", language:"COBOL"},
    {mode:"css", language:"CSS"},
    {mode:"django", language:"DJANGO"},
    {mode:"fortran", language:"FORTRAN"},
    {mode:"fsharp", language:"C#"},
    {mode:"html", language:"HTML"},
    {mode:"java", language:"JAVA"},
    {mode:"javascript", language:"JAVASCRIPT"},
    {mode:"json", language:"JSON"},
    {mode:"jsp", language:"JSP"},
    {mode:"jsx", language:"JSX"},
    {mode:"matlab", language:"MATLAB"},
    {mode:"objetivec", language:"OBJETIVE C"},
    {mode:"perl", language:"PERL"},
    {mode:"php", language:"PHP"},
    {mode:"plain_text", language:"TEXTO"},
    {mode:"powershell", language:"POWERSHELL"},
    {mode:"python", language:"PYTHON"},
    {mode:"r", language:"R"},
    {mode:"ruby", language:"RUBY"},
    {mode:"sh", language:"BASH SH"},
    {mode:"sql", language:"SQL"},
    {mode:"typescript", language:"TYPESCRIPT"},
    {mode:"xml", language:"XML" }
  ];

  constructor( private activateRouter: ActivatedRoute,
              private wService: WorkSpaceService,
             private dialog: MatDialog,
             private router:Router) { }

  ngOnInit(): void {
    this.activateRouter.params.subscribe(({id})=>{
      if(id){
        this.wService.getSnippetById(id).subscribe((res:any) => {
          if(res.status){
            this.lang = res.snippet.lenguaje;
            this.nameSnippet = res.snippet.nombre;
            this.textSnippet = res.snippet.codigo;
          }
        })
      }
    })
  }

  save(event:any){
    const dialogRef = this.dialog.open(ModalSaveCodeComponent, {
        data:{code:{
            ...event,
            lenguaje:this.lang,
        }, id:this.idUrl, option:2}
      });

      dialogRef.afterClosed().subscribe((res:any)=>{
        if(!res){
          return;
        }
        if(res.status){
          this.router.navigateByUrl(`/workSpace/snippets/${res.snippet}`)
        }
      })
  }

}
