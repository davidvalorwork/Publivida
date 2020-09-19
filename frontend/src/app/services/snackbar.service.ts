import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
  })
export class SnackBar {
    constructor(private _snackBar: MatSnackBar) { }
    // SNACKBAR DEFAULT FUNCTION
    err(message: string, action: string) {
        this._snackBar.open(message, action, {
        duration: 2000,
        panelClass: ['err-snackbar']
        });
    }
    success(message: string, action: string) {
        this._snackBar.open(message, action, {
        duration: 2000,
        panelClass: ['success-snackbar']
        });
    }
}