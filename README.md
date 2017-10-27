# PAC-Slider #

## Table of contents
* [Quick Start](#quick-start)
* [Install](##install)
* [Usage](#usage)
* [Creator](#creators)


##Quick Start



##Install

Quick download methods available: 

- [ZIP Download.](https://github.com/gcristea07/pac-slider/archive/master.zip)
- Clone the repo: clone `https://github.com/twbs/bootstrap.git`
- Install with [npm](https://www.npmjs.com/): `npm install pac-slider`

##Usage
    autoPlay = {
        type:Boolean,
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
    <pac-item [src]="'http://site.com/photo.jpg'" [route]="'/contact'" [link]="'http://com.link'"></pac-item>
</pac-slider>
```


## Creators

**Gabriel Cristea**
- <https://github.com/gcristea07>
- <http://mountsoftware.ro/>

## Copyright and license

Code released under the [MIT License](https://github.com/gcristea07/pac-slider/blob/master/LICENSE)