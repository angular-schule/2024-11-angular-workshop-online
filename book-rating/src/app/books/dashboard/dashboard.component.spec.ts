import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';
import { BookStoreService } from '../shared/book-store.service';
import { of } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {

    // Ersatzobjekt für den BookRatingService
    const ratingMock: Partial<BookRatingService> = {
      rateUp: (b: Book) => b,
      rateDown: (b: Book) => b
    };

    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        // BRS ersetzen: Immer, wenn jemand BRS anfordert,
        // wird stattdessen der ratingMock ausgeliefert
        { provide: BookRatingService, useValue: ratingMock },
        {
          provide: BookStoreService,
          useValue: {
            getAll: () => of([])
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    // TS-Klasseninstanz
    component = fixture.componentInstance;

    // DOM-Element
    // fixture.nativeElement
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call service.rateUp for component.doRateUp', () => {
    // Arrange
    // Service anfordern – das ist eigentlich unser ratingMock
    const service = TestBed.inject(BookRatingService);

    // Testbuch
    const testBook = { isbn: '123' } as Book; // Type Assertion – vorsichtig verwenden!

    // Methode überwachen / Spy
    // spyOn(service, 'rateUp').and.returnValue(testBook);
    // spyOn(service, 'rateUp').and.callFake(b => b);

    // callThrough: benutze die originale Methode weiterhin, um den Wert zu erzeugen
    spyOn(service, 'rateUp').and.callThrough();

    // Act
    component.doRateUp(testBook);

    // Assert
    // prüfen, ob service.rateUp aufgerufen wurde
    // expect(service.rateUp).toHaveBeenCalled();
    // expect(service.rateUp).toHaveBeenCalledTimes(1);
    // expect(service.rateUp).toHaveBeenCalledWith(testBook);
    expect(service.rateUp).toHaveBeenCalledOnceWith(testBook);
  });
});
