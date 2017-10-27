import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app works!';

    public photos = [
        {src: 'assets/img/slider/pac-slider-image-1.jpg'},
        {src: 'assets/img/slider/pac-slider-image-2.jpg'},
        {src: 'assets/img/slider/pac-slider-image-3.jpg'},
        {src: 'assets/img/slider/pac-slider-image-4.jpg'},
        {src: 'assets/img/slider/pac-slider-image-5.jpg'},
        {src: 'assets/img/slider/pac-slider-image-6.jpg'}
    ]
}
