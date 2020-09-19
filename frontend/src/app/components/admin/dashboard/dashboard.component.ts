import { Component, OnInit, ViewChild, Inject} from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { SnackBar} from '../../../services/snackbar.service';
import {Router} from '@angular/router';
// import { DataSource, MatPaginator, Mat} from '@angular/cdk/table';
import {CategoriaService} from '../../../services/categorias.service'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
// import {CrearComponent} from './crear/crear.component'
import {DesicionComponent} from '../../utils/desicion/desicion.component';
// import {EditarComponent} from './editar/editar.component'
import {PedidosService} from '../../../services/pedido.service'
import {DetallesPedidosService} from '../../../services/detalles_pedidos..service'
import {PreciosService} from '../../../services/precios.service'
import {ProductosService} from '../../../services/productos.service'
import {DataSource} from '@angular/cdk/collections';
import {ReporteService} from '../../../services/reportes.service'

const ELEMENT_DATA= [
  {position: "David Valor", name: 'Colchon', weight: "27/08/2020",  symbol: '100',telefono:'+5615848514',estado:"Pendiente"},
  {position: "Enrique Nieves", name: 'Xiaomi Redmi', weight: "27/08/2020", symbol: '100',telefono:'+5615848514',estado:"Pendiente"},
];
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  saleData = [
    { name: "Mobiles", value: 105000 },
    { name: "Laptop", value: 55000 },
    { name: "AC", value: 15000 },
    { name: "Headset", value: 150000 },
    { name: "Fridge", value: 20000 }
  ];

  dataSource:DataSource<any>;
    nodata:boolean=false
    displayedColumns: string[] = ['usuario','fecha_pedido','producto','cantidad','precio' ,'estado'];
    categorias:any=[];
  
  numero_categorias:number;
  numero_productos:number;
  numero_pedidos:number;
  numero_usuarios:number;
  numero_pedidos_pagos:number;
  productos=[];
    constructor(
      private reporteService:ReporteService,
      private categoriaService:CategoriaService,
        private loadingBar: LoadingBarService,
        private snackBar: SnackBar,
        private router:Router,  
        private pedidosService:PedidosService,
        private detallesPedidos:DetallesPedidosService,
        private precioService: PreciosService,
        private productosService: ProductosService,
    ){}
    ngOnInit(){
      this.productosService.get().subscribe((response:any)=>{
        console.log(response.payload)
        this.productos = response.payload
      })
      this.reporteService.get().subscribe((response:any)=>{
        console.log(response.payload)
        this.numero_categorias = response.payload.categorias
        this.numero_pedidos = response.payload.pedidos
        this.numero_productos = response.payload.productos
        this.numero_usuarios = response.payload.usuarios
        this.numero_pedidos_pagos = response.payload.pedidosPagados
      })

      this.loadingBar.start()
        
            this.pedidosService.getByCondition({condition:{where:{borrado:0,estadosPedidoIdEstadosPedidos:3}}})
            .subscribe( async(response:any)=>{
                console.log(response.payload)
                this.loadingBar.complete()
                console.log(response.payload.length === 0)
                if(response.payload.length === 0){
                    this.dataSource = null
                    this.nodata = true
                }else{
                    this.categorias = response.payload
                    this.dataSource = response.payload
                }
            },
            err=>console.log(err));
    }

    buscar(event:any){
      const categories = this.categorias;
      this.dataSource = categories.filter((category:any)=>{
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
}
