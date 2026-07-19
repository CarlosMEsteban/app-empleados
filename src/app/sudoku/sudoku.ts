import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sudoku',
  imports: [FormsModule, CommonModule],
  templateUrl: './sudoku.html',
  styleUrl: './sudoku.css',
})
export class Sudoku {
  sudoku: (number | null)[][] = Array(9).fill(null).map(() => Array(9).fill(null));

  // Ejemplo de sudoku fácil
  ejemploFacil: (number | null)[][] = [
    [5, 3, null, null, 7, null, null, null, null],
    [6, null, null, 1, 9, 5, null, null, null],
    [null, 9, 8, null, null, null, null, 6, null],
    [8, null, null, null, 6, null, null, null, 3],
    [4, null, null, 8, null, 3, null, null, 1],
    [7, null, null, null, 2, null, null, null, 6],
    [null, 6, null, null, null, null, 2, 8, null],
    [null, null, null, 4, 1, 9, null, null, 5],
    [null, null, null, null, 8, null, null, 7, 9]
  ];

  cargarEjemplo() {
    this.sudoku = this.ejemploFacil.map(row => [...row]);
  }

  resolver() {
    // Este método lo programarás tú
    console.log('Método resolver() listo para ser programado');
    // Aquí va tu lógica de resolución
  }
}
