import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CarouselComponent} from "./carousel.component";

@Component({
    selector: 'ng2-carousel-slide-data',
    templateUrl: './carousel-slide-data.component.html',
    styleUrls: ['./carousel-slide-data.component.css']
})
export class CarouselSlideDataComponent implements OnInit, OnDestroy {
    @Input() src;
    @Input() link;

    constructor(private parent: CarouselComponent) {
        parent.addSlideData(this);
    }

    ngOnInit() {

    }

    ngOnDestroy() {
        this.parent.removeSlide(this);
    }
}