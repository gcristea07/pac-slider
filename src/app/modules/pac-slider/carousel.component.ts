import {
    AfterContentInit, Component, ComponentFactoryResolver, Input, OnDestroy,
    ViewChild, ViewContainerRef
} from '@angular/core';
import {CarouselItemComponent} from "./carousel-item.component";
import {SlideZoneDirective} from "./slide-zone.directive";
import {CarouselSlideComponent} from "./carousel-slide.component";
import {Location} from "@angular/common";
import {Router} from "@angular/router";

const STATE_AVAILABLE = 'available';
const STATE_IDLE = 'idle';

@Component({
    selector: 'pac-slider',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements AfterContentInit, OnDestroy {

    @Input()
    private autoPlay = true;

    @Input()
    private time = 4;

    @ViewChild('slidesZone')
    private slidesZone;

    @ViewChild('sliderContainer')
    private sliderContainer;

    @ViewChild(SlideZoneDirective)
    private slideZone: SlideZoneDirective;

    private slides: Array<CarouselItemComponent> = [];

    private viewContainerRef: ViewContainerRef;

    private carouselSlides: Array<CarouselSlideComponent> = [];


    private state = STATE_AVAILABLE;
    private lastOffset = 0;
    private interval;
    private pause;

    constructor(private componentFactoryResolver: ComponentFactoryResolver,
                private test: ViewContainerRef) {
        console.log(test);
    }

    ngAfterContentInit() {
        this.viewContainerRef = this.slideZone.viewContainerRef;

        this.slides.forEach(slide => {
            let componentFactory = this.componentFactoryResolver.resolveComponentFactory(CarouselSlideComponent);
            let componentRef = this.viewContainerRef.createComponent(componentFactory);
            componentRef.instance.src = slide.src;
            componentRef.instance.route = slide.route;
            componentRef.instance.link = slide.link;
            this.carouselSlides.push(componentRef.instance);

        });

        if (this.autoPlay) {

            this.interval = setInterval(() => {
                if (!this.pause) {
                    this.slideForward();
                }
            }, this.time * 1000);
        }
    }

    ngOnDestroy() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    addSlideData(slide: CarouselItemComponent) {
        this.slides.push(slide);
    }

    removeSlide(slide: CarouselItemComponent) {

    }

    pauseAutoPlay() {
        this.pause = true;
    }

    startAutoPlay() {
        this.pause = false;
    }

    slideBack() {
        if (this.state === STATE_AVAILABLE) {
            this.state = STATE_IDLE;

            let ref = this.viewContainerRef.get(this.carouselSlides.length - 1);
            this.viewContainerRef.move(ref, 0);
            this.lastOffset -= this.sliderContainer.nativeElement.getBoundingClientRect().width;
            this.carouselSlides.forEach((slide) => {
                slide.stabilizes(this.lastOffset)
            });
            this.lastOffset += this.sliderContainer.nativeElement.getBoundingClientRect().width;
            this.carouselSlides.forEach((slide) => {
                slide.slide(this.lastOffset)
            });

            setTimeout(() => {
                this.state = STATE_AVAILABLE;
            }, 720);
            setTimeout(() => {
                this.pause = false;
            }, this.time * 1000);

        }
    }

    slideForward() {
        if (this.state === STATE_AVAILABLE) {
            this.state = STATE_IDLE;

            this.lastOffset -= this.sliderContainer.nativeElement.getBoundingClientRect().width;
            this.carouselSlides.forEach((slide) => {
                slide.slide(this.lastOffset)
            });

            setTimeout(() => {
                let ref = this.viewContainerRef.get(0);
                this.viewContainerRef.move(ref, this.carouselSlides.length - 1);
                this.lastOffset = 0;
                this.carouselSlides.forEach((slide) => {
                    slide.stabilizes(this.lastOffset)
                });
                this.state = STATE_AVAILABLE;
            }, 720);
        }

    }
}