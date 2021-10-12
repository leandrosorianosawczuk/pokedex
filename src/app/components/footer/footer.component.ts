import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  // Paginator.
  @Input() paginator: number;

  // New page value after pagination.
  @Output() newPage = new EventEmitter<any>();

  constructor() { }

  ngOnInit() { }

  // Pagination buttons method.
  previousPokemons() {
    this.paginator -= 20;
    this.newPage.emit(this.paginator);
  }

  nextPokemons() {
    this.paginator += 20;
    this.newPage.emit(this.paginator);
  }

}
