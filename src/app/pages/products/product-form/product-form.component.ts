import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { ProductModel } from '../models/product.model';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ProductService } from '../services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.less']
})
export class ProductFormComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];

  public form!: FormGroup;
  public productModel!: ProductModel;
  public routerId = '';
  public newProductId = 0;
  public edition = false;

  gridStyle = {
    width: '33,33%',
    textAlign: 'center'
  };

  constructor(
    private location: Location,
    protected productService: ProductService,
    private notification: NzNotificationService,
    private readonly formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) { this.productModel = new ProductModel(); }

  ngOnInit(): void {
    this.buildForm();
    this.loadForm();
  }

  private loadForm() {
    this.routerId = this.route.snapshot.params.id;
    if (this.routerId) {
      this.getById(this.routerId);
      this.edition = true;
    } else {
      this.edition = false;
    }
  }

  private getById(id: string) {
    const subscription = this.productService.getProductById(id).subscribe(
      response => {
        this.mapModelToForm(response);
        this.productModel = response;
      },
      error => this.notification.error('Oops!', error)
    );
    this.subscriptions.push(subscription);
  }

  private mapModelToForm(model: ProductModel) {
    this.productModel = model;

    this.form.patchValue({
      title: this.productModel.title,
      priceTag: this.productModel.priceTag,
      category: this.productModel.category,
      description: this.productModel.description,
      productCode: this.productModel.productCode,
      brand: this.productModel.brand,
      size: this.productModel.size,
      condition: this.productModel.condition,
    });
  }

  protected buildForm() {
    this.form = this.formBuilder.group({
      title: [null, [Validators.required]],
      priceTag: [null, [Validators.required]],
      category: [null, [Validators.required]],
      description: [null, [Validators.required]],
      productCode: [null, [Validators.required]],
      brand: [null, [Validators.required]],
      size: [null, [Validators.required]],
      condition: [null, [Validators.required]],
      photos: [null, [Validators.required]],
      mainPhoto: [null],
    });
  }

  public submit() {
    if (this.form.valid && this.form.dirty) {
      if (!this.productModel.id) {
        this.mapFormToModel(false);
        const subscription = this.productService.insertProduct(this.productModel).subscribe(
          () => this.savingSuccess('Produto inserido!'),
          error => {
            this.notification.error('Oops!', error)
          }
        );
        this.subscriptions.push(subscription);
      } else {
        this.mapFormToModel(true);
        const subscription = this.productService.editProduct(this.productModel).subscribe(
          () => this.savingSuccess('Produto atualizado!'),
          error => {
            this.notification.error('Oops!', error)
          }
        )
        this.subscriptions.push(subscription);
      }
    }
  }

  private mapFormToModel(editing: boolean) {
    if (editing) {
      this.productModel = {
        id: this.productModel.id,
        title: this.form.value.title,
        priceTag: this.form.value.priceTag,
        category: this.form.value.category,
        description: this.form.value.description,
        productCode: this.form.value.productCode,
        brand: this.form.value.brand,
        size: this.form.value.size,
        condition: this.form.value.condition,
      };
    } else {
      this.getNewProductId();
      this.productModel = {
        id: this.newProductId,
        title: this.form.value.title,
        priceTag: this.form.value.priceTag,
        category: this.form.value.category,
        description: this.form.value.description,
        productCode: this.form.value.productCode,
        brand: this.form.value.brand,
        size: this.form.value.size,
        condition: this.form.value.condition,
      };
    }
  }

  private savingSuccess(message: string) {
    this.form.reset();
    this.productModel = {};
    this.notification.success('Sucesso!', message),
      setTimeout(() => {
        this.back();
      }, 500);
  }

  getNewProductId() {
    const subscription = this.productService.getAll().subscribe(
      response => {
        this.newProductId = response.length + 1;
      },
      error => this.notification.error('Oops!', error)
    );
    this.subscriptions.push(subscription);
    return this.newProductId;
  }

  back(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscripition => subscripition.unsubscribe());
  }

}
