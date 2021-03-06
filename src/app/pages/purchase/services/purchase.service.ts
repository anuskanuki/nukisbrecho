import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseService } from 'src/app/core/services/base.service';
import { ProductModel } from '../../products/models/product.model';
import { UserByIdModel } from '../models/purchase.model';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  public updateProduct(model: ProductModel): Observable<ProductModel> {
    return this.http.put<ProductModel>(this.UrlApiV1 + 'products/' + model.id, model, super.httpJsonOptions)
      .pipe(
        map(super.extractData),
        catchError(error => throwError(error.error.errors[0]))
      );
  }

  public getPurchaseAddress(id: string): Observable<UserByIdModel> {
    return this.http.get<UserByIdModel>(this.urlAuthApiBack + 'users/' + id)
      .pipe(
        catchError(error => throwError(error))
      );
  }
}
