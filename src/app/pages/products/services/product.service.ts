import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { ProductModel } from '../models/product.model';
import { BaseService } from 'src/app/core/services/base.service';
import { ChatModel } from '../models/chat.model';

@Injectable({
    providedIn: 'root'
})
export class ProductService extends BaseService {

    constructor(private http: HttpClient) {
        super();
    }

    public getFilteredBySearchBar(searchedWord: string): Observable<ProductModel[]> {
        return this.http.get<ProductModel[]>(this.UrlApiV1 + 'products?title=' + searchedWord)
            .pipe(
                catchError(error => throwError(error.error.errors[0]))
            );
    }

    public getFilteredByAccessories(): Observable<ProductModel[]> {
        return this.http.get<ProductModel[]>(this.UrlApiV1 + 'products?category=acessorios&active=true&_sort=id&_order=desc')
            .pipe(
                catchError(error => throwError(error.error.errors[0]))
            );
    }

    public getFilteredByClothes(): Observable<ProductModel[]> {
        return this.http.get<ProductModel[]>(this.UrlApiV1 + 'products?category=roupas&active=true&_sort=id&_order=desc')
            .pipe(
                catchError(error => throwError(error.error.errors[0]))
            );
    }

    public getFilteredByActive(): Observable<ProductModel[]> {
        return this.http.get<ProductModel[]>(this.UrlApiV1 + 'products?active=true&_sort=id&_order=desc')
            .pipe(
                catchError(error => throwError(error.error.errors[0]))
            );
    }

    public getFilteredByInactive(): Observable<ProductModel[]> {
        return this.http.get<ProductModel[]>(this.UrlApiV1 + 'products?active=false')
            .pipe(
                catchError(error => throwError(error.error.errors[0]))
            );
    }

    public getFilteredByShoes(): Observable<ProductModel[]> {
        return this.http.get<ProductModel[]>(this.UrlApiV1 + 'products?category=calcados&active=true&_sort=id&_order=desc')
            .pipe(
                catchError(error => throwError(error.error.errors[0]))
            );
    }

    public getAll(): Observable<ProductModel[]> {
        return this.http.get<ProductModel[]>(this.UrlApiV1 + 'products')
            .pipe(
                catchError(error => throwError(error.error.errors[0]))
            );
    }

    public getProduct(): Observable<ProductModel> {
        return this.http.get<ProductModel>(this.UrlApiV1 + 'products/1')
            .pipe(
                catchError(error => throwError(error.error.errors[0]))
            );
    }

    public getProductById(productId: any): Observable<ProductModel> {
        return this.http.get<ProductModel>(this.UrlApiV1 + 'products/' + productId)
            .pipe(
                catchError(error => throwError(error.error.errors[0]))
            );
    }

    public insertProduct(model: ProductModel): Observable<ProductModel> {
        model.id = undefined;
        return this.http.post<ProductModel>(this.UrlApiV1 + 'products', model, super.httpJsonOptions)
            .pipe(
                map(super.extractData),
                catchError(error => throwError(error.error.errors[0]))
            );
    }

    public editProduct(model: ProductModel): Observable<ProductModel> {
        model.id = undefined;
        return this.http.put<ProductModel>(this.UrlApiV1 + 'products', model, super.httpJsonOptions)
            .pipe(
                map(super.extractData),
                catchError(error => throwError(error.error.errors[0]))
            );
    }

    public delete(id: string): Observable<ProductModel> {
        return this.http
            .delete(this.UrlApiV1 + 'products/' + id)
            .pipe(
                map(super.extractData),
                catchError(error => throwError(error.error.errors[0]))
            );
    }

    public getMessagesByProductId(productId: number): Observable<ChatModel[]> {
        return this.http.get<ChatModel[]>(this.UrlApiV1 + 'chat?productId=' + productId)
            .pipe(
                catchError(error => throwError(error.error.errors[0]))
            );
    }

    public sendMessage(model: ChatModel): Observable<ChatModel> {
        return this.http
            .put<ChatModel>(this.UrlApiV1 + 'chat/', model, super.httpJsonOptions)
            .pipe(
                map(super.extractData),
                catchError(error => throwError(error.error.errors[0]))
            );
    }

}
