import { Component } from '@angular/core';
import { ZZZAtaquesService } from '../zzzataques/zzzataques.service';
import { EvolucionarService } from '../zzzevolucionar/zzzevolucionar.service';
import { MejoresAtaquesService } from '../zzzmejores-ataques/mejores-ataques.service';
import { MisPokemonService } from '../zzzmis-pokemon/zzzmis-pokemon.service';
import { MultiplicadorPolvosService } from '../zzzmultiplicador-polvos/zzzmultiplicador-polvos.service';
import { PokemonService } from '../zzzpokemon/zzzpokemon.service';
import { PokemonTipoPokemonService } from '../zzzpokemon-tipo-pokemon/zzzpokemon-tipo-pokemon.service';
import { SinEvolucionarService } from '../zzzsin-evolucionar/zzzsin-evolucionar.service';
import { TipoPokemonService } from '../zzztipo-pokemon/zzztipo-pokemon.service';
import { valorHistoricoService } from '../zzzvalor-historico/zzzvalorHistorico.service';
import { AvancePokemonGoService } from '../zzzavance/zzzavance.service';
import { MisPokemonDinamaxService } from '../zzzmis-pokemon-dinamax/zzzmis-pokemon.dinamax.service';
import { Ficheros } from '../util/ficheros';
import { AtaqueModel } from '../zzzataques/zzzataques.model';
import { AvanceModel } from '../avance/avance.model';
import { evolucionarModel } from '../zzzevolucionar/zzzevolucionar.model';
import { MejoresAtaquesModel } from '../zzzmejores-ataques/zzzmejoresAataques.model';
import { MisPokemonModel } from '../zzzmis-pokemon/zzzmisPokemon.model';
import { valorHistoricoModel } from '../zzzvalor-historico/zzzvalorHistorico.model';

@Component({
  selector: 'app-zzzdescargar-todo',
  imports: [],
  templateUrl: './zzzdescargar-todo.html',
  styleUrl: './zzzdescargar-todo.css'
})
export class ZzzdescargarTodo {
  ataquesServicio: ZZZAtaquesService;
  avanceServicio: AvancePokemonGoService;
  evolucionarServicio: EvolucionarService;
  mejoresAtaquesServicio: MejoresAtaquesService;
  misPokemonesServicio: MisPokemonService;
  misPokemonDinamaxServicio: MisPokemonDinamaxService;
  multiplicadorServicio: MultiplicadorPolvosService;
  pokemonServicio: PokemonService;
  pokemonTipoServicio: PokemonTipoPokemonService;
  sinEvolucionarServicio: SinEvolucionarService;
  tipoPokemonServicio: TipoPokemonService;
  valorHistoricoServicio: valorHistoricoService;
  


  constructor(
    ataquesServicio: ZZZAtaquesService,
    avanceServicio: AvancePokemonGoService,
    evolucionarServicio: EvolucionarService,
    mejoresAtaquesServicio: MejoresAtaquesService,
    misPokemonesServicio: MisPokemonService,
    misPokemonDinamaxServicio: MisPokemonDinamaxService,
    multiplicadorServicio: MultiplicadorPolvosService,
    pokemonServicio: PokemonService,
    pokemonTipoServicio: PokemonTipoPokemonService,
    sinEvolucionarServicio: SinEvolucionarService,
    tipoPokemonServicio: TipoPokemonService,
    valorHistoricoServicio: valorHistoricoService
  ) {
    this.ataquesServicio = ataquesServicio;
    this.avanceServicio = avanceServicio;
    this.evolucionarServicio = evolucionarServicio;
    this.mejoresAtaquesServicio = mejoresAtaquesServicio;
    this.misPokemonesServicio = misPokemonesServicio;
    this.misPokemonDinamaxServicio = misPokemonDinamaxServicio;
    this.multiplicadorServicio = multiplicadorServicio;
    this.pokemonServicio = pokemonServicio;
    this.pokemonTipoServicio = pokemonTipoServicio;
    this.sinEvolucionarServicio = sinEvolucionarServicio;
    this.tipoPokemonServicio = tipoPokemonServicio;
    this.valorHistoricoServicio = valorHistoricoServicio;
  }

