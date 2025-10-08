import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";

export class ProductoModel {
    private id: number = -1;
    private nombre: string = "";
    private coste: number = -1;
    private tengo: number = -1;
    private almacen: string = "";
    private materiaPrima: boolean = false;
    private cantidadInicial: number = -1;
    private fabrica: string = "";


    constructor(id: number = -1, nombre: string, coste: number, tengo: number, almacen: string, materiaPrima: boolean, cantidadInicial: number, fabrica: string ) 
    {
        this.id = id;
        this.nombre = nombre;
        this.coste = coste;
        this.tengo = tengo;
        this.almacen = almacen;
        this.materiaPrima = materiaPrima;
        this.cantidadInicial = cantidadInicial;
        this.fabrica = fabrica;
    }



    getId(): number{return this.id;}
    getNombre(): string{return this.nombre;}
    getCoste(): number{return this.coste;}
    getTengo(): number{return this.tengo;}
    getAlmacen(): string{return this.almacen;}
    getMateriaPrima(): boolean{return this.materiaPrima;}
    getCantidadInicial(): number{return this.cantidadInicial;}
    getFabrica(): string{return this.fabrica;}    

    setId(id: number){this.id = id;}
    setNombre(nombre: string){this.nombre = nombre;}
    setCoste(coste: number){this.coste = coste;}
    setTengo(tengo: number){this.tengo = tengo;}
    setAlmacen(almacen: string){this.almacen = almacen;}
    setMateriaPrima(materiaPrima: boolean){this.materiaPrima = materiaPrima;}
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
            materiaPrima : producto.getMateriaPrima(),
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
    return new ProductoModel(
                        data['id'],
                        data['nombre'],
                        data['coste '],
                        data['tengo '],
                        data['almacen '],
                        data['materiaPrima '],
                        data['cantidadInicial '],
                        data['fabrica ']
    );
  }
};