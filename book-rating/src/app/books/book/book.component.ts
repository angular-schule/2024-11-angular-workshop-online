import { Component, input, output } from '@angular/core';
import { Book } from '../shared/book';
import { RatingComponent } from "../rating/rating.component";
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [RatingComponent, CurrencyPipe, RouterLink],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent {
  // Input: hier fließen Daten von der Elternkomponente hinein
  // von oben nach unten
  // mit `input()` Ergebnis als Signal
  book = input.required<Book>();

  minRating = input(0);
  maxRating = input(10);

  // Output: hier fließen Daten zur Elternkomponente hinaus
  // von unten nach oben
  rateUp = output<Book>();
  rateDown = output<Book>();
  delete = output<Book>();

  doRateUp() {
    this.rateUp.emit(this.book());
  }

  doRateDown() {
    this.rateDown.emit(this.book());
  }

  doDelete() {
    if (confirm('Buch löschen?')) {
      this.delete.emit(this.book());
    }
  }
}
