import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFooComponent } from './admin-foo.component';

describe('AdminFooComponent', () => {
  let component: AdminFooComponent;
  let fixture: ComponentFixture<AdminFooComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminFooComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFooComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
