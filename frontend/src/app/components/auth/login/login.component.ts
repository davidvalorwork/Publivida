import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { AuthService } from '../../../services/auth.service'
import { SnackBar} from '../../../services/snackbar.service'
import {Router} from '@angular/router'
import{UsuarioService} from '../../../services/usuarios.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submit:boolean=false;
  hide:boolean = true;
  // LOGIN  FORM
  loginForm:FormGroup = this.fb.group({
    usuario:['', Validators.required],
    clave:['', Validators.required],
  })

  constructor(
    private fb: FormBuilder,
    private loadingBar: LoadingBarService,
    private authService: AuthService,
    private snackBar: SnackBar,
    private router:Router,
    private usuariosService:UsuarioService,
  ) { }

  ngOnInit(): void {
  }

  // CONTROLADOR DE LOGIN
  login(form:any){
    this.submit=true;
    this.loadingBar.start();
    this.authService.login(form).subscribe((response)=>{
      console.log(response)
      this.loadingBar.complete();
      this.submit = false;
      if(response.message === "OK"){
        console.log(response)
        localStorage.setItem("token",response.payload.token);
        localStorage.setItem("id_usuarios",response.payload.id_usuario)
        this.usuariosService.getUsuario(response.payload.id_usuario).subscribe((response:any)=>{
          this.snackBar.success(`Bienvenido ${response.payload.tipo_usuario ===3?`Administrador`:''} ${response.payload.usuario}`,"x")
        })
        if(response.payload.tipo_usuario ===3){
          this.router.navigate(['/admin'])
        }else this.router.navigate(['../'])
      }
    },
    (err)=>{
      console.log(err)
      err.error.status === 500?this.snackBar.err("Credenciales Invalidas",""):null;
      this.submit=false;
      this.loadingBar.complete();
    });
  
  }

}
