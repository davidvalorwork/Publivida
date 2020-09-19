import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/auth/login/login.component';
import { RegistroComponent } from './components/auth/registro/registro.component';
import { RecuperarContrasenaComponent } from './components/auth/recuperar-contrasena/recuperar-contrasena.component';
import { CambioContrasenaComponent } from './components/auth/cambio-contrasena/cambio-contrasena.component';
import { ReactiveFormsModule , FormsModule} from '@angular/forms';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { HttpClientModule } from '@angular/common/http';
import {MaterialModule} from './material.module'
import {AdminComponent} from './layout/admin/admin.component'
import {UsuarioComponent} from './layout/usuario/usuario.component'
import { from } from 'rxjs';
import { ModificacionComponent } from './components/admin/modificacion/modificacion.component'
import { FabricjsEditorModule } from './projects/angular-editor-fabric-js/src/public-api';
import { ColorPickerModule } from 'ngx-color-picker';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    RecuperarContrasenaComponent,
    CambioContrasenaComponent,
    AdminComponent,
    UsuarioComponent,
    ModificacionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ColorPickerModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FabricjsEditorModule,
    FormsModule,
    LoadingBarModule,
    MaterialModule,
    MatSelectCountryModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
