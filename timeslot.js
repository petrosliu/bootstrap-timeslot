function formattime(value){
  var hour1=(value>>1)+7;
  var min1=(value%2)?':30':':00';
  var hour2=(value%2)?hour1+1:hour1;
  var min2=(value%2)?':00':':30';
  hour1=(hour1<10)?'0'+hour1.toString():hour1.toString();
  hour2=(hour2<10)?'0'+hour2.toString():hour2.toString();
  return hour1+min1+'-'+hour2+min2;
}

function slotunit(color, value, clickable) {
  var wrapper = '<div class="time-slot';
  wrapper += ' time-slot-' + color;
  if (clickable) wrapper += ' time-slot-click';
  wrapper += '" value="' + value + '" ';
  if (clickable) wrapper += 'onclick="timeslotclick.call(this)" ';
  wrapper += 'style="width: 3%" data-toggle="tooltip" data-placement="top" title="'+formattime(value)+'"></div>';
  return wrapper;
};

function timeslotclick() {
  var time = this.getAttribute("value");
  var day = this.parentElement.getAttribute("value");
  var timeslots = this.parentElement.parentElement.getElementsByTagName('input')[0].getAttribute("value").split(",");
  var timeslot = +timeslots[day];
  timeslot ^= 1 << time;
  timeslots[day] = timeslot.toString();
  timeslots = timeslots.join(',');
  this.parentElement.parentElement.setAttribute("value", timeslots);
  this.parentElement.parentElement.getElementsByTagName('input')[0].setAttribute("value", timeslots);
  if(this.classList.contains('time-slot-success')){
    this.classList.remove('time-slot-success');
    this.classList.add('time-slot-danger');
  }
  else{
    this.classList.remove('time-slot-danger');
    this.classList.add('time-slot-success');
  }
}

function timeslotize(divs) {
  var header = '<div class="time-head"><div class="time-slot" style="width:4%"></div><div class="time-slot" style="width:6%"> 7</div><div class="time-slot" style="width:6%"> 8</div><div class="time-slot" style="width:6%"> 9</div><div class="time-slot" style="width:6%"> 10</div><div class="time-slot" style="width:6%"> 11</div><div class="time-slot" style="width:6%"> 12</div><div class="time-slot" style="width:6%"> 13</div><div class="time-slot" style="width:6%"> 14</div><div class="time-slot" style="width:6%"> 15</div><div class="time-slot" style="width:6%"> 16</div><div class="time-slot" style="width:6%"> 17</div><div class="time-slot" style="width:6%"> 18</div><div class="time-slot" style="width:6%"> 19</div><div class="time-slot" style="width:6%"> 20</div><div class="time-slot" style="width:6%"> 21</div><div class="time-slot" style="width:6%"> 22</div></div>';
  var days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  for (var idiv = 0; idiv < divs.length; idiv++) {
    var div = divs[idiv];
    var wrapper = header;
    var values = div.getAttribute("value");
    if (values == null) values = '0,0,0,0,0,0,0';
    values = values.split(",");
    for (var i = 0; i < values.length; i++) {
      values[i] = +values[i];
    }
    div.setAttribute("value",values.join(','));

    if (div.classList.contains("time-board-input")) {
      if (values.length == 7) {
        for (var j = 0; j < 7; j++) {
          wrapper += '<div class="time-bar" value="' + j + '"><div class="time-slot" style="width: 4%">' + days[j] + '</div>';
          for (var k = 0; k < 32; k++) {
            if ((values[j] >> k) & 0x1) {
              wrapper += slotunit('success', k, true);
            } else {
              wrapper += slotunit('danger', k, true);
            }
          }
          wrapper += '</div>';
        }
        wrapper += '<input type="text" name="'+div.getAttribute('inputname') +'" value="' + div.getAttribute("value") + '" hidden>';
      }
    }
    else {
      if (values.length == 7) {
        for (var j = 0; j < 7; j++) {
          wrapper += '<div class="time-bar"><div class="time-slot" style="width: 4%">' + days[j] + '</div>';
          for (var k = 0; k < 32; k++) {
            if ((values[j] >> k) & 0x1) {
              wrapper += slotunit('success', k, false);
            } else {
              wrapper += slotunit('null', k, false);
            }
          }
          wrapper += '</div>';
        }
      }
      else if (values.length == 14) {
        for (var j = 0; j < 7; j++) {
          wrapper += '<div class="time-bar"><div class="time-slot" style="width: 4%">' + days[j] + '</div>';
          for (var k = 0; k < 32; k++) {
            if ((values[j] >> k) & 0x1 && (values[j + 7] >> k) & 0x1) {
              wrapper += slotunit('success', k, false);
            } else if ((values[j + 7] >> k) & 0x1) {
              wrapper += slotunit('warning', k, false);
            } else {
              wrapper += slotunit('null', k, false);
            }
          }
          wrapper += '</div>';
        }
      }
    }
    div.innerHTML = wrapper;
  }
};