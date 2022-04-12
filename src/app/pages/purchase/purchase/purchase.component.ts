import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.less']
})
export class PurchaseComponent implements OnInit {

  public loggedIn = false;
  public paymentReceiptAttached = false;
  public userName = '';

  // @Input() public productPrice = 0;
  // @Input() public productTitle = '';
  // @Input() public productBrand = '';
  // @Input() public productPhoto1 = '';

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
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.verifyLoggedUser();
  }

  confirmPaymentReceiptAttached() {
    this.paymentReceiptAttached = true;
  }

  verifyLoggedUser() {
    if (this.tokenService.isLoggedIn()) {
      this.loggedIn = true;
      this.getUserInfo();
    } else {
      this.loggedIn = false;
    }
  }

  getUserInfo() {
    this.userName = this.tokenService.tokenData.unique_name;
  }

  back(): void {
    this.location.back();
  }

}
