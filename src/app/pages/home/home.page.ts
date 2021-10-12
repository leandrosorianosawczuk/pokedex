import { Component, OnInit } from '@angular/core';
import { Officialartwork, Pokemon, PokemonDetails, Type } from 'src/app/interfaces/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  // Paginator.
  page: number = 0;

  // Pokémon details values.
  pokemons: Pokemon[] = [];
  pokemonName: PokemonDetails = null;
  pokemonImg: Officialartwork = null;
  pokemonTypes: Type[] = [];
  typeNames: Array<any> = [];

  // Pokémon details content data.
  pokemonsDetails: Array<any> = [];

  constructor(
    private pokemonService: PokemonService
  ) {}

  ngOnInit() {
    this.getPokemons(this.page);
  }

  getPokemons(page: number) {
    this.pokemonsDetails = [];
    this.pokemonService.getPokemons(page).subscribe(
      dataPokemons => {
        this.pokemons = dataPokemons.results;
        this.pokemons.forEach(value => {
          this.pokemonService.getPokemonDetails(value.url).subscribe(
            dataPokemonDetails => {
              // Create pokemon details object.
              this.pokemonName = dataPokemonDetails;
              this.pokemonImg = this.pokemonName.sprites.other['official-artwork'];
              this.pokemonTypes = this.pokemonName.types;
              // Populate object with pokemon details.
              let pokemonStats = {
                id: this.pokemonName.id,
                name: this.pokemonName.name,
                image: this.pokemonImg.front_default,
                type: this.pokemonTypes,
                weight: this.pokemonName.weight,
                height: this.pokemonName.height,
                experience: this.pokemonName.base_experience,
                abilities: this.pokemonName.abilities
              }
              this.pokemonsDetails.push(pokemonStats);
            },
            errorPokemonDetails => {
              console.log(errorPokemonDetails);
            },
            // Make sure that cards are always properly sorted.
            () => {
              this.pokemonsDetails.sort(function (a, b) {
                var keyA = a.id;
                var keyB = b.id;
                if (keyA < keyB) return -1;
                if (keyA > keyB) return 1;
                return 0;
              });
            }
          )
        });
      },
      errordataPokemons => {
        console.log(errordataPokemons);
      }
    );
  }
}
