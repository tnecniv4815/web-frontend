import {Component, Input, OnInit} from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

interface ArticleDetail {
    contents: any;
    title: string;
    thumbnail: string;
    posted_at: string;
}

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  BASE_URL = 'http://localhost:3000';

  // @Input() articleId: string;

  // this.id=this._Activatedroute.snapshot.params['id'];


  id: string;
  article: ArticleDetail;

  constructor(private activeRoute: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {

      const queryParams = this.activeRoute.snapshot.queryParams;
      const routeParams = this.activeRoute.snapshot.params;


      this.id = routeParams.id;

      this.getNewsDetail(this.id);

  }

  getNewsDetail(articleId: string) {
      const request = this.http.post<ArticleDetail>('http://localhost:3000/article/detail', {
          article_id: articleId
      }).subscribe((res: ArticleDetail) => {
          console.log(res);
          this.article = res;
      }, (errorResponse: HttpErrorResponse) => {
          console.log(errorResponse);
      });
  }

}
