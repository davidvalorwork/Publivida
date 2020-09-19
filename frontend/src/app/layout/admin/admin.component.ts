import {
  Component,
} from '@angular/core';
import {UsuarioService} from '../../services/usuarios.service'
import {environment} from '../../../environments/environment'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls:['./admin.component.css']
})
export class AdminComponent {
  url_usuario_img:string = '';
  nombre_usuario:string;
  url_api:string = `${environment.URL_API}/`
  email:string;
  constructor(
    public usuarioService: UsuarioService,
  ) {
   this.usuarioService.getUsuario(localStorage.getItem('id_usuarios')).subscribe((response:any)=>{
     console.log(response.payload)
     response.payload.url_img ===null?null:this.url_usuario_img = response.payload.url_img
     console.log(this.url_usuario_img)
     this.email = response.payload.usuario
   })
  }
  logout(){
    localStorage.clear()
  }
}
