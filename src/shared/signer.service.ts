import { Injectable } from "@angular/core"
import { ethers, Wallet } from "ethers"
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

    waitForTx(hash: string) {
        return from(this.walletService.wallet?.provider.waitForTransaction(hash) ?? of(undefined))
    }

}