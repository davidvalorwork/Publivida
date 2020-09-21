import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service'
import { SnackBar} from '../../../services/snackbar.service'
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  submit:boolean=false;
  usuarioClaveInvalida:boolean=false;
  empresaClaveInvalida:boolean=false;
  empresa:boolean=false
  hide:boolean=true
  TipoRegistro:number;
  form:FormGroup = this.fb.group({
    usuario: ['',[Validators.required]],
    correo:['',[ Validators.required, Validators.email]],
    rut: ['',[Validators.required]],
    clave:['', [Validators.required, Validators.minLength(8)]],
    rclave:['',Validators.required],
    nombres:[''],
    apellidos:[''],
    telefono:['',[Validators.required,Validators.pattern(/^[+]{1}-?(0|[1-9]\d*)?$/)]],

    razon_social:[''],
    giro: [''],
    nombre_fantasia: [''],
    tipo_usuario:[1],
    borrado:[0],
  })
  // FORMULARIO PARA USUARIOS
  // form:FormGroup = this.fb.group({
  //   usuario: ['',[Validators.required]],
  //   clave: ['',[Validators.required]],
  //   rclave: ['',[Validators.required]],
  //   nombres: ['',[Validators.required]],
  //   apellidos: ['',[Validators.required]],
  //   rut: ['',[Validators.required]],
  //   telefono: ['',[Validators.required]],
  //   correo: ['',[Validators.required,Validators.email]],
  //   tipo_usuario:[1],
  //   borrado:[0],
  // });
  // // FORMULARIO PARA EMPRESAS
  // empresasForm:FormGroup = this.fb.group({
  //   usuario: ['',[Validators.required]],
  //   clave: ['',[Validators.required]],
  //   rclave: ['',[Validators.required]],
  //   rut: ['',[Validators.required]],
  //   telefono: ['',[Validators.required]],
  //   correo: ['',[Validators.required,Validators.email]],
  //   razon_social: ['',[Validators.required]],
  //   giro: ['',[Validators.required]],
  //   nombre_fantasia: ['',[Validators.required]],
  //   tipo_usuario:[2],
  //   borrado:[0],
  // });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: SnackBar,
    private loadingBar: LoadingBarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form.controls.nombres.setValidators([Validators.required, Validators.pattern('^[a-zA-Z ]*$')])
    this.form.controls.apellidos.setValidators([Validators.required, Validators.pattern('^[a-zA-Z ]*$')])
  }

  // CONTROLADOR USUARIO
  registrarUsuario(form:any){
    form.clave !== form.rclave ? this.snackBar.err("Las contrasenas no coinciden.","x"):this.registrar(form);
  }

  country(pais:any){
    console.log(pais)
  }

  phoneInput(e){
    const input = this.form.value.telefono
    if(input[0] !== "+")
    this.form.controls.telefono.setValue(`+${input}`)
  }

  empresaToggle(){
    console.log(this.form.value)
    console.log(this.form.status)
    this.empresa = !this.empresa
    if(this.empresa){
      this.form.controls.tipo_usuario.setValue(2)
      this.form.controls.nombre.setValidators([])
      this.form.controls.apellido.setValidators([])
      this.form.controls.giro.setValidators([Validators.required])
      this.form.controls.razon_social.setValidators([Validators.required, Validators.pattern('^[a-zA-Z ]*$')])
      this.form.controls.nombre_fantasia.setValidators([Validators.required, Validators.pattern('^[a-zA-Z ]*$')])
      this.form.controls.nombre.updateValueAndValidity()
      this.form.controls.apellido.updateValueAndValidity()
      this.form.controls.giro.updateValueAndValidity()
      this.form.controls.razon_social.updateValueAndValidity()
      this.form.controls.nombre_fantasia.updateValueAndValidity()
    }else{
      this.form.controls.tipo_usuario.setValue(1)
      this.form.controls.nombre.setValidators([Validators.required, Validators.pattern('^[a-zA-Z ]*$')])
      this.form.controls.apellido.setValidators([Validators.required, Validators.pattern('^[a-zA-Z ]*$')])
      this.form.controls.giro.setValidators([])
      this.form.controls.razon_social.setValidators([])
      this.form.controls.nombre_fantasia.setValidators([])
      this.form.controls.nombre.updateValueAndValidity()
      this.form.controls.apellido.updateValueAndValidity()
      this.form.controls.giro.updateValueAndValidity()
      this.form.controls.razon_social.updateValueAndValidity()
      this.form.controls.nombre_fantasia.updateValueAndValidity()
    }
  }
  // REGISTRAR USUARIO
  registrar(form:any){
    console.log(form)
    this.submit=true;
    this.loadingBar.start();
    this.authService.crearUsuario(form).subscribe((response)=>{
      this.loadingBar.complete();
      this.submit = false;
      console.log(response)
      if(response.message === "OK"){
        this.snackBar.success("Usuario registrado con éxito.","")
        this.router.navigate(['../login'])
      }
    },
    err=>{
      console.log(err);
      this.snackBar.err(err.error.payload,"")
      this.loadingBar.complete();
      this.submit = false;
    })
  }

}
