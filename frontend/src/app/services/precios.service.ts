import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreciosService {
  id_productos:number;
  constructor(public http:HttpClient) { }

  getByProductID(condition:any): Observable<any>{
    return this.http.post(`${environment.URL_API}/precios/condition`,condition)
  }

  getID(id:string){
    return this.http.get(`${environment.URL_API}/precios/${id}`);
  }

  create(precio:any): Observable<any>{
    return this.http.post(`${environment.URL_API}/precios/`,precio)
  }

  delete(id:string):Observable<any>{
    return this.http.delete(`${environment.URL_API}/precios/${id}`)
  }
  
  editar(id:string,categoria:any):Observable<any>{
    return this.http.post(`${environment.URL_API}/precios/${id}`,categoria)
  }
}
