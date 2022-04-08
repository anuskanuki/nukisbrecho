import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AccessTokenModel, LoginModel } from "../../../core/models/login.model";
import { BaseService } from "../../../core/services/base.service";

@Injectable({
    providedIn: 'root'
})
export class LoginService extends BaseService {

    constructor(private http: HttpClient) {
        super();
    }

    public newUser(model: LoginModel): Observable<AccessTokenModel> {
        return this.http.post<AccessTokenModel>(this.UrlApiV1 + 'users', model);
    }
}
