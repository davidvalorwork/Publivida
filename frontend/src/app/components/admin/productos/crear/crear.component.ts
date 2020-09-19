import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { SnackBar} from '../../../../services/snackbar.service';
import {MatDialogRef} from '@angular/material/dialog'
import {ProductosService} from '../../../../services/productos.service'

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearProductoComponent implements OnInit {

  form:FormGroup = this.fb.group({
    nombre_producto:['', Validators.required],
    stock:['', Validators.required],
    descripcion_producto:['', Validators.required],
    borrado:[0],
    categoriaIdCategorias:[localStorage.getItem("categoria")]
  })

  constructor(
    private fb: FormBuilder,
    private productoService:ProductosService,
    private loadingBar: LoadingBarService,
    private snackBar: SnackBar,
    public dialogRef: MatDialogRef<CrearProductoComponent>,
    // private router:Router,
  ) { }

  ngOnInit(): void {
  }

  crear(producto:any){
    this.loadingBar.start()
    this.productoService.create(producto).subscribe((response)=>{
      console.log(response)      
      this.loadingBar.complete()
      this.snackBar.success("Categoria creada con éxito.","")
      this.dialogRef.close()
    },
    err=>{
      console.log(err)
      this.snackBar.err("A ocurrido un error.","X")
    })
  }

}
