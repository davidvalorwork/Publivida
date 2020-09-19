import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegistroComponent } from './components/auth/registro/registro.component';
import { RecuperarContrasenaComponent } from './components/auth/recuperar-contrasena/recuperar-contrasena.component';
import { CambioContrasenaComponent } from './components/auth/cambio-contrasena/cambio-contrasena.component';
import { AdminComponent} from './layout/admin/admin.component'
import {UsuarioComponent} from './layout/usuario/usuario.component'

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'recuperar-contrasena', component: RecuperarContrasenaComponent },
  { path: 'cambio-contrasena/:id', component: CambioContrasenaComponent },
  { 
    path: 'admin', 
    component: AdminComponent ,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: '',
        loadChildren:
          () => import('./components/admin/admin.module').then(m => m.AdminComponentsModule)
      },
    ],
  },
  { 
    path: '', 
    component: UsuarioComponent ,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: '',
        loadChildren:
          () => import('./components/user/user.module').then(m => m.UserComponentsModule)
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
