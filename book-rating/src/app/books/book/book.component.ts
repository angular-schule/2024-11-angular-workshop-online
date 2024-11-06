import { Component, input } from '@angular/core';
import { Book } from '../shared/book';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent {
  // Input: hier fließen Daten von der Elternkomponente hineinfließen
  // von oben nach unten
  // mit `input()` Ergebnis als Signal
  book = input.required<Book>();
}
