import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseService } from 'src/app/core/services/base.service';
import { StarsModel } from '../models/welcome-help.model';

@Injectable({
  providedIn: 'root'
})
export class WelcomeHelpService extends BaseService {

  constructor(private readonly http: HttpClient) {
    super();
  }

  public getStarsAverage(): Observable<StarsModel> {
    return this.http.get<StarsModel>(this.UrlApiV1 + 'stars')
      .pipe(
        catchError(error => throwError(error.error.errors[0]))
      );
  }

  public editStars(model: StarsModel): Observable<StarsModel> {
    return this.http.put<StarsModel>(this.UrlApiV1 + 'stars', model, super.httpJsonOptions)
      .pipe(
        map(super.extractData),
        catchError(error => throwError(error.error.errors[0]))
      );
  }

}
