import { Component, inject, Signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Book } from '../shared/book';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, filter, startWith, switchMap, switchMapTo } from 'rxjs';
import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'app-book-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './book-search.component.html',
  styleUrl: './book-search.component.scss'
})
export class BookSearchComponent {
  private bs = inject(BookStoreService);
  searchControl = new FormControl('', { nonNullable: true });

  results = toSignal(this.searchControl.valueChanges.pipe(
    filter(value => value.length >= 3),
    debounceTime(500),
    switchMap(value => this.bs.search(value)),
  ), { initialValue: [] });
}
