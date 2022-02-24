import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyects } from '../../interfaces/workspace.interface';
import { WorkSpaceService } from '../../services/work-space.service';
import { MatDialog } from '@angular/material/dialog';
import { NewFolderComponent } from '../../components/new-folder/new-folder.component';
import { AuthService } from 'src/app/auth/services/auth.service';
import Swal from 'sweetalert2'
import { ModalNewProyectComponent } from '../../components/modal-new-proyect/modal-new-proyect.component';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {

  proyects: Proyects[]=[];
  snippets:any[]=[];
  folders:any[] = [];
  proyectsCo: any[]=[];
  foldersCo:any[] = [];
  idUrl :string|null = null; 
  idUrlExist :boolean=false; 
  nameFolder:string = '';
  colaborador:boolean = false;

  constructor(private wService: WorkSpaceService,
              private activateRouter: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog, 
              private auth: AuthService) { }

  ngOnInit(): void {

    this.activateRouter.params.subscribe(({id})=>{
      if(id){
        console.log(id);
        this.idUrl = id;
        this.idUrlExist = true
      }else{
        this.idUrl = null;
      }
      this.getFiles();
    })

  }

  getProyects(){
    this.wService.getProyects().subscribe((res:any) => {
      if(res.status){
        this.proyects = res.proyectos;
      }
    })
  }

  openFolder(id:string){
    this.router.navigateByUrl('/workSpace/files/'+id);
  }

  getFiles(){
    this.proyects = [];
    this.snippets = [];
    this.folders = [];
    this.wService.getFolderContent(this.idUrl).subscribe((res:any)=>{
      console.log(res);
      
      if(res.status){
        let folder = res.folder;
        this.idUrl = res.folder._id
        if(this.auth.user._id == folder.creador){
          this.colaborador = false;
          this.getFilesColaboration();
        }else{
          this.colaborador = true;
        }
        
        this.nameFolder = folder.nombre;
        // console.log(folder);
        
        folder.proyectos.forEach( (p:any) => {
          this.proyects.push(p);
        })
        if(!this.colaborador){
          folder.Snippets.forEach( (s:any) => {
            this.snippets.push(s);
          })
        }

        folder.carpetas.forEach( (f:any) => {
          this.folders.push(f);
        })
      }
      
    })
  }

  newFolder(){
    if(this.colaborador){
      Swal.fire({
        icon: 'info',
        title: 'Warning',
        text: "You can't create a folder as a collaborator",
      });
      return;
    }
    const dialogRef = this.dialog.open(NewFolderComponent,{
      data:this.idUrl
    });
    dialogRef.afterClosed().subscribe((res:any) => {
      if(res==undefined){
        return;
      }
      if(res.status){          
          this.auth.alert('success',`Folder ${res.folder.nombre} created`, 1500);
          this.getFiles();
      }else{
        this.auth.alert('error', 'Error on create folder', 1500);
      }
    })
  }

  getFilesColaboration(){
    this.foldersCo=[];
    this.proyectsCo=[];
    this.wService.getFilesColaborations().subscribe((res:any)=>{
      if(res.status){
        res.carpetas.forEach( (f:any) => {
          this.foldersCo.push(f);
        })

        res.proyectos.forEach( (p:any) => {
          this.proyectsCo.push(p);
        })
      } 
    })
  }

  goBack(){
    history.back();
  }

  deleteItem(id:any, option:number){
    
    Swal.fire({
      title: 'Do you want delete this item?',
      showCancelButton: true,
      confirmButtonText: 'Save',
    }).then((result) => {
      if (result.isConfirmed) {
        let route:string = '';
        let body:any;
        switch (option) {
          case 1:
            route = 'carpetas';
            body = {idCarpeta:id}
            break;

          case 2:
              route = 'proyectos';
              body = {idProyecto:id}
              break;

          case 3:
            route = 'snippets';
            body = {idSnippet:id}
            break;
          default:
            break;
        }
        
        this.wService.deleteItem(body, route).subscribe( (res:any) =>{
          if(res.status){
            this.getFiles();
            Swal.fire('Success', 'Item deleted', 'success')
          }
          
        } )
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  newProyect(){
    const dialogRef = this.dialog.open(ModalNewProyectComponent,{
      data:this.idUrl
    });
    dialogRef.afterClosed().subscribe((res:any) => {
      if(res==undefined){
        return;
      }
      if(res){          
          this.auth.alert('success',`Proyect created`, 1500);
          this.getFiles();
      }else{
        this.auth.alert('error', 'Error on create folder', 1500);
      }
    })
  }

}
