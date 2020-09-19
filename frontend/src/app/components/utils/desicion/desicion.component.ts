import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-desicion',
  templateUrl: './desicion.component.html',
  styleUrls: ['./desicion.component.scss']
})
export class DesicionComponent implements OnInit {

  text2:string;

  constructor(
    public dialogRef: MatDialogRef<DesicionComponent>,
    public router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.text2 = data.text
  }
  ngOnInit(): void {}

}
