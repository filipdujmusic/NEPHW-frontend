import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecTransactionComponent } from './exec-transaction.component';

describe('ExecTransactionComponent', () => {
  let component: ExecTransactionComponent;
  let fixture: ComponentFixture<ExecTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExecTransactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExecTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
