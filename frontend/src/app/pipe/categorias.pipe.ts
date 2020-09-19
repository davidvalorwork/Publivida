import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'categorias' })
export class CategoriasPipe implements PipeTransform {
  transform(value:string) {
    console.log(value)
  }
}