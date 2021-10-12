import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPokedetailsComponent } from '../modal-pokedetails/modal-pokedetails.component';

@Component({
  selector: 'card-col',
  templateUrl: './card-col.component.html',
  styleUrls: ['./card-col.component.scss'],
})
export class CardColComponent implements OnInit {

  // Pokemon details data.
  @Input() pokemonsDetail: Array<any> = [];

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit( ) { }

  // Little animation when hovering the poké cards.
  animationBounce(event: any, status: boolean) {
    let hoveredPokemonCard = event.target;
    if (status) {
      hoveredPokemonCard.classList.add('animate__animated', 'animate__pulse');
    } else {
      hoveredPokemonCard.classList.remove('animate__animated', 'animate__pulse');
    }
  }

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
}
