
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { SnackBar} from '../../../../services/snackbar.service';
import {MatDialogRef} from '@angular/material/dialog'
import {ProductosService} from '../../../../services/productos.service'
import {PreciosService} from '../../../../services/precios.service'

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearPreciosComponent implements OnInit {

  form:FormGroup = this.fb.group({
    nombre_precio:['', Validators.required],
    cantidad_desde:['', Validators.required],
    cantidad_hasta:['', Validators.required],
    valor_unitario:['', Validators.required],
    borrado:[0],
    productoIdProductos:[localStorage.getItem("id_producto")]
  })

  constructor(
    private fb: FormBuilder,
    private productoService:ProductosService,
    private preciosService: PreciosService,
    private loadingBar: LoadingBarService,
    private snackBar: SnackBar,
    public dialogRef: MatDialogRef<CrearPreciosComponent>,
    // private router:Router,
  ) { }

  ngOnInit(): void {
  }

  crear(producto:any){
    this.loadingBar.start()
    this.preciosService.create(producto).subscribe((response)=>{
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
