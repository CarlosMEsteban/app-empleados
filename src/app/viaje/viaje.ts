import { Component, OnInit } from '@angular/core';

const GPX_FILE_NAME =
  'Indicaciones de Aeropuerto de Luxemburgo (LUX), Rue de Trèves, Luxemburgo a Friburgo de Brisgovia, Alemania.gpx';

interface TrackPoint {
  lat: number;
  lon: number;
}

const xInicial = 3;
const yInicial = 3;

const xFinal = 70;
const yFinal = 90;




@Component({
  selector: 'app-viaje',
  standalone: true,
  templateUrl: './viaje.html',
  styleUrl: './viaje.css'
})
export class Viaje implements OnInit {
  x = xFinal;
  y = yFinal;
  trackPoints: TrackPoint[] = [];

  ngOnInit(): void {
    void this.loadGpx();
  }

  private async loadGpx(): Promise<void> {
    const url = `/assets/${encodeURIComponent(GPX_FILE_NAME)}`;

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
