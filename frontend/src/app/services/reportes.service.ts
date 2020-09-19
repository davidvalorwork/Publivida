import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  constructor(public http:HttpClient) { }
  
  get(): Observable<any>{
    return this.http.get(`${environment.URL_API}/reportes/`);
  }

 
}
