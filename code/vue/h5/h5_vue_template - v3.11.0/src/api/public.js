import request from '@/utils/Request';
export function verifyCode(query) {
  const params = new URLSearchParams();
  if(query){
    for (const [key, value] of Object.entries(query)) {
      params.append(key, value)
    }
  }
  return request({
    url: '/fx/user/send_verify_code.do',
    method: 'get',
    params: params
  })
}
export function register(query) {
  const params = new URLSearchParams();
  if(query){
    for (const [key, value] of Object.entries(query)) {
      params.append(key, value)
    }
  }
  return request({
    url: '/fx/user/register.do',
    method: 'post',
    params: params
  })
}
export function login(query) {
  const params = new URLSearchParams();
  if(query){
    for (const [key, value] of Object.entries(query)) {
      params.append(key, value)
    }
  }
  return request({
    url: '/fx/user/login.do',
    method: 'post',
    params: params
  })
}
// export function logout() {
//   return request({
//     url: '/admin/user/logout.do',
//     method: 'get'
//   })
// }
export function userInfo(query) {
  const params = new URLSearchParams();
  if(query){
    for (const [key, value] of Object.entries(query)) {
      params.append(key, value)
    }
  }
  return request({
    url: '/fx/user/detail/get.do',
    method: 'get',
    params: params
  })
}
export function inviterInfo(query) {
  const params = new URLSearchParams();
  if(query){
    for (const [key, value] of Object.entries(query)) {
      params.append(key, value)
    }
  }
  return request({
    url: '/fx/user/name/get.do',
    method: 'get',
    params: params
  })
}

export function productDetail(query) {
  const params = new URLSearchParams();
  if(query){
    for (const [key, value] of Object.entries(query)) {
      params.append(key, value)
    }
  }
  return request({
    url: '/fx/product/detail/get.do',
    method: 'get',
    params: params
  })
}

//分销规则列表
export function distributeRuleList(query) {
  const params = new URLSearchParams();
  if(query){
    for (const [key, value] of Object.entries(query)) {
      params.append(key, value)
    }
  }
  return request({
    url: '/fx/distribute/rule/list/get.do',
    method: 'get',
    params: params
  })
}
//分销规则新增修改
export function distributeRuleSave(query) {
  const params = new URLSearchParams();
  if(query){
    for (const [key, value] of Object.entries(query)) {
      params.append(key, value)
    }
  }
  return request({
    url: '/fx/distribute/rule/save.do',
    method: 'post',
    params: params
  })
}
//分销规则启动
export function distributeRuleSwitch(query) {
  const params = new URLSearchParams();
  if(query){
    for (const [key, value] of Object.entries(query)) {
      params.append(key, value)
    }
  }
  return request({
    url: '/fx/distribute/rule/close_flag/upd.do',
    method: 'post',
    params: params
  })
}
export function userAddressList(query) {
  const params = new URLSearchParams();
  if(query){
    for (const [key, value] of Object.entries(query)) {
      params.append(key, value)
    }
  }
  return request({
    url: '/fx/user/address/list/get.do',
    method: 'get',
    params: params
  })
}
export function userAddressDetail(query) {
  const params = new URLSearchParams();
  if(query){
    for (const [key, value] of Object.entries(query)) {
      params.append(key, value)
    }
  }
  return request({
    url: '/fx/user/address/detail/get.do',
    method: 'get',
    params: params
  })
}
export function userAddressSwitch(query) {
  const params = new URLSearchParams();
  if(query){
    for (const [key, value] of Object.entries(query)) {
      params.append(key, value)
    }
  }
  return request({
    url: '/fx/user/address/default_flag/upd.do',
    method: 'post',
    params: params
  })
}
export function userAddressDelete(query) {
  const params = new URLSearchParams();
  if(query){
    for (const [key, value] of Object.entries(query)) {
      params.append(key, value)
    }
  }
  return request({
    url: '/fx/user/address/del_flag/upd.do',
    method: 'post',
    params: params
  })
}
export function userAddressSave(query) {
  const params = new URLSearchParams();
  if(query){
    for (const [key, value] of Object.entries(query)) {
      params.append(key, value)
    }
  }
  return request({
    url: '/fx/user/address/save.do',
    method: 'post',
    params: params
  })
}
//用户提交银行账号
export function userBankSave(query) {
  const params = new URLSearchParams();
  if(query){
    for (const [key, value] of Object.entries(query)) {
      params.append(key, value)
    }
  }
  return request({
    url: '/fx/user/account/save.do',
    method: 'post',
    params: params
  })
}

