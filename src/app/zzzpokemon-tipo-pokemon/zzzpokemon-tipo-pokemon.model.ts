import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";

export class PokemonTipoPokemonModel {
    public pokemon: string = "";
    public tipoPokemon: string = "";
    constructor(
        pokemon: string,
        tipoPokemon: string
    )
    {
        this.pokemon = pokemon;
        this.tipoPokemon = tipoPokemon;
    }
}


// FirestoreDataConverter for MisPokemonModel
export const pokemonTipoPokemonModelConverter: FirestoreDataConverter<PokemonTipoPokemonModel> = {
  toFirestore: (pokemon: PokemonTipoPokemonModel): DocumentData => {
    return {
      pokemon: pokemon.pokemon,
      tipoPokemon: pokemon.tipoPokemon
    };
  },

  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): PokemonTipoPokemonModel => {
    const data = snapshot.data(options);
    return new PokemonTipoPokemonModel(
      data['pokemon'],
      data['tipoPokemon']
    );
  }
};

  

