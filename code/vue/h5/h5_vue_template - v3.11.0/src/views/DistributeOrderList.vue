<template>
    <div class="flex_col full_screen border-box bg_F5F6FA">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <div v-if="fxUserType =='10'"
                 class="flex_row_around flex_align_middle border_radius_18 bg_white mg_30 pd_60">
                <div class="col_6 flex_col align_center">
                    <div class="f40 mg_b_24">{{totalCount?totalCount:0}}</div>
                    <div class="f22 fc_888888">订单总数</div>
                </div>
                <div class="col_4 flex_col align_center">
                    <div class="f40 mg_b_24">{{totalDistributeMoney/100}}</div>
                    <div class="f22 fc_888888">总佣金</div>
                </div>
            </div>
            <!--<van-tabs style="font-size: 30px;" v-model="choosedStatus" background="#F5F6FA" color="#D4A867"-->
            <!--line-width="40"-->
            <!--@change="selectOrderStatus">-->
            <!--<van-tab title-style="font-size:4vw;" title="待发货" name="1"></van-tab>-->
            <!--<van-tab title-style="font-size:4vw;" title="已完成" name="2"></van-tab>-->
            <!--</van-tabs>-->
            <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
            >
                <div class="flex_col pd_30">
                    <div v-for="(item,index) in orderList"
                         class="flex_col pd_lr_20 pd_tb_30 bg_white mg_b_24">
                        <div class="flex_row_between flex_align_middle mg_b_30">
                            <div class="f22">订单号:{{item.orderNumber}}</div>
                            <div class="f26 fc_F34567">{{item.statusName}}</div>
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
                                <div class="mg_b_40">订单金额: ¥{{item.payMoney/100}}</div>
                                <!--<div class="fc_D4A867 f28">-->
                                    <!--分佣:¥{{item.distributeMoney?item.distributeMoney/100:0}}-->
                                <!--</div>-->
                            </div>
                        </div>
                    </div>
                </div>
            </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>
  import { fansOrderList } from '../api/public';
  import storeUtil from 'storejs';

  export default {
    name: 'distributeOrderList',
    data() {
      let thiz = this;
      return {
        refreshing: false,
        loading: false,
        finished: false,
        choosedStatus: '1',
        pageIndex: 1,
        pageSize: 99,
        totalCount: 0,
        orderList: [],
        fxUserType: storeUtil('fx_fxUserType'),
        totalDistributeMoney: 0
      };
    },
    created() {
      let thiz = this;
      // window.addEventListener('resize', thiz.getHeight);
    },
    mounted() {
      let thiz = this;
      console.log('router--->', this.$router);
      console.log('env====>', process.env);
      // thiz.test()
      // this.WxMpInit.wxMpShareShowMenu(this, this.$router.history.current.meta.title, this.$router.history.current.meta.wx_share_content);
      // thiz.initCanvas();
    },
    computed: {},
    methods: {
      toLogin: function() {
        let thiz = this;
        thiz.$router.push({path:'/login',query:{tt:new Date().getTime()}}).catch(err => {
          err;
        });
      },
      getOrderList() {
        let thiz = this;
        let req = {
          page: thiz.pageIndex,
          pageSize: thiz.pageSize
        };
        fansOrderList(req).then(res => {
          thiz.totalDistributeMoney = res.data.data.totalDistributeMoney ? res.data.data.totalDistributeMoney : 0;
          if (res.data.data.itemList && res.data.data.itemList.length > 0) {
            let orderList = thiz.orderList;
            let tmpList = res.data.data.itemList;
            for (let one of tmpList) {
              console.log("coverPicture=====>",one.id,'-',one.orderItemList[0].productVO.coverPicture);
              if(one.orderItemList[0].productVO.coverPicture && typeof(one.orderItemList[0].productVO.coverPicture)=='string'){
                let cover = JSON.parse(one.orderItemList[0].productVO.coverPicture);
                one.orderItemList[0].productVO.cover = process.env.VUE_APP_PIC_HOST + cover[0];
              }
              switch (one.orderStatus) {
                case 1 :
                  one.statusName = '待支付';
                  break;
                case 2:
                  // one.statusName = '待发货';
                  one.statusName = '已支付';
                  break;
                case 3:
                  one.statusName = '待收货';
                  break;
                case 4:
                  one.statusName = '已完成';
                  break;
              }
            }
            thiz.orderList = orderList.concat(tmpList);
            thiz.totalCount = res.data.data.totalCount;
            // console.log("====total===>",thiz.totalCount)
            thiz.loading = false;
            if (thiz.pageIndex * thiz.pageSize < res.data.data.totalCount) {
              thiz.pageIndex = thiz.pageIndex + 1;
            } else {
              thiz.finished = true;
              console.log('======finished=>', thiz.finished);
            }
          } else {
            thiz.finished = true;
          }
          thiz.loading = false;
        });
      },

      onLoad() {
        let thiz = this;
        console.log("onload=========>")
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
      }

    }
  };

</script>

<style>

</style>
