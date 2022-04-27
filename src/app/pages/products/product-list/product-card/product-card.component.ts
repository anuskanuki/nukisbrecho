import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.less']
})
export class ProductCardComponent implements OnInit {

  @Input() public productPrice = '';
  @Input() public productTitle = '';
  @Input() public productDescription = '';
  @Input() public productBrand = '';
  @Input() public productSize = '';
  @Input() public productPhoto1 = '';

  constructor() { }

  ngOnInit(): void {
  }

}
