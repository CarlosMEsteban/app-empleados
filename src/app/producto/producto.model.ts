import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";

export class ProductoModel {
    cProductoId: string = "";
    id: number = -1;
    nombre: string = "";
    coste: number = -1;
    tengo: number = -1;
    almacen: string = "";
    materiaPrima: string = "";
    cantidadInicial: number = -1;
    fabrica: string = "";


    //constructor(id: number = -1, nombre: string, coste: number, tengo: number, almacen: string, materiaPrima: boolean, cantidadInicial: number, fabrica: string ) 
    constructor(datos: Partial<ProductoModel>) 
    {
      this.cProductoId = datos.cProductoId ?? "";
       this.id = datos.id ?? -1;
        this.nombre = datos.nombre ?? "";
        this.coste = datos.coste ?? -1;
        this.tengo = datos.tengo ?? -1;
        this.almacen = datos.almacen ?? "";
        this.materiaPrima = datos.materiaPrima ?? "";
        this.cantidadInicial = datos.cantidadInicial ?? -1;
        this.fabrica = datos.fabrica ?? "";
    }



    getId(): number{return this.id;}
    getNombre(): string{return this.nombre;}
    getCoste(): number{return this.coste;}
    getTengo(): number{return this.tengo;}
    getAlmacen(): string{return this.almacen;}
    getMateriaPrima(): string{return this.materiaPrima;}
    getCantidadInicial(): number{return this.cantidadInicial;}
    getFabrica(): string{return this.fabrica;}    

    setId(id: number){this.id = id;}
    setNombre(nombre: string){this.nombre = nombre;}
    setCoste(coste: number){this.coste = coste;}
    setTengo(tengo: number){this.tengo = tengo;}
    setAlmacen(almacen: string){this.almacen = almacen;}
    setMateriaPrima(materiaPrima: string){this.materiaPrima = materiaPrima;}
    setCantidadInicial(cantidadInicial: number){this.cantidadInicial = cantidadInicial;}
    setFabrica(fabrica: string){this.fabrica = fabrica;}

}

// 2. Create a FirestoreDataConverter for your Producto class
export const productoConverter: FirestoreDataConverter<ProductoModel> = {
  // Converts an Producto object to a plain JavaScript object for Firestore
  toFirestore: (producto: ProductoModel): DocumentData => {
    return {
            id:producto.getId(),
            nombre: producto.getNombre(),
            coste : producto.getCoste(),
            tengo : producto.getTengo(),
            almacen : producto.getAlmacen(),
            materiaPrima : producto.getMateriaPrima() === "S",
            cantidadInicial : producto.getCantidadInicial(),
            fabrica : producto.getFabrica()
    };
  },

  // Converts a Firestore DocumentData snapshot back into an Empleado object
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): ProductoModel => {
    const data = snapshot.data(options);
//console.log("fromFirestore producto", data);
    return new ProductoModel(
      {
                 'id':       data['id'],
                 'nombre':       data['nombre'],
                 'coste':       data['coste'],
                 'tengo':       data['tengo'],
                 'almacen':       data['almacen'],
                 'materiaPrima':       data['materiaPrima '],
                 'cantidadInicial':        data['cantidadInicial'],
                 'fabrica':       data['fabrica']
      }
    );
  }
};