//用户银行账号详情
export function userBankDetail(query) {
  const params = new URLSearchParams();
  if(query){
    for (const [key, value] of Object.entries(query)) {
      params.append(key, value)
    }
  }
  return request({
    url: '/fx/user/account/detail.do',
    method: 'get',
    params: params
  })
}

//用户粉细
export function userFansState(query) {
  const params = new URLSearchParams();
  if(query){
    for (const [key, value] of Object.entries(query)) {
      params.append(key, value)
    }
  }
  return request({
    url: '/fx/user/fans/stat.do',
    method: 'get',
    params: params
  })
}
//直属粉细列表
export function userFansList(query) {
  const params = new URLSearchParams();
  if(query){
    for (const [key, value] of Object.entries(query)) {
      params.append(key, value)
    }
  }
  return request({
    url: '/fx/user/fans/list.do',
    method: 'get',
    params: params
  })
}

//分系统计
export function userFansInfo(query) {
  const params = new URLSearchParams();
  if(query){
    for (const [key, value] of Object.entries(query)) {
      params.append(key, value)
    }
  }
  return request({
    url: '/fx/user/fans/info.do',
    method: 'get',
    params: params
  })
}

//了级收益统计和收益记录
export function userCommissionnList(query) {
  const params = new URLSearchParams();
  if(query){
    for (const [key, value] of Object.entries(query)) {
      params.append(key, value)
    }
  }
  return request({
    url: '/fx/user/commissionn/list.do',
    method: 'get',
    params: params
  })
}

//保存店铺信息
export function storeList(query) {
  const params = new URLSearchParams();
  if(query){
    for (const [key, value] of Object.entries(query)) {
      params.append(key, value)
    }
  }
  return request({
    url: '/fx/user/store/info/list.do',
    method: 'get',
    params: params
  })
}

//店铺信息获取
export function storeInfo(query) {
  const params = new URLSearchParams();
  if(query){
    for (const [key, value] of Object.entries(query)) {
      params.append(key, value)
    }
  }
  return request({
    url: '/fx/user/store/info.do',
    method: 'get',
    params: params
  })
}
//保存店铺信息
export function saveStore(query) {
  const params = new URLSearchParams();
  if(query){
    for (const [key, value] of Object.entries(query)) {
      params.append(key, value)
    }
  }
  return request({
    url: '/fx/user/order/store_info/save.do',
    method: 'post',
    params: params
  })
}

//订单列表
export function orderList(query) {
  const params = new URLSearchParams();
  if(query){
    for (const [key, value] of Object.entries(query)) {
      params.append(key, value)
    }
  }
  return request({
    url: '/fx/user/order/list/get.do',
    method: 'get',
    params: params
  })
}

export function orderSubmit(query) {
  const params = new URLSearchParams();
  if(query){
    for (const [key, value] of Object.entries(query)) {
      params.append(key, value)
    }
  }
  return request({
    url: '/fx/user/order/submit.do',
    method: 'post',
    params: params
  })
}
export function orderDetail(query) {
  const params = new URLSearchParams();
  if(query){
    for (const [key, value] of Object.entries(query)) {
      params.append(key, value)
    }
  }
  return request({
    url: '/fx/user/order/detail/get.do',
    method: 'get',
    params: params
  })
}
//预支付
export function prepay(query) {
  const params = new URLSearchParams();
  if(query){
    for (const [key, value] of Object.entries(query)) {
      params.append(key, value)
    }
  }
  return request({
    url: '/fx/user/order/prepay.do',
    method: 'post',
    params: params
  })
}

//微信Oauth授权
export function weixinOauth(query) {
  const params = new URLSearchParams();
  if(query){
    for (const [key, value] of Object.entries(query)) {
      params.append(key, value)
    }
  }
  return request({
    url: '/fx/common/wx/oauth2/authorize.do',
    method: 'post',
    params: params
  })
}

