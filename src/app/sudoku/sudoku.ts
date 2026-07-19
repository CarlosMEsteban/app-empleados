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

  posiblesValores: String[][] = Array(9).fill("123456789").map(() => Array(9).fill("123456789"));
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

  cargarPosiblesValores() {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (this.sudoku[i][j] === null) {
          this.posiblesValores[i][j] = "123456789";
        } else {
          this.posiblesValores[i][j] = this.sudoku[i][j]!.toString();
        }
      }
    }
  }

  resolver() {
    // Este método lo programarás tú
    console.log('Método resolver() listo para ser programado');
    // Aquí va tu lógica de resolución
    this.cargarPosiblesValores();

    let cambios: boolean = true;

    while (cambios) {
    // Damos una vuelta más
      cambios = false;
      for (let fila = 0; fila < 9; fila++) {
        for (let col = 0; col < 9; col++) {
          if (fila === 5 && col === 5) {
            console.log('********************************Debug: fila 5, col 5');
          }
          if (this.sudoku[fila][col] === null)
          // Esta celda no se ha resuleto 
          {
            let posibles = this.posiblesValores[fila][col];
           
            for (let otrasCol = 0; otrasCol < 9; otrasCol++)
            // Recorremos la fila 
            {
              if (otrasCol !== col && this.sudoku[fila][otrasCol] !== null) {
                // Eliminamos el valor de la celda de la fila
                
                this.posiblesValores[fila][col] = this.posiblesValores[fila][col].replace(this.sudoku[fila][otrasCol]!.toString(), '');
              }
            }
            for (let otrasFila = 0; otrasFila < 9; otrasFila++)
            // Recorremos la columna 
            {
              if (otrasFila !== fila && this.sudoku[otrasFila][col] !== null) {
                // Eliminamos el valor de la celda de la columna
                this.posiblesValores[fila][col] = this.posiblesValores[fila][col].replace(this.sudoku[otrasFila][col]!.toString(), '');
              }
            }
            if (fila === 5 && col === 5)
            {
              console.log('Debug: posibles después de eliminar: ' + posibles);
            }
            if (posibles.length === 1) {
              // Solo queda un valor posible, lo asignamos
              this.sudoku[fila][col] = Number(posibles);
              if (fila === 5 && col === 5)
              {
                console.log('Debug: asignando ' + posibles + ' a sudoku[5][5]');
              }
              cambios = true;
            }
          }
        }
      }

    }
  }
}
