<template>
    <div class="flex_col full_screen border-box bg_EDF5FF">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <div v-if="!addressInfo"
                 class="flex_row_between flex_align_middle pd_30 mg_lr_30 bg_white f30 border_radius_18 mg_b_20"
                 @click="newAddress">
                <div class="col_6 align_center">添加地址</div>
                <div class="iconfont icon-icon_arrow_right f30"></div>
            </div>
            <div v-else
                 class="flex_row_between flex_align_middle pd_30 bg_white mg_b_20"
                 @click="toAddressList">
                <div class="flex_col align_left">
                    <div class="flex_row_between flex_align_middle mg_b_24">
                        <div class="f30">{{addressInfo.linkman}}</div>
                        <div class="f28">{{addressInfo.tel}}</div>
                    </div>
                    <div class="f28">收货地址:{{addressInfo.province + addressInfo.city + addressInfo.district +
                        addressInfo.detail}}
                    </div>
                </div>
                <div class="iconfont icon-icon_arrow_right f30"></div>
            </div>
            <div class="flex_row_col flex_align_middle pd_30 bg_white f28 fc_666666">
                <div class="flex_row_between flex_align_middle pd_30 bg_white mg_b_30 border_b_1">
                    <div class="flex_row_start flex_align_middle mg_lr_30">
                        <div class="mg_r_30">
                            <van-image
                                    width="19.73vw"
                                    heigth="19.73vw"
                                    fit="cover"
                                    :src="productInfo.cover"
                            />
                        </div>
                        <div class="flex_col align_left f34">
                            <div class="mg_b_30">{{productInfo.name}}</div>
                            <div>¥{{productInfo.salePrice/100}}</div>
                        </div>
                    </div>
                    <div class="align_self_start"></div>
                </div>
                <!--<div class="flex_row_between flex_align_middle mg_b_30">-->
                    <!--<div>购买类型</div>-->
                    <!--<div></div>-->
                <!--</div>-->
                <!--<div class="flex_row_between flex_align_middle mg_b_30">-->
                <!--<div>选择门店</div>-->
                <!--<div></div>-->
                <!--</div>-->
                <div class="flex_row_between flex_align_middle  mg_b_30">
                    <div>购买数量</div>
                    <div class="">
                        <van-stepper v-model="qty" input-width="50px" button-size="50px"/>
                    </div>
                </div>
                <!--<div class="flex_row_between flex_align_middle mg_b_30">-->
                <!--<div>申请处理人</div>-->
                <!--<div class=""></div>-->
                <!--</div>-->
                <!--<div class="flex_row_between flex_align_middle pd_b_20 border_b_1 mg_b_30">-->
                <!--<div>手机号</div>-->
                <!--<div></div>-->
                <!--</div>-->
                <div class="mg_b_20 align_right">总金额:{{totalPrice/100}}</div>
            </div>
        </van-pull-refresh>
        <div style="position: fixed;bottom: 4vw;width: 100%;">
            <div class="pd_lr_30">
                <van-button block size="large" color="#D4A867" class=" fc_white border_radius_18" @click="running?'':addOrder()">
                    提交申请
                </van-button>
            </div>
        </div>
    </div>
</template>

