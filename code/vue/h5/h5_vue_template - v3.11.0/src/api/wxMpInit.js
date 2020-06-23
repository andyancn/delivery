import { WxMpConfig } from '../api/wxMpConfig';

export default {
  //微信公众号分享配置初始化   wxMpShareShowMenu: function(that, sign = '', title, desc) {
  wxMpShareShowMenu: function(that, title, desc, link, imgUrl, sign = '') {
    let thiz = this;
    let shareConfig = {
      title: title ? title : '悦狐荟美妆',
      desc: desc ? desc : '移动充值送大礼',
      link: link ? link:'',
      imgUrl: imgUrl?imgUrl:''
    };
    let params = {
      url: link
    };
    WxMpConfig(params).then(response => {
      console.log('WxMpInit--->', process.env.VUE_APP_MP_APPID);
      wx.config({
        debug: false,
        appId: process.env.VUE_APP_MP_APPID,
        timestamp: response.data.data.item.timestamp,
        nonceStr: response.data.data.item.nonceStr,
        signature: response.data.data.item.signature,
        jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData', 'onMenuShareAppMessage', 'onMenuShareTimeline']
      });
      wx.error(function(res) {
        // alert(JSON.stringify(res))
        console.log(res);
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      });
      wx.ready(() => {
        wx.updateAppMessageShareData({
          title: shareConfig.title,
          desc: shareConfig.desc,
          link: shareConfig.link,
          imgUrl: shareConfig.imgUrl,
          success: function() {//设置成功
            //shareSuccessCallback();
          }
        });
        wx.updateTimelineShareData({
          title: shareConfig.title,
          link: shareConfig.link,
          imgUrl: shareConfig.imgUrl,
          success: function() {//设置成功
            console.log('分享成功！');
            //shareSuccessCallback();
          }
        });
      });
    });
  }
};

