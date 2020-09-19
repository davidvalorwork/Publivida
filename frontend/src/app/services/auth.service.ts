import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http:HttpClient) { }
  
  crearUsuario(usuario:any): Observable<any>{
    return this.http.post(`${environment.URL_API}/auth/registro`,usuario)
  }

  login(credenciales:any): Observable<any>{
    return this.http.post(`${environment.URL_API}/auth/login`,credenciales)
  }

  recuperar_contra(correo:any): Observable<any>{
    return this.http.post(`${environment.URL_API}/auth/recupera_contra`,correo)
  }

  verifica_token(token:any): Observable<any>{
    return this.http.post(`${environment.URL_API}/auth/verifica_token`,token)
  }

  cambia_contra(nuevaContra:any): Observable<any>{
    return this.http.post(`${environment.URL_API}/auth/cambia_contra`,nuevaContra)
  }
}
