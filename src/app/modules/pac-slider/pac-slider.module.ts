import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CarouselComponent} from "./carousel.component";
import {SlideZoneDirective} from './slide-zone.directive';
import {CarouselItemComponent} from "./carousel-item.component";
import {CarouselSlideComponent} from "./carousel-slide.component";
import {RouterModule} from "@angular/router";
import 'hammerjs';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [CarouselComponent, CarouselItemComponent, CarouselSlideComponent, SlideZoneDirective],
    entryComponents: [CarouselSlideComponent],
    exports: [CarouselComponent, CarouselItemComponent]
})
export class PacSliderModule {
}