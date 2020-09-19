import { Component, OnInit, ViewChild } from '@angular/core';
import { FabricjsEditorComponent } from '../../../projects/angular-editor-fabric-js/src/public-api';
import {UploadService} from '../../../services/upload.service'
import { Observable, Observer } from 'rxjs';
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
  selector: 'app-modificacion',
  templateUrl: './modificacion.component.html',
  styleUrls: ['./modificacion.component.css']
})
export class ModificacionComponent implements OnInit {
  title = 'angular-editor-fabric-js';
  url_api = `${environment.URL_API}/`
  plantillas = [];
  plantillaSelected:number;

  product;
  cantidad:number=0
  form:FormGroup;
  id_precios:number;
  precio:string='0';
  rango_precios:any;
  stock_disponible:number;

  @ViewChild('canvas', {static: false}) canvas: FabricjsEditorComponent;

  constructor(
    public uploadService: UploadService,
    public route : ActivatedRoute,
    public router:Router,
    private fb: FormBuilder,
    public productoService: ProductosService,
    public pedidosService: PedidosService,
    public detallePedidosService: DetallesPedidosService,
    private loadingBar: LoadingBarService,
    private snackBar: SnackBar,
    private preciosService:PreciosService,
  ){
    this.productoService.getByCondition({condicion:{where:{id_productos:localStorage.getItem("id_producto")}}}).subscribe((response)=>{
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
        // this.imageObject.push(image)
      }
    })
    this.initForm();
  }

  
  ChangeCantidad(event:any){
    let cantidad = event.target.value
    console.log(cantidad)
    this.cantidad = parseInt(cantidad)
    event.preventDefault()
    if(cantidad !== ""){
      this.lookInPrecios(parseInt(cantidad));
    }else{
      this.precio = "0"
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

  ngOnInit(): void {
     const plantillas = localStorage.getItem("urls_plantilla")

     this.plantillas = plantillas.split(',')

     this.preciosService.getByProductID({condition:{
      where:{productoIdProductos:localStorage.getItem("id_producto")}
    }})
      .subscribe((response:any)=>{
        this.loadingBar.complete()
        this.rango_precios = response.payload;
      })
  }

  pedido(){
    if(localStorage.getItem('id_usuarios') !== null){
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
            cantidad:this.cantidad,
            plantilla_modificada: this.plantillas.join(","),
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
      }else{
        this.snackBar.err("Seleccione una cantidad valida.","x")
      }
    }else{
      this.snackBar.err("No esta registrado.","")
      this.router.navigate(['../login'])
    }
  }

  public rasterize() {
    this.canvas.rasterize();
  }

  public rasterizeSVG() {
    this.canvas.rasterizeSVG();
  }

  public saveCanvasToJSON() {
    this.canvas.saveCanvasToJSON();
  }

  public loadCanvasFromJSON() {
    this.canvas.loadCanvasFromJSON();
  }

  public confirmClear() {
    this.canvas.confirmClear();
  }

  public changeSize() {
    this.canvas.changeSize();
  }

  public addText() {
    this.canvas.addText();
  }

  public getImgPolaroid(event) {
    this.canvas.getImgPolaroid(event);
  }

  public addImageOnCanvas(url) {
    this.canvas.addImageOnCanvas(url);
  }

  public readUrl(event) {
    this.canvas.readUrl(event);
  }

  public removeWhite(url) {
    this.canvas.removeWhite(url);
  }

  public addFigure(figure) {
    this.canvas.addFigure(figure);
  }

  public removeSelected() {
    this.canvas.removeSelected();
  }

  public sendToBack() {
    this.canvas.sendToBack();
  }

  public bringToFront() {
    this.canvas.bringToFront();
  }

  public clone() {
    this.canvas.clone();
  }

  public cleanSelect() {
    this.canvas.cleanSelect();
  }

  public setCanvasFill() {
    this.canvas.setCanvasFill();
  }

  public setCanvasImage() {
    this.canvas.setCanvasImage();
  }

  public setId() {
    this.canvas.setId();
  }

  public setOpacity() {
    this.canvas.setOpacity();
  }

  public setFill() {
    this.canvas.setFill();
  }

  public setFontFamily() {
    this.canvas.setFontFamily();
  }

  public setTextAlign(value) {
    this.canvas.setTextAlign(value);
  }

  public setBold() {
    this.canvas.setBold();
  }

  public setFontStyle() {
    this.canvas.setFontStyle();
  }

  public hasTextDecoration(value) {
    this.canvas.hasTextDecoration(value);
  }

  public setTextDecoration(value) {
    this.canvas.setTextDecoration(value);
  }

  public setFontSize() {
    this.canvas.setFontSize();
  }

  public setLineHeight() {
    this.canvas.setLineHeight();
  }

  public setCharSpacing() {
    this.canvas.setCharSpacing();
  }

  public rasterizeJSON() {
    this.canvas.rasterizeJSON();
  }

  actualizaIMG(){
    const img = this.canvas.rasterizeIMG()
    console.log(img.src)
    
    const base64 = img.src;
    const imageName = 'name.png';
    const imageBlob = this.dataURItoBlob(base64);
    const imageFile = new File([imageBlob], imageName, { type: 'image/png' });
    console.log(imageFile)



    const fileData = imageFile;
    let bodyFormData = new FormData();  
    bodyFormData.append("file", fileData,fileData.name);  
    
    this.uploadService.upload(bodyFormData).subscribe((response:any)=>{
      this.loadingBar.complete()
      this.snackBar.success("Archivo subido.","x")
      console.log(response.payload)
      this.plantillas[this.plantillaSelected] = response.payload
    })
    
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

  
  
  dataURItoBlob(dataURI) {
    dataURI = dataURI.replace(/^data:image\/(png|jpg);base64,/, "");
    console.log(dataURI)
    const byteString = window.atob(dataURI);
    
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const byteArray = new Uint8Array(atob(dataURI).split('').map(char => char.charCodeAt(0)));
    // const blob = new Blob([int8Array], { type: 'image/png' });    
    const blob = new Blob([byteArray], { type: 'image/png' });    
    return blob;
 }


}

