import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseService } from 'src/app/core/services/base.service';
import { ChatModel } from '../models/chat.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  public getByProductId(productId: number): Observable<ChatModel[]> {
    return this.http.get<ChatModel[]>(`${this.UrlApiV1}chat?productId=${productId}`)
      .pipe(
        catchError(error => throwError(error.error.errors[0]))
      );
  }

  public create(model: ChatModel): Observable<ChatModel> {
    return this.http
      .post<ChatModel>(`${this.UrlApiV1}chat`, model, super.httpJsonOptions)
      .pipe(
        map(super.extractData),
        catchError(error => throwError(error.error.errors[0]))
      );
  }

  public update(model: ChatModel): Observable<ChatModel> {
    return this.http
      .put<ChatModel>(`${this.UrlApiV1}chat/${model.id}`, model, super.httpJsonOptions)
      .pipe(
        map(super.extractData),
        catchError(error => throwError(error.error.errors[0]))
      );
  }
}
