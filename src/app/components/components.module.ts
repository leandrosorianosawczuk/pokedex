import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardColComponent } from './card-col/card-col.component';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ModalPokedetailsComponent } from './modal-pokedetails/modal-pokedetails.component';
import { EvolutionCardComponent } from './evolution-card/evolution-card.component';



@NgModule({
  declarations: [
    CardColComponent,
    HeaderComponent,
    FooterComponent,
    ModalPokedetailsComponent,
    EvolutionCardComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    CardColComponent,
    HeaderComponent,
    FooterComponent,
    ModalPokedetailsComponent,
    EvolutionCardComponent
  ]
})
export class ComponentsModule { }
