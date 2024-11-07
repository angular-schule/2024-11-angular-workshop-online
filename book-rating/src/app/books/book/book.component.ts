import { Component, input, output } from '@angular/core';
import { Book } from '../shared/book';
import { RatingComponent } from "../rating/rating.component";

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [RatingComponent],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent {
  // Input: hier fließen Daten von der Elternkomponente hinein
  // von oben nach unten
  // mit `input()` Ergebnis als Signal
  book = input.required<Book>();

  // Output: hier fließen Daten zur Elternkomponente hinaus
  // von unten nach oben
  rateUp = output<Book>();
  rateDown = output<Book>();

  doRateUp() {
    this.rateUp.emit(this.book());
  }

  doRateDown() {
    this.rateDown.emit(this.book());
  }
}