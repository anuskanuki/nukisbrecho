import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseService } from 'src/app/core/services/base.service';
import { NotificationModel } from '../models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class AdminNotificationService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  public getNotifications(): Observable<NotificationModel[]> {
    return this.http.get<NotificationModel[]>(`${this.UrlApiV1}admin-notifications?_sort=id&_order=desc`)
      .pipe(catchError(error => throwError(error.error.errors[0])));
  }

  public getUnreadNotifications(): Observable<NotificationModel[]> {
    return this.http.get<NotificationModel[]>(`${this.UrlApiV1}admin-notifications?read=false`)
      .pipe(catchError(error => throwError(error.error.errors[0])));
  }
}
