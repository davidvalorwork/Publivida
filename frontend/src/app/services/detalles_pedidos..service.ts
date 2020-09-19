import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetallesPedidosService {
  id_detalles_pedidos:number;

  constructor(public http:HttpClient) { }

  getId(id:string): Observable<any>{
    return this.http.get(`${environment.URL_API}/detalle-pedido/${id}`)
  }

  getByCondition(condition:any){
    return this.http.post(`${environment.URL_API}/detalle-pedido/condition`,condition)
  }

  crear(categoria:any): Observable<any>{
    return this.http.post(`${environment.URL_API}/detalle-pedido/`,categoria)
  }

  delete(id:string):Observable<any>{
    return this.http.delete(`${environment.URL_API}/detalle-pedido/${id}`)
  }
  
  editar(id:string,categoria:any):Observable<any>{
    return this.http.post(`${environment.URL_API}/detalle-pedido/${id}`,categoria)
  }
}
