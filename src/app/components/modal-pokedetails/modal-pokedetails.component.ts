import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Ability, Chain, Evolvesto, Officialartwork, PokemonDetails, Trigger, Type } from '../../interfaces/pokemon';

@Component({
  selector: 'app-modal-pokedetails',
  templateUrl: './modal-pokedetails.component.html',
  styleUrls: ['./modal-pokedetails.component.scss'],
})
export class ModalPokedetailsComponent implements OnInit {

  // Pokemon details.
  @Input() id: any = '';

  // Evolution chain values.
  evolutionChain: Chain = null;
  evolutionSpecies: Evolvesto[] = [];
  firstEvolution: Trigger = null;
  secondEvolution: Trigger = null;

  // Pokémon evolution chain content data.
  pokemonEvolutionChain: Array<any> = [];

  // Pokemon details values.
  pokemonName: PokemonDetails = null;
  pokemonImg: Officialartwork = null;
  pokemonTypes: Type[] = [];
  typeNames: Array<any> = [];

  // Pokémon details content data.
  pokemonsDetails: Array<any> = [];

  constructor(
    private modalController: ModalController,
    private pokemonService: PokemonService
  ) { }

  ngOnInit() {
    this.getPokemonSpecies(this.id['id']);
  }

  closeModal() {
    this.modalController.dismiss();
  }

  getPokemonSpecies(id: string) {
    this.pokemonService.getPokemonSpecies(`https://pokeapi.co/api/v2/pokemon-species/${id}`).subscribe(
      dataSpecies => {
        const evoChain = dataSpecies.evolution_chain.url;
        this.pokemonService.getPokemonEvolutionChain(evoChain).subscribe(
          dataEvoChain => {
            this.evolutionChain = dataEvoChain.chain;
            this.evolutionSpecies = this.evolutionChain.evolves_to;
            //  Verify if pokémon has a evolution chain.
            if(this.evolutionSpecies.length === 0) {
              return;
            }
            // If not, continue.
            this.firstEvolution = this.evolutionSpecies[0].species;
            // Check if pokémon has a final evolution.
            if (this.evolutionSpecies[0].evolves_to.length > 0) {
              this.secondEvolution = this.evolutionSpecies[0].evolves_to[0].species;
            } else {
              this.secondEvolution = {
                name: 'no-evolution',
                url: 'no-evolution'
              };
            }
            // Populate object with the pokémon's evolution chain.
            this.pokemonEvolutionChain = [
              this.evolutionChain.species.name, 
              this.firstEvolution.name, 
              this.secondEvolution.name
            ];
            // Get details of each pokémons on evolution chain.
            this.pokemonEvolutionChain.forEach(element => {
              // Limit the calls based on evolutions quantity.
              if (element !== 'no-evolution') {
                this.pokemonService.getPokemonDetails(`https://pokeapi.co/api/v2/pokemon/${element}`).subscribe(
                  dataPokemonDetails => {
                    // Create pokemon details object.
                    this.pokemonName = dataPokemonDetails;
                    this.pokemonImg = this.pokemonName.sprites.other['official-artwork'];
                    this.pokemonTypes = this.pokemonName.types;
                    // Populate object with pokemon details.
                    this.pokemonsDetails.push({
                      id: this.pokemonName.id,
                      name: this.pokemonName.name,
                      image: this.pokemonImg.front_default,
                      type: this.pokemonTypes,
                      weight: this.pokemonName.weight,
                      height: this.pokemonName.height,
                      experience: this.pokemonName.base_experience,
                      abilities: this.pokemonName.abilities
                    });
                  },
                  errorPokemonDetails => {
                    console.log(errorPokemonDetails);
                  },
                  () => {
                    this.pokemonsDetails.sort(function (a, b) {
                      var keyA = a.id;
                      var keyB = b.id;
                      // Compare the 2 dates
                      if (keyA < keyB) return -1;
                      if (keyA > keyB) return 1;
                      return 0;
                    });
                  }
                );
              }
            });
          },
          errorEvoChain => {
            console.log(errorEvoChain);
          }
        );
      },
      errorSpecies => {
        console.log(errorSpecies);
      }
    );
  }
}
