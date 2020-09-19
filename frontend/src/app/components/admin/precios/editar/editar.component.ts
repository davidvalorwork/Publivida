import { Component, OnInit,Inject, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { SnackBar} from '../../../../services/snackbar.service';
import {ProductosService} from '../../../../services/productos.service'
import {PreciosService} from '../../../../services/precios.service'
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog'
import {UploadService} from '../../../../services/upload.service'
import {environment} from '../../../../../environments/environment'

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarPreciosComponent implements OnInit {
    @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;
    @ViewChild("fileUpload2", {static: false}) fileUpload2: ElementRef;
    form:FormGroup = this.fb.group({
      id_precios:[this.data.id_precios],
      nombre_precio:[this.data.nombre_precio, Validators.required],
      cantidad_desde:[this.data.cantidad_desde, Validators.required],
      cantidad_hasta:[this.data.cantidad_hasta, Validators.required],
      valor_unitario:[this.data.valor_unitario, Validators.required],
      borrado:[0],
      productoIdProductos:[localStorage.getItem("id_producto")]
    })

        constructor(
        public uploadService:UploadService,
        private fb: FormBuilder,
        private productoService:ProductosService,
        private preciosServcie: PreciosService,
        private loadingBar: LoadingBarService,
        private snackBar: SnackBar,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<EditarPreciosComponent>,
        // private router:Router,
        ) { }

        ngOnInit(): void {
           
        }

    crear(precio:any){
      precio.nombre_id = `id_precios`
        this.loadingBar.start()
        this.preciosServcie.editar(precio.id_precios,precio).subscribe((response)=>{
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
