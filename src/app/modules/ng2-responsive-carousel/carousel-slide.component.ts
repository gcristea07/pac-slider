import {Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {CarouselComponent} from "./carousel.component";

@Component({
    selector: 'ng2-carousel-slide',
    templateUrl: './carousel-slide.component.html',
    styleUrls: ['./carousel-slide.component.css']
})
export class CarouselSlideComponent implements OnInit, OnDestroy {
    @Input() src;

    @ViewChild('slideContainer')
    public slideContainer: ElementRef;

    constructor(private parent: CarouselComponent) {
    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }

}
