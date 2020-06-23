export default {
  //订单状态
  OrderStatusDict: {
    WAIT_PAY: {
      value: 1,
      name: '待支付'
    },
    WAIT_SEND: {
      value: 2,
      name: '待发货'
    },
    WAIT_RECEIVE: {
      value: 3,
      name: '待收货'
    },
    FINISH: {
      value: 4,
      name: '已完成'
    },
    WAIT_AUDIT: {
      value: 5,
      name: '待审核'
    },
    WAIT_SEND_CARD: {
      value: 6,
      name: '待发卡'
    }
  },

  getOrderStatusName(value) {
    for (let one of  Object.values(this.OrderStatusDict)) {
      if (one.value == value) {
        return one.name;
      }
    }
  },

  //商品类型类型
  ProductTypeDict: {
    STORE_ACCOUNT: {
      value: 2,
      name: '门店账号'
    },
    REDEEM_CARD: {
      value: 3,
      name: '兑换卡'
    }
  },

};
