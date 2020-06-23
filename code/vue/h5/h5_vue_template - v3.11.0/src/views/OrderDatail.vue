<template>
    <div class="flex_col col_12 border-box bg_F5F6FA">
        <div class="flex_col full_screen border-box">
            <div class="flex_row_between flex_align_middle pd_30 bg_white mg_b_20">
                <div class="flex_col align_left">
                    <div class="flex_row_between flex_align_middle mg_b_24">
                        <div class="f30">{{orderInfo.linkman}}</div>
                        <div class="f28">{{orderInfo.tel}}</div>
                    </div>
                    <div class="f28">收货地址:{{orderInfo.province + orderInfo.city + orderInfo.district +
                        orderInfo.detail}}
                    </div>
                </div>
                <div></div>
            </div>
            <div v-if="orderInfo.orderItemList"
                 class="flex_row_col flex_align_middle pd_30 bg_white f28 fc_666666 mg_b_20">
                <div class="flex_row_between flex_align_middle mg_b_30">
                    <div>门店</div>
                    <div>{{orderInfo.orderStatusName}}</div>
                </div>
                <div class="flex_col bg_white mg_b_30 border_b_1 pd_tb_20">
                    <div class="flex_col" v-for="(item,index) in orderInfo.orderItemList">
                        <div class="flex_row_start flex_align_middle">
                            <div class="mg_r_30">
                                <van-image
                                        width="19.73vw"
                                        height="19.73vw"
                                        fit="cover"
                                        :src="item.product.cover"
                                />
                            </div>
                            <div v-if="item" class="flex_col align_left f34">
                                <div class="mg_b_30">{{item.product.name}}</div>
                                <div>¥{{item.product.salePrice/100}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="align_self_start"></div>
                </div>
                <div class="flex_row_between flex_align_middle  mg_b_30">
                    <div>购买数量</div>
                    <div class="">
                        <van-stepper v-model="orderInfo.orderItemList[0].amount" input-width="50px" button-size="36px" disabled/>
                    </div>
                </div>
                <div class="flex_row_between flex_align_middle mg_b_30">
                    <div>申请处理人</div>
                    <div class="">{{orderInfo.handlerName}}</div>
                </div>
                <div class="flex_row_between flex_align_middle pd_b_20 border_b_1 mg_b_30">
                    <div>手机号</div>
                    <div>{{orderInfo.handlerTel}}</div>
                </div>
                <div class="mg_b_20 align_right">总金额:{{orderInfo.orderItemList[0].product.salePrice*orderInfo.orderItemList[0].amount/100}}</div>
            </div>
            <!--发卡信息-->
            <div v-if="orderCardList.length>0" class="flex_col bg_white pd_20 f26 list mg_b_20">
                <div class="pd_tb_10">发卡信息</div>
                <div class="flex_row_start flex_align_middle pd_tb_20 bg_EDF5FF">
                    <div class="col_2">批号-省份</div>
                    <div class="col_2">数量</div>
                    <div class="col_4">首卡ID</div>
                    <div class="col_4">尾卡ID</div>
                </div>
                <div class="flex_row_start flex_align_middle border_b_1 pd_tb_15" v-for="item in orderCardList">
                    <div class="col_2">{{item.id}}-{{item.provinceCode}}</div>
                    <!--<div class="col_3">{{item.provinceName}}</div>-->
                    <div class="col_2">{{item.cardAmount}}</div>
                    <div class="col_4">{{item.firstSerialCode}}</div>
                    <div class="col_4">{{item.lastSerialCode}}</div>
                </div>
            </div>
        </div>
        <!--<div v-if=" orderInfo.need2SetStoreInfo" style="position: fixed;bottom: 10vw;width: 100%;">-->
            <!--<div class="pd_30">-->
                <!--<van-button block size="large" color="#D4A867" class="fc_white"-->
                            <!--@click="toRegistStore(orderInfo.id)">-->
                    <!--订单支付成功,请完善店铺资料-->
                <!--</van-button>-->
            <!--</div>-->
        <!--</div>-->
        <!--待审核-->
        <div v-if="orderInfo.orderStatus=='5'" style="position: fixed;bottom: 4vw;width: 100%;">
            <div v-if="orderInfo.userId== userId" class="pd_lr_30">
                <van-button block size="large" color="#888888" class="fc_white border_radius_18">
                    待审核
                </van-button>
            </div>
            <div v-if="orderInfo.handlerId== userId" class="pd_lr_30">
                <van-button block size="large" color="#D4A867 border_radius_18" class="fc_white" @click="checkAuditDialog">
                    立即审核
                </van-button>
            </div>
        </div>
        <!--待发卡-->
        <div v-if="orderInfo.orderStatus=='6'" style="position: fixed;bottom: 4vw;width: 100%;">
            <div v-if="orderInfo.userId== userId" class="pd_lr_30">
                <van-button block size="large" color="#888888" class="fc_white border_radius_18">
                    待发卡
                </van-button>
            </div>
            <div v-if="orderInfo.handlerId== userId" class="pd_lr_30">
                <van-button block size="large" color="#D4A867" class="fc_white border_radius_18" @click="sendCardHandle">
                    立即发卡
                </van-button>
            </div>
        </div>

    </div>
</template>

<script>
  import { Toast, Dialog } from 'vant';
  import validUtil from '../utils/ValidateUtil';
  import { orderDetail, prepay, orderUpdate } from '../api/public';
  import Dict from '../api/dict';
  import storeUtil from 'storejs';

  export default {
    name: 'orderDetail',
    data() {
      let thiz = this;
      return {
        orderId: thiz.$route.query.orderId ? thiz.$route.query.orderId : '',
        orderInfo: '',
        refreshing: false,
        finished: false,
        loading: false,
        fxUserType: storeUtil('fx_fxUserType') ? storeUtil('fx_fxUserType') : '',
        qty: 1,
        userId: storeUtil('fx_userId') ? storeUtil('fx_userId') : '',
        cardList: [],
        sendCardDialog: false,
        choosedAll: false,
        orderCardList: []
      };
    },


    created() {
      let thiz = this;
    },
    mounted() {
      let thiz = this;
      thiz.getOrderDetail();
      // thiz.getIdCardList();
    },
    computed: {},
    methods: {
      toMyStoreInfo(e) {
        let thiz = this;
        thiz.$router.push({ path: '/myStoreInfo', query: { storeId: e.storeId, tt: new Date().getTime() } });
      },
      getOrderDetail() {
        let thiz = this;
        let req = {
          id: thiz.orderId
        };
        orderDetail(req).then(res => {
          if (res.data.data.orderItemList && res.data.data.orderItemList.length > 0) {
            let orderInfo = res.data.data.item;
            orderInfo.orderStatusName = Dict.getOrderStatusName(orderInfo.orderStatus);
            let cover = '';
            orderInfo.orderItemList = res.data.data.orderItemList;
            orderInfo.orderItemList[0].product = orderInfo.orderItemList[0].productVO;
            if (typeof (orderInfo.orderItemList[0].product.coverPicture) == 'string') {
              cover = JSON.parse(orderInfo.orderItemList[0].product.coverPicture)[0];
            }
            orderInfo.orderItemList[0].product.cover = cover ? process.env.VUE_APP_PIC_HOST + cover : '';
            thiz.orderCardList = orderInfo.orderItemList[0].batchVOList || '';
            thiz.orderInfo = orderInfo;
          }
        });
      },

      //订单审核
      toCheckConfirmOrder() {
        let thiz = this;
        let req = {
          id: thiz.orderInfo.id,
          orderStatus: 6
        };
        orderUpdate(req).then(resp => {
          thiz.getOrderDetail();
          thiz.$router.redirect({
            path: '/orderDetail',
            query: { orderId: thiz.orderInfo.id, tt: new Date().getTime() }
          });
        });
      },

      //审核确认弹窗
      checkAuditDialog() {
        let thiz = this;
        Dialog.confirm({
          title: '提示',
          message: '确认审核吗？'
        }).then(() => {
          thiz.toCheckConfirmOrder();
        }).catch(() => {
          // on cancel
        });
      },

      pay() {
        let thiz = this;
        let req = {
          orderId: thiz.orderId
        };
        prepay(req).then(res => {
          if (res.data.data.packageStr) {
            let params = {
              appId: res.data.data.appId,
              nonceStr: res.data.data.nonceStr,
              orderId: res.data.data.orderId,
              package: res.data.data.packageStr,
              paySign: res.data.data.paySign,
              signType: res.data.data.signType,
              timeStamp: res.data.data.timeStamp
            };
            thiz.weixinPay(params);
          }
        });
      },

      weixinPay(parmse) {
        var thiz = this;
        if (typeof WeixinJSBridge == 'undefined') {//微信浏览器内置对象。参考微信官方文档
          alert('微信浏览器');
          if (document.addEventListener) {
            alert('浏览器监听');
            document.addEventListener('WeixinJSBridgeReady', thiz.onBridgeReady(parmse), false);
          } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', thiz.onBridgeReady(parmse));
            document.attachEvent('onWeixinJSBridgeReady', thiz.onBridgeReady(parmse));
          }
        } else {
          //  alert("直接回调");
          thiz.onBridgeReady(parmse);
        }
      },
      /**
       * @method 支付费用方法
       * @param data:后台返回的支付对象,(详情微信公众号支付API中H5提交支付);
       */
      onBridgeReady(params) {
        var thiz = this;
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest', params,
          function(res) {
            // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
            if (res.err_msg == 'get_brand_wcpay_request：ok') {
              thiz.$router.replace({
                path: '/orderdetail',
                query: { orderId: params.orderId, tt: new Date().getTime() }
              });
            } else {
              thiz.$router.replace({
                path: '/orderdetail',
                query: { orderId: params.orderId, tt: new Date().getTime() }
              });
            }
          }
        );
      },
      toRegistStore(e) {
        let thiz = this;
        thiz.$router.push({ path: '/registStore', query: { orderId: e, tt: new Date().getTime() } });
      },

      //发卡弹窗
      checkSendCardDialog() {
        let thiz = this;
        thiz.sendCardDialog = true;
      },

      //获取卡列表
      getIdCardList() {
        let thiz = this;
        //todo
        let req = {
          userId: thiz.userId,
          page: thiz.pageIndex,
          pageSize: thiz.pageSize
        };
        let cardList = [];
        for (let i = 1; i <= 40; i++) {
          let item = {
            id: i,
            batNum: '000' + i,
            province: '0010',
            provinceName: '北京',
            minId: '0001001',
            qty: 500,
            maxId: '0001500',
            bindStoreId: '',
            bindStoreName: '',
            choosed: false
          };
          cardList.push(item);
        }
        thiz.cardList = cardList;

        thiz.finished = true;
        thiz.loading = false;
        // userCommissionnList(req).then(res => {
        //   thiz.accCommissionAmount = res.data.data.accCommissionAmount ? res.data.data.accCommissionAmount : 0;
        //   if (res.data.data.itemList && res.data.data.itemList.length > 0) {
        //     let cardList = thiz.cardList;
        //     let tmpList = res.data.data.itemList;
        //     for (let one of tmpList) {
        //       one.createTime = one.createTime.substr(0, 10);
        //     }
        //     thiz.cardList = cardList.concat(tmpList);
        //     thiz.totalCount = res.data.data.totalCount;
        //     if (thiz.pageIndex * thiz.pageSize < thiz.totalCount) {
        //       thiz.pageIndex = thiz.pageIndex + 1;
        //     } else {
        //       thiz.finished = true;
        //     }
        //   } else {
        //     thiz.finished = true;
        //   }
        //   thiz.loading = false;
        // });
      },

      onLoad() {
        let thiz = this;
        if (thiz.refreshing) {
          thiz.pageIndex = 1;
          thiz.cardList = [];
          thiz.refreshing = false;
        }
        thiz.getIdCardList();
      },
      //选择批次
      selectBatch(e) {
        let thiz = this;
      },

      //选择所有批次
      selectAllBatch() {
        let thiz = this;
        // console.log('selectAllBatch========>', thiz.choosedAll);
        let cardList = thiz.cardList;
        if (thiz.choosedAll) {
          for (let one of cardList) {
            one.choosed = true;
          }
        } else {
          for (let one of cardList) {
            one.choosed = false;
          }
        }
      },

      //发卡
      sendCardHandle() {
        let thiz = this;
        let req = {
          id: thiz.orderInfo.id,
          orderStatus: 4
        };
        orderUpdate(req).then(resp => {
          thiz.getOrderDetail();
          thiz.sendCardDialog = false;
          // thiz.$router.redirect({
          //   path: '/orderDetail',
          //   query: { orderId: thiz.orderInfo.id, tt: new Date().getTime() }
          // });
        });
      }
    }
  };

</script>

<style>
    .list > div:last-child {
        border: none;
    }
</style>
