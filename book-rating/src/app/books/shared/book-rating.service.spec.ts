import { TestBed } from '@angular/core/testing';

import { BookRatingService } from './book-rating.service';
import { Book } from './book';

describe('BookRatingService', () => {
  let service: BookRatingService;
  let testBook: Book;

  beforeEach(() => {
    // Arrange
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookRatingService);

    testBook = {
      isbn: '123',
      title: 'Angular',
      rating: 3,
      price: 1,
      description: ''
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should rate up a book by one', () => {
    // Arrange
    testBook.rating = 3;

    // Act
    const ratedBook = service.rateUp(testBook);

    // Assert
    expect(ratedBook.rating).toBe(4);
  });

  it('should rate down a book by one', () => {
    testBook.rating = 3;
    const ratedBook = service.rateDown(testBook);
    expect(ratedBook.rating).toBe(2);
  });

  it('should not rate lower than 1', () => {
    testBook.rating = 1;
    const ratedBook = service.rateDown(testBook);
    expect(ratedBook.rating).toBe(1);
  });

  it('should not rate higher than 5', () => {
    testBook.rating = 5;
    const ratedBook = service.rateUp(testBook);
    expect(ratedBook.rating).toBe(5);
  });
});
