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
    })
    /*this.descargarEvolucionar();
    this.descargarMejoresAtaques();
    this.descargarMisPokemones();
    this.descargarMisPokemonDinamax();
    this.descargarMultiplicador();
    this.descargarPokemon();
    this.descargarPokemonTipo();
    this.descargarSinEvolucionar();
    this.descargarTipoPokemon();
    this.descargarValorHistorico();*/
  ]).then(() => {
    new Ficheros().downloadZipFile(lArchivos, "datosPokemonGo.zip");
  });
  }

  async descargarAtaques(): Promise<string> {
    let cadena = "";
    console.log('Comienza la carga de ataques...');
    let ataques = await this.ataquesServicio.todos()
      console.log("Ataques descargados:", ataques.length);
      let i = 0;
      ataques.forEach(ataque => {
        //new AtaqueModel("A Bocajarro", "Lucha", 43.5),
        cadena += `new AtaqueModel("${ataque.movimiento}", "${ataque.tipoAtaque}", ${ataque.DPS}),\n`;
        i++;
      });
      //new Ficheros().downloadZipFile(cadena, "ataques.txt");
      return cadena;
    
    
  }

  async descargarAvance(): Promise<string> {
    let cadena = "";
    console.log('Comienza la carga de avances...');
    let avances = await this.avanceServicio.todos();
      console.log("Avances descargados:", avances.length);
      let i = 0;
      avances.forEach(avance => {
        cadena += `new AvanceModel("${avance.fecha}", "${avance.hora}", ${avance.pxIniciales}, ${avance.pxFinales}),\n`;
        i++;
      });
      //Ficheros.downloadTextFile(cadena, "avances.txt");
  
    return cadena;
  }






}
