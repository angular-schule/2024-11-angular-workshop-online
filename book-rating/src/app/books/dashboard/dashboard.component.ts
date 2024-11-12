import { Component, inject, OnDestroy, signal } from '@angular/core';
import { Book } from '../shared/book';
import { BookComponent } from '../book/book.component';
import { BookRatingService } from '../shared/book-rating.service';
import { BookStoreService } from '../shared/book-store.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BookComponent, DatePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnDestroy {
  books = signal<Book[]>([]);
  private rs = inject(BookRatingService);
  private bs = inject(BookStoreService);

  d = signal(Date.now());
  private dateInterval = setInterval(() => {
    this.d.set(Date.now());
  }, 1000);

  constructor() {
    this.bs.getAll().subscribe((receivedBooks) => {
      this.books.set(receivedBooks);
    });
  }

  doRateUp(book: Book) {
    const ratedBook = this.rs.rateUp(book);
    this.updateList(ratedBook);
  }

  doRateDown(book: Book) {
    const ratedBook = this.rs.rateDown(book);
    this.updateList(ratedBook);
  }

  doDelete(book: Book) {
    this.bs.delete(book.isbn).subscribe(() => {
      // lokal entfernen
      // this.books.update(books => books.filter(b => b.isbn !== book.isbn));

      // Liste neu laden
      this.bs.getAll().subscribe(books => this.books.set(books));
    })
  }

  private updateList(ratedBook: Book) {
    // [1,2,3,4,5,6,7,8,9].filter(e => e < 5); // [1,2,3,4]
    // [1,2,3,4,5,6].map(e => e * 10) // [10, 20, 30, 40, 50, 60]

    this.books.update((currentBooks) => {
      return currentBooks.map((book) => {
        if (book.isbn === ratedBook.isbn) {
          return ratedBook;
        } else {
          return book;
        }
      });
    });
  }

  ngOnDestroy() {
    clearInterval(this.dateInterval);
  }
}
