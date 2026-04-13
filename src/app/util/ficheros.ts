import JSZip from 'jszip';

export class Ficheros {
 public async downloadZipFile(archivos: Array<[string, string]>, nombreZip: string) {
  const zip = new JSZip();

  for (const [nombre, contenido] of archivos) {
    zip.file(nombre, contenido);
  }
  
// Generar el ZIP como Blob
  const zipBlob = await zip.generateAsync({ type: 'blob' });

  const url = window.URL.createObjectURL(zipBlob);

  const a = document.createElement('a');
  a.href = url;
  a.download = nombreZip;
  a.click();

  window.URL.revokeObjectURL(url);

  // Descargar el ZIP
  //saveAs(zipBlob, 'archivos.zip');

/*
  const blob = new Blob([contenido], { type: 'text/plain;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = nombreArchivo;
  a.click();

  window.URL.revokeObjectURL(url);*/
}

  
}