  descargarTodo() {
    let lArchivos: Array<[string, string]> = [];
    Promise.all([
     this.descargarAtaques().then(cadena => {
      lArchivos.push(["ataques.txt", cadena]);
    }),
    this.descargarAvance().then(cadena => {
      lArchivos.push(["avances.txt", cadena]);
    }),
    this.descargarEvolucionar().then(cadena => {
      lArchivos.push(["evolucionar.txt", cadena]);
    }),
    this.descargarMejoresAtaques().then(cadena => {
      lArchivos.push(["mejoresAtaques.txt", cadena]);
    }),
    this.descargarMisPokemones().then(cadena => {
      lArchivos.push(["misPokemones.txt", cadena]); 
    }),
    this.descargarMisPokemonDinamax().then(cadena => {
      lArchivos.push(["misPokemonDinamax.txt", cadena]);
    }),
    this.descargarMultiplicador().then(cadena => {
      lArchivos.push(["multiplicadores.txt", cadena]);
    }),
    this.descargarPokemon().then(cadena => {
      lArchivos.push(["pokemon.txt", cadena]);
    }),
    this.descargarPokemonTipo().then(cadena => {
      lArchivos.push(["pokemonTipos.txt", cadena]);
    }),
    this.descargarSinEvolucionar().then(cadena => {
      lArchivos.push(["sinEvolucionar.txt", cadena]);
    }),
    this.descargarTipoPokemon().then(cadena => {
      lArchivos.push(["tipoPokemon.txt", cadena]);
    }),
    this.descargarValorHistorico().then(cadena => {
      lArchivos.push(["valorHistorico.txt", cadena]);
    })
  ]).then(() => {
    new Ficheros().downloadZipFile(lArchivos, "datosPokemonGo.zip");
  });
  }

  async descargarAtaques(): Promise<string> {
    let cadena = "ataquesIniciales: AtaqueModel[] = [\n";
    console.log('Comienza la carga de ataques...');
    let ataques = await this.ataquesServicio.todos()
      console.log("Ataques descargados:", ataques.length);
      let i = 0;
      ataques.forEach(ataque => {
        cadena += `new AtaqueModel("${ataque.movimiento}", "${ataque.tipoAtaque}", ${ataque.DPS}),\n`;
        i++;
      });
      cadena += "];";
      return cadena;
    
  }

  async descargarAvance(): Promise<string> {
    let cadena = "avancesIniciales: AvanceModel[] = [\n";
    console.log('Comienza la carga de avances...');
    let avances = await this.avanceServicio.todos();
      console.log("Avances descargados:", avances.length);
      let i = 0;
      avances.forEach(avance => {
        //new AvanceModel(avance.fecha, avance.hora, avance.pxIniciales, avance.pxFinales);
        cadena += `new AvanceModel("${avance.fecha}", "${avance.hora}", ${avance.pxIniciales}, ${avance.pxFinales}),\n`;
        i++;
      });
      
    cadena += "];";
    return cadena;
  }

  
  async descargarEvolucionar(): Promise<string> {
    let cadena = "evolucionarIniciales: EvolucionarModel[] = [\n";
    console.log('Comienza la carga de evolucionar...');
    let evolucionar = await this.evolucionarServicio.obtener();
      console.log("Evolucionar descargados:", evolucionar.length);
      let i = 0;
      evolucionar.forEach(evolucion => {
        //new evolucionarModel(evolucion.pokemon, evolucion.observaciones, evolucion.bPosible, evolucion.bNuevo);
        cadena += `new EvolucionarModel("${evolucion.pokemon}", "${evolucion.observaciones}", ${evolucion.bPosible}, ${evolucion.bNuevo}),\n`;
        i++;
      });
      //Ficheros.downloadTextFile(cadena, "avances.txt");
    cadena += "];";
    return cadena;
  }


  async descargarMejoresAtaques(): Promise<string> {
    let cadena = "mejoresAtaquesIniciales: MejorAtaqueModel[] = [\n";
    console.log('Comienza la carga de mejores ataques...');
    let mejoresAtaques = await this.mejoresAtaquesServicio.getAllMejoresAtaques();
      console.log("Mejores ataques descargados:", mejoresAtaques.length);
      let i = 0;
      mejoresAtaques.forEach(ataque => {
        //new MejoresAtaquesModel(ataque.pokemon, ataque.ataque);
        cadena += `new MejorAtaqueModel("${ataque.pokemon}", "${ataque.ataque}"),\n`;
        i++;
      });
      cadena += "];";
      return cadena;

  }

