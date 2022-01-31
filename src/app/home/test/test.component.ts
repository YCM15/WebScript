import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  textJs:string = `(()=>{ console.log("hola mundo"); })()`;
  textCss:string = '#div1{color:rgba(175,12,208,1);}';
  textHtml: string = '<div id="div1">Hola Mundo</div>';

  constructor() { }

  ngOnInit(): void {
  }

  saveProyect(event:any){
    console.log(event);
    
  }

}
