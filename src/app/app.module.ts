import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {PacSliderModule} from "./modules/pac-slider/pac-slider.module";
import {AppComponent} from './app.component';
import {RouterModule, Routes} from "@angular/router";
import { Page1Component } from './page1/page1.component';
import { Page2Component } from './page2/page2.component';

const appRoutes: Routes = [
    { path: '', component:Page1Component  },
    { path: 'page2',component: Page2Component }
];

@NgModule({
    declarations: [
        AppComponent,
        Page1Component,
        Page2Component
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        PacSliderModule,
        RouterModule.forRoot(
            appRoutes
        )
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
