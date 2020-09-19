import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { SnackBar} from '../../../services/snackbar.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-cambio-contrasena',
  templateUrl: './cambio-contrasena.component.html',
  styleUrls: ['./cambio-contrasena.component.css']
})
export class CambioContrasenaComponent implements OnInit {
  claveInvalida:boolean=false;
  token:string;
  id_usuarios:number;
  submit:boolean=false;
  // FORMULARIO DE CORREO
  form:FormGroup = this.fb.group({
    clave:['',[Validators.required, Validators.min(8)]],
    rclave:['',[Validators.required, Validators.min(8)]]
  });

  constructor(
    private fb: FormBuilder,
    private route:ActivatedRoute,
    private loadingBar: LoadingBarService,
    private auth: AuthService,
    private snackBar: SnackBar,
    private router: Router
  ) {
    this.token = this.route.snapshot.params['id'];
    this.loadingBar.start()
    this.auth.verifica_token({token:this.token}).subscribe((response)=>{
      console.log(response)
      this.loadingBar.complete()
      this.id_usuarios=response.payload.id_usuarios
    },
    err=>{
      console.log(err)
      this.loadingBar.complete()
      this.snackBar.err("Token vencido","")
      this.router.navigate(['../'])
    });
  }

  ngOnInit(): void {
  }

  verificarClaves(form:any){
    form.clave !== form.rclave ? this.claveInvalida=true : this.cambiarClave(form.clave)
  }

  cambiarClave(clave:string){
    console.log(clave)
    const nuevaContra = {
      id_usuarios: this.id_usuarios,
      clave
    }
    this.loadingBar.start()
    this.auth.cambia_contra(nuevaContra).subscribe((response)=>{
      console.log(response)
      this.loadingBar.complete()
      this.snackBar.success("Clave cambiada con éxito.","")
      this.router.navigate(['../'])
    }
    ,err=>{
      console.log(err)
      this.loadingBar.complete()
    })
  }

}
