import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(public http:HttpClient) { }

  generarLink(monto:any){
    return this.http.post(`${environment.URL_API}/pedidos/pago`,monto)
  }

  getId(id:string): Observable<any>{
    return this.http.get(`${environment.URL_API}/pedidos/${id}`)
  }

  getEstado(id:string){
    return this.http.get(`${environment.URL_API}/pedidos/estado/${id}`)
  }

  getByCondition(condition:any){
    return this.http.post(`${environment.URL_API}/pedidos/obtener`,condition)
  }

  crear(categoria:any): Observable<any>{
    return this.http.post(`${environment.URL_API}/pedidos/`,categoria)
  }

  delete(id:string):Observable<any>{
    return this.http.delete(`${environment.URL_API}/pedidos/${id}`)
  }
  
  editar(id:string,categoria:any):Observable<any>{
    return this.http.post(`${environment.URL_API}/pedidos/${id}`,categoria)
  }
}
