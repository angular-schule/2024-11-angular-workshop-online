import { Component, inject } from '@angular/core';
import { ReplaySubject, throwError, of, EMPTY, retry, catchError, Observable } from 'rxjs';

import { HistoryComponent } from '../../shared/history/history.component';
import { DataService } from './data.service';

@Component({
  templateUrl: './errorhandling.component.html',
  standalone: true,
  imports: [HistoryComponent]
})
export class ErrorhandlingComponent {

  logStream$ = new ReplaySubject<unknown>();
  private ds = inject(DataService);

  /**
   * Das Observable aus `this.ds.getData()` liefert Daten – oder mit hoher Wahrscheinlichkeit einen Fehler.
   * Probiere verschiedene Strategien aus, um den Fehler zu behandeln.
   */

  start() {
    this.ds.getData().pipe(
      catchError(err => {
        // ... loggen, ausgeben, ...

        // Fehler weiterwerfen
        // return throwError(() => 'FEHLER!');
        // throw 'Böser Fehler!! 🐒';

        // Fehler ersetzen
        // return of('Nichts passiert!', '🦊');

        // Fehler ignorieren
        return EMPTY;
      })
    ).subscribe({
      next: e => this.logStream$.next(e),
      error: err => this.logStream$.next('❌ ERROR: ' + err),
      complete: () => this.logStream$.next('🏁 COMPLETE')
    });
  }
}
