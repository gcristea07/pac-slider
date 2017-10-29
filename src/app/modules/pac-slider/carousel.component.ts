import {
    AfterContentInit, Component, ComponentFactoryResolver, HostListener, Input, OnDestroy,
    ViewChild, ViewContainerRef
} from '@angular/core';
import {CarouselItemComponent} from "./carousel-item.component";
import {SlideZoneDirective} from "./slide-zone.directive";
import {CarouselSlideComponent} from "./carousel-slide.component";

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

    public slides: Array<CarouselItemComponent> = [];

    private viewContainerRef: ViewContainerRef;

    private carouselSlides: Array<CarouselSlideComponent> = [];

    private x = 0;
    private startX = 0;

    private state = STATE_AVAILABLE;
    private lastOffset = 0;
    private index = 0;
    private interval;
    private pause;
    private initialWindowWidth;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    }

    ngAfterContentInit() {
        this.initialWindowWidth = window.innerWidth;
        this.viewContainerRef = this.slideZone.viewContainerRef;
        this.lastOffset -= this.sliderContainer.nativeElement.getBoundingClientRect().width;
        let component = this.createComponent(this.slides[this.slides.length - 1]);
        this.carouselSlides.push(component);
        this.slides.forEach((slide, index) => {
            if (index != this.slides.length - 1) {
                let component = this.createComponent(slide);
                this.carouselSlides.push(component);
            }
        });

        if (this.autoPlay) {
            this.interval = setInterval(() => {
                if (!this.pause) {
                    this.slideForward();
                }
            }, this.time * 1000);
        }
    }

    createComponent(slide) {
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(CarouselSlideComponent);
        let componentRef = this.viewContainerRef.createComponent(componentFactory);
        componentRef.instance.src = slide.src;
        componentRef.instance.route = slide.route;
        componentRef.instance.link = slide.link;
        componentRef.instance.stabilizes(this.lastOffset);
        return componentRef.instance;
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


    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.lastOffset = 0 - this.sliderContainer.nativeElement.getBoundingClientRect().width;
        console.log(this.lastOffset);
        this.carouselSlides.forEach((slide) => {
            slide.stabilizes(this.lastOffset);
        });
    }

    pauseAutoPlay() {
        this.pause = true;
    }

    startAutoPlay() {
        this.pause = false;
    }

    onPanStart(event: any): void {
        event.preventDefault();
        this.startX = this.x;
    }

    onPan(event: any): void {
        event.preventDefault();
        this.x = this.startX + event.deltaX;
        if (this.state === STATE_AVAILABLE) {
            this.carouselSlides.forEach((slide) => {
                slide.stabilizes(this.lastOffset + this.x);
            });
        }
    }

    onPanEnd() {
        let swipePercent = Math.abs(this.x) * 100 / this.sliderContainer.nativeElement.getBoundingClientRect().width;
        swipePercent = Math.abs(100 - swipePercent);
        if (this.x < 0) {
            this.slideForward(swipePercent);
        } else {
            this.slideBack(swipePercent);
        }
        this.x = 0;
    }

    slideBack(deleyPercent = null) {
        if (this.state === STATE_AVAILABLE) {
            this.state = STATE_IDLE;

            this.lastOffset += this.sliderContainer.nativeElement.getBoundingClientRect().width;
            this.carouselSlides.forEach((slide) => {
                slide.slide(this.lastOffset, deleyPercent);
            });

            setTimeout(() => {
                let ref = this.viewContainerRef.get(this.carouselSlides.length - 1);
                this.viewContainerRef.move(ref, 0);
                this.lastOffset -= this.sliderContainer.nativeElement.getBoundingClientRect().width;
                this.carouselSlides.forEach((slide) => {
                    slide.stabilizes(this.lastOffset);
                });
                this.state = STATE_AVAILABLE;
                this.index--;
                if (this.index < 0) {
                    this.index = this.slides.length - 1;
                }
            }, 720);
            setTimeout(() => {
                this.pause = false;
            }, this.time * 1000);

        }
    }

    slideForward(deleyPercent = null) {
        if (this.state === STATE_AVAILABLE) {

            this.state = STATE_IDLE;

            this.lastOffset -= this.sliderContainer.nativeElement.getBoundingClientRect().width;
            this.carouselSlides.forEach((slide) => {
                slide.slide(this.lastOffset, deleyPercent);
            });

            setTimeout(() => {
                let ref = this.viewContainerRef.get(0);
                this.viewContainerRef.move(ref, this.carouselSlides.length - 1);
                this.lastOffset = 0 - this.sliderContainer.nativeElement.getBoundingClientRect().width;
                this.carouselSlides.forEach((slide) => {
                    slide.stabilizes(this.lastOffset);
                });
                this.state = STATE_AVAILABLE;
                this.index++;
                if (this.index > this.slides.length - 1) {
                    this.index = 0;
                }
            }, 720);
        }

    }

    slideToIndex(index) {
        if (index > this.index) {
            this.slideForward();
        } else if (index < this.index) {
            this.slideBack();
        }
    }
}