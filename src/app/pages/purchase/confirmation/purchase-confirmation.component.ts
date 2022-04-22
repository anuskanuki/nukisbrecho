import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchase-confirmation',
  templateUrl: './purchase-confirmation.component.html',
  styleUrls: ['./purchase-confirmation.component.less']
})
export class PurchaseConfirmationComponent implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit(): void {
  }

  goToHome() {
    this.router.navigateByUrl('/user/orders');
  }

}
