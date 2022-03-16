import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { BaseService } from "src/app/core/services/base.service";
import { OrdersUserModel } from "../models/orders.model";
import { UserModel } from "../models/user.model";
import { NotificationModel } from "../models/notification.model";

@Injectable({
    providedIn: 'root'
})
export class UserService extends BaseService {

    constructor(private http: HttpClient) {
        super();
    }

    public getAllUserOrders(): Observable<OrdersUserModel[]> {
        return this.http.get<OrdersUserModel[]>(this.UrlApiV1 + 'userOrders')
            .pipe(
                catchError(error => throwError(error.error.errors[0]))
            );
    }

    public getAdminNotifications(): Observable<NotificationModel[]> {
        return this.http.get<NotificationModel[]>(this.UrlApiV1 + 'adminNotifications')
            .pipe(
                catchError(error => throwError(error.error.errors[0]))
            );
    }

    public getUserNotifications(userId: number): Observable<NotificationModel[]> {
        return this.http.get<NotificationModel[]>(this.UrlApiV1 + `userNotifications?userId=${userId}`)
            .pipe(
                catchError(error => throwError(error.error.errors[0]))
            );
    }

    public getAllTesteApi(): Observable<any[]> {
        return this.http.get<any[]>(this.urlAuthApiBack + 'users')
            .pipe(
                catchError(error => throwError(error.error.errors[0]))
            );
    }

    public getAll(): Observable<UserModel[]> {
        return this.http.get<UserModel[]>(this.UrlApiV1 + 'users')
            .pipe(
                catchError(error => throwError(error.error.errors[0]))
            );
    }

    public getUser(): Observable<UserModel> {
        return this.http.get<UserModel>(this.UrlApiV1 + 'users/1')
            .pipe(
                catchError(error => throwError(error.error.errors[0]))
            );
    }

    public getById(userId: any): Observable<UserModel> {
        return this.http.get<UserModel>(this.UrlApiV1 + 'users/' + userId)
            .pipe(
                catchError(error => throwError(error.error.errors[0]))
            );
    }

    public insert(model: UserModel): Observable<UserModel> {
        model.id = undefined;
        return this.http.post<UserModel>(this.UrlApiV1 + 'users', model, super.httpJsonOptions)
            .pipe(
                map(super.extractData),
                catchError(error => throwError(error.error.errors[0]))
            );
    }

    public edit(model: UserModel): Observable<UserModel> {
        return this.http.put<UserModel>(this.UrlApiV1 + 'users/' + model.id, model, super.httpJsonOptions)
            .pipe(
                map(super.extractData),
                catchError(error => throwError(error.error.errors[0]))
            );
    }

    public delete(id: string): Observable<UserModel> {
        return this.http
            .delete(this.UrlApiV1 + 'users/' + id)
            .pipe(
                map(super.extractData),
                catchError(error => throwError(error.error.errors[0]))
            );
    }

}
