import { Component, OnInit } from '@angular/core';
import { WorkSpaceService } from 'src/app/work-space/services/work-space.service';

@Component({
  selector: 'app-buttons-editor',
  templateUrl: './buttons-editor.component.html',
  styleUrls: ['./buttons-editor.component.scss']
})
export class ButtonsEditorComponent implements OnInit {

  constructor(private wService :  WorkSpaceService) { }

  ngOnInit(): void {
  }

  run(event:string){
    this.wService.eventEmiter(event);
  }
}
