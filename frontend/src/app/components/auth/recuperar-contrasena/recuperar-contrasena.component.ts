import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { SnackBar} from '../../../services/snackbar.service'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.component.html',
  styleUrls: ['./recuperar-contrasena.component.css']
})
export class RecuperarContrasenaComponent implements OnInit {
  submit:boolean=false;
  link:string;
  // FORMULARIO DE CORREO
  form:FormGroup = this.fb.group({
    correo:['',[Validators.email, Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private loadingBar: LoadingBarService,
    private auth: AuthService,
    private snackBar: SnackBar,
  ) { }

  ngOnInit(): void {
  }

  verificarCorreo(form:any){
    this.enviarCorreo(form.correo);
  }

  enviarCorreo(correo:string){
    this.submit=true;
    this.loadingBar.start();
    this.auth.recuperar_contra({correo}).subscribe((response)=>{
      console.log(response)
      this.loadingBar.complete();
      this.submit = false;
      this.link = `${environment.URL_FRONT}/cambio-contrasena/${response.payload}`
    },
    err=>{
      console.log(err)
      this.loadingBar.complete();
      this.submit = false;
      this.snackBar.err("Correo Invalido","")
    });
  }

}
