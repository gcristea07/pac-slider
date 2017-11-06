import {Component, ElementRef, Input, Renderer2} from '@angular/core';

@Component({
    selector: 'pac-carousel-slide',
    templateUrl: './carousel-slide.component.html',
    styleUrls: ['./carousel-slide.component.scss']
})
export class CarouselSlideComponent {

    @Input() public src;
    @Input() public link;
    @Input() public route;

    constructor(private el: ElementRef, private renderer: Renderer2) {
    }

    slide(offset, deleyPercent = null) {
        // if (deleyPercent != null) {
        //     this.renderer.setStyle(this.el.nativeElement,
        //         'transition', 'transform 0.' + Math.floor(deleyPercent / 100 * 7) + 's ease-in-out');
        // } else {
            this.renderer.addClass(this.el.nativeElement, 'delay');
        // }
        this.renderer.setStyle(this.el.nativeElement, 'transform', 'translate3d(' + offset + 'px, 0, 0)');
    }

    stabilizes(offset) {
        this.renderer.removeClass(this.el.nativeElement, 'delay');
        this.renderer.setStyle(this.el.nativeElement, 'transform', 'translate3d(' + offset + 'px, 0, 0)');
    }

}
