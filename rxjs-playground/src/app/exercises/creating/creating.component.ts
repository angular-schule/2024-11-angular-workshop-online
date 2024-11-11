import { Component } from '@angular/core';
import { Observable, of, from, timer, interval, ReplaySubject, map, filter, Observer, Subscriber } from 'rxjs';
import { HistoryComponent } from '../../shared/history/history.component';

@Component({
  templateUrl: './creating.component.html',
  standalone: true,
  imports: [HistoryComponent]
})
export class CreatingComponent {

  logStream$ = new ReplaySubject<unknown>();

  constructor() {
    /**
     * 1. Erstelle ein Observable und abonniere den Datenstrom.
     *    Probiere dazu die verschiedenen Creation Functions aus: of(), from(), timer(), interval()
     * 2. Implementiere außerdem ein Observable manuell, indem du den Konstruktor "new Observable()" nutzt.
     *
     * Tipps:
     * Zum Abonnieren kannst du einen (partiellen) Observer oder ein einzelnes next-Callback verwenden.
     * Du kannst die Methode this.log() verwenden, um eine Ausgabe in der schwarzen Box im Browser zu erzeugen.
     */

    /******************************/


    function producer(sub: Subscriber<number>) {
      const result = Math.random();
      sub.next(result);
      sub.next(100);
      sub.next(200);

      setTimeout(() => sub.next(111), 2000)
      setTimeout(() => sub.next(222), 3000)
      setTimeout(() => sub.complete(), 4000)
    }

    const obs: Observer<number> = {
      next: (value: number) => console.log(value),
      error: (err: any) => console.error(err),
      complete: () => console.log('FERTIG')
    };

    //producer(obs);

    const myObs$ = new Observable(producer);
    myObs$.subscribe(obs);



    /******************************/
  }

  private log(msg: unknown) {
    this.logStream$.next(msg);
  }

}
