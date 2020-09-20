import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog'
import {environment} from "../../../../../environments/environment"

@Component({
  selector: 'app-ver',
  templateUrl: './ver.component.html',
  styleUrls: ['./ver.component.css']
})
export class VerComponent implements OnInit {
  url_api:string=`${environment.URL_API}/`
  imagenes=this.data.imagenes.split(',')
  detalle;
  colores;
  textos;
  fonts;
  imagenes_subidas;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    if(data.detalle){
      this.detalle = data.detalle
      this.colores = this.detalle.colores.split(',')
      this.textos = this.detalle.textos.split(',')
      this.fonts = this.detalle.fonts.split(',')
      this.imagenes_subidas = this.detalle.imagenes_subidas.split(',')
    }
  }

  ngOnInit(): void {
  }

  descargarImg(img){
    console.log(img)
    window.open(`${environment.URL_API}/${img}`)
  }

}
