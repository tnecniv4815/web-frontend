import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NewsService } from '../service/news.service';
import {Data} from '@angular/router';


interface DataResponse {
    carousel: any,
    list: any
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    hello = 'good';

    currentPage = 0;
    limit = 3;

    carousel: Array<any> = [];
    news: Array<any> = [];

    // scrollCallback;
    scrollDistance = 1;
    scrollUpDistance = 2;
    direction = '';
    throttle = 30;

    constructor(private http: HttpClient, private newsService: NewsService) {

    }

    ngOnInit() {
        /*
        this.http.get<DataResponse>('http://localhost:3000/test').subscribe(data => {
            console.log(data);
        }, (errorResponse: HttpErrorResponse) => {
            if (errorResponse.error instanceof Error) {
                console.log('client side error');
            } else {
                console.log('server side error');
            }
            console.log(errorResponse);
        });

        const request = this.http.post('http://localhost:3000/article/list', {
            page: 0,
            limit: 5
        }).subscribe(res => {
            console.log(res);
        }, (errorResponse: HttpErrorResponse) => {
            console.log(errorResponse);
        });
        */

        this.getNews();

    }

    getNews() {
        this.currentPage++;
        // const result = this.newsService.getNewsList(this.currentPage, this.limit)
        // .subscribe(res => {
        //     console.log(res);
        //
        //     console.log(res['carousel']);
        //
        // }, (errorResponse: HttpErrorResponse) => {
        //     console.log(errorResponse);
        // });

        const request = this.http.post<DataResponse>('http://localhost:3000/article/list', {
            page: this.currentPage,
            limit: this.limit
        }).subscribe((res: DataResponse) => {
            console.log(res);
            // console.log(res.carousel);
            // console.log(res.list);

            this.carousel = res.carousel;
            this.news = this.news.concat(res.list);

        }, (errorResponse: HttpErrorResponse) => {
            console.log(errorResponse);
        });

        // console.log(this.carousel);
        // console.log(this.news);

    }

    /*
    loadData() {
        const request = this.http.post<DataResponse>('http://localhost:3000/article/list', {
            page: this.currentPage,
            limit: this.limit
        }).subscribe((res: DataResponse) => {
            console.log(res);
            // console.log(res.carousel);
            // console.log(res.list);

            this.carousel = res.carousel;
            this.news = this.news.concat(res.list);

        }, (errorResponse: HttpErrorResponse) => {
            console.log(errorResponse);
        });
    }
    */

    onScrollDown () {
        console.log('scrolled down!!');

        this.getNews();

        this.direction = 'down';
    }

    onUp() {
        console.log('scrolled up!');

        this.direction = 'up';
    }

    onScroll() {
        console.log('scrolled!!');
    }

}
