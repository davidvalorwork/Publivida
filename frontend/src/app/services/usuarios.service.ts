import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(public http:HttpClient) { }
  
  getUsuarios(): Observable<any>{
    return this.http.get(`${environment.URL_API}/usuarios/`);
  }
  getUsuario(id:string): Observable<any>{
    return this.http.get(`${environment.URL_API}/usuarios/${id}`);
  }

  update(id:string,user:any){
    console.log(id) 
    console.log(user)
    return this.http.post(`${environment.URL_API}/usuarios/${id}`, user);
  }
}
