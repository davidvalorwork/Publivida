import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TamanoService {

  constructor(public http:HttpClient) { }
  
  get(): Observable<any>{
    return this.http.get(`${environment.URL_API}/tamanos/`);
  }

  getId(id:string): Observable<any>{
    return this.http.get(`${environment.URL_API}/tamanos/${id}`)
  }

  getByCondition(condition:any): Observable<any>{
    return this.http.post(`${environment.URL_API}/tamanos/condition`,condition)
  }

  create(categoria:any): Observable<any>{
    return this.http.post(`${environment.URL_API}/tamanos/`,categoria)
  }

  delete(id:string):Observable<any>{
    return this.http.delete(`${environment.URL_API}/tamanos/${id}`)
  }
  
  editar(id:string,categoria:any):Observable<any>{
    return this.http.post(`${environment.URL_API}/tamanos/${id}`,categoria)
  }
}
