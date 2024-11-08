import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Book } from './book';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {
  private readonly apiUrl = 'https://api.angular.schule';
  private http = inject(HttpClient);

  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl + '/books');
  }

  getSingle(isbn: string): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/books/${isbn}`);
  }

  create(book: Book): Observable<Book> {
    return this.http.post<Book>(`${this.apiUrl}/books`, book);
  }

  search(term: string): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl + '/books/search/' + term)
  }
}