  async descargarMisPokemones(): Promise<string> {
    let cadena = "misPokemonesIniciales: MisPokemonModel[] = [\n";
    console.log('Comienza la carga de mis pokemones...');
    let misPokemones = await this.misPokemonesServicio.obtenerMisPokemon();
      console.log("Mis pokemones descargados:", misPokemones.length);
      let i = 0;
      misPokemones.forEach(misPokemon => {
      /*new MisPokemonModel(misPokemon.nombre, 
                            misPokemon.BFavorito, 
                            misPokemon.Polvos, 
                            misPokemon.PC, 
                            misPokemon.Salud, 
                            misPokemon.AtaqueRapido, 
                            misPokemon.DPSETBAtaqueRapido, 
                            misPokemon.BNOPuedeMejorarRapido, 
                            misPokemon.AtaqueCargado, 
                            misPokemon.DPSETBAtaqueCargado, 
                            misPokemon.BNOPuedeMejorarCargado, 
                            misPokemon.ValorConMultiplicador, 
                            misPokemon.BUnico, 
                            misPokemon.ValorSinMultiplicador);*/
        cadena += `new MisPokemonModel("${misPokemon.nombre}", 
                                          ${misPokemon.BFavorito}, 
                                          ${misPokemon.Polvos}, 
                                          ${misPokemon.PC}, 
                                          ${misPokemon.Salud}, 
                                          "${misPokemon.AtaqueRapido}", 
                                          ${misPokemon.DPSETBAtaqueRapido}, 
                                          ${misPokemon.BNOPuedeMejorarRapido}, 
                                          "${misPokemon.AtaqueCargado}", 
                                          ${misPokemon.DPSETBAtaqueCargado}, 
                                          ${misPokemon.BNOPuedeMejorarCargado}, 
                                          ${misPokemon.ValorConMultiplicador}, 
                                          ${misPokemon.BUnico}, 
                                          ${misPokemon.ValorSinMultiplicador});),\n`;
        i++;
      });
      cadena += "];";
      return cadena;
  }

  async descargarMisPokemonDinamax(): Promise<string> {
    let cadena = "misPokemonDinamaxIniciales: MisPokemonDinamaxModel[] = [\n";
    console.log('Comienza la carga de mis pokemones dinamax...');
    let misPokemonDinamax = await this.misPokemonDinamaxServicio.obtener();
      console.log("Mis pokemones dinamax descargados:", misPokemonDinamax.length);
      let i = 0;
      misPokemonDinamax.forEach(misPokemonDinamax => {
        /*new MisPokemonDinamaxModel(nombre: string,
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
                                        ); */

        cadena += `new MisPokemonDinamaxModel("${misPokemonDinamax.nombre}",
                                          ${misPokemonDinamax.BFavorito},
                                          ${misPokemonDinamax.Polvos},
                                          ${misPokemonDinamax.PC},
                                          ${misPokemonDinamax.Salud},
                                          "${misPokemonDinamax.AtaqueRapido}",
                                          ${misPokemonDinamax.DPSETBAtaqueRapido},
                                          ${misPokemonDinamax.BNOPuedeMejorarRapido},
                                          "${misPokemonDinamax.AtaqueCargado}",
                                          ${misPokemonDinamax.DPSETBAtaqueCargado},
                                          ${misPokemonDinamax.BNOPuedeMejorarCargado},
                                          ${misPokemonDinamax.ValorConMultiplicador},
                                          ${misPokemonDinamax.BUnico},
                                          ${misPokemonDinamax.ValorSinMultiplicador},
                                          ${misPokemonDinamax.nivelAtaqueMax},
                                          ${misPokemonDinamax.nivelBarreraMax},
                                          ${misPokemonDinamax.nivelSaludMax}
                                          ),\n`;
        i++;
      });
      cadena += "];";
      return cadena;
  }

