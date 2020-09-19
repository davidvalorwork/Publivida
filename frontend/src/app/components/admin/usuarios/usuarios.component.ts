import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { SnackBar} from '../../../services/snackbar.service';
import {UsuarioService} from '../../../services/usuarios.service';
import {Router} from '@angular/router';
// import { DataSource, MatPaginator, Mat} from '@angular/cdk/table';
import {environment} from '../../../../environments/environment'
import { PagosModalComponent } from './pagos-modal/pagos-modal.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.component.html',
    styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
    // @ViewChild(MatPaginator) paginator: MatPaginator;
    // @ViewChild(MatSort) sort: MatSort;
    dataSource:any;
    url_api:string = `${environment.URL_API}/`
    displayedColumns: string[] = ['usuario', 'nombre', 'correo', 'rut','telefono','tipo_usuario','options'];
    usuarios:any;
    constructor(
        private usuarioService:UsuarioService,
        private loadingBar: LoadingBarService,
        private snackBar: SnackBar,
        private router:Router,   
        public dialog: MatDialog, 
    ){
        this.loadingBar.start()
        this.usuarioService.getUsuarios().subscribe((response)=>{
            this.loadingBar.complete();
            this.usuarios = response.payload;
            this.dataSource = this.usuarios
            console.log(this.usuarios)
        },
        err=>console.log(err));
    }
    buscar(event:any){
        const users = this.usuarios;
        this.dataSource = users.filter((user:any)=>{
            user.tipo_usuario = this.transformTipoUsuario(user.tiposUsuarioIdTiposUsuarios);
            const userS = JSON.stringify(user);
            return userS.indexOf(event.target.value)===-1?false:true;
        });

    }
    transformTipoUsuario(id_tipo_usuario:number){
        switch (id_tipo_usuario){
            case 1:
                return "Usuario"
            case 2:
                return "Empresa"
            case 3:
                return "Administrador"
        }
    }
    ngOnInit(){}
    verPedidos(id:string){
        const dialogRef = this.dialog.open(PagosModalComponent,{
            width:'60%',
            data:id
        })
    }
}