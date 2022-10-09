import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExecTransactionComponent } from './exec-transaction/exec-transaction.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { TxSequenceComponent } from './tx-sequence/tx-sequence.component';

@NgModule({
  declarations: [
    AppComponent,
    ExecTransactionComponent,
    NavbarComponent,
    SpinnerComponent,
    TxSequenceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
