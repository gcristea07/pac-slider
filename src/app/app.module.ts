import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {CarouselComponent} from "./carousel/carousel.component";
import {CarouselSlideComponent} from "./carousel/carousel-slide.component";
import {CarouselSlideDataComponent} from "./carousel/carousel-slide-data.component";

@NgModule({
    declarations: [
        AppComponent,
        CarouselComponent,
        CarouselSlideComponent,
        CarouselSlideDataComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