export function fansOrderList(query) {
  const params = new URLSearchParams();
  if(query){
    for (const [key, value] of Object.entries(query)) {
      params.append(key, value)
    }
  }
  return request({
    url: '/fx/user/fans/order/list/get.do',
    method: 'get',
    params: params
  })
}
//提现
export function withdrawSave(query) {
  const params = new URLSearchParams();
  if(query){
    for (const [key, value] of Object.entries(query)) {
      params.append(key, value)
    }
  }
  return request({
    url: '/fx/user/withdraw/save.do',
    method: 'post',
    params: params
  })
}
//提现记录
export function withdrawList(query) {
  const params = new URLSearchParams();
  if(query){
    for (const [key, value] of Object.entries(query)) {
      params.append(key, value)
    }
  }
  return request({
    url: '/fx/user/withdraw/list/get.do',
    method: 'get',
    params: params
  })
}
//查看所有渠道商
export function channelList(query) {
  const params = new URLSearchParams();
  if(query){
    for (const [key, value] of Object.entries(query)) {
      params.append(key, value)
    }
  }
  return request({
    url: '/fx/channel/list.do',
    method: 'get',
    params: params
  })
}
//获得分佣记录
export function distributeRecordList(query) {
  const params = new URLSearchParams();
  if(query){
    for (const [key, value] of Object.entries(query)) {
      params.append(key, value)
    }
  }
  return request({
    url: '/fx/os_distribute_record/list/get.do',
    method: 'get',
    params: params
  })
}

//移除用户关联关系
export function removeRela(query) {
  const params = new URLSearchParams();
  if(query){
    for (const [key, value] of Object.entries(query)) {
      params.append(key, value)
    }
  }
  return request({
    url: '/fx/user/rela/remove.do',
    method: 'get',
    params: params
  })
}


//商品列表
export function productList(query) {
  const params = new URLSearchParams();
  if(query){
    for (const [key, value] of Object.entries(query)) {
      params.append(key, value)
    }
  }
  return request({
    url: '/fx/product/list/get.do',
    method: 'get',
    params: params
  })
}

//审核订单列表
export function orderHandlerList(query) {
  const params = new URLSearchParams();
  if(query){
    for (const [key, value] of Object.entries(query)) {
      params.append(key, value)
    }
  }
  return request({
    url: '/fx/user/order/handler_list/get.do',
    method: 'get',
    params: params
  })
}

//订单状态变更（状态:审核，发货）
export function orderUpdate(query) {
  const params = new URLSearchParams();
  if(query){
    for (const [key, value] of Object.entries(query)) {
      params.append(key, value)
    }
  }
  return request({
    url: '/fx/user/order/status/upd.do',
    method: 'post',
    params: params
  })
}

//订单预计算
export function preCount(query) {
  const params = new URLSearchParams();
  if(query){
    for (const [key, value] of Object.entries(query)) {
      params.append(key, value)
    }
  }
  return request({
    url: '/fx/user/order/pre_count.do',
    method: 'post',
    params: params
  })
}

//用户流量卡批次列表
export function batchList(query) {
  const params = new URLSearchParams();
  if(query){
    for (const [key, value] of Object.entries(query)) {
      params.append(key, value)
    }
  }
  return request({
    url: '/fx/user/redeem_card_batch/list/get.do',
    method: 'get',
    params: params
  })
}

//用户流量卡统计
export function batchStat(query) {
  const params = new URLSearchParams();
  if(query){
    for (const [key, value] of Object.entries(query)) {
      params.append(key, value)
    }
  }
  return request({
    url: '/fx/user/redeem_card_batch/stat.do',
    method: 'get',
    params: params
  })
}


//流量卡绑定门店
export function batchBindStore(query) {
  const params = new URLSearchParams();
  if(query){
    for (const [key, value] of Object.entries(query)) {
      params.append(key, value)
    }
  }
  return request({
    url: '/fx/user/redeem_card_batch/allocate.do',
    method: 'get',
    params: params
  })
}

//粉细门店列表
export function fansStoreList(query) {
  const params = new URLSearchParams();
  if(query){
    for (const [key, value] of Object.entries(query)) {
      params.append(key, value)
    }
  }
  return request({
    url: '/fx/user/fans/store/list/get.do',
    method: 'get',
    params: params
  })
}


