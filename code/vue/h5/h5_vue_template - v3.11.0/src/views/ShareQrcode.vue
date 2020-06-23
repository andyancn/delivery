<template>
    <div class="flex_col align_center full_screen border-box bg_0BEBFF">
        <div id="box" class="share_box" ref="box" style="margin: 0;" v-show="renderFlag == 0">
            <div style="width: 100vw;height:160.8vw;position: relative;">
                <!-- 背景图 -->
                <img id="bg" style="width: 100vw;height:160.8vw" @load="bgImgload" :src="html.bgImg" alt=""/>
                <!-- 二维码 -->
                <div id="my_qrcode"
                     style="position: absolute;bottom: 20.5vw;right: 10vw;border: 1.5vw solid #ffffff;background-color: #ffffff">
                </div>
            </div>
        </div>
        <!-- 存放合成的图片 -->
        <div id="shareImg"></div>
        <div class="pd_20 f26 align_center">长按图片保存分享</div>

    </div>
</template>
<script>

  import validUtil from '../utils/ValidateUtil';
  import QRCode from 'qrcodejs2';
  import { Toast } from 'vant';
  import html2canvas from 'html2canvas';
  import Canvas2Image from 'canvas2image';

  export default {
    name: 'shareQrcode',
    data() {
      return {
        renderFlag: 0,
        qrCode: false,
        registerChannel: this.$route.query.registerChannel || false,
        html: {
          bgImg: require('../assets/images/cmccRechargeWebCover_v2.png'),
          qrCodeLoaded: false
        },
        userId: this.$store.getters.userId
        // loading: true,
        // saved: false,
        // qrcodeImg: '',
        // logo: '',
        // text: ['英妃庄品牌联盟!', '入驻起售仅需999元', '推荐好友 躺赚']
      };
    },
    mounted() {
      let thiz = this;
      // thiz.getQrcodeImage();
      thiz.getQrcode();
      let link = process.env.VUE_APP_BASE_API + '/?inviterId=' + thiz.userId + '&registerChannel=' + thiz.registerChannel + '&time=' + new Date().getTime();
      // thiz.WxMpInit.wxMpShareShowMenu(thiz, '悦狐荟美妆', '移动充值送大礼', link, thiz.html.bgImg)
    },
    methods: {
      //二维码是否渲染完毕
      qrcodeLoad() {
        this.qrCode = true;
      },
      //背景图加载完回调
      bgImgload() {
        this.creatImg();
      },

      //生成图片
      creatImg() {
        let thiz = this;
        // let img = document.getElementById('bg');
        if (thiz.html.qrCodeLoaded) {
          // 已经生成二维码
          clearInterval(this.timer);
          var width = window.innerWidth;
          var height = window.innerWidth * 1.608;
          var canvas = document.createElement('canvas');
          var context = canvas.getContext('2d');
          let element = thiz.$refs.box;
          // console.log('element============>', element);
          var scale = 2; //定义任意放大倍数 支持小数
          canvas.width = width * 2 * scale;//定义canvas 宽度 * 缩放
          canvas.height = height * 2 * scale; //定义canvas高度 *缩放
          canvas.getContext('2d').scale(scale, scale); //获取context,设置scale
          var opts = {
            scale: scale, // 添加的scale 参数
            canvas: canvas, //自定义 canvas
            width: width, //dom 原始宽度
            height: height,
            useCORS: true // 【重要】开启跨域配置
          };
          html2canvas(element, opts).then(function(canvas) {

            var context = canvas.getContext('2d');
            // 【重要】关闭抗锯齿
            context.mozImageSmoothingEnabled = false;
            context.webkitImageSmoothingEnabled = false;
            context.msImageSmoothingEnabled = false;
            context.imageSmoothingEnabled = false;

            var newImg = document.createElement('img');
            // var dataUrl = canvas.toDataURL();
            // console.log('canvas=======>', dataUrl);
            // newImg.src = dataUrl;
            // newImg.id = 'qcImg';
            //newImg.style.width = "100%";
            // newImg.style.width = width + 'px';
            // newImg.style.height = height + 'px';

            let shareImg = document.getElementById('shareImg');
            newImg = Canvas2Image.convertToPNG(canvas, width, height);
            shareImg.appendChild(newImg);
            thiz.renderFlag = 1;
          });
        } else {
          thiz.timer = setInterval(() => {
            thiz.creatImg();
          }, 300);
        }

      },

      getQrcode() {
        let thiz = this;
        console.log('url====>', process.env.VUE_APP_BASE_API + '/?inviterId=' + thiz.userId + '&registerChannel=' + thiz.registerChannel + '&time=' + new Date().getTime());
        let p = new Promise(resolve => {
          let qrcode = new QRCode('my_qrcode', {
            width: 90,
            height: 90,
            typeNumber: 4,
            correctLevel: QRCode.CorrectLevel.L,
            text: process.env.VUE_APP_BASE_API + '/?inviterId=' + thiz.userId + '&registerChannel=' + thiz.registerChannel + '&time=' + new Date().getTime(), // 二维码地址
            colorDark: '#000',
            colorLight: '#fff'
          });
          resolve();
        });
        p.then(() => {
          thiz.html.qrCodeLoaded = true;
        });
      }

      // getProductDetail() {
      //   let thiz = this;
      //   let req = {
      //     id: 2,
      //     brandId: 1
      //   };
      //   productDetail(req).then((res) => {
      //     if (res.data.data.item) {
      //       thiz.productInfo = res.data.data.item;
      //       if (process.env.VUE_APP_ENV_NAME != 'dev') {
      //         thiz.productInfo.cover = process.env.VUE_APP_PIC_HOST + JSON.parse(thiz.productInfo.coverPicture)[0];
      //       } else {
      //         thiz.productInfo.cover = require('../assets/images/h5_goods_v3.jpg');
      //       }
      //       console.log('thiz.productInfo.cover===>', thiz.productInfo.cover);
      //     }
      //   });
      // }
    }
  };
</script>

<style scoped>
    .img_pos {
        margin: 12vw 8vw auto 8vw;
    }

</style>
