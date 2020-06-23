<template>
    <div class="flex_col full_screen col_12 border-box bg_F5F6FA">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <div class="pd_30">
                <div class="flex_row_around flex_align_middle f28 mg_b_30">
                    <div class="flex_col align_center choosed_item" @click="selectOrderStatus(5)">
                        <div :class="orderStatus == 5 ? 'fc_D4A867' : ''">待审核</div>
                        <div :class="orderStatus == 5 ? 'bg_D4A867' : ''"></div>
                    </div>
                    <div class="flex_col align_center choosed_item" @click="selectOrderStatus(6)">
                        <div :class="orderStatus == 6 ? 'fc_D4A867' : ''">待发卡</div>
                        <div :class="orderStatus == 6 ? 'bg_D4A867' : ''"></div>
                    </div>
                    <div class="flex_col align_center choosed_item" @click="selectOrderStatus(4)">
                        <div :class="orderStatus == 4 ? 'fc_D4A867' : ''">已完成</div>
                        <div :class="orderStatus == 4 ? 'bg_D4A867' : ''"></div>
                    </div>
                </div>
                <van-list
                        v-model="loading"
                        :finished="finished"
                        finished-text="没有更多了"
                        @load="onLoad"
                >
                    <div v-for="(item,index) in orderList"
                         class="flex_col pd_lr_20 pd_tb_30 bg_white mg_b_24" @click="toOrderDetail(item)">
                        <div class="flex_row_between flex_align_middle mg_b_30">
                            <div class="f22">订单号:{{item.orderNumber}}</div>
                            <div class="f26 fc_F34567">{{item.orderStatusName}}</div>
                        </div>
                        <div class="flex_row_between flex_align_top">
                            <div class="flex_row_start flex_align_middle">
                                <div class="mg_r_30">
                                    <van-image
                                            width="17.06vw"
                                            height="17.06vw"
                                            fit="cover"
                                            :src="item.orderItemList[0].productVO.cover"
                                    />
                                </div>
                                <div class="flex_col align_left f28">
                                    <div class="mg_b_15">{{item.orderItemList[0].productVO.name}}</div>
                                    <div class="mg_b_15">{{item.tel}}</div>
                                    <div class="f22">{{item.createTime}}</div>
                                </div>
                            </div>
                            <div class="flex_col f30 align_right">
                                <div class="mg_b_40">¥ {{item.payMoney/100}}</div>
                                <div v-if="fxUserType=='50'"
                                     class="fc_white .bg_D4A867 pd_lr_20 pd_tb_15 border_radius_18 f26">确认发货</div>
                                <div v-if="item.need2SetStoreInfo" class="fc_D4A867 f28">
                                    未注册店铺
                                </div>
                            </div>
                        </div>
                    </div>
                </van-list>
            </div>
            <!--<p>刷新次数: {{ count }}</p>-->
        </van-pull-refresh>
    </div>
</template>

<script>
  import { Toast } from 'vant';
  import validUtil from '../utils/ValidateUtil';
  import { orderHandlerList } from '../api/public';
  import Dict from '../api/dict';
  import storeUtil from 'storejs';

  export default {
    name: 'myHandleOrderList',
    data() {
      return {
        refreshing: false,
        choosedStatus: 1,
        loading: false,
        finished: false,
        searchInfo: '',
        count: 0,
        pageIndex: 1,
        pageSize: 30,
        totalCount: 0,
        orderType: 3,   //见dict.ProductTypeDict
        orderStatus: 5,
        orderList: [],
        fxUserType: storeUtil('fx_fxUserType') ? storeUtil('fx_fxUserType') : ''
      };
    },
    created() {
      let thiz = this;
    },
    mounted() {
      let thiz = this;
      // thiz.getOrderList();
      // this.WxMpInit.wxMpShareShowMenu(this, this.$router.history.current.meta.title, this.$router.history.current.meta.wx_share_content);
      // thiz.initCanvas();
    },
    computed: {},
    methods: {
      toLogin: function() {
        let thiz = this;
        thiz.$router.push({ path: '/login', query: { tt: new Date().getTime() } }).catch(err => {
          err;
        });
      },
      toRegist() {
        let thiz = this;
        thiz.$router.push({ path: '/registStore', query: { tt: new Date().getTime() } }).catch(err => {
          err;
        });
      },
      selectOrderStatus(e) {
        let thiz = this;
        console.log('=selectOrderStatus======>', e);
        thiz.orderStatus = e;
        thiz.orderList = [];
        thiz.pageIndex = 1;
        thiz.getHandleOrderList(thiz.orderType, e);
      },
      getHandleOrderList(orderType, orderStatus){
        let thiz = this;
        let req = {
          page: thiz.pageIndex,
          pageSize: thiz.pageSize,
          orderType:orderType,
          orderStatus:orderStatus
        };
        orderHandlerList(req).then(res => {
          if (res.data.data.itemList && res.data.data.itemList.length > 0) {
            let orderList = thiz.orderList;
            let tmpList = res.data.data.itemList;
            for (let one of tmpList) {
              if (one.orderItemList[0].productVO.coverPicture && typeof (one.orderItemList[0].productVO.coverPicture) == 'string') {
                let tmpObj = JSON.parse(one.orderItemList[0].productVO.coverPicture);
                one.orderItemList[0].productVO.cover = process.env.VUE_APP_PIC_HOST + tmpObj[0];
              }
              one.orderStatusName = Dict.getOrderStatusName(one.orderStatus);
            }
            thiz.totalCount = res.data.data.totalCount;
            thiz.orderList = orderList.concat(tmpList);
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

      onLoad() {
        let thiz = this;
        if (thiz.refreshing) {
          thiz.pageIndex = 1;
          thiz.orderList = [];
          thiz.refreshing = false;
        }
        thiz.getHandleOrderList(thiz.orderType,thiz.orderStatus);
      },

      onRefresh() {
        let thiz = this;
        // 清空列表数据
        thiz.finished = false;
        thiz.loading = true;
        thiz.onLoad();
      },
      toOrderDetail(e) {
        let thiz = this;
        thiz.$router.push({ path: '/orderDetail', query: { orderId: e.id, tt: new Date().getTime() } });
      }
      // getOrderStatusName(value){
      //   for(let one of  object.values(Dict.OrderStatusDict)) {
      //     if(one.value == value){
      //       return one.name
      //     }
      //   }
      // }
    }
  };

</script>

<style>

</style>
