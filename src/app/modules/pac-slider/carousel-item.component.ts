import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CarouselComponent} from "./carousel.component";

@Component({
    selector: 'pac-item',
    templateUrl: './carousel-item.component.html',
    styleUrls: ['./carousel-item.component.css']
})
export class CarouselItemComponent implements OnInit, OnDestroy {
    @Input() src;
    @Input() link;
    @Input() route;

    constructor(private parent: CarouselComponent) {
        parent.addSlideData(this);
    }

    ngOnInit() {

    }

    ngOnDestroy() {
        this.parent.removeSlide(this);
    }
}