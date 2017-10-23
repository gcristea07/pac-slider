import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {Ng2ResponsiveCarouselModule} from "./modules/ng2-responsive-carousel/ng2-responsive-carousel.module";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        Ng2ResponsiveCarouselModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
