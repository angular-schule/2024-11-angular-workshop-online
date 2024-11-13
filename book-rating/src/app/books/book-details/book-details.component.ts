import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BookStoreService } from '../shared/book-store.service';
import { map, switchMap } from 'rxjs';
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

}
