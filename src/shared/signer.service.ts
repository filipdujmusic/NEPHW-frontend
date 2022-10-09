import { Injectable } from "@angular/core"
import { ethers, PopulatedTransaction, Wallet } from "ethers"
import { BehaviorSubject, from, of } from "rxjs"
import { WalletService } from "./wallet.service"

@Injectable({
  providedIn: 'root',
})
export class SignerService {

    constructor(private walletService: WalletService) {}

    sendTransaction(to: string, value: ethers.BigNumberish) {
        return from(this.walletService.wallet?.sendTransaction({
            to: to,
            value: value,
            chainId: 80001
        }) ?? of(undefined))
    }

    sendPopulatedTx(tx: PopulatedTransaction) {
        return from(this.walletService.wallet?.sendTransaction(tx) ?? of(undefined))
    }

    populateTransaction(to: string, value: number, chainID: number) {
        return from(this.walletService.wallet?.populateTransaction({
            to: to,
            value: value,
            chainId: chainID
        }) ?? of(undefined))
    }

    waitForTx(hash: string) {
        return from(this.walletService.wallet?.provider.waitForTransaction(hash) ?? of(undefined))
    }

}