import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

const BASE_URL = 'http://localhost:3000';

@Injectable()
export class NewsService {

    constructor(private http: HttpClient) { }

    // getLatestStories(page: number = 1) {
    //     return this.http.get(`${BASE_URL}/news?page=${page}`);
    // }

    getNewsList(page: number = 0, limit: number) {
        return this.http.post(`${BASE_URL}/article/list`, {
            page: page,
            limit: limit
        })

            ;


        //     .subscribe(res => {
        //     console.log(res);
        //      return res;
        // }, (errorResponse: HttpErrorResponse) => {
        //     console.log(errorResponse);
        //     return errorResponse;
        // });
    }

}
