import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { WorkSpaceService } from '../../../work-space/services/work-space.service';
import { AuthService } from '../../../auth/services/auth.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  nombreArchivo:string = 'Nuevo Proyecto';
  fileHTML:string ='';
  page:any;
  @Input() showSnippet:boolean = false;
  @Input() textSnippet: any = '';
  @Input() textJS:any = '';
  @Input() textCSS:any = '';
  @Input() textHTML:any = '';
  @Input() mode:any = 'javascript';
  @Output('save') save : EventEmitter<any> = new EventEmitter();

  constructor(
    private sanitizer: DomSanitizer,
    private wService : WorkSpaceService,
    private auth: AuthService,
    private sService: SharedService
  ) { 
    sService.editor = true;
    this.wService.emiter.subscribe(e => {
      console.log(e);
      switch (e) {
        case 'run':
          this.codeHTML();
          break;
        case 'save':
            if(this.showSnippet){
            this.save.emit({codigo:this.textSnippet});
          }else{
            this.save.emit({
              html:this.textHTML,
              css:this.textCSS,
              js:this.textJS
            });
          }
          break;
        default:
          this.codeHTML();
          break;
      }
    })
  }

  ngOnInit(): void {
    if(!this.showSnippet){
      this.codeHTML();
    }
  }

  codeHTML(){
    if(this.showSnippet){
      this.auth.alert('error', 'Snippet cannot be exec', 1500);
      return
    }
    let pagina = `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${this.nombreArchivo}</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        <style>
        ${this.textCSS}
        </style>
    </head>
    <body>
        ${this.textHTML}
        <script type="text/javascript">
        ${this.textJS}
        </script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    </body>
    </html>`;

    this.fileHTML = pagina;
    this.page = this.sanitizer.bypassSecurityTrustHtml(pagina);
  }

  get paginahtml(){
    return this.page;
  }

  ngOnDestroy(): void {
    this.sService.editor = false;
  }
}
