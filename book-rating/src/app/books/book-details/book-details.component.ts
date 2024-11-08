import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BookStoreService } from '../shared/book-store.service';
import { Book } from '../shared/book';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss'
})
export class BookDetailsComponent {
  private route = inject(ActivatedRoute);
  private bs = inject(BookStoreService);

  book = signal<Book | undefined>(undefined);

  constructor() {
    // PULL
    // this.route.snapshot.paramMap.get('isbn'); // path: 'books/:isbn'

    // PUSH
    this.route.paramMap.subscribe(params => {
      const isbn = params.get('isbn')!; // Non-Null Assertion
      this.bs.getSingle(isbn).subscribe(book => {
        this.book.set(book);
      });
    });
  }

}
