import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoriaService } from '../../../services/categorias.service';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { SnackBar} from '../../../services/snackbar.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PreciosService} from '../../../services/precios.service'
import {DetallesPedidosService} from '../../../services/detalles_pedidos..service'
import {ProductosService} from '../../../services/productos.service'
import {PedidosService} from '../../../services/pedido.service'

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.component.html',
  styleUrls: ['./detalle-pedido.component.css']
})
export class DetallePedidoComponent implements OnInit {
  precio:string='0';
  id_detalles_pedidos:number;
  id_pedidos:number;
  id_precios:number;
  rango_precios:any;
  form:FormGroup;
  detalle_pedido:any;
  stock_disponible:number;

  constructor(
    private fb: FormBuilder,
    private categoriaService:CategoriaService,
    private loadingBar: LoadingBarService,
    private snackBar: SnackBar,
    private route:ActivatedRoute,
    private preciosService: PreciosService,
    private detallesPedidosService:DetallesPedidosService,
    private productosService: ProductosService,
    private router: Router,
    private pedidosService:PedidosService,
    // private router:Router,
  ) {
    this.preciosService.id_productos===undefined?this.router.navigate(['/']):null;
    this.productosService.getId(this.preciosService.id_productos
      .toString())
      .subscribe((response:any)=>{
        console.log(response.payload)
        this.stock_disponible = response.payload.stock
      })
    this.id_detalles_pedidos = this.detallesPedidosService.id_detalles_pedidos;
    this.id_pedidos = parseInt(localStorage.getItem("id_pedidos"));
    this.loadingBar.start();
    const product = this.preciosService.id_productos
    this.preciosService.getByProductID({condition:{
      where:{productoIdProductos:product}
    }})
      .subscribe((response:any)=>{
        this.loadingBar.complete()
        this.rango_precios = response.payload;
      })
    this.detallesPedidosService.getId(
      this.id_detalles_pedidos.toString()
      ).subscribe((response:any)=>{
        console.log(response.payload)
        this.detalle_pedido = response.payload
        this.initForm();
      })
  }
  initForm(){
    this.form = this.fb.group({
      id_detalles_pedidos: [this.detalle_pedido.id_detalles_pedidos],
      plantilla_modificada:{value: "Producto por Defecto", 
      disabled: true },
      cantidad:[this.detalle_pedido.cantidad, Validators.required],
      precioIdPrecios:[this.detalle_pedido.precioIdPrecios, Validators.required],
      pedidoIdPedidos:[this.detalle_pedido.pedidoIdPedidos, Validators.required],
      borrado:[0]
    })
    this.lookInPrecios(this.detalle_pedido.cantidad)
  }

  ngOnInit(): void {
  }

  ChangeCantidad(cantidad:string){
    console.log(cantidad)
    if(cantidad !== ""){
      this.lookInPrecios(parseInt(cantidad));
    }else{
      this.precio = "0"
    }
  }

  lookInPrecios(cantidad:number){
    for(let i in this.rango_precios){
      const rango = this.rango_precios[i]
      console.log(rango)
      if(rango.cantidad_desde <= cantidad &&
        rango.cantidad_hasta >= cantidad &&
        cantidad < this.stock_disponible){
          const precio = rango.valor_unitario * cantidad;
          this.precio = precio.toString()
          this.form.controls.precioIdPrecios.setValue(rango.id_precios);
        }else{ 
          this.precio = '0'
          this.stock_disponible<cantidad?this.snackBar.err("No hay suficiente stock para su demanda","")
          :null
        }
    }
  }

  guardarBorrador(detalle_pedido:any){
    console.log(detalle_pedido)
    detalle_pedido.nombre_id = `id_detalles_pedidos`
    this.loadingBar.start()
    this.detallesPedidosService.editar(
      detalle_pedido.id_detalles_pedidos,
      detalle_pedido
    ).subscribe((response)=>{
      console.log(response)      
      this.loadingBar.complete()
      this.snackBar.success("Pedido guardado como borrador.","")
    },
    err=>{
      console.log(err)
      this.snackBar.err("A ocurrido un error.","X")
    })
  }
  comprar(detalle_pedido:any){
    console.log(detalle_pedido)
    detalle_pedido.nombre_id = `id_detalles_pedidos`
    this.loadingBar.start()
    this.detallesPedidosService.editar(
      detalle_pedido.id_detalles_pedidos,
      detalle_pedido
    ).subscribe((response)=>{
      console.log(response)      
      this.loadingBar.complete()
      this.snackBar.success("Generando link.","")
      this.pedidosService.generarLink({monto:this.precio,pedidoID:this.id_pedidos}).subscribe((response:any)=>{
        console.log(response.payload)
        window.location.href = response.payload;
      })
    },
    err=>{
      console.log(err)
      this.snackBar.err("A ocurrido un error.","X")
    })
  }

}

