export default {
  Patterns: {
    datetime: /^[\d]{4}-[\d]{2}-[\d]{2}\s[\d]{2}:[\d]{2}:[\d]{2}(\.[\d]{1,3})?$/
  },
  /**
   * 从一个标准的datetime格式中切取各个数字，如 2018-09-09 15:49:16.123， 会切割成:
   * ["2018", "09", "09", "15", "49", "16", "123"]
   * @param datetime
   * @returns {*}
   */
  extractDatetime: function(datetime) {
    let thiz = this;
    console.debug(thiz.Patterns.datetime.test(datetime));
    if (datetime && thiz.Patterns.datetime.test(datetime)) {
      let elements = datetime.split(/-|\s|:|\./);
      console.debug(elements);
      let properties = {
        year: elements[0],
        month: elements[1],
        day: elements[2],
        hour: elements[3],
        minute: elements[4],
        second: elements[5],
        millisecond: elements[6]
      };
      return properties;
    }
    return null;
  },
  // 将 Date 转化为指定格式的String
  // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
  // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
  // 例子：
  // formatTime(new Date(),'yyyy-MM-dd hh:mm:ss.S'); ==> 2006-07-02 08:09:04.423
  // ormatTime(new Date(),'yyyy-M-d h:m:s.S'); ==> 2006-7-2 8:9:4.18
  formatTime: function(date, fmt) {
    let o = {
      'M+': date.getMonth() + 1, //月份
      'd+': date.getDate(), //日
      'h+': date.getHours(), //小时
      'm+': date.getMinutes(), //分
      's+': date.getSeconds(), //秒
      'q+': Math.floor((date.getMonth() + 3) / 3), //季度
      'S': date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
      }
    }
    return fmt;
  },
  //获取秒数
  getTimestamp: function(date) {
    let timestamp;
    if ((typeof date) === 'object') {
      timestamp = Date.parse(date);
    } else if (date && (typeof date) === 'string') {
      timestamp = Date.parse(new Date(date.replace(/-/g, '/')));
    } else {
      timestamp = Date.parse(new Date());
    }
    return timestamp / 1000;
  },
  // 截取日期字符串,并将'-'换为'.'
  parserDate: function(str) {
    return str.substring(0, 10).replace(/-/gm, '.');
  },
  getTimeDesc: function(dateStr) {
    let result = '未知';
    if (!dateStr) return result;
    dateStr = dateStr.replace(/-/g, '/');
    let diffValue = new Date().getTime() / 1000 - this.getTimestamp(new Date(dateStr));
    if (diffValue < 0) {
      return result;
    }

    let minute = 60;
    let hour = minute * 60;
    let day = hour * 24;
    let month = day * 30;

    let minC = diffValue / minute;
    let hourC = diffValue / hour;
    let dayC = diffValue / day;
    let weekC = diffValue / (day * 7);
    let monthC = diffValue / month;
    let yearC = diffValue / (month * 12);

    if (yearC >= 1) {
      result = parseInt(yearC) + '年前';
    } else if (monthC >= 1) {
      result = parseInt(monthC) + '个月前';
    } else if (weekC >= 1) {
      result = parseInt(weekC) + '周前';
    } else if (dayC >= 1) {
      result = parseInt(dayC) + '天前';
    } else if (hourC >= 1) {
      result = parseInt(hourC) + '个小时前';
    } else if (minC >= 1) {
      result = parseInt(minC) + '分钟前';
    } else {
      result = '刚刚';
    }
    return result;
  },
  getCurrDate: function() {
    let d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let date = d.getDate();
    // month = (month < 10 ? '0' + month : month);
    // date = (date < 10 ? '0' + date : date);
    return year + '年' + month + '月' + date + '日';
  },
  getCurrWeekDay: function() {
    let d = new Date();
    let week = d.getDay();
    let weekday = '';
    switch (week) {
      case 1:
        weekday = '星期一';
        break;
      case 2:
        weekday = '星期二';
        break;
      case 3:
        weekday = '星期三';
        break;
      case 4:
        weekday = '星期四';
        break;
      case 5:
        weekday = '星期五';
        break;
      case 6:
        weekday = '星期六';
        break;
      default:
        weekday = '星期日';
        break;
    }
    return weekday;
  },
  /*获取当前日期*/
  getCurrentDateTime: function(withTime, withWeekDay, zeroPadding) {
    let with_time = withTime || false;
    let with_weekday = withWeekDay || false;
    let zero_padding = zeroPadding || false;

    let d = new Date();
    let year = d.getFullYear() + '年';
    let month = d.getMonth() + 1;
    let date = d.getDate();


    let curDateTime = year;
    if (zero_padding) {
      month = (month > 9 ? '0' + month : month) + '月';
      date = (date > 9 ? '0' + date : date) + '日';
    } else {
      month += '月';
      date += '日';
    }
    curDateTime += month + date;

    /*时分秒*/
    if (with_time) {
      let hours = d.getHours();
      let minutes = d.getMinutes();
      let seconds = d.getSeconds();
      let ms = d.getMilliseconds();
      if (hours > 9) {
        curDateTime = curDateTime + ' ' + hours;
      } else {
        curDateTime = curDateTime + ' 0' + hours;
      }
      if (minutes > 9) {
        curDateTime = curDateTime + ':' + minutes;
      } else {
        curDateTime = curDateTime + ':0' + minutes;
      }
      if (seconds > 9) {
        curDateTime = curDateTime + ':' + seconds;
      } else {
        curDateTime = curDateTime + ':0' + seconds;
      }
    }

    if (with_weekday) {
      let week = d.getDay();
      let weekday = '';
      switch (week) {
        case 1:
          weekday = '星期一';
          break;
        case 2:
          weekday = '星期二';
          break;
        case 3:
          weekday = '星期三';
          break;
        case 4:
          weekday = '星期四';
          break;
        case 5:
          weekday = '星期五';
          break;
        case 6:
          weekday = '星期六';
          break;
        default:
          weekday = '星期日';
          break;
      }
      curDateTime = curDateTime + '，' + weekday;
    }
    return curDateTime;
  },
  /*获取当前农历*/
  getLunarDate: function() {
    let thiz = this;

    let D = new Date();
    let yy = D.getFullYear();
    let mm = D.getMonth() + 1;
    let dd = D.getDate();
    let ww = D.getDay();
    let ss = parseInt(D.getTime() / 1000);
    if (yy < 100) yy = '19' + yy;
    return thiz.GetLunarDay(yy, mm, dd);
  },
  GetLunarDay: function(solarYear, solarMonth, solarDay) {
    //定义全局变量
    let CalendarData = new Array(100);
    let madd = new Array(12);
    let tgString = '甲乙丙丁戊己庚辛壬癸';
    let dzString = '子丑寅卯辰巳午未申酉戌亥';
    let numString = '一二三四五六七八九十';
    let monString = '正二三四五六七八九十冬腊';
    let weekString = '日一二三四五六';
    let sx = '鼠牛虎兔龙蛇马羊猴鸡狗猪';
    let cYear, cMonth, cDay, TheDate;
    CalendarData = new Array(0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957, 0x2092F, 0x497, 0x60C96, 0xD4A, 0xEA5, 0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95, 0xD4A, 0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D, 0x2192B, 0xA95, 0x71695, 0x6CA, 0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA, 0x615AA, 0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A, 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25, 0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B, 0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6, 0x957, 0x5092F, 0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D, 0x92E, 0xC96, 0x41A95, 0xD4A, 0xDA5, 0x20B55, 0x56A, 0x7155B, 0x25D, 0x92D, 0x5192B, 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B, 0x60A57, 0x52B, 0xA93, 0x40E95);
    madd[0] = 0;
    madd[1] = 31;
    madd[2] = 59;
    madd[3] = 90;
    madd[4] = 120;
    madd[5] = 151;
    madd[6] = 181;
    madd[7] = 212;
    madd[8] = 243;
    madd[9] = 273;
    madd[10] = 304;
    madd[11] = 334;

    let GetBit = function(m, n) {
      return (m >> n) & 1;
    };
//农历转换
    let e2c = function() {
      TheDate = (arguments.length !== 3) ? new Date() : new Date(arguments[0], arguments[1], arguments[2]);
      let total, m, n, k;
      let isEnd = false;
      let tmp = TheDate.getYear();
      if (tmp < 1900) {
        tmp += 1900;
      }
      total = (tmp - 1921) * 365 + Math.floor((tmp - 1921) / 4) + madd[TheDate.getMonth()] + TheDate.getDate() - 38;

      if (TheDate.getYear() % 4 === 0 && TheDate.getMonth() > 1) {
        total++;
      }
      for (m = 0; ; m++) {
        k = (CalendarData[m] < 0xfff) ? 11 : 12;
        for (n = k; n >= 0; n--) {
          if (total <= 29 + GetBit(CalendarData[m], n)) {
            isEnd = true;
            break;
          }
          total = total - 29 - GetBit(CalendarData[m], n);
        }
        if (isEnd) break;
      }
      cYear = 1921 + m;
      cMonth = k - n + 1;
      cDay = total;
      if (k === 12) {
        if (cMonth === Math.floor(CalendarData[m] / 0x10000) + 1) {
          cMonth = 1 - cMonth;
        }
        if (cMonth > Math.floor(CalendarData[m] / 0x10000) + 1) {
          cMonth--;
        }
      }
    };
    let GetcDateString = function() {
      let tmp = '';
      /*显示农历年：（ 如：甲午(马)年 ）*/
      /*tmp+=tgString.charAt((cYear-4)%10);
       tmp+=dzString.charAt((cYear-4)%12);
       tmp+="(";
       tmp+=sx.charAt((cYear-4)%12);
       tmp+=")年 ";*/
      if (cMonth < 1) {
        tmp += '(闰)';
        tmp += monString.charAt(-cMonth - 1);
      } else {
        tmp += monString.charAt(cMonth - 1);
      }
      tmp += '月';
      tmp += (cDay < 11) ? '初' : ((cDay < 20) ? '十' : ((cDay < 30) ? '廿' : '三十'));
      if (cDay % 10 !== 0 || cDay === 10) {
        tmp += numString.charAt((cDay - 1) % 10);
      }
      return tmp;
    };

    solarMonth = (parseInt(solarMonth) > 0) ? (solarMonth - 1) : 11;
    e2c(solarYear, solarMonth, solarDay);
    return GetcDateString();
  },
  getGreeting4Time: function() {
    let currDate = new Date();
    let currHour = currDate.getHours();
    let greeting = '早安';
    if (currHour >= 9 && currHour < 12) {
      greeting = '上午好';
    }
    if (currHour >= 12 && currHour < 14) {
      greeting = '中午好';
    }
    if (currHour >= 14 && currHour < 19) {
      greeting = '下午好';
    }
    if (currHour >= 19 && currHour < 23) {
      greeting = '晚上好';
    }
    if ((currHour >= 23 && currHour < 24) || (currHour >= 0 && currHour < 5)) {
      greeting = '夜深了';
    }
    return greeting;
  },
  getMonthStartDay: function(dateTime) {
    return new Date(dateTime.getFullYear(), dateTime.getMonth(), 1);
  },
  getMonthEndDay: function(dateTime) {
    return new Date(dateTime.getFullYear(), dateTime.getMonth() + 1, 0);
  }
};

