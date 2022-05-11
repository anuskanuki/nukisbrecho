import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseService } from 'src/app/core/services/base.service';
import { NotificationModel } from '../models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  public getNotificationsByUserId(userId: string): Observable<NotificationModel[]> {
    return this.http.get<NotificationModel[]>(`${this.UrlApiV1}notifications?userId=${userId}&_sort=id&_order=desc`)
      .pipe(catchError(error => throwError(error.error.errors[0])));
  }

  public getUnreadNotificationsByUserId(userId: string): Observable<NotificationModel[]> {
    return this.http.get<NotificationModel[]>(`${this.UrlApiV1}notifications?userId=${userId}&read=false`)
      .pipe(catchError(error => throwError(error.error.errors[0])));
  }

  public insert(notification: NotificationModel): Observable<NotificationModel> {
    return this.http.post<NotificationModel>(`${this.UrlApiV1}notifications`, notification, super.httpJsonOptions)
      .pipe(catchError(error => throwError(error.error.errors[0])));
  }
}
