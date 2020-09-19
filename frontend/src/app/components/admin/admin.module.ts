import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { CdkTableModule } from '@angular/cdk/table';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminRoutes } from './admin.routing';
import {DashboardComponent} from './dashboard/dashboard.component'
import { UsuariosComponent} from './usuarios/usuarios.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { CrearComponent } from './categorias/crear/crear.component';
import { ProductosComponent } from './productos/productos.component';
import {CrearProductoComponent} from './productos/crear/crear.component';
import {DesicionComponent} from '../utils/desicion/desicion.component';
import {EditarComponent} from './categorias/editar/editar.component'
import {EditarProductoComponent} from './productos/editar/editar.component';
import { VerComponent } from './productos/ver/ver.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PreciosComponent } from './precios/precios.component'
import {CrearPreciosComponent} from './precios/crear/crear.component'
import {VerPreciosComponent} from './precios/ver/ver.component'
import {EditarPreciosComponent} from './precios/editar/editar.component';
import { PagosComponent } from './pagos/pagos.component';
import { PagosModalComponent } from './usuarios/pagos-modal/pagos-modal.component';
import { TamanosComponent } from './productos/editar/tamanos/tamanos.component';
import { CrearTamanoComponent } from './productos/editar/tamanos/crear-tamano/crear-tamano.component';
// import { NgxChartsModule }from '@swimlane/ngx-charts';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminRoutes),
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule,
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  entryComponents: [],
  declarations: [
    DashboardComponent,
    EditarComponent,
    CrearProductoComponent,
    // NgxChartsModule,
    EditarPreciosComponent,
    CrearPreciosComponent,
    VerPreciosComponent,
    UsuariosComponent,
    EditarProductoComponent,
    CategoriasComponent,
    CrearComponent,
    ProductosComponent,
    DesicionComponent,
    VerComponent,
    PerfilComponent,
    PreciosComponent,
    PagosComponent,
    PagosModalComponent,
    TamanosComponent,
    CrearTamanoComponent,
  ]
})
export class AdminComponentsModule {}
