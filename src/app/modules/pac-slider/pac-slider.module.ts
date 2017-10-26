import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CarouselComponent} from "./carousel.component";
import {CarouselItemComponent} from "./carousel-item.component";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [CarouselComponent, CarouselItemComponent],
    exports: [CarouselComponent, CarouselItemComponent]
})
export class PacSliderModule {
}