  async descargarMultiplicador(): Promise<string> {
    let cadena = "multiplicadoresIniciales: MultiplicadorPolvosModel[] = [\n";
    console.log('Comienza la carga de multiplicadores de polvos...');
    let multiplicadores = await this.multiplicadorServicio.obtenerMultiplicadores();
      console.log("Multiplicadores de polvos descargados:", multiplicadores.length);
      let i = 0;
      multiplicadores.forEach(multiplicador => {
        //new MultiplicadorPolvosModel(multiplicador.polvos, multiplicador.multiplicador);
        cadena += `new MultiplicadorPolvosModel(${multiplicador.polvos}, ${multiplicador.multiplicador}),\n`;
        i++;
      });
      cadena += "];";
      //new Ficheros().downloadZipFile(cadena, "multiplicadores.txt");
      return cadena;
  }

  async descargarPokemon(): Promise<string> {
    let cadena = "pokemonsIniciales: PokemonModel[] = [\n";
    console.log('Comienza la carga de pokemones...');
    let pokemones = await this.pokemonServicio.obtenerPokemons();
      console.log("Pokemones descargados:", pokemones.length);
      let i = 0;
      pokemones.forEach(pokemon => {
        //new PokemonModel(pokemon.nombre);
        cadena += `new PokemonModel("${pokemon.nombre}"),\n`;
        i++;
      });
      cadena += "];";
      return cadena;
  }  

  async descargarPokemonTipo(): Promise<string> {
    let cadena = "pokemonTiposIniciales: PokemonTipoModel[] = [\n";
    console.log('Comienza la carga de pokemon-tipo-pokemon...');
    let pokemonTipoPokemon = await this.pokemonTipoServicio.obtenerPokemonTipoPokemon();
      console.log("Pokemon-tipo-pokemon descargados:", pokemonTipoPokemon.length);
      let i = 0;
      pokemonTipoPokemon.forEach(pokemonTipo => {
        //new PokemonTipoPokemonModel(pokemonTipo.pokemon, pokemonTipo.tipo);
        cadena += `new PokemonTipoPokemonModel("${pokemonTipo.pokemon}", "${pokemonTipo.tipoPokemon}"),\n`;
        i++;
      });
      cadena += "];";
      
      return cadena;
  }

  async descargarSinEvolucionar(): Promise<string> {
    let cadena = "sinEvolucionarIniciales: SinEvolucionarModel[] = [\n";
    console.log('Comienza la carga de sin evolucionar...');
    let sinEvolucionar = await this.sinEvolucionarServicio.obtener();
      console.log("Sin evolucionar descargados:", sinEvolucionar.length);
      let i = 0;
      sinEvolucionar.forEach(sinEvolucionar => {
        //constructor(pokemon: string, totCaramelos: number, caramelos: number, kms: number, observaciones: string)
        cadena += `new SinEvolucionarModel("${sinEvolucionar.pokemon}", 
                                            ${sinEvolucionar.totCaramelos}, 
                                            ${sinEvolucionar.caramelos}, 
                                            ${sinEvolucionar.kms}, 
                                            "${sinEvolucionar.observaciones}"),\n`;
        i++;
      });
      
      cadena += "];";
      return cadena;
  }


  async descargarTipoPokemon(): Promise<string> {
    let cadena = "tipoPokemonIniciales: TipoPokemonModel[] = [\n";
    console.log('Comienza la carga de tipos de pokemon...');
    let tipoPokemon = await this.tipoPokemonServicio.obtenerTiposPokemon();
      console.log("Tipos de pokemon descargados:", tipoPokemon.length);
      let i = 0;
      tipoPokemon.forEach(tipo => {
        //new     constructor(tipo: string, cadena: string    )
        cadena += `new TipoPokemonModel("${tipo.tipo}", "${tipo.cadena}"),\n`;
        i++;
      });
      cadena += "];";
      return cadena;
  }

  async descargarValorHistorico(): Promise<string> {
    let cadena = "valorHistoricoIniciales: valorHistoricoModel[] = [\n";
    console.log('Comienza la carga de valor historico...');
    let valorHistorico = await this.valorHistoricoServicio.obtener();
      console.log("Valor historico descargados:", valorHistorico.length);
      let i = 0;  
      valorHistorico.forEach(valor => {
        //    constructor(fecha: string, valorMedio: number) 
        cadena += `new valorHistoricoModel("${valor.fecha}", ${valor.valorMedio}),\n`;
        i++;
      });
      //new Ficheros().downloadZipFile(cadena, "valorHistorico.txt");
      cadena += "];";

      return cadena;
  }
}
