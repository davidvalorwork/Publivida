
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { SnackBar} from '../../../../../services/snackbar.service';
import {Router} from '@angular/router';
import {CategoriaService} from '../../../../../services/categorias.service'
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog'
import {CrearTamanoComponent} from './crear-tamano/crear-tamano.component'
import {DesicionComponent} from '../../../../utils/desicion/desicion.component';
import {TamanoService} from '../../../../../services/tamanos.service'

@Component({
  selector: 'app-tamanos',
  templateUrl: './tamanos.component.html',
  styleUrls: ['./tamanos.component.css']
})
export class TamanosComponent implements OnInit {
    // @ViewChild(MatPaginator) paginator: MatPaginator;
    // @ViewChild(MatSort) sort: MatSort;
    
    dataSource:any;
    displayedColumns: string[] = ['nombre_categoria', 'options'];
    categorias:any;
    constructor(
        private categoriaService:CategoriaService,
        private loadingBar: LoadingBarService,
        private snackBar: SnackBar,
        private router:Router,  
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialog: MatDialog,
        private tamanoService:TamanoService,
    ){
        console.log(data)
        this.tamanoService.getByCondition(
            {condicion:{where:{productoIdProductos:data.id_productos,borrado:0}}}
        )
        .subscribe((response)=>{
            console.log(response.payload)
            this.dataSource = response.payload
        })
    }
    buscar(event:any){
        const categories = this.categorias;
        this.dataSource = categories.filter((category:any)=>{
            category.tipo_usuario = this.transformTipoUsuario(category.tiposUsuarioIdTiposUsuarios);
            const categoryS = JSON.stringify(category);
            return categoryS.indexOf(event.target.value)===-1?false:true;
        });

    }
    transformTipoUsuario(id_tipo_usuario:number){
        switch (id_tipo_usuario){
            case 1:
                return "Usuario"
            case 2:
                return "Empresa"
            case 3:
                return "Administrador"
        }
    }
    ngOnInit(){
      
    }
    crear(){
        const dialogRef = this.dialog.open(CrearTamanoComponent, {
            width: '400px',
          });
      
          dialogRef.afterClosed().subscribe(result => {
            this.ngOnInit()
        });
    }
    eliminar(id:string){
        const dialogRef = this.dialog.open(DesicionComponent, {
            width: '400px',
            data:{text:"¿Desea eliminar este tamaños?"}
          });
      
        dialogRef.afterClosed().subscribe(result => {
            console.log(result)
            if(result==="true"){
                this.loadingBar.start()
                this.tamanoService.delete(id).subscribe((response:any)=>{
                    this.loadingBar.complete()
                    this.snackBar.success("Tamaño eliminado.","")
                    this.ngOnInit();
                })
            }else{
                this.ngOnInit();
            }
            
        });
    }
    setCategoria(id:string){localStorage.setItem('tamaños',id)}   
}