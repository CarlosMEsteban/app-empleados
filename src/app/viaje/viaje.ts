import { Component, OnInit } from '@angular/core';

const GPX_FILE_NAME ='Luxemburgo-Friburgo.gpx';
  //'Indicaciones de Aeropuerto de Luxemburgo (LUX), Rue de Trèves, Luxemburgo a Friburgo de Brisgovia, Alemania.gpx';
const DRAW_DELAY_MS = 1;

interface TrackPoint {
  lat: number;
  lon: number;
}

const xInicial = 3;
const yInicial = 3;

const xFinal = 70;
const yFinal = 90;

const latInicial = 49.62637
const lonInicial = 6.21393

const latFinal = 47.99918
const lonFinal = 7.8416

const factorX = (xFinal - xInicial) / (lonFinal - lonInicial);
const factorY = (yFinal - yInicial) / (latInicial - latFinal);




@Component({
  selector: 'app-viaje',
  standalone: true,
  templateUrl: './viaje.html',
  styleUrl: './viaje.css'
})
export class Viaje implements OnInit {
  trackPoints: TrackPoint[] = [];
  drawnPoints: { x: number; y: number }[] = [];
  estaDibujando = false;

  ngOnInit(): void {
    void this.loadGpx();
  }

  public async dibuja(): Promise<void> {
    if (this.estaDibujando) {
      return;
    }

    this.estaDibujando = true;
    this.drawnPoints = [];

    try {
      for (const [index, point] of this.trackPoints.entries()) {
        this.drawnPoints.push({
          x: this.latLonToX(point.lon),
          y: this.latToY(point.lat)
        });

        if ((index + 1) % 10 === 0 && index < this.trackPoints.length - 1) {
          await new Promise<void>(resolve => setTimeout(resolve, DRAW_DELAY_MS));
        }
      }
    } finally {
      this.estaDibujando = false;
    }
  }

  // Devuelve la coordenada Y en el diubujo a partir de la latitud
  private latToY(lat: number): number {
    return yInicial + (latInicial - lat) * factorY;
  }

  // Devuelve la coordenada X en el dibujo a partir de la longitud
  private latLonToX(lon: number): number{
    return xInicial + (lon - lonInicial) * factorX;
  }

  private async loadGpx(): Promise<void> {
    const url = `/assets/viajes/${encodeURIComponent(GPX_FILE_NAME)}`;
console.log(`Cargando fichero GPX desde: ${url}`);
    try {
      // Leemeos el fichero GPX
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`No se pudo cargar el GPX: ${response.status} ${response.statusText}`);
      }

      // Parseamos el fichero comno XML y obtenemos los puntos de track
      const gpxText = await response.text();
      const document = new DOMParser().parseFromString(gpxText, 'application/xml');
      if (document.querySelector('parsererror')) {
        throw new Error('El fichero GPX no contiene XML válido.');
      }

      // Obtenemos los puntos de track y los convertimos a objetos TrackPoint
      this.trackPoints = Array.from(document.getElementsByTagNameNS('*', 'trkpt')).map(point => {
        const latValue = point.getAttribute('lat');
        const lonValue = point.getAttribute('lon');
        const lat = latValue === null ? NaN : Number(latValue);
        const lon = lonValue === null ? NaN : Number(lonValue);
        if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
          throw new Error('El fichero GPX contiene un punto sin coordenadas válidas.');
        }
        return { lat, lon };
      });

      // Si no hay puntos de track, lanzamos un error
      if (this.trackPoints.length === 0) {
        throw new Error('El fichero GPX no contiene puntos de track.');
      }
      
      // Mostramos los puntos de track en la consola para depuración
      console.log('Puntos de track cargados:', this.trackPoints);
    } catch (error) {
      console.error('Error al leer el fichero GPX del viaje.', error);
    }
  }
}
