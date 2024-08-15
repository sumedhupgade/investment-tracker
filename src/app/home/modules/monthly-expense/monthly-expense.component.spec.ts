import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyExpenseComponent } from './monthly-expense.component';

describe('MonthlyExpenseComponent', () => {
  let component: MonthlyExpenseComponent;
  let fixture: ComponentFixture<MonthlyExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthlyExpenseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
