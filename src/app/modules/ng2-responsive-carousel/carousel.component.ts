import {AfterContentInit, Component, Input, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {CarouselSlideDataComponent} from "./carousel-slide-data.component";

@Component({
    selector: 'ng2-responsive-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit, AfterContentInit, OnDestroy {

    @Input() private autoPlay = true;
    @Input() private time = 4;

    @ViewChild('sliderContainer') private sliderContainer;
    @ViewChild('slidesZone') private slidesZone;
    @ViewChild('slideImg') private slideImg;

    public slides: Array<CarouselSlideDataComponent> = [];
    public htmlSlides: Array<any> = [];

    private index = 0;
    private lastOffset = 0;

    private states = {available: 'available', idle: 'idle'};
    private state = this.states.available;
    private interval;
    private pause;

    constructor(private renderer: Renderer2) {
    }

    ngOnInit() {
    }

    ngAfterContentInit() {
        this.slides.forEach(slide => {
            const htmlElement = this.renderer.createElement('div');
            this.renderer.addClass(htmlElement, 'image-container');

            const htmlLink = this.renderer.createElement('a');
            if(slide.link){
                this.renderer.setAttribute(htmlLink, 'href', slide.link);
            }

            const htmlImage = this.renderer.createElement('img');
            this.renderer.setAttribute(htmlImage, 'src', slide.src);

            this.renderer.appendChild(htmlElement, htmlLink);
            this.renderer.appendChild(htmlLink, htmlImage);
            this.renderer.appendChild(this.slideImg.nativeElement, htmlElement);
            this.htmlSlides.push(htmlElement);
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

    addSlideData(slide: CarouselSlideDataComponent) {
        this.slides.push(slide);
    }

    removeSlide(slide: CarouselSlideDataComponent) {

    }

    pauseAutoPlay() {
        this.pause = true;
    }

    startAutoPlay() {
        this.pause = false;
    }

    slideBack() {
        if (this.state === this.states.available) {
            this.state = this.states.idle;
            if (this.index === 0) {
                this.index = this.htmlSlides.length;
            }
            this.index--;
            this.lastOffset -= this.sliderContainer.nativeElement.getBoundingClientRect().width;
            this.renderer.insertBefore(
                this.slideImg.nativeElement,
                this.htmlSlides[this.index],
                this.slideImg.nativeElement.children[0]);
            this.htmlSlides.forEach((htmlSlide) => {
                this.renderer.removeClass(htmlSlide, 'delay');
                this.renderer.setStyle(htmlSlide, 'transform', 'translate3d(' + this.lastOffset + 'px, 0, 0)');
            });

            this.lastOffset += this.sliderContainer.nativeElement.getBoundingClientRect().width;
            this.htmlSlides.forEach((htmlSlide) => {
                this.renderer.addClass(htmlSlide, 'delay');
                this.renderer.setStyle(htmlSlide, 'transform', 'translate3d(' + this.lastOffset + 'px, 0, 0)');
            });

            setTimeout(() => {
                this.state = this.states.available;
            }, 720);
            setTimeout(() => {
                this.pause = false;
            }, this.time * 1000);

        }
    }

    slideForward() {
        if (this.state === this.states.available) {
            this.state = this.states.idle;
            this.index++;
            if (this.index > this.htmlSlides.length) {
                this.index = 1;
            }
            this.lastOffset -= this.sliderContainer.nativeElement.getBoundingClientRect().width;
            this.htmlSlides.forEach((htmlSlide) => {
                this.renderer.addClass(htmlSlide, 'delay');
                this.renderer.setStyle(htmlSlide, 'transform', 'translate3d(' + this.lastOffset + 'px, 0, 0)');
            });

            setTimeout(() => {
                this.renderer.removeChild(this.slideImg.nativeElement, this.slideImg.nativeElement.children[0]);
                this.renderer.appendChild(this.slideImg.nativeElement, this.htmlSlides[this.index - 1]);
                this.lastOffset = 0;
                this.htmlSlides.forEach((htmlSlide) => {
                    this.renderer.removeClass(htmlSlide, 'delay');
                    this.renderer.setStyle(htmlSlide, 'transform', 'translate3d(' + this.lastOffset + 'px, 0, 0)');
                });
                this.state = this.states.available;
            }, 720);
        }
    }
}