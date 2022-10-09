import { Injectable } from "@angular/core"
import { ethers, Wallet } from "ethers"
import { BehaviorSubject, from, map, of } from "rxjs"

@Injectable({
  providedIn: 'root',
})
export class WalletService {

    private static WALLET_STORAGE_ID = "nephw-wallet-store"

    walletSub = new BehaviorSubject<Wallet | undefined>(undefined)
    wallet$ = this.walletSub.asObservable()
    get wallet() {
        return this.walletSub.getValue()
    }

    constructor() {
        const wallet = this.getWallet()
        if(wallet !== null) { this.walletSub.next(wallet); return }
    }

    importWallet(privateKey: string, network: string = "https://matic-mumbai.chainstacklabs.com") {
        this.saveWallet(privateKey, network)
    }

    importWalletFromSeed(mnemonic: string) {
        const wallet = Wallet.fromMnemonic(mnemonic)
        this.saveWallet(wallet.privateKey, "https://matic-mumbai.chainstacklabs.com")
    }

    createWallet() {
        return Wallet.createRandom()
    }

    removeWallet() {
        window.localStorage.removeItem(WalletService.WALLET_STORAGE_ID)
        this.walletSub.next(undefined)
    }

    private saveWallet(privateKey: string, network: string) {
        const provider = new ethers.providers.JsonRpcProvider(network)
        this.walletSub.next(new Wallet(privateKey, provider))
        window.localStorage.setItem(WalletService.WALLET_STORAGE_ID, this.wallet!.privateKey)
    }

    private getWallet() : Wallet | null {
        const retrievedItem = window.localStorage.getItem(WalletService.WALLET_STORAGE_ID)
        if(retrievedItem !== null) {
            return new Wallet(retrievedItem!, new ethers.providers.JsonRpcProvider("https://matic-mumbai.chainstacklabs.com"))
        } else {
            return null
        }
    }

    getBalance(address: string) {
        return from(this.wallet?.provider.getBalance(address) ?? of(undefined)).pipe(
            map(balance => {
                return ethers.utils.formatEther(balance ?? 0)
            })
        )
    }

}