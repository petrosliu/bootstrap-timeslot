# Bootstrap Timeslot 
*[Demo](https://petrosliu.github.io/bootstrap-timeslot)*
## Usage
```javascript
timeslotize($('.time-board'));
$('.time-slot').tooltip();
```
## Examples
### Empty Table
```html
<div class='time-board time-board-hover'></div>
```

### Single Table
```html
<div class='time-board time-board-hover' value='0xFFF00,0x3FF80,0xFF0,0xF803F8,0xFFF00,0xFFF800,0xF00'></div>
```

### Comparison Table
```html
<div class='time-board time-board-hover' value='0xFFF00,0x3FF80,0xFF0,0xF803F8,0xFFF00,0xFFF800,0xF00,0xF00,0xFFF800,xFFF00,0xFFF00,0xFF0,0xF803F8,0x3FF80'></div>
```

### Input Table
```html
<div class='time-board-input time-board time-board-hover' value='0xFFF00,0x3FF80,0xFF0,0xF803F8,0xFFF00,0xFFF800,0xF00' inputname='child[time_slot]'></div>
```
