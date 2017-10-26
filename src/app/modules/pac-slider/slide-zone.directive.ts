import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
    selector: '[slideZone]'
})
export class SlideZoneDirective {

    constructor(public viewContainerRef: ViewContainerRef) {

    }

}
