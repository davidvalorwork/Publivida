
import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { SnackBar} from '../../../services/snackbar.service';
import {Router} from '@angular/router';
// import { DataSource, MatPaginator, Mat} from '@angular/cdk/table';
import {ProductosService} from '../../../services/productos.service'
import {PreciosService} from '../../../services/precios.service'
import {CategoriaService} from '../../../services/categorias.service'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CrearPreciosComponent} from './crear/crear.component'
import {DesicionComponent} from '../../utils/desicion/desicion.component';
import {EditarPreciosComponent} from './editar/editar.component'
import { VerPreciosComponent } from './ver/ver.component'

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.css']
})
export class PreciosComponent implements OnInit {
  producto:string=localStorage.getItem('id_producto')
  categoria_nombre:string
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;
  dataSource:any;
  displayedColumns: string[] = ['nombre_precio','cantidad_desde','cantidad_hasta', 'valor_unitario','options'];
  productos:any;
  constructor(
      private productoService:ProductosService,
      private categoriaService:CategoriaService,
      private preciosService: PreciosService,
      private loadingBar: LoadingBarService,
      private snackBar: SnackBar,
      private router:Router,  
      public dialog: MatDialog  
  ){
    this.productoService.getId(this.producto).subscribe((response:any)=>{
      console.log(response.payload)
      this.categoria_nombre = response.payload.nombre_producto;
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
    // this.productoService.getByCondition({
    //   condicion:{where:{categoriaIdCategorias:this.categoria}}
    // }).subscribe((response)=>{
    //     this.loadingBar.complete();
    //     this.productos = response.payload;
    //     this.dataSource = this.productos
    //     console.log(this.productos)
    // },
    // err=>console.log(err));

    this.preciosService.getByProductID({condition:{where:{productoIdProductos:localStorage.getItem("id_producto"),borrado:0}}}).subscribe((response:any)=>{
      this.loadingBar.complete();
      this.productos = response.payload;
      this.dataSource = this.productos
      console.log(this.productos)
    })
  };
  crear(){
    const dialogRef = this.dialog.open(CrearPreciosComponent, {
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
    const dialogRef = this.dialog.open(EditarPreciosComponent,{
      width:'400px',
      data:element
    })
    dialogRef.afterClosed().subscribe(result=>{
      this.ngOnInit();
    })
  }
  ver(element:any){
    const dialogRef = this.dialog.open(VerPreciosComponent,{
      width:'400px',
      data:element
    })
    dialogRef.afterClosed().subscribe(result=>{
      this.ngOnInit();
    })
  }
  eliminar(id:string){
  const dialogRef = this.dialog.open(DesicionComponent, {
    width: '400px',
    data:{text:"¿Desea eliminar este Rango de Precios?"}
  });

  dialogRef.afterClosed().subscribe(result => {
    // console.log(result)
    if(result==="true"){
      this.loadingBar.start()
      this.preciosService.delete(id).subscribe((response:any)=>{
        console.log(response)
        this.loadingBar.complete()
        this.snackBar.success("Precio eliminada.","")
        this.ngOnInit();
      })
      this.ngOnInit();
    }else{
      this.ngOnInit();
    }
  });
}
}