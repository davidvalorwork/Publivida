
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoriaService } from '../../../../../../services/categorias.service';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { SnackBar} from '../../../../../../services/snackbar.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {TamanoService} from "../../../../../../services/tamanos.service"


@Component({
  selector: 'app-crear-tamano',
  templateUrl: './crear-tamano.component.html',
  styleUrls: ['./crear-tamano.component.css']
})
export class CrearTamanoComponent implements OnInit {
  form:FormGroup = this.fb.group({
    nombre_tamano:['', Validators.required],
    borrado:[0],
    productoIdProductos:[this.data.id_productos],
    
  })

  constructor(
    private fb: FormBuilder,
    private categoriaService:CategoriaService,
    private loadingBar: LoadingBarService,
    private snackBar: SnackBar,
    private tamanoService: TamanoService,
    public dialogRef: MatDialogRef<CrearTamanoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    // private router:Router,
  ) { }

  ngOnInit(): void {
  }

  crear(categoria:any){
    this.loadingBar.start()
    this.tamanoService.create(categoria).subscribe((response)=>{
      console.log(response)      
      this.loadingBar.complete()
      this.snackBar.success("Tamaño creado con éxito.","")
      this.dialogRef.close()
    },
    err=>{
      console.log(err)
      this.snackBar.err("A ocurrido un error.","X")
    })
  }

}

