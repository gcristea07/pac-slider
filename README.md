# Pac-slider
Angular 2/4 responsive carousel
##Getting Started
##Installing
    npm install pac-slider
## Usage
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

