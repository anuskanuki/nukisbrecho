import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.less']
})
export class PurchaseComponent implements OnInit {

  public loggedIn = true;
  public paymentReceiptAttached = false;

  panels = [
    {
      active: false,
      template: 0,
      name: 'Pagar com PIX',
    },
    {
      active: false,
      template: 1,
      name: 'Pagar com Transferência Bancária',
    }
  ];
  constructor(
    private location: Location,
  ) { }

  ngOnInit(): void {
  }

  disableCartProductsUntilPayment() {

  }

  confirmPaymentReceiptAttached() {
    this.paymentReceiptAttached = true;
  }

  back(): void {
    this.location.back();
  }

}
