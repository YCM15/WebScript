import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkSpaceService {

  baseUrl:string = environment.baseUrl

  emiter = new EventEmitter();

  constructor( private http: HttpClient) { }

  eventEmiter(event:string){
    this.emiter.emit(event);
  }

  getProyects(){
    const url = `${this.baseUrl}/proyectos/creador`;
    return this.http.get(url);
  }

  getProyectById(idProyecto:string){
    const url = `${this.baseUrl}/proyecto`;
    return this.http.post(url, {idProyecto});
  }
  getSnippetById(idSnippet:string){
    const url = `${this.baseUrl}/snippets`;
    return this.http.post(url, {idSnippet});
  }

  getFolderContent(folder:string|null){
    const url = `${this.baseUrl}/carpetas/contenido`;
    let object = (folder!=null)? {idCarpeta:folder}:{};
    return this.http.post(url, object);
  }

  getFolders(){
    const url = `${this.baseUrl}/carpetas`;
    return this.http.get(url);
  }

  createFolder(carpeta:string, idCarpeta:string){
    const url = `${this.baseUrl}/carpetas/crear`;
    return this.http.post(url,{carpeta, idCarpeta})
  }

  getFilesColaborations(){
    const url = `${this.baseUrl}/carpetas/colaborador`;
    return this.http.get(url)
  }

  saveProyect(body:any){
      const url = `${this.baseUrl}/proyectos/guardar`;
      return this.http.post(url, body);
  }

  updateProyect(body:any){
      const url = `${this.baseUrl}/proyectos/actualizar`;
      return this.http.post(url, body);
  }

  saveSnippet(body:any){
      const url = `${this.baseUrl}/snippets/guardar`;
      return this.http.post(url, body);
  }

  updateSnippet(body:any){
      const url = `${this.baseUrl}/snippets/actualizar`;
      return this.http.post(url, body);
  }

  deleteItem(body:any, option:string){
    const url = `${this.baseUrl}/${option}/borrar`;
    return this.http.post(url, body);
  }

}
