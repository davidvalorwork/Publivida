import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoriaService } from '../../../../services/categorias.service';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { SnackBar} from '../../../../services/snackbar.service';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
    selector: 'editar-categoria',
    templateUrl: './editar.component.html',
    styleUrls: ['./editar.component.css']
  })
export class EditarComponent implements OnInit {
  form:FormGroup = this.fb.group({
    id_categorias:[this.data.id_categorias],
    nombre_categoria:[this.data.nombre_categoria, Validators.required],
    borrado:[this.data.borrado],
    createdAt:[this.data.createdAt],
    updatedAt:[this.data.updatedAt],
  })

  constructor(
    private fb: FormBuilder,
    private categoriaService:CategoriaService,
    private loadingBar: LoadingBarService,
    private snackBar: SnackBar,
    public dialogRef: MatDialogRef<EditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    // private r  outer:Router,
  ) {
    console.log(data)
  }

  ngOnInit(): void {
  }

  editar(categoria:any){
    console.log(categoria)
    categoria.nombre_id = `id_categorias`
    this.loadingBar.start()
    this.categoriaService.editar(categoria.id_categorias,categoria).subscribe((response)=>{
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
