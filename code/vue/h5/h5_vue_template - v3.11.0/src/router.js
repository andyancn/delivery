import Vue from 'vue';
import Router from 'vue-router';
import home from './views/Home.vue';
import self from './views/Self.vue';
import login from './views/Login.vue';
import register from './views/Register.vue';
import registStore from './views/RegistStore.vue';
import distributeOrderList from './views/DistributeOrderList.vue';
import fansList from './views/FansList';
import fansDetail from './views/FansDetail';
import incomeList from './views/IncomList.vue';
import orderConfirm from './views/OrderConfirm.vue';
import myOrderList from './views/MyOrderList.vue';
import orderDetail from './views/OrderDatail.vue';
import distributionList from './views/DistributionList.vue';
import distributionConfig from './views/DistributionConfig.vue';
import myStoreInfo from './views/MyStoreInfo.vue';
import shareQrcode from './views/ShareQrcode.vue';
import bankList from './views/BankList.vue';
import addBank from './views/AddBank.vue';
import address from './views/Address.vue';
import addressList from './views/AddressList.vue';
import myStoreList from './views/MyStoreList.vue';
import withdraw from './views/Withdraw.vue';
import withdrawList from './views/WithdrawList.vue';
import channelList from './views/ChannelList.vue';
import cmccRechargeRecordList from './views/CmccRechargeRecordList.vue';
import myHandleOrderList from './views/MyHandleOrderList.vue';
import idCardList from './views/IdCardList.vue';
import distributeStoreList from './views/DistributeStoreList.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  // mode: 'hash',
  base: process.env.BASE_URL,
  tabBars: [
    '/home',
    '/self'
  ],
  routes: [
    {
      path: '/home',
      name: '英妃庄品牌联盟销售管理',
      component: home,
      meta: {
        title: '英妃庄品牌联盟入驻大礼'
      }
    },
    {
      path: '/self',
      name: '个人中心',
      component: self,
      meta: {
        title: '英妃庄品牌联盟入驻大礼'
      }
    },
    {
      path: '/login',
      name: '登录',
      component: login,
      meta: {
        title: '用户登录'
      }
    },
    {
      path: '/register',
      name: '注册',
      component: register,
      meta: {
        title: '用户注册'
      }
    },
    {
      path: '/registStore',
      name: '注册店铺',
      component: registStore,
      meta: {
        title: '注册店铺'
      }
    },
    {
      path: '/distributeOrderList',
      name: '推广订单',
      component: distributeOrderList,
      meta: {
        title: '推广订单'
      }
    },
    {
      path: '/fansList',
      name: '我的粉丝',
      component: fansList,
      meta: {
        title: '我的粉丝'
      }
    },
    {
      path: '/fansDetail',
      name: '粉丝详情',
      component: fansDetail,
      meta: {
        title: '粉丝详情'
      }
    },
    {
      path: '/incomeList',
      name: '我的收益',
      component: incomeList,
      meta: {
        title: '我的收益'
      }
    },
    {
      path: '/myOrderList',
      name: '我的订单',
      component: myOrderList,
      meta: {
        title: '我的订单'
      }
    },
    {
      path: '/orderDetail',
      name: '订单详情',
      component: orderDetail,
      meta: {
        title: '订单详情'
      }
    },
    {
      path: '/orderConfirm',
      name: '订单确认',
      component: orderConfirm,
      meta: {
        title: '订单确认'
      }
    },
    {
      path: '/distributionList',
      name: '分销规则',
      component: distributionList,
      meta: {
        title: '分销规则'
      }
    },
    {
      path: '/distributionConfig',
      name: '分销详情',
      component: distributionConfig,
      meta: {
        title: '分销详情'
      }
    },
    {
      path: '/myStoreInfo',
      name: '店铺详情',
      component: myStoreInfo,
      meta: {
        title: '店铺详情'
      }
    },
    {
      path: '/myStoreList',
      name: '我的店铺',
      component: myStoreList,
      meta: {
        title: '我的店铺'
      }
    },
    {
      path: '/bankList',
      name: '我的银行卡',
      component: bankList,
      meta: {
        title: '我的银行卡'
      }
    },
    {
      path: '/addBank',
      name: '添加银行卡',
      component: addBank,
      meta: {
        title: '添加银行卡'
      }
    },
    {
      path: '/shareQrcode',
      name: '分享码',
      component: shareQrcode,
      meta: {
        title: '分享码'
      }
    },
    {
      path: '/address',
      name: '地址详情',
      component: address,
      meta: {
        title: '地址详情'
      }
    },
    {
      path: '/addressList',
      name: '地址管理',
      component: addressList,
      meta: {
        title: '地址管理'
      }
    },
    {
      path: '/withdraw',
      name: '提现',
      component: withdraw,
      meta: {
        title: '提现'
      }
    },
    {
      path: '/withdrawList',
      name: '提现记录',
      component: withdrawList,
      meta: {
        title: '提现记录'
      }
    },
    {
      path: '/channelList',
      name: '渠道统计',
      component: channelList,
      meta: {
        title: '渠道统计'
      }
    },
    {
      path: '/cmccRechargeRecordList',
      name: '移动充值记录',
      component: cmccRechargeRecordList,
      meta: {
        title: '移动充值记录'
      }
    },
    {
      path: '/myHandleOrderList',
      name: '我的处理订单',
      component: myHandleOrderList,
      meta: {
        title: '我的处理订单'
      }
    },
    {
      path: '/idCardList',
      name: '我的卡库',
      component: idCardList,
      meta: {
        title: '我的卡库'
      }
    },
    {
      path: '/DistributeStoreList',
      name: '推广门店',
      component: distributeStoreList,
      meta: {
        title: '推广门店'
      }
    },

  ]
});

