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
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`No se pudo cargar el GPX: ${response.status} ${response.statusText}`);
      }

      const gpxText = await response.text();
      const document = new DOMParser().parseFromString(gpxText, 'application/xml');
      if (document.querySelector('parsererror')) {
        throw new Error('El fichero GPX no contiene XML válido.');
      }

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
    } catch (error) {
      console.error('Error al leer el fichero GPX del viaje.', error);
    }
  }
}
