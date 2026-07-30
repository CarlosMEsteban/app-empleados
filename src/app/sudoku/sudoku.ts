import { Component, ComponentFactoryResolver } from '@angular/core';
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
  // Matrices para marcar celdas originales y las resueltas por el algoritmo
  original: boolean[][] = Array(9).fill(false).map(() => Array(9).fill(false));
  solved: boolean[][] = Array(9).fill(false).map(() => Array(9).fill(false));
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

  ejemploMedio: (number | null)[][] = [
    [null, null, 3, null, 2, null, 6, null, null],
    [9, null, null, 3, null, 5, null, null, 1],
    [null, null, 1, 8, null, 6, 4, null, null],
    [null, null, 8, 1, null, 2, 9, null, null],
    [7, null, null, null, null, null, null, null, 8],
    [null, null, 6, 7, null, 8, 2, null, null],
    [null, null, 2, 6, null, 9, 5, null, null],
    [8, null, null, 2, null, 3, null, null, 9],
    [null, null, 5, null, 1, null, 3, null, null]
  ];

  ejemploMuyDificil: (number | null)[][] = [
    [null, null, null, 8, null, null, null, null, 3],
    [null, 1, null, null, null, 2, null, null, null],
    [2, null, null, null, 7, 5, null, null, null],
    [null, null, null, null, null, null, 6, null, null],
    [null, null, 1, null, null, null, 8, null, null],
    [null, null, null, null, null, null, null, 4, null],
    [null, null, null, null, 4, null, null, null, 6],
    [null, null, null, 6, null, null, null, 1, null],
    [5, null, null, null, null, 9, null, null, null]
  ];

  cambios: boolean = true;

  cargarEjemplo() {
    this.sudoku = this.ejemploFacil.map(row => [...row]);
    // Marcar las celdas cargadas originalmente
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        this.original[i][j] = this.sudoku[i][j] !== null;
        this.solved[i][j] = false;
      }
    }

    this.cargarPosiblesValores();
  }


  cargarEjemploMedio() {
    this.sudoku = this.ejemploMedio.map(row => [...row]);
    // Marcar las celdas cargadas originalmente
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        this.original[i][j] = this.sudoku[i][j] !== null;
        this.solved[i][j] = false;
      }
    }
    this.cargarPosiblesValores();
  }

  cargarEjemploMuyDificil() {
    this.sudoku = this.ejemploMuyDificil.map(row => [...row]);
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        this.original[i][j] = this.sudoku[i][j] !== null;
        this.solved[i][j] = false;
      }
    }
    this.cargarPosiblesValores();
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

    // Aquí va tu lógica de resolución
    this.cargarPosiblesValores();

    // Reiniciar marcas de resueltas antes de empezar
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        this.solved[i][j] = false;
      }
    }

    this.cambios = true;

    while (this.cambios) {
    // Damos una vuelta más
      this.cambios = false;

      this.valoresUnicosPorCasilla();

      this.valoresUnicosPorFila();

      this.valoresUnicosPorColumna();

      this.valoresUnicosPorCaja();
  
      }

    
  }

  valoresUnicosPorCasilla() 
  {
        let inicio = 0;
      let final = 8;
      for (let fila = inicio; fila < final  + 1; fila++) {
        for (let col = inicio; col < final + 1; col++) {
      
          if (this.sudoku[fila][col] === null)
          // Esta celda no se ha resuelto 
          {
           
            //console.log('Debug: posibles antes de eliminar: ' + this.posiblesValores[fila][col]);
            //console.log('FILAS');
            this.solucionarRecorrerFila(fila, col);
            
            //console.log('COLUMNA');
            this.solucionarRecorrerColumna(fila, col);
            
       
            //console.log('CAJA 3x3');

            this.solucionarRecorrerCaja(fila, col);


            if (this.posiblesValores[fila][col].length === 1) 
            {
              // Solo queda un valor posible, lo asignamos
              this.sudoku[fila][col] = Number(this.posiblesValores[fila][col]);
              console.log('ValoresUnicosPorCasilla: asignando ' + this.sudoku[fila][col]!.toString() + ' a sudoku[' + fila + '][' + col + ']');
              // Marcamos como resuelta por el algoritmo
              this.solved[fila][col] = true;
          
              this.cambios = true;
            }


          }
        }
      }
  }

  solucionarRecorrerFila(fila: number, col: number) 
  {
    for (let otrasCol = 0; otrasCol < 9; otrasCol++)
    // Recorremos la fila 
    {
      if (otrasCol !== col && this.sudoku[fila][otrasCol] !== null) {
        // Eliminamos el valor de la celda de la fila
        //console.log('Debug: eliminando ' + this.sudoku[fila][otrasCol]!.toString() + ' de posibles');
        //console.log('Debug: posibles antes de eliminar: ' + this.posiblesValores[fila][col]);
        this.posiblesValores[fila][col] = this.posiblesValores[fila][col].replace(this.sudoku[fila][otrasCol]!.toString(), '');
        //console.log('Debug: posibles después de eliminar: ' + this.posiblesValores[fila][col]);
      }
    }
  }
    
  solucionarRecorrerColumna(fila: number, col: number)
  {
    for (let otrasFila = 0; otrasFila < 9; otrasFila++)
    // Recorremos la columna 
    {
      if (otrasFila !== fila && this.sudoku[otrasFila][col] !== null) {
        // Eliminamos el valor de la celda de la columna
        //console.log('Debug: eliminando ' + this.sudoku[otrasFila][col]!.toString() + ' de posibles');
        this.posiblesValores[fila][col] = this.posiblesValores[fila][col].replace(this.sudoku[otrasFila][col]!.toString(), '');
      }
    }
  }

  solucionarRecorrerCaja(fila: number, col: number)
  {
    // Comprobamos la caja 3x3
    for (let boxFila = Math.floor(fila / 3) * 3; boxFila < Math.floor(fila / 3) * 3 + 3; boxFila++) 
      {
      for (let boxCol = Math.floor(col / 3) * 3; boxCol < Math.floor(col / 3) * 3 + 3; boxCol++) {
        if ((boxFila !== fila || boxCol !== col) && this.sudoku[boxFila][boxCol] !== null) {  
          //console.log('Debug: eliminando ' + this.sudoku[boxFila][boxCol]!.toString() + ' de posibles');
          this.posiblesValores[fila][col] = this.posiblesValores[fila][col].replace(this.sudoku[boxFila][boxCol]!.toString(), '');
        }
      } 
    }
  }

  valoresUnicosPorFila() 
  {
    for (let fila = 0; fila < 9; fila++) 
    {
      let posiblesValores = "123456789";
      // Miramos a ver qué valores ya tenemos
      for (let col = 0; col < 9; col++)
      {
        if (this.sudoku[fila][col] !== null)
          posiblesValores = posiblesValores.replace(this.sudoku[fila][col]!.toString(), '');
      }

      // Para cada uno de los posibles valores que quedan, miramos qué celdas pueden tener ese valor
      for (let valor of posiblesValores)
      {
          let columnasConElValor: string = "";
           
          for (let col = 0; col < 9; col++)
          {
            if (this.sudoku[fila][col] === null
               && this.posiblesValores[fila][col].includes(valor))
               // El valor puede ir en esta columna
               columnasConElValor += col.toString();        
          }

          if (columnasConElValor.length === 0)
            throw new Error("Error: no hay columnas posibles para el valor " + valor + " en la fila " + fila);
          else if (columnasConElValor.length === 1)
          {
            // Solo hay una columna posible para este valor, lo asignamos
            let col = parseInt(columnasConElValor);
            this.sudoku[fila][col] = parseInt(valor);
            this.solved[fila][col] = true;
            this.cambios = true;
            this.posiblesValores[fila][col] = valor;  
            console.log('ValoresUnicosPorFila: asignando ' + valor + ' a sudoku[' + fila + '][' + col + ']');
          }
          else if (columnasConElValor.length === 2 || columnasConElValor.length === 3)
          // Hay dos o tres columnas posibles para este valor, miramos si están en la misma caja 3x3
          {
            let boxFila = Math.floor(fila / 3);
            let boxCol1 = Math.floor(parseInt(columnasConElValor[0]) / 3);
            let boxCol2 = Math.floor(parseInt(columnasConElValor[1]) / 3);
            let boxCol3 = columnasConElValor.length === 3 ? Math.floor(parseInt(columnasConElValor[2]) / 3) : -1;
            if (boxCol1 === boxCol2 && (boxCol3 === -1 || boxCol1 === boxCol3))
            // Todos los valores posibles están en la misma caja 3x3, podemos eliminar este valor de las otras celdas de la caja 
            {
              for (let boxFila2 = boxFila * 3; boxFila2 < boxFila * 3 + 3; boxFila2++)
              {
                for (let boxCol2 = boxCol1 * 3; boxCol2 < boxCol1 * 3 + 3; boxCol2++)
                {
                  if (boxFila2 !== fila && !columnasConElValor.includes(boxCol2.toString()) && this.sudoku[boxFila2][boxCol2] === null)
                  {
                    // Eliminamos el valor de esta celda
                    this.posiblesValores[boxFila2][boxCol2] = this.posiblesValores[boxFila2][boxCol2].replace(valor, '');
                  }
                }
              }
            }
          }
      }
      
    }
  } 


  valoresUnicosPorColumna() 
  {
    for (let col = 0; col < 9; col++) 
    {
      let posiblesValores = "123456789";
      // Miramos a ver qué valores ya tenemos
      for (let fila = 0; fila < 9; fila++)
      {
        if (this.sudoku[fila][col] !== null)
          posiblesValores = posiblesValores.replace(this.sudoku[fila][col]!.toString(), '');
      }

      // Para cada uno de los posibles valores que quedan, miramos qué celdas pueden tener ese valor
      for (let valor of posiblesValores)
      {
          let filasConElValor: string = "";
           
          for (let fila = 0; fila < 9; fila++)
          {
            if (this.sudoku[fila][col] === null
               && this.posiblesValores[fila][col].includes(valor))
               // El valor puede ir en esta columna
               filasConElValor += fila.toString();        
          }

          if (filasConElValor.length === 0)
            throw new Error("Error: no hay filas posibles para el valor " + valor + " en la columna " + col);
          else if (filasConElValor.length === 1)
          {
            // Solo hay una fila posible para este valor, lo asignamos
            let fila = parseInt(filasConElValor);
            this.sudoku[fila][col] = parseInt(valor);
            this.solved[fila][col] = true;
            this.cambios = true;
            this.posiblesValores[fila][col] = valor; // Actualizamos los posibles valores para reflejar la asignación
            console.log('ValoresUnicosPorColumna: asignando ' + valor + ' a sudoku[' + fila + '][' + col + ']');
          }
          else if (filasConElValor.length === 2 || filasConElValor.length === 3)
          // Hay dos o tres filas posibles para este valor, miramos si están en la misma caja 3x3
          {
            let boxFila = Math.floor(col / 3);
            let boxCol1 = Math.floor(parseInt(filasConElValor[0]) / 3);
            let boxCol2 = Math.floor(parseInt(filasConElValor[1]) / 3);
            let boxCol3 = filasConElValor.length === 3 ? Math.floor(parseInt(filasConElValor[2]) / 3) : -1;
            if (boxCol1 === boxCol2 && (boxCol3 === -1 || boxCol1 === boxCol3))
            // Todos los valores posibles están en la misma caja 3x3, podemos eliminar este valor de las otras celdas de la caja 
            {
              for (let boxFila2 = boxFila * 3; boxFila2 < boxFila * 3 + 3; boxFila2++)
              {
                for (let boxCol2 = boxCol1 * 3; boxCol2 < boxCol1 * 3 + 3; boxCol2++)
                {
                  if (boxFila2 !== col && !filasConElValor.includes(boxCol2.toString()) && this.sudoku[boxFila2][boxCol2] === null)
                  {
                    // Eliminamos el valor de esta celda
                    this.posiblesValores[boxFila2][boxCol2] = this.posiblesValores[boxFila2][boxCol2].replace(valor, '');
                  }
                }
              }
            }
          }
      }
      
    }
  }  

  valoresUnicosPorCaja()
  {
    for (let boxFila = 0; boxFila < 3; boxFila++)
    {
      for (let boxCol = 0; boxCol < 3; boxCol++)
      {
        // Procesar cada caja 3x3
        let posiblesValores = "123456789";
        for (let fila = boxFila * 3; fila < boxFila * 3 + 3; fila++)
        { 
          for (let col = boxCol * 3; col < boxCol * 3 + 3; col++)
          {
            if (this.sudoku[fila][col] !== null)
              posiblesValores = posiblesValores.replace(this.sudoku[fila][col]!.toString(), '');
          }
        }
        // Para cada uno de los posibles valores que quedan, miramos qué celdas pueden tener ese valor
        for (let valor of posiblesValores)
        {
          let celdasConElValor: string = "";
          for (let fila = boxFila * 3; fila < boxFila * 3 + 3; fila++)
          { 
            for (let col = boxCol * 3; col < boxCol * 3 + 3; col++)
            {
              if (this.sudoku[fila][col] === null && this.posiblesValores[fila][col].includes(valor))
                celdasConElValor += fila.toString() + col.toString();
            }
          }
          if (celdasConElValor.length === 0)
            throw new Error("Error: no hay celdas posibles para el valor " + valor + " en la caja " + boxFila + "," + boxCol);
          else if (celdasConElValor.length === 2)
          {
            // Solo hay una celda posible para este valor, lo asignamos
            let fila = parseInt(celdasConElValor[0]);
            let col = parseInt(celdasConElValor[1]);
            this.sudoku[fila][col] = parseInt(valor);
            this.solved[fila][col] = true;
            this.cambios = true;
            this.posiblesValores[fila][col] = valor; // Actualizamos los posibles valores para reflejar la asignación
            console.log('ValoresUnicosPorCaja: asignando ' + valor + ' a sudoku[' + fila + '][' + col + ']');
          }
        } 
      }

    }
  }
}
