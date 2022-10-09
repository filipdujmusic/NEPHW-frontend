import { Component, Input, OnInit } from '@angular/core';
import { TransactionResponse, TransactionReceipt } from '@ethersproject/abstract-provider';
import { BehaviorSubject, from, Observable, switchMap, tap } from 'rxjs';
import { SignerService } from 'src/shared/signer.service';
import { WalletService } from 'src/shared/wallet.service';
import { getTransactionFlow, TransactionRequest, setCompleted } from 'nephw-sdk'

import { BigNumber } from 'ethers';
import { Network, NetworkManager } from 'src/shared/networks';
import { SequenceService } from 'src/shared/sequence.service';

@Component({
  selector: 'app-exec-transaction',
  templateUrl: './exec-transaction.component.html',
  styleUrls: ['./exec-transaction.component.css']
})
export class ExecTransactionComponent implements OnInit {

  transactionStateSub = new BehaviorSubject<TransactionState>("PENDING")
  transactionState$ = this.transactionStateSub.asObservable()

  txResponseSub = new BehaviorSubject<TransactionResponse | undefined>(undefined)
  txResponse$ = this.txResponseSub.asObservable()

  txReceiptSub = new BehaviorSubject<TransactionReceipt | undefined>(undefined)
  txReceipt$ = this.txReceiptSub.asObservable()

  wallet$ = this.walletService.wallet$

  network: Network | undefined
  txReqValue: string | undefined

  @Input() txFinishedSub!: BehaviorSubject<string>

  @Input() transactionRequest!: TransactionRequest
  constructor(private signerService: SignerService, private sequenceService: SequenceService, private walletService: WalletService) { }

  ngOnInit(): void {
    const val = this.transactionRequest.tx.value as any
    this.txReqValue = val

    this.network = NetworkManager.networks[this.transactionRequest.tx.chainId!]
    this.walletService.changeNetwork(this.network.rpc)
  }

  signAndDeployTransaction() {
    this.transactionStateSub.next("PROCESSING")
    this.signerService.sendPopulatedTx(this.transactionRequest.tx)
    .pipe(
      tap(res => {
        this.txResponseSub.next(res)
        this.transactionStateSub.next("FINISHED")  
      }),
      switchMap(res => this.signerService.waitForTx(res?.hash ?? "")),
      tap(res => {
        this.transactionStateSub.next("MINED")
        this.txReceiptSub.next(res)
      }),
      switchMap(res => {
        return from(setCompleted(this.transactionRequest))
      })
    ).subscribe(completedCID => {
      this.sequenceService.sequenceFinishedSub.next(this.sequenceService.sequenceFinishedSub.getValue() + 1)
    })
  }

}

type TransactionState = "PENDING" | "PROCESSING" | "FINISHED" | "MINED"