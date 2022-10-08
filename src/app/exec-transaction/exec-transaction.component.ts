import { Component, OnInit } from '@angular/core';
import { TransactionResponse, TransactionReceipt } from '@ethersproject/abstract-provider';
import { BehaviorSubject, switchMap, tap } from 'rxjs';
import { SignerService } from 'src/shared/signer.service';
import { WalletService } from 'src/shared/wallet.service';

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

  constructor(private signerService: SignerService, private walletService: WalletService) { }

  ngOnInit(): void {
    
  }

  signAndDeployTransaction() {
    this.transactionStateSub.next("PROCESSING")
    this.signerService.sendTransaction("0xc731816a02A08FC7Ed8fe73c82Ad04c0b018410E", 12)
    .pipe(
      tap(res => {
        this.txResponseSub.next(res)
        this.transactionStateSub.next("FINISHED")  
      }),
      switchMap(res => this.signerService.waitForTx(res?.hash ?? ""))
    ).subscribe(res => {
      this.transactionStateSub.next("MINED")
      this.txReceiptSub.next(res)
    })
  }

}

type TransactionState = "PENDING" | "PROCESSING" | "FINISHED" | "MINED"