import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, from, map, Observable, of, Subscription, tap } from 'rxjs';
import { getTransactionFlow, publishTransactionFlow, TransactionRequest } from 'nephw-sdk'
import { BigNumber } from 'ethers';
import { SequenceService } from 'src/shared/sequence.service';
import { WalletService } from 'src/shared/wallet.service';
import { ChainID, NetworkManager } from 'src/shared/networks';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-tx-sequence',
  templateUrl: './tx-sequence.component.html',
  styleUrls: ['./tx-sequence.component.css']
})
export class TxSequenceComponent implements OnInit {

  cidSub = new BehaviorSubject<string | undefined>(undefined)
  cid$ = this.cidSub.asObservable()


  sequence$: Observable<{ transactions: TransactionRequest[] }> = 
    from(getTransactionFlow(this.route.snapshot.params.sequenceID)).pipe(
    ) as any


  activeStep$ = this.sequenceService.sequenceFinished$.pipe(tap(res => console.log("SEQRES", res)))



  txSubs: Subscription[] = []

  constructor(private sequenceService: SequenceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    
  }

  publishNew() {
    publishTransactionFlow([
      {
        chainId: 80001,
        tx: {
          to: "0xc731816a02A08FC7Ed8fe73c82Ad04c0b018410E",
          value: BigNumber.from(1),
        }
      },
      {
        chainId: 80001,
        tx: {
          to: "0xc731816a02A08FC7Ed8fe73c82Ad04c0b018410E",
          value: BigNumber.from(2),
        }
      },
      {
        chainId: 80001,
        tx: {
          to: "0xc731816a02A08FC7Ed8fe73c82Ad04c0b018410E",
          value: BigNumber.from(3),
        }
      }
    ]).then(res => this.cidSub.next(res))
  }

}

type StepState = "DONE" | "ACTIVE" | "PENDING"
