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


    // of('Stuttgart', 'Leipzig', 'Hamburg')
    // from([1,2,3,4,5])
    // interval(1000)         // ---0---1---2---3---4---5 ...
    // timer(3000)            // ---------0|
    // timer(3000, 1000)      // ---------0---1---2---3---4---5 ...
    // timer(0, 1000)         // 0---1---2---3---4---5 ...


    timer(0, 1000).pipe(
      map(e => e * 3),
      filter(e => e % 2 === 0)
    ).subscribe({
      next: e => this.log(e),
      complete: () => this.log('COMPLETE')
    });



    /******************************/

    // Producer: generiert die Daten und spielt sie an den Subscriber aus
    function producer(sub: Subscriber<number>) {
      const result = Math.random();
      sub.next(result);
      sub.next(100);
      sub.next(200);

      setTimeout(() => sub.next(111), 2000)
      setTimeout(() => sub.next(222), 3000)
      setTimeout(() => sub.complete(), 4000)
    }

    // Observer: Konsument der Daten
    const obs: Observer<number> = {
      next: (value: number) => console.log(value),
      error: (err: any) => console.error(err),
      complete: () => console.log('FERTIG')
    };

    //producer(obs);

    // Observable: Schnittstelle zwischen Producer und Observer
    // $ Finnische Notation
    const myObs$ = new Observable(producer);

    // beim subscribe() übergeben wir den Observer, der die Daten empfangen soll
    // myObs$.subscribe(obs);


    const myObs2$ = new Observable<number>(sub => {
      const intervalId = setInterval(() => {
        sub.next(Math.random());
        console.log('interval');
      }, 1000);

      // Teardown Logic: wird ausgeführt, wenn unsubscribe ausgeführt wird
      return () => {
        console.log('TEARDOWN');
        clearInterval(intervalId);
      };
    });

    /*const subscription = myObs2$.subscribe({
      next: e => console.log('SUB', e)
    });*/


    /*setTimeout(() => {
      subscription.unsubscribe()
    }, 6000)*/



    /******************************/
  }

  private log(msg: unknown) {
    this.logStream$.next(msg);
  }

}
