import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Book } from '../shared/book';

export const BookActions = createActionGroup({
  source: 'Book',
  events: {
    'Load Books': emptyProps(),
    'Load Books Success': props<{ data: Book[] }>(),
    'Load Books Failure': props<{ error: string }>(),
    'Rate Up': props<{ book: Book }>(),
    'Rate Down': props<{ book: Book }>(),
  }
});
