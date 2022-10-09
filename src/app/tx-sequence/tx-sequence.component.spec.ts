import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TxSequenceComponent } from './tx-sequence.component';

describe('TxSequenceComponent', () => {
  let component: TxSequenceComponent;
  let fixture: ComponentFixture<TxSequenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TxSequenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TxSequenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
