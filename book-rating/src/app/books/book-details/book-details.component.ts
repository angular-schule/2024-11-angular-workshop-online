import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BookStoreService } from '../shared/book-store.service';
import { map, merge, Subject, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

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

  book = toSignal(this.route.paramMap.pipe(
    map(params => params.get('isbn')!),
    switchMap(isbn => this.bs.getSingle(isbn))
  ));

  /*reload$ = new Subject<void>();

  isbnFromReload$ = this.reload$.pipe(
    map(() => this.route.snapshot.paramMap.get('isbn')!)
  );

  isbnFromRoute$ = this.route.paramMap.pipe(
    map(params => params.get('isbn')!)
  );

  readonly book = toSignal(
    merge(
      this.isbnFromReload$,
      this.isbnFromRoute$
    ).pipe(
      switchMap(isbn => this.bs.getSingle(isbn))
    )
  );*/

}
