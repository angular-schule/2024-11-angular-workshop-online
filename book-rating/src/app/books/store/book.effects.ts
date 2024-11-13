import { inject, Injectable, runInInjectionContext } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap } from 'rxjs/operators';
import { Observable, EMPTY, of, interval } from 'rxjs';
import { BookActions } from './book.actions';
import { BookStoreService } from '../shared/book-store.service';


@Injectable()
export class BookEffects {

  /*
- wenn loadBooks kommt, dann …
- Buchliste laden HTTP
- bei Erfolg: loadBooksSuccess dispatchen
- bei Fehler: loadBooksFailure dispatchen
  */

  private actions$ = inject(Actions);
  private bs = inject(BookStoreService);

  loadBooks$ = createEffect(() => {
    // return interval(1000).pipe(map(i => ({ type: 'Interval', step: i })))
    return this.actions$.pipe(
      ofType(BookActions.loadBooks),
      switchMap(action => this.bs.getAll().pipe(
        map(books => BookActions.loadBooksSuccess({ data: books })),
        catchError(err => of(BookActions.loadBooksFailure({ error: err.message })))
      ))
    )
  })
}
