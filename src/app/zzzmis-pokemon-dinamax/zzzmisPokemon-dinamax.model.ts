import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";

export class MisPokemonDinamaxModel {
    public nombre: string = "";
    public BFavorito: boolean = false;
    public Polvos: number = 0;
    public PC: number = 0;
    public Salud: number = 0;
    public AtaqueRapido: string = "";
    public DPSETBAtaqueRapido: number = 0;
    public BNOPuedeMejorarRapido: boolean = false;
    public AtaqueCargado: string = "";
    public DPSETBAtaqueCargado: number = 0;
    public BNOPuedeMejorarCargado: boolean = false;
    public ValorConMultiplicador: number = 0;
    public BUnico: boolean = false;
    public ValorSinMultiplicador: number = 0;
    public nivelAtaqueMax: number = -1;
    public nivelBarreraMax: number = -1;
    public nivelSaludMax: number = -1;

    public cadena: string = ""; 
    public cadenaTipoPokemon: string = "";
    public cadenaMejoresAtaques: string = "";



    constructor(
        nombre: string,
        BFavorito: boolean,
        Polvos: number,
        PC: number,
        Salud: number,
        AtaqueRapido: string,
        DPSETBAtaqueRapido: number,
        BNOPuedeMejorarRapido: boolean,
        AtaqueCargado: string,
        DPSETBAtaqueCargado: number,
        BNOPuedeMejorarCargado: boolean,
        ValorConMultiplicador: number,
        BUnico: boolean,
        ValorSinMultiplicador: number,
        nivelAtaqueMax: number,
        nivelBarreraMax: number,
        nivelSaludMax: number

    ) {
        this.nombre = nombre;
        this.BFavorito = BFavorito;
        this.Polvos = Polvos;
        this.PC = PC;
        this.Salud = Salud;
        this.AtaqueRapido = AtaqueRapido;
        this.DPSETBAtaqueRapido = DPSETBAtaqueRapido;
        this.BNOPuedeMejorarRapido = BNOPuedeMejorarRapido;
        this.AtaqueCargado = AtaqueCargado;
        this.DPSETBAtaqueCargado = DPSETBAtaqueCargado;
        this.BNOPuedeMejorarCargado = BNOPuedeMejorarCargado;
        this.ValorConMultiplicador = ValorConMultiplicador;
        this.BUnico = BUnico;
        this.ValorSinMultiplicador = ValorSinMultiplicador;
        this.nivelAtaqueMax = nivelAtaqueMax;
        this.nivelBarreraMax = nivelBarreraMax;
        this.nivelSaludMax = nivelSaludMax;
    }

 public static multiSort(fields: { field: string, dir: 'asc' | 'desc' }[]): (a: any, b: any) => number {
  return (a: any, b: any) => {
    for (let { field, dir } of fields) {
      let result = 0;

      if (typeof a[field] === "string") {
        result = a[field].localeCompare(b[field]);
      } else {
        result = a[field] - b[field];
      }

      if (result !== 0) {
        return dir === 'asc' ? result : -result;
      }
    }
    return 0;
  };
}  


}


// FirestoreDataConverter for MisPokemonDinamaxModel
export const MisPokemonDinamaxConverter: FirestoreDataConverter<MisPokemonDinamaxModel> = {
  toFirestore: (pokemon: MisPokemonDinamaxModel): DocumentData => {
    return {
      nombre: pokemon.nombre,
      BFavorito: pokemon.BFavorito,
      Polvos: pokemon.Polvos,
      PC: pokemon.PC,
      Salud: pokemon.Salud,
      AtaqueRapido: pokemon.AtaqueRapido,
      DPSETBAtaqueRapido: pokemon.DPSETBAtaqueRapido,
      BNOPuedeMejorarRapido: pokemon.BNOPuedeMejorarRapido,
      AtaqueCargado: pokemon.AtaqueCargado,
      DPSETBAtaqueCargado: pokemon.DPSETBAtaqueCargado,
      BNOPuedeMejorarCargado: pokemon.BNOPuedeMejorarCargado,
      ValorConMultiplicador: pokemon.ValorConMultiplicador,
      BUnico: pokemon.BUnico,
      ValorSinMultiplicador: pokemon.ValorSinMultiplicador,
      nivelAtaqueMax: pokemon.nivelAtaqueMax,
      nivelBarreraMax: pokemon.nivelBarreraMax,
      nivelSaludMax: pokemon.nivelSaludMax
    };
  },

  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): MisPokemonDinamaxModel => {
    const data = snapshot.data(options);
    return new MisPokemonDinamaxModel(
      data['nombre'],
      data['BFavorito'],
      data['Polvos'],
      data['PC'],
      data['Salud'],
      data['AtaqueRapido'],
      data['DPSETBAtaqueRapido'],
      data['BNOPuedeMejorarRapido'],
      data['AtaqueCargado'],
      data['DPSETBAtaqueCargado'],
      data['BNOPuedeMejorarCargado'],
      data['ValorConMultiplicador'],
      data['BUnico'],
      data['ValorSinMultiplicador'],
      data['nivelAtaqueMax'],
      data['nivelBarreraMax'],
      data['nivelSaludMax']
    );
  }


  


};

