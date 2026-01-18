
export class Fechas {
  static probarObtenerHoraActualMasUno(): void 
  {
    const h1230 = new Date('2024-06-01T12:30:00');
    const h1231 = this.sumaUno(h1230);
    console.assert(h1231 === '12:31', `Error en prueba 12:30 + 1 min = ${h1231}`);

    const h1259 = new Date('2024-06-01T12:59:00');
    const h1300 = this.sumaUno(h1259);
    console.assert(h1300 === '13:00', `Error en prueba 12:59 + 1 min = ${h1300}`);
  }
  static obtenerHoraActualMasUno(): string 
  {
    const horaActual = new Date();
    return this.sumaUno(horaActual);
  }
  static sumaUno(hora: Date): string 
  {
    let nHoras = hora.getHours();
    let nMinutos = hora.getMinutes();
    if (nMinutos == 59)
    {
      if (nHoras == 23)
        nHoras = 0;
      else
        nHoras = nHoras + 1;
      nMinutos = 0;
    }
    else
      nMinutos = nMinutos + 1;

    return `${nHoras.toString().padStart(2, '0')}:${nMinutos.toString().padStart(2, '0')}`;
  }

  static minutosAString(minutosTotales: number): string
  {
    let horas = Math.floor(minutosTotales / 60);
    let minutos = minutosTotales % 60;
    return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
  }
  
}
