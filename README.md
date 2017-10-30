![Pac-Slider](https://opensource.mountsoftware.ro/preview-images/pac-logo.png)

Beautiful and easy to install Angular 2/4 responsive carousel slider

<a href="https://opensource.mountsoftware.ro/"><strong>Exemple »</strong></a>

## Table of contents
* [Install](#install)
* [Usage](#usage)
* [Creators](#creators)
* [Copyright and license](#copyright-and-license)

## Install

Quick download methods available: 

- [ZIP Download.](https://github.com/gcristea07/pac-slider/archive/master.zip)
- Clone the repo: `git clone https://github.com/gcristea07/pac-slider.git`
- Install with [npm](https://www.npmjs.com/): `npm install pac-slider`

## Usage
    autoPlay = {
        type:boolean,
        required:false,
        default:true
    }
    
    time = {
        type:number,
        required:false,
        default:4
     }
     
```html
<pac-slider [autoPlay]="true" [time]="4">
    <pac-item [src]="'http://exemple.com/photo.jpg'" [route]="'/contact'" [link]="'http://exemple.com'"></pac-item>
</pac-slider>
```


## Creators

**Gabriel Cristea**
- <https://github.com/gcristea07>
- <http://mountsoftware.ro/>

## Copyright and license

Code released under the [MIT License](https://github.com/gcristea07/pac-slider/blob/master/LICENSE)