import {Injectable} from '@angular/core'
import { HttpClient } from  '@angular/common/http';  
import { map } from  'rxjs/operators';
import {environment} from '../../environments/environment'

@Injectable({  
    providedIn: 'root'  
  })  
  export class UploadService { 
    SERVER_URL: string = `${environment.URL_API}/productos/upload/product-img`;  
    constructor(private http: HttpClient) { }
    public upload(formData:any) {
        // return this.httpClient.post<any>(this.SERVER_URL, formData);  
        return this.http.post(this.SERVER_URL,formData)
    }
}