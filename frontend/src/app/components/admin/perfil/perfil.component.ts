

import { Component, OnInit , ViewChild, ElementRef} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { SnackBar} from '../../../services/snackbar.service';
import {MatDialogRef} from '@angular/material/dialog'
import {ProductosService} from '../../../services/productos.service'
import { UsuarioService} from '../../../services/usuarios.service'
import {UploadService} from '../../../services/upload.service'
import {environment} from '../../../../environments/environment'

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;
  user:any=null;
  foto_perfil:string ='';
  url_api:string=`${environment.URL_API}/`
  type_user:number=0;

  form:FormGroup;
  constructor(
    private fb: FormBuilder,
    private productoService:ProductosService,
    private loadingBar: LoadingBarService,
    private snackBar: SnackBar,
    public uploadService:UploadService,
    private usuarioService:UsuarioService,
    // private router:Router,
  ) {
    this.loadingBar.start()
    this.usuarioService.getUsuario(localStorage.getItem("id_usuarios")).subscribe(async(response:any)=>{
      this.loadingBar.complete()
      this.user = response.payload;
      await this.user.tiposUsuarioIdTiposUsuarios===2?this.createFormEmpresa():this.createForm()
      this.type_user = this.user.tiposUsuarioIdTiposUsuarios
      this.user.url_img!==null?null:this.user.url_img =''
      this.foto_perfil =this.user.url_img
    },err=>{
      console.log(err)
    })
  }
  
  createForm(){
    this.form = this.fb.group({
      // url_foto:['',Validators.required],
      id_usuarios:[this.user.id_usuarios],
      usuario: [this.user.usuario],
      nombres: [this.user.nombres, Validators.required],
      correo:[this.user.correo, Validators.required],
      apellidos: [this.user.apellidos, Validators.required],
      rut:[this.user.rut,Validators.required],
      telefono:[this.user.telefono,Validators.required],
    })
  }
  createFormEmpresa(){
    this.form = this.fb.group({
      // url_foto:['',Validators.required],
      id_usuarios:[this.user.id_usuarios],
      usuario: [this.user.usuario],
      correo:[this.user.correo, Validators.required],
      razon_social: [this.user.razon_social, Validators.required],
      giro: [this.user.giro, Validators.required],
      nombre_fantasia: [this.user.nombre_fantasia, Validators.required],
      rut:[this.user.rut,Validators.required],
      telefono:[this.user.telefono,Validators.required],
    })
  }

  ngOnInit(): void {
  }

  crear(usuario:any){
    usuario.url_img = this.foto_perfil;
    usuario.nombre_id = `id_usuarios`
    this.loadingBar.start()
    this.usuarioService.update(usuario.id_usuarios,usuario).subscribe((response:any)=>{
      console.log(response)      
      this.loadingBar.complete()
      this.snackBar.success("Perfil modificado con éxito.","")
    },
    err=>{
      console.log(err)
      this.snackBar.err("A ocurrido un error.","X")
    })
  }

  uploadFile(file:any,array:string) { 
    console.log(array)
    const fileData = file;
    let bodyFormData = new FormData();  
    bodyFormData.append("file", fileData,fileData.name);  
    file.inProgress = true;  
    this.loadingBar.start()
    this.uploadService.upload(bodyFormData).subscribe((response:any)=>{
        this.loadingBar.complete()
        this.snackBar.success("Archivo subido.","")
        this[array] = response.payload
    })
  }

  onClick() {  
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {  
        const file = fileUpload.files[0];  
        this.uploadFile(file,'foto_perfil'); 
    };  
    fileUpload.click();  
  }

}
