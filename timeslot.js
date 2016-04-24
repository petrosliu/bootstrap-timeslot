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
  var header = '<div class="time-head"><div class="time-slot" style="width:4%"></div><div class="time-slot" style="width:6%"><p>7</p></div><div class="time-slot" style="width:6%"><p>8</p></div><div class="time-slot" style="width:6%"><p>9</p></div><div class="time-slot" style="width:6%"><p>10</p></div><div class="time-slot" style="width:6%"><p>11</p></div><div class="time-slot" style="width:6%"><p>12</p></div><div class="time-slot" style="width:6%"><p>13</p></div><div class="time-slot" style="width:6%"><p>14</p></div><div class="time-slot" style="width:6%"><p>15</p></div><div class="time-slot" style="width:6%"><p>16</p></div><div class="time-slot" style="width:6%"><p>17</p></div><div class="time-slot" style="width:6%"><p>18</p></div><div class="time-slot" style="width:6%"><p>19</p></div><div class="time-slot" style="width:6%"><p>20</p></div><div class="time-slot" style="width:6%"><p>21</p></div><div class="time-slot" style="width:6%"><p>22</p></div></div>';
  var days = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

  for (var idiv = 0; idiv < divs.length; idiv++) {
    var div = divs[idiv];
    var wrapper = header;
    var values = div.getAttribute("value");
    if (values == null) values = '0,0,0,0,0,0,0';
    values = values.split(",");
    if (values.length != 7 && values.length != 14){
      values = '0,0,0,0,0,0,0'.split(",");
    }
    for (var i = 0; i < values.length; i++) {
      values[i] = +values[i];
    }
    div.setAttribute("value",values.join(','));

    if (div.classList.contains("time-board-input")) {
      if (values.length == 7) {
        for (var j = 0; j < 7; j++) {
          wrapper += '<div class="time-bar" value="' + j + '"><div class="time-slot" style="width: 4%"><p>' + days[j] + '</p></div>';
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
          wrapper += '<div class="time-bar"><div class="time-slot" style="width: 4%"><p>' + days[j] + '</p></div>';
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
          wrapper += '<div class="time-bar"><div class="time-slot" style="width: 4%"><p>' + days[j] + '</p></div>';
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