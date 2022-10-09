import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-tx-sequence',
  templateUrl: './tx-sequence.component.html',
  styleUrls: ['./tx-sequence.component.css']
})
export class TxSequenceComponent implements OnInit {

  stepsSub = new BehaviorSubject<StepState[]>(["DONE", "DONE", "ACTIVE", "PENDING", "PENDING"])
  steps$ = this.stepsSub.asObservable()

  constructor() { }

  ngOnInit(): void {
  }

}

type StepState = "DONE" | "ACTIVE" | "PENDING"
