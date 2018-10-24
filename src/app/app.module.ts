import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { NewsService } from './service/news.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgbModule, NgbCarousel, NgbCarouselConfig, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailComponent } from './detail/detail.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    DetailComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    InfiniteScrollModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [
      NewsService,
      NgbCarousel
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
