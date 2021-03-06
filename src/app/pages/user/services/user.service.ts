import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { BaseService } from "src/app/core/services/base.service";
import { UserGetAllModel, UserModel } from "../models/user.model";
import { NewUserModel } from "../../login/models/login.model";

@Injectable({
    providedIn: 'root'
})
export class UserService extends BaseService {

    constructor(private http: HttpClient) {
        super();
    }

    public updateUser(id: string, model: UserModel): Observable<UserModel> {
        return this.http.put<UserModel>(this.urlAuthApiBack + 'users/' + id, model)
            .pipe(
                catchError(error => throwError(error))
            )
    }

    public getById(userId: any): Observable<UserModel> {
        return this.http.get<UserModel>(this.urlAuthApiBack + 'users/' + userId)
            .pipe(
                catchError(error => throwError(error.error.errors[0]))
            );
    }

    public getAllUsers(): Observable<UserGetAllModel[]> {
        return this.http.get<UserGetAllModel[]>(this.urlAuthApiBack + 'users/')
            .pipe(
                catchError(error => throwError(error.error.errors[0]))
            );
    }

    public newUser(model: NewUserModel): Observable<NewUserModel> {
        return this.http.post<NewUserModel>(this.urlAuthApiBack + 'users', model)
            .pipe(
                catchError(error => throwError(error))
            )
    }

    public delete(id: string): Observable<UserModel> {
        return this.http
            .delete(this.urlAuthApiBack + 'users/' + id)
            .pipe(
                map(super.extractData),
                catchError(error => throwError(error.error.errors[0]))
            );
    }

}
