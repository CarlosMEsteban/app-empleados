import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TitleService } from '../services/title.service';

@Component({
  selector: 'app-barco-yfundicion',
  imports: [FormsModule],
  templateUrl: './barco-yfundicion.html',
  styleUrl: './barco-yfundicion.css'
})
export class BarcoYFundicion {
  barcoCajones: number = 0;
  barcoOro: number = 0;
  barcoGananciaOro: number = 0; // Calculado
  barcoEstrellasCajon: number = 0;
  barcoEstrellasGeneral: number = 0;
  barcoGananciaEstrellas: number = 0; // Calculado

  dinamita: number = 0;
  TNT: number = 0;
  pala: number = 0;
  pico: number = 0;
  fundicionTotal: number = 0; // Calculado

  constructor(private titleServicio: TitleService)  
  {
    titleServicio.setTitle("Barco y Fundición");
  }

  calcularBarco() 
  {
    this.barcoGananciaOro = this.barcoCajones * this.barcoOro;
    this.barcoGananciaEstrellas = this.barcoCajones * this.barcoEstrellasCajon + (this.barcoEstrellasGeneral / 3);
  }

  calcularFundicion() 
  {
    this.fundicionTotal = (this.dinamita * 2) + (this.TNT * 3) + (this.pala * 4) + (this.pico * 5);
  }

}
