import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-not-found',
  imports: [],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css'
})
export class NotFound {

//Para volver a la ruta anterior
  location = inject(Location)

  goBack(){
    //Vuelve a la ruta anterior
    this.location.back()
  }

}
