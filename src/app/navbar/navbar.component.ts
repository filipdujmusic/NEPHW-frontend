import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { WalletService } from 'src/shared/wallet.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  wallet$ = this.walletService.wallet$.pipe(
    tap(wallet => {
      if (wallet !== undefined) {
        this.navbarStateSub.next("LOGGED_IN")
      } else {
        this.navbarStateSub.next("LOGGED_OUT")
      }
    })
  )

  navbarStateSub = new BehaviorSubject<NavbarState>('LOGGED_OUT')
  navbarState$ = this.navbarStateSub.asObservable()

  importWalletForm = new FormControl('', [Validators.required, Validators.minLength(64), Validators.maxLength(64)])

  constructor(private walletService: WalletService) { }

  ngOnInit(): void {
  }

  toggleLoginMenu() {
    if (this.navbarStateSub.getValue() === "OPTIONS_DISPLAYED") {
      this.navbarStateSub.next("LOGGED_OUT")
    } else {
      this.navbarStateSub.next("OPTIONS_DISPLAYED")
    }
  }

  setNavbarState(newState: NavbarState) {
    this.navbarStateSub.next(newState)
  }

  importWalletClicked() {
    this.walletService.importWallet(this.importWalletForm.value as string)
  }

  logOut() {
    this.walletService.removeWallet()
  }

}

type NavbarState = "LOGGED_IN" | "LOGGED_OUT" | "OPTIONS_DISPLAYED" | "IMPORT" | "CREATE" | "CONNECT"
