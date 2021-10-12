import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPokedetailsComponent } from '../modal-pokedetails/modal-pokedetails.component';

@Component({
  selector: 'evolution-card',
  templateUrl: './evolution-card.component.html',
  styleUrls: ['./evolution-card.component.scss'],
})
export class EvolutionCardComponent implements OnInit {

  // Pokemon details for evolution chain cards.
  @Input() pokemonsDetail: Array<any> = []; 

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() { }

  // Modal for pokémon details.
  async presentModal(id: string) {
    const modal = await this.modalController.create({
      component: ModalPokedetailsComponent,
      componentProps: {
        id: this.pokemonsDetail.find(element => element.id == id)
      }
    });
    return await modal.present();
  }

  // Little animation when hovering the poké cards.
  animationBounce(event: any, status: boolean) {
    let hoveredPokemonCard = event.target;
    if (status) {
      hoveredPokemonCard.classList.add('animate__animated', 'animate__pulse');
    } else {
      hoveredPokemonCard.classList.remove('animate__animated', 'animate__pulse');
    }
  }
}
