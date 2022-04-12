import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseService } from 'src/app/core/services/base.service';
import { CartModel, UserByIdModel } from '../models/purchase.model';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  public getCart(): Observable<CartModel> {
    return this.http.get<CartModel>(this.UrlApiV1 + 'userCart')
      .pipe(
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
