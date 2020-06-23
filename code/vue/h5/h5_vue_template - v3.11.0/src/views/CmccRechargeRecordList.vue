<template>
    <div class="flex_col full_screen border-box bg_ECECEC pd_30">
        <div class="flex_row_between flex_align_middle mg_b_50">
            <div></div>
            <div class="flex_col">
                <div class="flex_row_start flex_align_middle mg_b_30">
                    <div :class="dateType=='date'?'bg_D4A867 fc_white btn_date_type':'btn_date_type'"
                         data-dateType="date" @click="selectDateType">日</div>
                    <div :class="dateType=='year-month'?'bg_D4A867 fc_white btn_date_type':'btn_date_type'"
                         data-dateType="year-month" @click="selectDateType">月</div>
                </div>
                <div>{{startAt}} -- {{endAt}}</div>
            </div>
        </div>

        <div class="flex_row_between flex_align_middle f40 mg_b_30">
            <div class="flex_col col_6 align_center">
                <div>{{totalCount}}</div>
                <div class="f22 fc_888888">订单数</div>
            </div>
            <div class="flex_col col_6 align_center">
                <div>{{totalCommission?totalCommission/100:0}}</div>
                <div class="f22 fc_888888">充值金额</div>
            </div>
        </div>

        <!--<div class="f30 mg_b_30">-->
        <!--<van-search style="font-size: 28px;" v-model="searchInfo" shape="round" background="transparent"-->
        <!--placeholder="请输入搜索关键词"-->
        <!--input-align="center" left-icon="" @input="setKeyword" @blur="vaildateKeyword"-->
        <!--search="toSearch"/>-->
        <!--</div>-->

        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <div class="">
                <van-list
                        v-model="loading"
                        :finished="finished"
                        finished-text="没有更多了"
                        @load="onLoad"
                >
                    <div v-for="(item,index) in orderList"
                         class="flex_col align_left pd_lr_20 pd_tb_30 bg_white mg_b_24 border_radius_18 f26"
                         @click="toOrderDetail(item)">
                        <div class="f24 flex_row_between flex_align_middle mg_b_20 pd_b_20 border_b_1">
                            <div class="">订单号:{{item.orderNumber}}</div>
                            <div>{{item.storeName}}</div>
                        </div>
                        <div class="flex_row_between flex_align_middle mg_b_15">
                            <div>订单金额</div>
                            <div>¥{{item.calcValue/100}}</div>
                        </div>
                        <div class="flex_row_between flex_align_middle mg_b_15">
                            <div>{{item.remark}}</div>
                            <div>¥{{item.commissionValue/100}}</div>
                        </div>
                        <div class="f24 align_right">{{item.createTime}}</div>
                    </div>
                </van-list>
            </div>
            <!--<p>刷新次数: {{ count }}</p>-->
        </van-pull-refresh>
        <van-popup v-model="datePickerIsShow" position="bottom" overlay safe-area-inset-bottom lock-scroll>
            <div class="flex_row_around flex_align_middle f30">
                <div :class="tapIndex ==='startTime' && dateType==='date' ? 'bg_EDF5FF pd_30 col_6 flex_col align_center' : 'bg_white pd_30 col_6 flex_col align_center'">
                    <div v-if="dateType==='date'" data-tapIndex="startTime" @click="selectTapIndex">开始于</div>
                    <div v-if="dateType==='year-month'">开始于</div>
                    <div>{{startAt}}</div>
                </div>
                <div :class="tapIndex ==='endTime' && dateType==='date' ? 'bg_EDF5FF pd_30 col_6 flex_col align_center' : 'bg_white pd_30 col_6 flex_col align_center'">
                    <div v-if="dateType==='date'" data-tapIndex="endTime" @click="selectTapIndex">结束于</div>
                    <div v-if="dateType==='year-month'">结束于</div>
                    <div>{{endAt}}</div>
                </div>
            </div>
            <van-datetime-picker
                    @change="changeDate"
                    @confirm="setCurrentDate"
                    @cancel="closePicker"
                    v-model="currentDate"
                    :type="dateType"
                    :min-date="minDate"
                    :max-date="maxDate"
            />
        </van-popup>
    </div>
</template>

