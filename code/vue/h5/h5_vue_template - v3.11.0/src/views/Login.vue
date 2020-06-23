<template>
    <div class="flex_col align_center full_screen border-box">
        <div class="bg_white pd_0_30 pd_t_80">
            <div class="mg_b_60">
                <van-image
                        width="40vw"
                        height="46.7vw"
                        fit="cover"
                        :src="logo"
                />
            </div>
            <!--<div class="f34 mg_b_80">英妃庄品牌联盟</div>-->
            <div>
                <van-field class="mg_b_30 border_1 border-box f32"
                           required
                           border
                           label-width="32px"
                           v-model="form.tel"
                           @input="setTel"
                           type="tel"
                           placeholder="请输入手注册手机号"
                           @blur="validatorTel"
                           :error-message="errMsg.tel"
                           clearable
                />
                <van-field type="number" class="mg_b_30 border_1 border-box f32"
                           required
                           v-model="form.verifyCode"
                           @input="setCode"
                           center
                           clearable
                           placeholder="请输入短信验证码"
                >
                    <template #button>
                        <van-button color="#D4A867" :disabled="ButtonPushVerifyCode.btn_disabled"
                                    class="f30 pd_10 fc_white" @click="getVerifyCode">
                            {{ButtonPushVerifyCode.btn_txt}}
                        </van-button>
                    </template>
                </van-field>
                <div class="pd_20">
                    <van-button block size="large" color="#D4A867" class=" fc_white" @click="loginHandle">
                        登录
                    </van-button>
                </div>
                <div class="pd_20 fc_D4A867 align_right f28" @click="toRegister">
                    还没有账号,去注册吧 ！
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import validUtil from '../utils/ValidateUtil';
  import storeUtil from 'storejs';
  import { login, verifyCode, weixinOauth } from '../api/public';
  import { Toast } from 'vant';


  export default {
    name: 'login',
    data() {
      return {
        // logo: process.env.VUE_APP_RESRC_PATH + 'logo_bg_white.png',
        logo: require('../assets/images/h5_logo_yfz.jpg'),
        timer: null,
        time: 60,
        ButtonPushVerifyCode: {
          btn_txt: '发送验证码',
          btn_disabled: false
        },
        form: {
          tel: '',
          verifyCode: ''
        },
        errMsg: {
          tel: '',
          verifyCode: ''
        }
      };
    },
    methods: {
      loginHandle: function() {
        let thiz = this;
        if (!thiz.form.tel || !validUtil.isLikeCellphone(thiz.form.tel)) {
          Toast('电话号码不能为空或非法！');
          return false;
        }
        if (!thiz.form.verifyCode) {
          Toast('验证码不能为空！');
          return false;
        }
        login(thiz.form).then(response => {
          console.log('login====' + response.data.data.userId.toString());
          storeUtil('fx_userId', response.data.data.userId.toString());
          storeUtil('fx_brandId', response.data.data.brandId.toString());
          storeUtil('fx_sessionId', response.data.data.sessionId);
          // console.log('store==========>', storeUtil('fx_userId'));
          let userInfo = {
            id: response.data.data.userId.toString(),
            brandId: response.data.data.brandId.toString(),
            userName: ''
          };
          thiz.$store.dispatch('SaveUserInfo', userInfo).then(() => {
            thiz.weixinOauth();
            // this.$router.push('/home');
          });
        }).catch(() => {
          // this.loading = false
        });
      },
      weixinOauth() {
        let req = {
          redirectParams: '/home'
        };
        weixinOauth(req).then((res) => {
          if (res.data.data.url) {
            location.href = res.data.data.url;
          }
        });
      },
      toRegister() {
        let thiz = this;
        thiz.$router.push({ path: '/register', query: { tt: new Date().getTime() } });
      }
      ,
      setTel(val) {
        this.form.tel = validUtil.trim(val);
      }
      ,
      setCode(val) {
        this.form.verifyCode = validUtil.trim(val);
      }
      ,
      validatorTel() {
        if (validUtil.isLikeCellphone(this.form.tel)) {
          this.errMsg.tel = '';
        } else {
          this.errMsg.tel = '手机号码不正确';
        }
      }
      ,
      /**
       * 清除倒计时
       * @private
       */
      _btn_cancelTimerMode: function() {
        clearTimeout(this.timer);
      }
      ,

      /**
       * 将按钮切换成倒计时模式
       * @private
       */
      _btn_timerMode: function() {
        let thiz = this;
        let btn_txt = '发送验证码';
        let btn_disabled = false;
        if (thiz.time > 0) {
          btn_txt = thiz.time + '秒后 重发';
          btn_disabled = true;
          thiz.time--;
          thiz.timer = setTimeout(function() {
            thiz._btn_timerMode();
          }, 1000);
        } else {
          thiz._btn_cancelTimerMode();
          btn_txt = '再次发送';
          btn_disabled = false;
          thiz.time = 60;
        }
        // 设置按钮状态
        thiz.ButtonPushVerifyCode.btn_txt = btn_txt;
        thiz.ButtonPushVerifyCode.btn_disabled = btn_disabled;
      }
      ,
      getVerifyCode() {
        let thiz = this;
        if (thiz.ButtonPushVerifyCode.btn_disabled) {
          return;
        }
        let tel = thiz.form.tel;
        if (!tel) {
          Toast('请填写手机号码');
          return;
        } else if (!validUtil.isLikeCellphone(tel)) {
          Toast('手机号码格式有误');
          return;
        }
        let req = {
          tel: thiz.form.tel,
          sendScene: 'LOGIN'
        };
        verifyCode(req).then(response => {
          // console.log('==========>', response);
          thiz._btn_timerMode();// 下发成功后，设置成倒计时模式
        });
      }
    }
  }
  ;
</script>

<style scoped>

</style>
