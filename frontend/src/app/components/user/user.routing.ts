import { Routes } from '@angular/router';
import {PerfilComponent} from '../admin/perfil/perfil.component'
import { ProductosComponent } from './productos/productos.component';
import { DetalleProductoComponent } from './detalle-producto/detalle-producto.component';
import { DetallePedidoComponent } from './detalle-pedido/detalle-pedido.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { ModificacionComponent } from '../admin/modificacion/modificacion.component'

export const UserRoutes: Routes = [
  {
    path:'',
    component:ProductosComponent
  },
  {
    path:'perfil',
    component:PerfilComponent
  },
  {
    path:'detalle-producto/:id',
    component:DetalleProductoComponent
  },
  {
    path:'detalle-pedido',
    component:DetallePedidoComponent
  },
  {
    path:'mis-pedidos',
    component:PedidosComponent
  },
  {
    path:'modificacion',
    component:ModificacionComponent
  },
  
];