<script>
  import { Toast, Stepper } from 'vant';
  import validUtil from '../utils/ValidateUtil';
  import {
    productDetail,
    userAddressList,
    userAddressDetail,
    orderSubmit,
    weixinOauth,
    preCount,productList
  } from '../api/public.js';
  import storeUtil from 'storejs';

  export default {
    name: 'orderConfirm',
    data() {
      return {
        productId: this.$route.query.productId ? this.$route.query.productId : storeUtil('fx_productId'),
        brandId: this.$route.query.brandId ? this.$route.query.brandId : storeUtil('fx_brandId'),
        refreshing: false,
        addressInfo: '',
        productInfo: '',
        pageIndex: 1,
        pageSize: 99,
        prepayId: '',
        totalPrice: 0,
        qty: 1,
        running:false
      };
    },
    watch: {
      qty(newQty, oldQty) {
        let thiz = this;
        thiz.preCount(newQty);
      }
    },
    created() {
      let thiz = this;
      if (storeUtil('fx_productId') && storeUtil('fx_brandId')) {
        thiz.productId = parseInt(storeUtil('fx_productId'));
        thiz.brandId = parseInt(storeUtil('fx_brandId'));
      }
      if (thiz.$route.query.productId && thiz.$route.query.brandId) {
        thiz.productId = thiz.$route.query.productId || 0;
        thiz.brandId = thiz.$route.query.brandId || 1;
      }
    },
    mounted() {
      let thiz = this;
      console.log('router--->', this.$router);
      if (thiz.productId && thiz.brandId) {
        thiz.getProductInfo();
        thiz.getAddress();
      }
      if(!thiz.productId){
        thiz.getAddress();
        thiz.getProductList();
      }
      // this.WxMpInit.wxMpShareShowMenu(this, this.$router.history.current.meta.title, this.$router.history.current.meta.wx_share_content);
    },
    computed: {},
    methods: {
      onRefresh() {
        let thiz = this;
        // 重新加载数据
        // 将 refreshing 设置为 true，表示处于加载状态
        thiz.refreshing = true;
        setTimeout(function() {
          thiz.refreshing = false;
        }, 500);
      },
      getAddress() {
        let thiz = this;
        let req = {
          page: thiz.pageIndex,
          pageSize: thiz.pageSize
        };
        userAddressList(req).then((res) => {
          if (res.data.data.itemList && res.data.data.itemList.length > 0) {
            let addressList = res.data.data.itemList;
            thiz.addressInfo = addressList[0];
            if (addressList.length == 1) {
              thiz.addressInfo = addressList[0];
            }
            if (addressList.length > 1) {
              for (let one of addressList) {
                if (one.defaultFlag) {
                  thiz.addressInfo = one;
                }
              }
            }
          }
        });
      },

      //商品列表
      getProductList() {
        let thiz = this;
        let req = {
          productType: 3,
          page: 1,
          pageSize: 10
        };
        productList(req).then(resp => {
          if (resp.data.data.itemList && resp.data.data.itemList.length > 0) {
            thiz.productInfo = resp.data.data.itemList[0];
            thiz.productId = resp.data.data.itemList[0].id;
            if (process.env.VUE_APP_ENV_NAME != 'dev') {
              thiz.productInfo.cover = process.env.VUE_APP_PIC_HOST + JSON.parse(thiz.productInfo.coverPicture)[0];
            } else {
              thiz.productInfo.cover = require('../assets/images/cmccRechargeWebCover_v2.png');
            }
            console.log('thiz.productInfo.cover===>', thiz.productInfo.cover);

          }
        });
      },

      getProductInfo() {
        let thiz = this;
        let req = {
          id: thiz.productId,
          brandId: thiz.brandId
        };
        productDetail(req).then((res) => {
          if (res.data.data.item) {
            thiz.productInfo = res.data.data.item;
            thiz.productInfo.cover = process.env.VUE_APP_PIC_HOST + JSON.parse(thiz.productInfo.coverPicture)[0];
            thiz.preCount(thiz.qty);
            // console.log('thiz.productInfo.cover===>', thiz.productInfo.cover);
            storeUtil('fx_productId', thiz.productInfo.id.toString());
            storeUtil('fx_brandId', thiz.productInfo.brandId.toString());
          }
        });
      },

      //订单预计费
      preCount(qty) {
        let thiz = this;
        if (!thiz.productInfo.salePrice || !qty) {
          Toast('当前商品价格不正确！');
          return false;
        }
        let req = {
          productId: thiz.productInfo.id,
          amount: qty
        };
        preCount(req).then(resp => {
          thiz.totalPrice = resp.data.data.totalSalePrice;
        });
      },

      addOrder() {
        let thiz = this;
        if (thiz.running) {
          return;
        }
        if (!thiz.productInfo.salePrice || !thiz.qty) {
          Toast('当前商品价格不正确！');
          return false;
        }
        if (!thiz.addressInfo.id) {
          Toast('收货地址不能为空！');
          return false;
        }
        thiz.running = true;
        let req = {
          productId: thiz.productInfo.id,
          addressId: thiz.addressInfo.id,
          amount: thiz.qty
        };
        orderSubmit(req).then(res => {
          if (res.data.data.orderId) {
            thiz.$router.replace({
              path: '/orderDetail',
              query: { orderId: res.data.data.orderId, tt: new Date().getTime() }
            });
          }
          //   let params = {
          //     appId: res.data.data.appId,
          //     nonceStr: res.data.data.nonceStr,
          //     orderId: res.data.data.orderId,
          //     package: res.data.data.packageStr,
          //     paySign: res.data.data.paySign,
          //     signType: res.data.data.signType,
          //     timeStamp: res.data.data.timeStamp
          //   };
          //   thiz.weixinPay(params);
          // }
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
              thiz.$router.replace({ path: '/orderDetail', query: { orderId: params.orderId } });
            } else {
              thiz.$router.replace({ path: '/orderDetail', query: { orderId: params.orderId } });
            }
          }
        );
      },

      newAddress() {
        let thiz = this;
        thiz.$router.push({ path: '/address', query: { source: 'orderConfirm', tt: new Date().getTime() } });
      },
      toAddressList() {
        let thiz = this;
        thiz.$router.push({ path: '/addressList', query: { source: 'orderConfirm', tt: new Date().getTime() } });
      }

    }
  };

</script>

<style>

</style>
