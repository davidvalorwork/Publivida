import { Component, OnInit } from '@angular/core';
import {CategoriaService} from '../../../services/categorias.service'
import {ProductosService} from '../../../services/productos.service'
import {environment} from '../../../../environments/environment'

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  categorias:any;
  productos:any;
  productosRes:any
  url_api:string= environment.URL_API+"/";
  search_array(array,valuetofind) {
    for (let i = 0; i < array.length; i++) {
        if (array[i]['id_categorias'] === valuetofind) {
            return array[i];
        }
    }
    return -1;
}
  constructor(
    public categoriaService: CategoriaService,
    public productoService: ProductosService,
  ) { 
    this.categoriaService.getCategorias().subscribe((response:any)=>{
      this.categorias = response.payload

      this.productoService.getByCondition({condicion:{where:{borrado:0}}}).subscribe((response:any)=>{
        this.productos = response.payload
        for(let i in this.categorias){
          this.categorias[i].productos = []
          for(let x in this.productos){
            this.productos[x].categoriaIdCategorias===this.categorias[i].id_categorias?this.categorias[i].productos.push(this.productos[x]):null
          }
        }
        this.productosRes = response.payload
        console.log(this.productos)
        console.log(this.categorias)
        for(let i in this.productos){
          const categoria = this.search_array(this.categorias,this.productos[i].categoriaIdCategorias)
          this.productos[i].categoria = categoria.nombre_categoria
        }
      })
    })
  }

  buscar(event:any){
    const categories = this.productosRes;
    this.productos = categories.filter((category:any)=>{
        const categoryS = JSON.stringify(category);
        return categoryS.indexOf(event)===-1?false:true;
    });

}

  ngOnInit(): void {
  }

}
