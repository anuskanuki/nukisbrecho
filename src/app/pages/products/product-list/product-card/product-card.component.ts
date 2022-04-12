import { Component, Input, OnInit } from '@angular/core';
// import { ProductModel } from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.less']
})
export class ProductCardComponent implements OnInit {

  // public productsList: ProductModel[] = [];

  @Input() public productPrice = '';
  @Input() public productTitle = '';
  @Input() public productDescription = '';
  @Input() public productBrand = '';
  @Input() public productPhoto1 = '';

  constructor() { }

  ngOnInit(): void {
  }

}
