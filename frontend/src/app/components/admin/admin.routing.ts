import { Routes } from '@angular/router';
import { DashboardComponent} from './dashboard/dashboard.component'
import { UsuariosComponent} from './usuarios/usuarios.component'
import { CategoriasComponent } from './categorias/categorias.component'
import { ProductosComponent } from './productos/productos.component'
import { PerfilComponent } from './perfil/perfil.component'
import { PreciosComponent } from './precios/precios.component'
import { PagosComponent } from './pagos/pagos.component'
import { ModificacionComponent } from './modificacion/modificacion.component'

export const AdminRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'usuarios',
    component: UsuariosComponent,
  },
  {
    path: 'categorias',
    component: CategoriasComponent,
  },
  {
    path: 'productos',
    component:  ProductosComponent,
  },
  {
    path:'perfil',
    component:PerfilComponent
  },
  {
    path:'precios',
    component:PreciosComponent
  },
  {
    path:'pagos',
    component:PagosComponent
  },
  {
    path:'modificacion',
    component:ModificacionComponent
  }
];
