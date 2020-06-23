<template>
    <div v-if="showPicker" class="date-picker">
        <div class="date-picker-mask" catchtouchstart="onTouchmask"></div>
        <div class="date-picker-content">
            <div class="date-picker-date-content">
                <!--<image src="../../../../image/picker_date_header_{{tapIndex=='startTime'?'left':'right'}}.png"-->
                <!--class="date-picker-date-content-image"></image>-->
                <!--&gt;-->
                <div class="date-picker-date-content-bg-left {{dateTypeValue=='D' && tapIndex=='startTime'?'selected-tap':''}}"
                      bindtouchstart="{{dateTypeValue=='D'?'onTapTimeIndex':''}}" data-type="startTime">
                    <div class="date-picker-date-content-title">开始于</div>
                    <div class="date-picker-date-content-time">{{startAt}}</div>
                </div>
                <div class="date-picker-date-content-bg-right {{dateTypeValue=='D' && tapIndex=='endTime'?'selected-tap':''}}"
                      bindtouchstart="{{dateTypeValue=='D'?'onTapTimeIndex':''}}" data-type="endTime">
                    <div class="date-picker-date-content-title">结束于</div>
                    <div class="date-picker-date-content-time">{{endAt}}</div>
                </div>
            </div>
            <div class='date-picker-content-top'>
                <div class="date-picker-content-cancel"></div>
                <div style="color: #666666; font-size: 28rpx">选择日期</div>
                <div class="date-picker-content-sure" catchtouchend="onSureClick">完成</div>
            </div>
            <div class="date-picker-content-line"></div>
            <div class="date-picker-content-center">
                <!--<picker-div indicator-style="height: 70rpx;" style="width: 100%; height: 360rpx;"-->
                            <!--value="{{tapIndex==='startTime'?startValue:endValue}}" catchchange="bindPickerChange">-->
                <van-datetime-picker
                        v-model="currentDate"
                        type="date"
                        :min-date="minDate"
                        :max-date="maxDate"
                />


                <!--<picker-div indicator-style="height: 70rpx;" style="width: 100%; height: 360rpx;"-->
                             <!--value="{{tapIndex==='startTime'?startValue:endValue}}" catchchange="bindPickerChange">-->
                    <!--<block wx:if="{{dateTypeValue=='Y'}}">-->
                        <!--<picker-div-column wx:if="{{years.length > 0}}" class="date-picker-content-item">-->
                            <!--<div wx:for="{{years}}" wx:key="years" style="line-height: 70rpx">{{item}}年</div>-->
                        <!--</picker-div-column>-->
                    <!--</block>-->
                    <!--<block wx:if="{{dateTypeValue=='M'}}">-->
                        <!--<picker-div-column wx:if="{{years.length > 0}}" class="date-picker-content-item">-->
                            <!--<div wx:for="{{years}}" wx:key="years" style="line-height: 70rpx">{{item}}年</div>-->
                        <!--</picker-div-column>-->
                        <!--<picker-div-column wx:if="{{months.length > 0}}" class="date-picker-content-item">-->
                            <!--<div wx:for="{{months}}" wx:key="months" style="line-height: 70rpx">{{item}}月</div>-->
                        <!--</picker-div-column>-->
                    <!--</block>-->
                    <!--<block wx:if="{{dateTypeValue=='D'}}">-->
                        <!--<picker-div-column wx:if="{{years.length > 0}}" class="date-picker-content-item">-->
                            <!--<div wx:for="{{years}}" wx:key="years" style="line-height: 70rpx">{{item}}年</div>-->
                        <!--</picker-div-column>-->
                        <!--<picker-div-column wx:if="{{months.length > 0}}" class="date-picker-content-item">-->
                            <!--<div wx:for="{{months}}" wx:key="months" style="line-height: 70rpx">{{item}}月</div>-->
                        <!--</picker-div-column>-->
                        <!--<picker-div-column wx:if="{{days.length > 0}}" class="date-picker-content-item">-->
                            <!--<div wx:for="{{days}}" wx:key="days" style="line-height: 70rpx">{{item}}日</div>-->
                        <!--</picker-div-column>-->
                    <!--</block>-->
                <!--</picker-div>-->
            </div>
        </div>
    </div>
