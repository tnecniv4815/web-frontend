import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';

interface DataResponse {
    data: any,
    error: string,
    message: string
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor(private http: HttpClient) {

    }

    ngOnInit() {
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

    }

}
