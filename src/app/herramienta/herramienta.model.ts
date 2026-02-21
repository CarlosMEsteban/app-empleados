import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";

export class HerramientaModel 
{
    id?: string; // Firestore document ID
    nombre: string = "";
    tengo: number = 0;
    ampliarTerreno: number = 0;
    estacion: number = 0;	
    ayuntamiento: number = 0;
    silo: number = 0;
    granero: number = 0;
    restaurante: number = 0;
    supermercado: number = 0;
    cine: number = 0;
    hostal: number = 0;
    spa: number = 0;
    chiringuito: number = 0;
    tiendaDeRegalos: number = 0;

    necesidadesTerreno: string[] = ["Escrituras", "Maza", "Estaca de marcar"];
    necesidadesEstacion: string[] = [];
    necesidadesAyuntamiento: string[] = ["Bloques de piedra", "martillo", "Pintura"];
    necesidadesSilo: string[] = ["Clavos", "Paneles de ma", "Tornillo"];
    necesidadesGranero: string[] = ["Perno", "Tabla", "Cinta Adh"];
    necesidadesRestaurante: string[] = ["Tabla", "Tornillo", "Pintura"];
    necesidadesSupermercado: string[] = ["Perno", "Cinta Adh", "Bloques de piedra"];
    necesidadesCine: string[] = ["Clavos", "Paneles de ma", "martillo"];
    necesidadesHostal: string[] = ["Berbiquí", "Ladrillos", "Pintura"];
    necesidadesSpa: string[] = ["Alquitrán", "Berbiquí", "Ladrillos"];
    necesidadesChiringuito: string[] = ["Berbiquí", "Alquitrán", "martillo"];
    necesidadesTiendaDeRegalos: string[] = ["Bloques de piedra", "Alquitrán", "martillo"];


    //constructor(id: number = -1, nombre: string, coste: number, tengo: number, almacen: string, materiaPrima: boolean, cantidadInicial: number, fabrica: string ) 
    constructor(datos: Partial<HerramientaModel>) 
    {
      this.id = datos.id;
      this.nombre = datos.nombre ?? "";
      this.tengo = datos.tengo ?? 0;
      this.ampliarTerreno = datos.ampliarTerreno ?? 0;
      this.estacion = datos.estacion ?? 0;
      this.ayuntamiento = datos.ayuntamiento ?? 0;
      this.silo = datos.silo ?? 0;
      this.granero = datos.granero ?? 0;
      this.restaurante = datos.restaurante ?? 0;
      this.supermercado = datos.supermercado ?? 0;
      this.cine = datos.cine ?? 0;
      this.hostal = datos.hostal ?? 0;
      this.spa = datos.spa ?? 0;
      this.chiringuito = datos.chiringuito ?? 0;
      this.tiendaDeRegalos = datos.tiendaDeRegalos ?? 0;
    }

    haceFalta(): number
    {
      return this.tengo - (this.ampliarTerreno + this.estacion + this.ayuntamiento + this.silo + this.granero + this.supermercado + this.cine + this.hostal + this.spa + this.chiringuito + this.tiendaDeRegalos);
    }

    fondoFalta(): string
    {
//console.log(this.nombre + ". Tengo: " + this.tengo + ". HaceFalta: " + this.haceFalta());
      if (this.haceFalta() < 0)
      {
//console.log(this.nombre + ". No tengo suficiente");
       return "fondo-falta";
      }
      else if (this.haceFalta() > 0)
      {
//console.log(this.nombre + ". Me sobra");
        return "fondo-sobra";
      }
      else
        return "";
    }

    puedeSerNegrita(campo: string): string
    {
      if (campo == "ampliarTerreno" && this.necesidadesTerreno.includes(this.nombre))
        return "negrita";
      else if (campo == "estacion" && this.necesidadesEstacion.includes(this.nombre))
        return "negrita";
      else if (campo == "ayuntamiento" && this.necesidadesAyuntamiento.includes(this.nombre))
        return "negrita";
      else if (campo == "silo" && this.necesidadesSilo.includes(this.nombre))
        return "negrita";
      else if (campo == "granero" && this.necesidadesGranero.includes(this.nombre))
        return "negrita";
      else if (campo == "restaurante" && this.necesidadesRestaurante.includes(this.nombre))
        return "negrita";
      else if (campo == "supermercado" && this.necesidadesSupermercado.includes(this.nombre))
        return "negrita";
      else if (campo == "cine" && this.necesidadesCine.includes(this.nombre))
        return "negrita";
      else if (campo == "hostal" && this.necesidadesHostal.includes(this.nombre))
        return "negrita";
      else if (campo == "spa" && this.necesidadesSpa.includes(this.nombre))
        return "negrita";
      else if (campo == "chiringuito" && this.necesidadesChiringuito.includes(this.nombre))
        return "negrita";
      else if (campo == "tiendaDeRegalos" && this.necesidadesTiendaDeRegalos.includes(this.nombre))
        return "negrita";
      else
        return "";
    }