</template>

<script>
  import {DatetimePicker} from 'vant';
  export default {
    name: 'data-picker',
    props: {
      //开始期间
      startAt: {
        type: String,
        value: '',
        observer: 'onStartAt'
      },
      //结束时间
      endAt: {
        type: String,
        value: '',
        observer: 'onEndAt'
      },
      isShow: {
        type: Boolean,
        value: false,
        observer: 'onDateShow'
      },

      //日期类型:年/月/日
      dateType: {
        type: String,
        value: '',
        observer: 'onDateType'
      }
    },

    data() {
      return {
        years: years,
        months: months,
        days: days,
        startValue: [],
        endValue: [],
        currentDate:new Date(),
        showPicker: false,
        minDate: new Date(2020, 0, 1),
        maxDate: new Date(2025, 10, 1),
        tapIndex: 'startTime',
        dateTypeValue: 'D'  //picker的时间类型 Y/M/W/D
      };
    },

    mounted() {
      let thiz = this;
      var app = getApp();
      var date = new Date();
      var years = [];
      var months = [];
      var days = [];

      for (let i = date.getFullYear() - 2; i <= (date.getFullYear() + 2); i++) {
        years.push(String(i));
      }
      for (let i = 1; i <= 12; i++) {
        months.push(String(i));
      }
//后面会根据需求动态改变每月的天数，数组
      for (let i = 1; i <= 31; i++) {
        days.push(String(i));
      }

      thiz.onDateType();
      console.log('dateTypeValue===========>', this.data.dateTypeValue);
      //根据当前日期获得初始化日期数组startValue
      let dateStr = app.UtilFactory.timeUtil.formatTime(new Date(), 'yyyy-MM-dd');
      thiz.setData({
        startValue: thiz.getDateArrWithtime(dateStr, years, months, days)
      });
    },
    methods: {
      onStartAt() {
        this.data.startValue = this.getDateArrWithtime(this.data.startAt, years, months, days);
        days = this.getTotalDayByMonth(this.data.years[this.data.startValue[0]], this.data.months[this.data.startValue[1]]);
      },
      onEndAt() {
        this.data.endValue = this.getDateArrWithtime(this.data.endAt, years, months, days);
        days = this.getTotalDayByMonth(this.data.years[this.data.endValue[0]], this.data.months[this.data.endValue[1]]);
      },
      onDateShow() {
        this.setData({
          showPicker: this.data.isShow
        });
      },
      onDateType() {
        let thiz = this;
        let dateStr = app.UtilFactory.timeUtil.formatTime(new Date(), 'yyyy-MM-dd');
        thiz.setData({
          dateTypeValue: this.data.dateType,
          startValue: thiz.getDateArrWithtime(dateStr, years, months, days)
        }, function() {
          if (this.data.dateTypeValue == 'Y') {
            let curYear = this.data.years[this.data.startValue[0]];
            let curMonth = 1;
            let curDay = 1;
            this.data.startAt = curYear + '-01-01';
            this.data.endAt = curYear + '-12-31';
            this.setData({
              days: this.getTotalDayByMonth(curYear, curMonth),
              startAt: this.data.startAt,
              endAt: this.data.endAt
            });
          }
          if (this.data.dateTypeValue == 'M') {
            let curYear = this.data.years[this.data.startValue[0]];
            let curMonth = this.data.months[this.data.startValue[1]];
            let curDay = '01';
            let days = this.getTotalDayByMonth(curYear, curMonth);
            let endCurDay = days[days.length - 1];
            this.data.startAt = curYear + '-' + (curMonth.length == 1 ? ('0' + curMonth) : curMonth) + '-' + (curDay.length == 1 ? ('0' + curDay) : curDay);
            this.data.endAt = curYear + '-' + (curMonth.length == 1 ? ('0' + curMonth) : curMonth) + '-' + (endCurDay.length == 1 ? ('0' + endCurDay) : endCurDay);
            this.setData({
              days: days,
              startAt: this.data.startAt,
              endAt: this.data.endAt
            });
          }

        });
      },

      //获取月的总天数--数组
      getTotalDayByMonth: function(year, month) {
        month = parseInt(month, 10);
        var d = new Date(year, month, 0);
        let totalDay = d.getDate();
        let daySource = [];
        for (let i = 1; i <= totalDay; i++) {
          daySource.push(String(i));
        }
        return daySource;
      },
      //根据时间2019-01-02  得到 ['2019','1','2']
      getDateArrWithtime: function(str, years, months, days) {
        let arr = [];
        arr = (str).split('-');
        arr[0] = years.indexOf(arr[0]);
        arr[1] = months.indexOf((arr[1].startsWith('0') ? arr[1].substr(1, arr[1].length) : arr[1]));
        arr[2] = days.indexOf((arr[2].startsWith('0') ? arr[2].substr(1, arr[2].length) : arr[2]));
        return arr;
      },

      bindPickerChange(e) {
        console.log('bindPickerChange==========>', e);
        if (this.data.tapIndex == 'startTime') {
          this.data.startValue = e.detail.value;
        } else {
          this.data.endValue = e.detail.value;
        }
        this.calculate();
      },

      //计算开始日期和开始月份的天数，计算结束日期和结束月份的天数
      calculate() {
        console.log('this.data.endValue======>', this.data.endValue);
        if (this.data.dateTypeValue == 'D') {
          if (this.data.tapIndex == 'startTime') {
            let curYear = this.data.years[this.data.startValue[0]];
            let curMonth = this.data.months[this.data.startValue[1]];
            let curDay = this.data.days[this.data.startValue[2]];
            this.data.startAt = curYear + '-' + (curMonth.length == 1 ? ('0' + curMonth) : curMonth) + '-' + (curDay.length == 1 ? ('0' + curDay) : curDay);
            this.setData({
              days: this.getTotalDayByMonth(curYear, curMonth),
              startAt: this.data.startAt
            });
          } else {
            let endCurYear = this.data.years[this.data.endValue[0]];
            let endCurMonth = this.data.months[this.data.endValue[1]];
            let endCurDay = this.data.days[this.data.endValue[2]];
            this.data.endAt = endCurYear + '-' + (endCurMonth.length == 1 ? ('0' + endCurMonth) : endCurMonth) + '-' + (endCurDay.length == 1 ? ('0' + endCurDay) : endCurDay);

            this.setData({
              days: this.getTotalDayByMonth(endCurYear, endCurMonth),
              endAt: this.data.endAt
            });
          }
        }
        if (this.data.dateTypeValue == 'Y') {
          let curYear = this.data.years[this.data.startValue[0]];
          let curMonth = 1;
          let curDay = 1;
          this.data.startAt = curYear + '-01-01';
          this.data.endAt = curYear + '-12-31';
          this.setData({
            days: this.getTotalDayByMonth(curYear, curMonth),
            startAt: this.data.startAt,
            endAt: this.data.endAt
          });
        }
        if (this.data.dateTypeValue == 'M') {
          let curYear = this.data.years[this.data.startValue[0]];
          let curMonth = this.data.months[this.data.startValue[1]];
          let curDay = '01';
          let days = this.getTotalDayByMonth(curYear, curMonth);
          let endCurDay = days[days.length - 1];
          this.data.startAt = curYear + '-' + (curMonth.length == 1 ? ('0' + curMonth) : curMonth) + '-' + (curDay.length == 1 ? ('0' + curDay) : curDay);
          this.data.endAt = curYear + '-' + (curMonth.length == 1 ? ('0' + curMonth) : curMonth) + '-' + (endCurDay.length == 1 ? ('0' + endCurDay) : endCurDay);
          this.setData({
            days: days,
            startAt: this.data.startAt,
            endAt: this.data.endAt
          });
        }
      },

      //选择开始日期或者结束日期
      onTapTimeIndex(e) {
        this.data.tapIndex = e.currentTarget.dataset.type;
        if (this.data.tapIndex == 'startTime') {
          let curYear = this.data.years[this.data.startValue[0]];
          let curMonth = this.data.months[this.data.startValue[1]];
          days = this.getTotalDayByMonth(curYear, curMonth);
        } else {
          let endCurYear = this.data.years[this.data.endValue[0]];
          let endCurMonth = this.data.months[this.data.endValue[1]];
          days = this.getTotalDayByMonth(endCurYear, endCurMonth);
        }
        this.setData({
          tapIndex: this.data.tapIndex,
          startValue: this.data.startValue,
          endValue: this.data.endValue,
          days: days
        });
      }
      ,

      //提交确认的时间段
      onSureClick(e) {
        if (new Date(this.data.startAt).getTime() <= new Date(this.data.endAt).getTime()) {
          this.triggerEvent('sureclick', {
            startAt: this.data.startAt,
            endAt: this.data.endAt
          });
        } else {
          wx.showToast({
            title: '开始时间不能晚于结束时间',
            icon: 'none',
            duration: 3000
          });
        }
      }
      ,
      onTouchmask: function(event) {
        this.triggerEvent('onTouchmask', {});
      }


    },
    watch: {
      $route(to, from) {
        let thiz = this;
        console.log(thiz.$router);
        if (thiz.$router.options.tabBars.indexOf(thiz.$router.history.current.path) == -1) {
          thiz.showBack = true;
        } else {
          thiz.showBack = false;
        }
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    @keyframes fade-in {
        0% {
            top: 1000px;
            opacity: 0;
        }
        /*初始状态 透明度为0*/
        40% {
            top: 1000px;
            opacity: 0;
        }
        /*过渡状态 透明度为0*/
        100% {
            margin-top: 0px;
            opacity: 1;
        }
        /*结束状态 透明度为1*/
    }

    .date-picker {
        position: fixed;
        top: 0;
        left: 0;
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        z-index: 999;
        animation: fade-in 0.5s ease 1 forwards;
    }

    .date-picker-mask {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 590px;
        background-color: #353535;
        opacity: 0.4;
        width: 100%;
        z-index: 1000;
    }

    .date-picker-content {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 590px;
        border-top-left-radius: 16px;
        border-top-right-radius: 16px;
        background-color: #fff;
        z-index: 9999;
        overflow: hidden;
    }

    .date-picker-date-content {
        position: relative;
        display: flex;
        height: 160px;
        width: 750px;
    }

    .date-picker-date-content-image {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
    }

    .date-picker-date-content-bg-left {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 50%;
        height: 100%;
    }

    .date-picker-date-content-bg-right {
        position: absolute;
        top: 0px;
        right: 0px;
        width: 50%;
        height: 100%;
    }

    .date-picker-date-content-title {
        position: relative;
        color: #333;
        font-size: 26px;
        margin-left: 70px;
        margin-top: 40px;
    }

    .date-picker-date-content-time {
        position: relative;
        color: #333;
        font-size: 32px;
        font-weight: bold;
        margin-left: 70px;
        margin-top: 4px;
    }

    .date-picker-content-top {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 80px;
        justify-content: space-between;
    }

    .hover-class {
        background-color: #e6e6e6;
    }

    .date-picker-content-line {
        background-color: #d3dce6;
        height: 1px;
        width: 100%;
        opacity: 0.8;
    }

    .date-picker-content-cancel {
        line-height: 50px;
        height: 50px;
        color: #353535;
        padding: 10px 48px;
        flex: 1;
        font-size: 28px
    }

    .date-picker-content-sure {
        line-height: 50px;
        color: #0096FF;
        height: 50px;
        padding: 10px 48px;
        text-align: right;
        flex: 1;
        font-size: 28px
    }

    .date-picker-content-center {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 340px;
        overflow: hidden;
        margin-top: 6px;
        margin-bottom: 6px;
        justify-content: space-between;
    }

    .date-picker-content-item {
        width: 33.3%;
        height: 350px;
        text-align: center;
    }

    .selected-tap {
        background-color: #4BE479;
    }
</style>
