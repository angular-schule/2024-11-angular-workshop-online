import { createFeature, createReducer, on } from '@ngrx/store';
import { BookActions } from './book.actions';
import { Book } from '../shared/book';

export const bookFeatureKey = 'book';

export interface State {
  books: Book[];
  loading: boolean;
  error: string
}

export const initialState: State = {
  books: [],
  loading: false,
  error: '',
};

export const reducer = createReducer(
  initialState,
  on(BookActions.loadBooks, state => {
    return { ...state, loading: true };
  }),

  on(BookActions.loadBooksSuccess, (state, action): State => {
    return {
      ...state,
      books: action.data,
      loading: false
    }
  }),

  on(BookActions.loadBooksFailure, (state, action): State => {
    return {
      ...state,
      loading: false,
      error: action.error
    }
  }),
);

export const bookFeature = createFeature({
  name: bookFeatureKey,
  reducer,
});

