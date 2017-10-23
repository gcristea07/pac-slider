import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CarouselComponent} from "./carousel.component";
import {CarouselSlideComponent} from "./carousel-slide.component";
import {CarouselSlideDataComponent} from "./carousel-slide-data.component";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [CarouselComponent, CarouselSlideComponent, CarouselSlideDataComponent],
    exports:[CarouselComponent, CarouselSlideComponent]
})
export class Ng2ResponsiveCarouselModule {
}
