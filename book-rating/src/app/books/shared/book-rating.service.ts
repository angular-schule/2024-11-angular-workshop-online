import { Injectable } from '@angular/core';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookRatingService {

  constructor() { }

  rateUp(book: Book): Book {
    return {
      ...book,
      rating: Math.min(book.rating + 1, 5)
      // rating: book.rating < 5 ? book.rating + 1 : 5
    };
  }

  rateDown(book: Book): Book {
    // Early Exit
    if (book.rating <= 1) {
      return book;
    }

    return {
      ...book,
      rating: book.rating - 1
    };
  }
}
