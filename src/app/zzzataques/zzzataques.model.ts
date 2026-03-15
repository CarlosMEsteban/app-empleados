import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";

export class AtaqueModel {
    public movimiento: string = "";
    public tipoAtaque: string = "";
    public DPS: number = 0;
    

    constructor(movimiento: string, tipoAtaque: string, DPS: number) {
        this.movimiento = movimiento;
        this.tipoAtaque = tipoAtaque;
        this.DPS = DPS;
        
    }
}

// FirestoreDataConverter for AtaqueModel
export const ataqueModelConverter: FirestoreDataConverter<AtaqueModel> = {
  toFirestore: (ataque: AtaqueModel): DocumentData => {
    return {
      movimiento: ataque.movimiento,
      tipoAtaque: ataque.tipoAtaque,
      DPS: ataque.DPS      
    };
  },

  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): AtaqueModel => {
    const data = snapshot.data(options);
    return new AtaqueModel(
      data['movimiento'],
      data['tipoAtaque'],
      data['DPS']
    );
  }
};