    tdBgColor(campo: string): string
    {
      
      if (campo == "ampliarTerreno" && this.tengo > 0 && this.ampliarTerreno > 0 && this.necesidadesTerreno.includes(this.nombre) && this.tengo >= this.ampliarTerreno)
        return "green";
      else if (campo == "estacion" && this.tengo > 0 && this.estacion > 0  && this.necesidadesEstacion.includes(this.nombre) && this.tengo >= this.estacion)
        return "green";
      else if (campo == "ayuntamiento" && this.tengo > 0 && this.ayuntamiento > 0 && this.necesidadesAyuntamiento.includes(this.nombre) && this.tengo >= this.ayuntamiento)
        return "green";
      else if (campo == "silo" && this.tengo > 0 && this.silo > 0  && this.necesidadesSilo.includes(this.nombre) && this.tengo >= this.silo)
        return "green";
      else if (campo == "granero" && this.tengo > 0 && this.granero > 0  && this.necesidadesGranero.includes(this.nombre) && this.tengo >= this.granero)
        return "green";
      else if (campo == "restaurante" && this.tengo > 0 && this.restaurante > 0  && this.necesidadesRestaurante.includes(this.nombre) && this.tengo >= this.restaurante)
        return "green";
      else if (campo == "supermercado" && this.tengo > 0 && this.supermercado > 0 && this.necesidadesSupermercado.includes(this.nombre) && this.tengo >= this.supermercado)
        return "green";
      else if (campo == "cine" && this.tengo > 0 && this.cine > 0 && this.necesidadesCine.includes(this.nombre) && this.tengo >= this.cine)
        return "green";
      else if (campo == "hostal" && this.tengo > 0 && this.hostal > 0 && this.necesidadesHostal.includes(this.nombre) && this.tengo >= this.hostal)
        return "green";
      if (campo == "spa" && this.tengo > 0 && this.spa > 0 && this.necesidadesSpa.includes(this.nombre) && this.tengo >= this.spa)
        return "green";
      else if (campo == "chiringuito" && this.tengo > 0 && this.chiringuito > 0 && this.necesidadesChiringuito.includes(this.nombre) && this.tengo >= this.chiringuito)
        return "green";
      else if (campo == "tiendaDeRegalos" && this.tengo > 0 && this.tiendaDeRegalos > 0 && this.necesidadesTiendaDeRegalos.includes(this.nombre) && this.tengo >= this.tiendaDeRegalos)
        return "green";
      else
        return "";
    }    
}

// 2. Create a FirestoreDataConverter for your Producto class
export const herramientaConverter: FirestoreDataConverter<HerramientaModel> = 
{
  // Converts an Pedido object to a plain JavaScript object for Firestore
  toFirestore: (herramienta: HerramientaModel): DocumentData => {
    return {
            nombre : herramienta.nombre,
            tengo : herramienta.tengo,
            ampliarTerreno : herramienta.ampliarTerreno,
            estacion : herramienta.estacion,
            ayuntamiento : herramienta.ayuntamiento,
            silo : herramienta.silo,
            granero : herramienta.granero,
            supermercado : herramienta.supermercado,
            cine : herramienta.cine,
            hostal : herramienta.hostal,
            spa : herramienta.spa,
            chiringuito : herramienta.chiringuito,
            tiendaDeRegalos : herramienta.tiendaDeRegalos,
            restaurante: herramienta.restaurante
    };
  },

  // Converts a Firestore DocumentData snapshot back into an Pedido object
  fromFirestore: (snapshot: QueryDocumentSnapshot,options: SnapshotOptions): HerramientaModel => 
  {
    const data = snapshot.data(options);

    return new HerramientaModel(
      {     'id':             snapshot.id,
            'nombre': data['nombre'],
            'tengo': data['tengo'],
            'ampliarTerreno': data['ampliarTerreno'],
            'estacion': data['estacion'],
            'ayuntamiento': data['ayuntamiento'],
            'silo': data['silo'],
            'granero': data['granero'],
            'supermercado': data['supermercado'],
            'cine': data['cine'],
            'hostal': data['hostal'],
            'spa': data['spa'],
            'chiringuito': data['chiringuito'],
            'tiendaDeRegalos': data['tiendaDeRegalos'],
            'restaurante': data['restaurante']
        }
    );
  }

}


