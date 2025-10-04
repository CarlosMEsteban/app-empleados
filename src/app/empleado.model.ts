import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";

export class Empleado {
    public nombre: string = "";
    public apellido: string = "";
    public cargo: string = "";
    public salario: number = 0;

    constructor(nombre: string, 
                apellido: string,
                cargo: string,
                salario: number) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.cargo = cargo;
        this.salario = salario;
    }
}

// 2. Create a FirestoreDataConverter for your Empleado class
export const empleadoConverter: FirestoreDataConverter<Empleado> = {
  // Converts an Empleado object to a plain JavaScript object for Firestore
  toFirestore: (empleado: Empleado): DocumentData => {
    return {
      nombre: empleado.nombre,
      apellido: empleado.apellido,
      cargo: empleado.cargo,
      salario: empleado.salario,
    };
  },

  // Converts a Firestore DocumentData snapshot back into an Empleado object
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Empleado => {
    const data = snapshot.data(options);
    return new Empleado(
      data['nombre'],
      data['apellido'],
      data['cargo'],
      data['salario']      
    );
  }
};