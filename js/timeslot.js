function formattime(value){
  var hour1=(value>>1)+8;
  var min1=(value%2)?':30':':00';
  var hour2=(value%2)?hour1+1:hour1;
  var min2=(value%2)?':00':':30';
  hour1=(hour1<10)?'0'+hour1.toString():hour1.toString();
  hour2=(hour2<10)?'0'+hour2.toString():hour2.toString();
  return hour1+min1+'-'+hour2+min2;
}
function slotunit(color, value, clickable) {
  var wapper = '<div class="time-slot';
  switch (color) {
    case 'yellow':
      wapper += ' time-slot-warning';
      break;
    case 'red':
      wapper += ' time-slot-danger';
      break;
    case 'green':
      wapper += ' time-slot-success';
      break;
    default:
  }
  if (clickable) wapper += ' time-slot-click';
  wapper += '" value="' + value + '" ';
  if (clickable) wapper += 'onclick="timeslotclick.call(this)" ';
  wapper += 'style="width: 3%" data-toggle="tooltip" data-placement="top" title="'+formattime(value)+'"></div>';
  return wapper;
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
  var header = '<div class=time-head><div class=time-slot style=width:10%></div><div class=time-slot style=width:6%>8</div><div class=time-slot style=width:6%>9</div><div class=time-slot style=width:6%>10</div><div class=time-slot style=width:6%>11</div><div class=time-slot style=width:6%>12</div><div class=time-slot style=width:6%>13</div><div class=time-slot style=width:6%>14</div><div class=time-slot style=width:6%>15</div><div class=time-slot style=width:6%>16</div><div class=time-slot style=width:6%>17</div><div class=time-slot style=width:6%>18</div><div class=time-slot style=width:6%>19</div><div class=time-slot style=width:6%>20</div><div class=time-slot style=width:6%>21</div><div class=time-slot style=width:6%>22</div><div class=time-slot style=width:6%>23</div></div>';
  var days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  for (var idiv = 0; idiv < divs.length; idiv++) {
    var div = divs[idiv];
    var wapper = header;
    var values = div.getAttribute("value");
    if (values == null) values = '0,0,0,0,0,0,0';
    values = values.split(",");
    for (var i = 0; i < values.length; i++) {
      values[i] = +values[i];
    }

    if (div.classList.contains("time-board-input")) {
      if (values.length == 7) {
        for (var j = 0; j < 7; j++) {
          wapper += '<div class="time-bar" value="' + j + '"><div class="time-slot" style="width: 10%">' + days[j] + '</div>';
          for (var k = 0; k < 32; k++) {
            if ((values[j] >> k) & 0x1) {
              wapper += slotunit('green', k, true);
            } else {
              wapper += slotunit('red', k, true);
            }
          }
          wapper += '</div>';
        }
        wapper += '<input type="text" name="'+div.getAttribute('inputname') +'" value="' + div.getAttribute("value") + '" hidden>';
        div.innerHTML = wapper;
      }
    } else {
      if (values.length == 7) {
        for (var j = 0; j < 7; j++) {
          wapper += '<div class="time-bar"><div class="time-slot" style="width: 10%">' + days[j] + '</div>';
          for (var k = 0; k < 32; k++) {
            if ((values[j] >> k) & 0x1) {
              wapper += slotunit('green', k, false);
            } else {
              wapper += slotunit('null', k, false);
            }
          }
          wapper += '</div>';
        }
        div.innerHTML = wapper;
      } else if (values.length == 14) {
        for (var j = 0; j < 7; j++) {
          wapper += '<div class="time-bar"><div class="time-slot" style="width: 10%">' + days[j] + '</div>';
          for (var k = 0; k < 32; k++) {
            var status = (values[j] >> k) & 0x1 + (values[j + 7] >> k) & 0x1;
            if ((values[j] >> k) & 0x1 && (values[j + 7] >> k) & 0x1) {
              wapper += slotunit('green', k, false);
            } else if ((values[j + 7] >> k) & 0x1) {
              wapper += slotunit('yellow', k, false);
            } else {
              wapper += slotunit('null', k, false);
            }
          }
          wapper += '</div>';
        }
        div.innerHTML = wapper;
      }
    }
  }
};

$(document).ready(function() {
  timeslotize($('.time-board'));
  $('.time-slot').tooltip();
});