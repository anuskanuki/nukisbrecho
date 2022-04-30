import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseService } from 'src/app/core/services/base.service';
import { OrderModel } from '../../user/models/orders.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  public insert(model: OrderModel): Observable<OrderModel> {
    return this.http.post<OrderModel>(`${this.UrlApiV1}orders`, model, super.httpJsonOptions)
      .pipe(
        map(super.extractData),
        catchError(error => throwError(error.error.errors[0]))
      );
  }

  public getByUserId(userId: string): Observable<OrderModel[]> {
    return this.http.get<OrderModel[]>(`${this.UrlApiV1}orders?userId=${userId}`, super.httpJsonOptions)
      .pipe(
        map(super.extractData),
        catchError(error => throwError(error.error.errors[0]))
      );
  }
}
