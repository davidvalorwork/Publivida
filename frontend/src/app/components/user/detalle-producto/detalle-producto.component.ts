import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductosService} from '../../../services/productos.service';
import {environment} from '../../../../environments/environment'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Router} from '@angular/router'
import {PedidosService} from '../../../services/pedido.service'
import {DetallesPedidosService} from '../../../services/detalles_pedidos..service'
import { LoadingBarService } from '@ngx-loading-bar/core';
import { SnackBar} from '../../../services/snackbar.service';
import {PreciosService} from '../../../services/precios.service'
@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {
  product;
  cantidad:number=0
  form:FormGroup;
  id_precios:number;
  precio:string='0';
  rango_precios:any;
  stock_disponible:number;

  imageObject: Array<object> = [];
  constructor(
    public route : ActivatedRoute,
    public router:Router,
    private fb: FormBuilder,
    public productoService: ProductosService,
    public pedidosService: PedidosService,
    public detallePedidosService: DetallesPedidosService,
    private loadingBar: LoadingBarService,
    private snackBar: SnackBar,
    private preciosService:PreciosService,
  ) {
    this.productoService.getByCondition({condicion:{where:{id_productos:this.route.snapshot.paramMap.get('id')}}}).subscribe((response)=>{
      this.product =response.payload[0]
      console.log(this.product)
      const urls = response.payload[0].urls_img.split(",")
      this.stock_disponible = this.product.stock
      for(let i in urls){
        const image ={
          image:`${environment.URL_API}/${urls[i]}`,
          thumbImage:`${environment.URL_API}/${urls[i]}`,
          alt:"",
        }
        this.imageObject.push(image)
      }
    })
    this.initForm();
  }

  ngOnInit(): void {
    this.preciosService.getByProductID({condition:{
      where:{productoIdProductos:this.route.snapshot.paramMap.get('id'),borrado:0}
    }})
      .subscribe((response:any)=>{
        this.loadingBar.complete()
        this.rango_precios = response.payload;
      })
  }

  initForm(){
    this.form = this.fb.group({
      plantilla_modificada:{value: "Producto por Defecto", 
      disabled: true },
      cantidad:['', Validators.required],
      precioIdPrecios:['', Validators.required],
      pedidoIdPedidos:['', Validators.required],
      borrado:[0]
    })
  }

  ChangeCantidad(event:any){
    let cantidad = event.target.value
    console.log(cantidad)
    this.cantidad = parseInt(cantidad)
    event.preventDefault()
    if(cantidad !== ""){
      this.lookInPrecios(parseInt(cantidad));
    }else{
      // this.precio = "0"
    }
  }
  
  lookInPrecios(cantidad:number){
    console.log(cantidad)
    let cambio = false
    for(let i in this.rango_precios){
      const rango = this.rango_precios[i]
      console.log(rango)
      if(rango.cantidad_desde <= cantidad &&
        rango.cantidad_hasta >= cantidad &&
        cantidad < this.stock_disponible){
          console.log("RANGO AQUI")
          const precio = rango.valor_unitario * cantidad;
          this.precio = precio.toString()
          this.form.controls.precioIdPrecios.setValue(rango.id_precios);
          this.id_precios = rango.id_precios
          cambio=true
        }else{ 
          if(cantidad > this.stock_disponible){
            this.precio = '0'
          }
          this.stock_disponible<cantidad?this.snackBar.err("No hay suficiente stock para su demanda","")
          :null
        }
      
    }
    if(!cambio){
      this.precio="0"
    }
  }

  pedido(){
    if(localStorage.getItem('id_usuarios') !== null && this.product.urls_plantilla !== ""){
      if(this.precio !== "0"){
        const hoy = new Date()
        this.preciosService.id_productos = parseInt(this.route.snapshot.paramMap.get('id'))
        
        const pedido = {
          fecha_pedido: hoy.toString(),
          borrado: 0,
          estadosPedidoIdEstadosPedidos:1,
          usuarioIdUsuarios: localStorage.getItem('id_usuarios')
        } 
        this.loadingBar.start();
        this.pedidosService.crear(pedido).subscribe((response:any)=>{
          console.log(response.payload)
          const detalles_pedidos = {
            borrado:0,
            plantilla_modificada:this.product.urls_plantilla,
            cantidad:this.cantidad,
            pedidoIdPedidos:response.payload.id_pedidos, 
            precioIdPrecios:this.id_precios,
          }
          localStorage.setItem("id_pedidos",response.payload.id_pedidos)
          this.detallePedidosService.crear(detalles_pedidos).subscribe((response:any)=>{
            console.log(response.payload)
            this.loadingBar.complete();
            this.snackBar.success("Su pedido ha sido añadido al carrito.","x")
            this.router.navigateByUrl('/mis-pedidos')
            this.detallePedidosService.id_detalles_pedidos = response.payload.id_detalles_pedidos;
          })
        })
      }
      else{
        this.snackBar.err("Seleccione una cantidad valida.","x")
      }
    }else if (this.product.urls_plantilla === ""){
      this.snackBar.err("El producto seleccionado no posee plantilla de modificacion","x")
    }else{
      this.snackBar.err("No esta registrado.","")
      this.router.navigate(['../login'])
    }
  }

  aumenta(){
    this.cantidad +=1
    this.lookInPrecios(this.cantidad)
  }
  resta(){
    if(this.cantidad >0){
      this.cantidad -=1
      this.lookInPrecios(this.cantidad)
    }
  }

  Personalizar(){
    if(this.product.urls_plantilla !== ""){
      localStorage.setItem('id_producto',this.product.id_productos)
      localStorage.setItem("urls_plantilla",this.product.urls_plantilla)
      this.router.navigate(["/modificacion"])
    }else{
      this.snackBar.err("El producto seleccionado no posee plantilla de modificacion","x")
    }
  }

}
