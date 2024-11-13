import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromBook from './book.reducer';

export const selectBookState = createFeatureSelector<fromBook.State>(
  fromBook.bookFeatureKey
);

// export const selectBooks = createSelector(selectBookState, state => state.books);
// export const selectLoading = createSelector(selectBookState, state => state.loading);

export const { selectBooks, selectLoading, selectError } = fromBook.bookFeature;

/*
const myState = {
  book: {
    books: [],
    loading: true,
    error: ''
  }
};


const result = selectBooks(myState);
*/
