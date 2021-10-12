import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PokemonDetails, PokemonEvolutionChain, Pokemons, PokemonSpecies } from '../interfaces/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(
    private http: HttpClient
  ) { }

  // Method to get all available pokémons. 200 will be the limit for this project.
  getPokemons(offset: number) {
    return this.http.get<Pokemons>(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`);
  }

  // Method to get all pokémons details based on id.
  getPokemonDetails(url: string) {
    return this.http.get<PokemonDetails>(url);
  }

  // Method to get pokémon's species. Necessary for obtaining the evolution chain.
  getPokemonSpecies(url: string) {
    return this.http.get<PokemonSpecies>(url);
  }

  // Method to get pokémon's evolution chain.
  getPokemonEvolutionChain(url: string) {
    return this.http.get<PokemonEvolutionChain>(url);
  }
}