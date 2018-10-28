import {Component, OnInit, ViewChild} from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NewsService } from '../service/news.service';
import {Data} from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import {SERVER_BASE_URL} from '../util/config';


interface DataResponse {
    carousel: any;
    list: any;
}

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    providers: [NgbCarouselConfig]
})
export class HomeComponent implements OnInit {

    // BASE_URL = 'http://localhost:3000';

    BASE_URL = SERVER_BASE_URL;
    listUrl = SERVER_BASE_URL + '/article/list';

    // IMG_URL = this.BASE_URL + '/public/images/2018-10-19_12:32.jpg';

    // hello = 'good';
    // @ViewChild('carousel') carousel: any;

    currentPage = 0;
    limit = 15;

    carousel: Array<any> = [];
    news: Array<any> = [];

    // load more;
    scrollDistance = 1;
    scrollUpDistance = 2;
    direction = '';
    throttle = 30;

    // carousel
    // images = [1, 2, 3, 4].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);

    constructor(private config: NgbCarouselConfig, private http: HttpClient, private newsService: NewsService) {
        config.interval = 1000;
        config.keyboard = false;
        // config.wrap = false;
        // config.keyboard = false;
        // config.pauseOnHover = false;
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

        const request = this.http.post<DataResponse>(this.listUrl, {
            page: this.currentPage,
            limit: this.limit
        }).subscribe((res: DataResponse) => {
            // console.log(res);
            // console.log(res.carousel);
            // console.log(res.list);
            this.carousel = res.carousel;
            this.news = this.news.concat(res.list);

            console.log(this.news.length);

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
