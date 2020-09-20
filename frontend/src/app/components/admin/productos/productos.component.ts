import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { SnackBar} from '../../../services/snackbar.service';
import {Router} from '@angular/router';
// import { DataSource, MatPaginator, Mat} from '@angular/cdk/table';
import {ProductosService} from '../../../services/productos.service'
import {CategoriaService} from '../../../services/categorias.service'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CrearProductoComponent} from './crear/crear.component'
import {DesicionComponent} from '../../utils/desicion/desicion.component';
import {EditarProductoComponent} from './editar/editar.component'
import { VerComponent } from './ver/ver.component'


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  categoria:string=localStorage.getItem('categoria')
  categoria_nombre:string
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;
  dataSource:any;
  displayedColumns: string[] = ['nombre_producto','stock','descripcion_producto','options'];
  productos:any;
  constructor(
      private productoService:ProductosService,
      private categoriaService:CategoriaService,
      private loadingBar: LoadingBarService,
      private snackBar: SnackBar,
      private router:Router,  
      public dialog: MatDialog  
  ){
    this.categoriaService.getId(this.categoria).subscribe((response:any)=>{
      console.log(response.payload)
      this.categoria_nombre = response.payload.nombre_categoria;
    })
  }
  buscar(event:any){
      const productos = this.productos;
      this.dataSource = productos.filter((producto:any)=>{
          const productoS = JSON.stringify(producto);
          return productoS.indexOf(event.target.value)===-1?false:true;
      });

  }
  ngOnInit(){
    this.loadingBar.start()
    this.productoService.getByCondition({
      condicion:{where:{categoriaIdCategorias:this.categoria}}
    }).subscribe((response)=>{
        this.loadingBar.complete();
        this.productos = response.payload;
        this.dataSource = this.productos
        console.log(this.productos)
    },
    err=>console.log(err));
  };
  crear(){
    const dialogRef = this.dialog.open(CrearProductoComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
  saveProductLocal(id:string){
    localStorage.setItem("id_producto",id)
  }
  editar(element:any){
    const dialogRef = this.dialog.open(EditarProductoComponent,{
      width:'60%',
      data:element
    })
    dialogRef.afterClosed().subscribe(result=>{
      this.ngOnInit();
    })
  }
  ver(element:any){
    const dialogRef = this.dialog.open(VerComponent,{
      width:'400px',
      data:element
    })
    dialogRef.afterClosed().subscribe(result=>{
      this.ngOnInit();
    })
  }
  eliminar(id:string){
    this.loadingBar.start()
    this.productoService.delete(id).subscribe((response:any)=>{
      console.log(response)
      this.loadingBar.complete()
      this.ngOnInit();
    })
  }
setProducto(id:string){
  localStorage.setItem("id_producto",id)
}

borradoToggle(id:string,boolean:boolean){
  console.log(boolean)
  if(boolean){
    this.eliminar(id)
  }else{
    this.productoService.edit(id,{borrado:0,nombre_id:"id_productos"})
    .subscribe(response=>{
      console.log(response)
      this.ngOnInit()
    })
  }
}
}