import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { CdkTableModule } from '@angular/cdk/table';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserRoutes } from './user.routing';
import { ProductosComponent } from './productos/productos.component';
import { DetalleProductoComponent } from './detalle-producto/detalle-producto.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { DetallePedidoComponent } from './detalle-pedido/detalle-pedido.component';
import { PedidosComponent } from './pedidos/pedidos.component';
// import { CategoriasPipe } from '../../pipe/categorias.pipe';
import { ModificacionComponent } from '../admin/modificacion/modificacion.component';
import { VerComponent } from './pedidos/ver/ver.component'


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UserRoutes),
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgImageSliderModule,
    CdkTableModule,
    
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  entryComponents: [],
  declarations: [
  ProductosComponent,
  // CategoriasPipe,
  DetalleProductoComponent,
  DetallePedidoComponent,
  // ModificacionComponent,
  PedidosComponent,
  VerComponent]
})
export class UserComponentsModule {}
