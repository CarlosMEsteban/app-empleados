import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";

export class MisPokemonModel {
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
    public cadena: string = ""; 

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
        ValorSinMultiplicador: number
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
    }
}


// FirestoreDataConverter for MisPokemonModel
export const mejoresAtaqueModelConverter: FirestoreDataConverter<MisPokemonModel> = {
  toFirestore: (pokemon: MisPokemonModel): DocumentData => {
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
      ValorSinMultiplicador: pokemon.ValorSinMultiplicador
    };
  },

  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): MisPokemonModel => {
    const data = snapshot.data(options);
    return new MisPokemonModel(
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
      data['ValorSinMultiplicador']
    );
  }
};

