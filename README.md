# Bootstrap Timeslot 
*[Demo](http://timeslot.liuyid.in)*
## Usage
```javascript
$(document).ready(function() {
  timeslotize($('.time-board'));
  $('.time-slot').tooltip();
});
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
<div class='time-board time-board-hover' value='0xFFF00,0x3FF80,0xFF0,0xF803F8,0xFFF00,0xFFF800,0xF00,0xF00,0xFFF800,0xFFF00,0xFFF00,0xFF0,0xF803F8,0x3FF80'></div>
```

### Input Table
```html
<div class='time-board time-board-input time-board-hover' value='0xFFF00,0x3FF80,0xFF0,0xF803F8,0xFFF00,0xFFF800,0xF00' inputname='child[time_slot]'></div>
```