<script>
  import { Toast, DatetimePicker } from 'vant';
  import validUtil from '../utils/ValidateUtil';
  import timeUtil from '../utils/TimeUtil';
  import { userFansState, distributeRecordList } from '../api/public.js';
  import storeUitl from 'storejs';
  // import DatePicker from './components/DatePicker';
  // GENERATING("GENERATING", "未结算，数据组装中"),
  //   WAIT_SETTLEMENT("WAIT_SETTLEMENT", "待结算"),
  //   SETTLED("SETTLED", "已结算"),
  //   FAILED("FAILED", "结算失败，待重算"),
  //   WITHOUT_SETTLED("WITHOUT_SETTLED", "无需结算"),
  export default {
    name: 'cmccRechargeRecordList',
    components: { DatetimePicker },
    data() {
      return {
        refreshing: false,
        loading: false,
        finished: false,
        searchInfo: '',
        count: 0,
        fxUserType: storeUitl('fx_fxUserType') ? storeUitl('fx_fxUserType') : '',
        pageIndex: 1,
        pageSize: 99,
        totalCount: 0,
        userId: '',
        stateInfo: '',
        orderList: [],
        keyword: '',
        //日期选择期
        dateType: 'date',  //默认 日期：date;月份：month;年份：year
        datePickerIsShow: false,
        startAt: timeUtil.formatTime(new Date(), 'yyyy-MM-dd'),
        endAt: timeUtil.formatTime(new Date(), 'yyyy-MM-dd'),
        minDate: new Date(2020, 0, 1),
        maxDate: new Date(2025, 10, 1),
        currentDate: new Date(),
        tapIndex: 'startTime',   //startTime:开始于;endTime:结束于
        storeName: '',
        totalCommission: 0  //合计佣金
      };
    },
    created() {
      let thiz = this;
      thiz.userId = thiz.$store.getters.userId ? thiz.$store.getters.userId : 0;
    },
    mounted() {
      let thiz = this;
      console.log('router--->', this.$router);
      console.log('env====>', process.env);
    },
    computed: {},
    methods: {

      //picker选择日期还是月份
      selectDateType(e) {
        let thiz = this;
        console.log('selectDateType=========》', e.target.dataset);
        thiz.dateType = e.target.dataset.datetype;
        if (e.target.dataset.datetype == 'year-month') {
          thiz.startAt = timeUtil.formatTime(timeUtil.getMonthStartDay(thiz.currentDate), 'yyyy-MM-dd');
          thiz.endAt = timeUtil.formatTime(timeUtil.getMonthEndDay(thiz.currentDate), 'yyyy-MM-dd');
        }
        thiz.datePickerIsShow = true;
      },

      //picker选择开始还是结束
      selectTapIndex(e) {
        let thiz = this;
        console.log('selectTapIndex=========》', e.target.dataset);
        thiz.tapIndex = e.target.dataset.tapindex;
      },

      //picker选择日期
      changeDate() {
        let thiz = this;
        if (thiz.dateType == 'date') {
          if (thiz.tapIndex == 'startTime') {
            thiz.startAt = timeUtil.formatTime(thiz.currentDate, 'yyyy-MM-dd');
          }
          if (thiz.tapIndex == 'endTime') {
            thiz.endAt = timeUtil.formatTime(thiz.currentDate, 'yyyy-MM-dd');
          }
        }
        if (thiz.dateType == 'year-month') {
          thiz.startAt = timeUtil.formatTime(timeUtil.getMonthStartDay(thiz.currentDate), 'yyyy-MM-dd');
          thiz.endAt = timeUtil.formatTime(timeUtil.getMonthEndDay(thiz.currentDate), 'yyyy-MM-dd');
          console.log('selectDateType====yy-mm=====>', timeUtil.formatTime(thiz.currentDate, 'yyyy-MM-dd'));
          console.log('firstDay====lastDay=====>', thiz.startAt, thiz.endAt);
        }
      },
      //picker确认日期
      setCurrentDate() {
        let thiz = this;
        thiz.datePickerIsShow = false;
        thiz.orderList = [];
        thiz.pageIndex = 1;
        thiz.getOrderList();
        // console.log(thiz.currentDate)
      },
      showPicker() {
        let thiz = this;
        thiz.datePickerIsShow = true;
      },
      closePicker() {
        let thiz = this;
        thiz.datePickerIsShow = false;
      },
      getOrderList(keyword) {
        let thiz = this;
        let req = {
          page: thiz.pageIndex,
          pageSize: thiz.pageSize,
          storeId: 0,
          startDate: thiz.startAt,
          endDate: thiz.endAt
        };
        distributeRecordList(req).then(res => {
          if (res.data.data.itemList && res.data.data.itemList.length > 0) {
            let orderList = thiz.orderList;
            let totalCommission = 0;
            for (let one of res.data.data.itemList) {
              totalCommission += one.commissionValue;
            }
            thiz.totalCommission = totalCommission;
            thiz.orderList = orderList.concat(res.data.data.itemList);
            thiz.totalCount = res.data.data.totalCount;
            thiz.loading = false;
            if (thiz.pageIndex * thiz.pageSize < thiz.totalCount) {
              thiz.pageIndex = thiz.pageIndex + 1;
            } else {
              thiz.finished = true;
            }
          } else {
            thiz.finished = true;
          }
          thiz.loading = false;
        });
      },
      setKeyword(e) {
        let thiz = this;
        thiz.keyword = e;
      },

      vaildateKeyword() {
        let thiz = this;
        thiz.keyword = validUtil.trim(thiz.keyword);
      },

      //获取粉丝及累计收益统计
      getUserFansState() {
        let thiz = this;
        let req = {
          userId: thiz.userId
        };
        userFansState(req).then((res) => {
          thiz.stateInfo = res.data.data.item;
        });
      },

      onLoad() {
        let thiz = this;
        if (thiz.refreshing) {
          thiz.pageIndex = 1;
          thiz.orderList = [];
          thiz.refreshing = false;
        }
        thiz.getOrderList();
      },
      onRefresh() {
        let thiz = this;
        // 清空列表数据
        thiz.finished = false;
        thiz.loading = true;
        thiz.onLoad();
      },
      setSearchInfo(e) {
        let thiz = this;
        thiz.searchInfo = e;
        console.log('setSearchInfo====>', e);
      },
      toSearch() {
        let thiz = this;
        if (thiz.keyword) {
          thiz.pageIndex = 1;
          // thiz.orderList = [];
          thiz.getOrderList(keyword);
        }
      },
      toFansDetail(e) {
        let thiz = this;
        thiz.$router.push({ path: '/fansDetail', query: { userId: e.id, tt: new Date().getTime() } }).catch(error => {
        });
      }
    }
  };

</script>

<style>
    .btn_date_type {
        border: 0.267vw solid rgba(207, 169, 114, 1);
        border-radius: 2.53vw;
        padding: 1vw 4vw;
        margin-left: 4vw;
    }
</style>
