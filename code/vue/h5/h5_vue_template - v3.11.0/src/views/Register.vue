<template>
    <div class="flex_col align_center full_screen border-box">
        <div class="bg_white pd_lr_30 pd_t_80">
            <div class="mg_b_60">
                <van-image
                        width="40vw"
                        height="46.7vw"
                        fit="cover"
                        :src="logo"
                />
            </div>
            <!--<div class="f34">英妃庄品牌联盟</div>-->
            <!--<div class="align_left f32 mg_b_30">填写信息</div>-->
            <div>
                <van-field class="mg_b_30 border_1 border-box f32"
                           required
                           border
                           label-width="32px"
                           v-model="form.name"
                           placeholder="请输入姓名"
                           @input="setName"
                           @blur="validatorName"
                           :error-message="errMsg.name"
                           clearable
                />
                <van-field class="mg_b_30 border_1 border-box f32"
                           required
                           border
                           label-width="32px"
                           v-model="form.tel"
                           type="tel"
                           @input="setTel"
                           placeholder="请输入手机号"
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
                <van-field class="mg_b_30 border_1 border-box f32 align_left"
                           border
                           disabled
                           label="推荐人"
                           label-width="120px"
                           v-model="inviterInfo.name"
                />

                <div class="flex_row_start flex_align_middle">
                    <div class="mg_r_30">
                        <van-checkbox :disabled="!readStatus" shape="square" checked-color="#D4A867"
                                      v-model="agreementChecked"
                                      @click="comfirmAgreement"></van-checkbox>
                    </div>
                    <div class="flex_row_start flex_align_middle">
                        <div>我已阅读并同意</div>
                        <div class="fc_D4A867 f24" @click="readAgreement">《英妃庄品牌联盟入驻服务协议书》</div>
                    </div>
                </div>
                <div class="pd_20">
                    <van-button block size="large" color="#D4A867" class=" fc_white" @click="registerHandle">
                        注册
                    </van-button>
                </div>
                <div class="pd_20 f28 align_right fc_D4A867" @click="loginHandle">
                    已有账号去登录 !
                </div>
            </div>
        </div>
        <!--:style="{ height: '30%' }"-->
        <!--close-icon-position="bottom-left"-->
        <van-popup
                v-model="showAgreement"
                closeable
                position="bottom"
                style="height: 60%"
                @close="closeAgreement"
                close-icon-position="top-left"
                safe-area-inset-bottom
                overlay
                lock-scroll
        >
            <div class="pd_30">
                <table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
                    <tr>
                        <td height="800" bgcolor="#FFFFFF">
                            <div align="center" style="line-height: 30px;">
                                <p align="center" class="mg_b_30 B f28">英妃庄品牌联盟店铺小程序入驻服务电子协议书 </p>
                                <p align="left">一、 合作内容： <br/>
                                    1、乙方作为甲方的业务品牌小程序线上平台承销商，主要负责甲方业务在其品牌经营或平台覆盖地域范围即垂直渠道内的拓展及英妃庄品牌联盟券的推广，具体包括以下内容： <br/>
                                    （1） 通过营销、推广等方式邀请移动用户参与中国移动泛渠道话费减免聚合营销活动，并获得英妃庄品牌联盟券； <br/>
                                    （2） 通过营销、推广等方式邀请移动用户使用移动积分兑换英妃庄品牌联盟券； <br/>
                                    （3） 通过营销、推广等方式邀请移动用户以消费方式兑换英妃庄品牌联盟券； <br/>
                                    （4） 乙方在承销渠道内以通过发行英妃庄品牌联盟券等方式，推动通过（1）-（3）方式销售/兑换的英妃庄品牌联盟券的消费。 <br/>
                                    （5） 协助甲方进行承销区、县内可用英妃庄品牌联盟券进行消费的商场、便利店和零售及服务业门店（以下简称&#8220;签约门店&#8221;）。乙方通过（1）-（4）方式销售/兑换的英妃庄品牌联盟券金额计入乙方的承销金额。
                                    <br/>
                                    2、乙方在指定地域范围及垂直渠道内移动客户通过前款获得的英妃庄品牌联盟券，该券可在乙方承销品牌平台及门店消费。 <br/>
                                    二、 合作条件：  <br/>
                                    1、乙方在垂直渠道内合作区域为全国各省市区县，区域不受限制。 <br/>
                                    2、乙方按照以下标准按每月完成的承销金额进行结算。 <br/>
                                    3、结算方式：每月的 1 日为结算日，15 日结算返利部份。 <br/>
                                    4、本合同需经中国移动批准后生效。 <br/>
                                    5、品牌报备移动批准后，合作品牌方需要交纳<u>680</u>元，作为移动用户小程序软件接口使用费。 <br/>
                                    三、 双方指定专用收款账户： <br/>
                                    四、 甲方权利和义务： <br/>
                                    1、甲方有权管理规范乙方的宣传方案及礼品品质，处理客户投诉。 <br/>
                                    2、甲方负责按时结算货款，按移动充值的60%结算货款。 <br/>
                                    3、 若乙方的客户或者中国移动客户有严重投诉行为，导致甲方收到移动公司处罚通知，甲方或客户遭受的任何损失，甲方有权要求乙方予以赔偿。 <br/>
                                    五、 乙方权利和义务： <br/>
                                    1、乙方有权要求甲方小程序使用培训，货款准时结算。 <br/>
                                    2、乙方为客户提供的产品和服务必须合法合规，因产品质量及服务造成对客户的损害乙方负全部责任。 <br/>
                                    3、乙方必须主动配合因客户投诉而进行的调解工作。 <br/>
                                    4、乙方进行该业务时不能直接对移动用户结算现金，只能用于商户现金结算，一旦发现违规将给予处罚。 <br/>
                                    5、乙方的质量保证责任： <br/>
                                    （1）
                                    乙方保证采用英妃庄品牌联盟券买的产品均为全新的并且没有设计、材料及工艺上的缺陷，完全符合合同规定的品牌、质量、规格等要求和质量标准，并有产品合格证或产品质量证明书。
                                    <br/>
                                    （2） 严禁提供假冒伪劣产品，一经发现，甲方有权拒收或作退货处理，并解除本合同，且因此而产生的一切费用和责任由乙方承担，同时乙方应向甲方支付该产品合同总价
                                    30%的违约金。 <br/>
                                    （3） 乙方为客户所提供的产品质保期为一年。在质保期内出现质量问题，由乙方在 7
                                    天内更换，更换货物的质保期应从该更换货物验收合格之日起开始重新计算；如不能更换的，予以退货。造成甲方或消费者的损失，由乙方负责，如消费者或第三方追究乙方责任，乙方应承担由此产生的一切损失。
                                    <br/>
                                    6、知识产权： <br/>
                                    （1）
                                    乙方提供给甲方或消费者的货物不得侵犯第三人的权利，乙方应保证甲方或消费者在使用该货物或其任何一部分时免受第三方提出侵犯其任何专利、版权、商标或商品名称或其他知识产权工业设计权的起诉及索赔。若甲方或消费者受到此类索赔或起诉，其责任及给甲方或消费者造成的一切损失由乙方承担，甲方有权解除合同，同时乙方应向甲方支付
                                    5 万元的违约金。 <br/>
                                    六、违约责任： <br/>
                                    1、自协议有效之日起，非因不可抗力或者双方的商定，任何一方不得单独解除本协议。任何一方违反其在本协议项下的任何义务、声明、保证和承诺，或本协议的任何条款，即构成违约。
                                    <br/>
                                    2、如甲方未按本协议规定向乙方支付相应费用，乙方有权自应付之日起向甲方就应付未付费用按日计收百分之一的违约金，并要求甲方赔偿乙方为履行义务而发生的一切费用。 <br/>
                                    3、如乙方未按照本协议要求履行本协议项下的义务，甲方有权拒付合同价款。如因乙方履行本协议项下的义务，导致甲方遭受任何损失，甲方有权要求乙方予以赔偿。 <br/>
                                    七、适用法律和诉讼： <br/>
                                    1、本协议由中国法律管辖并根据中国法律解释。 <br/>
                                    2、凡因执行本协议所发生的或与本协议有关的一切争议，如果双方协商不成，应提交甲方住所地有管辖权的法院进行审理。 <br/>
                                    八、协议的生效、修改和终止： <br/>
                                    1、本协议经双方法定代表人、负责人或正式授权代表签字盖章后生效。 <br/>
                                    2、本协议如有未尽事宜，可由双方协商签订补充协议。补充协议是本协议的组成部分，与本协议具有同等法律效力。补充协议如与本协议有冲突，以签订日期后者为准。 <br/>
                                    3、本协议履行期间，如遇重大宏观政策调整，或甲方的经营和财务状况发生重大变化，或出现其他不可抗力因素，致使本协议项下的咨询服务事宜无法继续执行时，双方协商一致后可终止本协议。
                                    <br/>
                                </p>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </van-popup>
    </div>
</template>

<script>
  import validUtil from '../utils/ValidateUtil';
  import { register, verifyCode, weixinOauth, inviterInfo } from '../api/public';
  import storeUtil from 'storejs';
  import { Toast } from 'vant';

  export default {
    name: 'register',
    data() {
      return {
        timer: null,
        time: 60,
        ButtonPushVerifyCode: {
          btn_txt: '发送验证码',
          btn_disabled: false
        },
        form: {
          tel: '',
          name: '',
          verifyCode: '',
          brandId: 1,
          inviterId: storeUtil('fx_inviterId') ? storeUtil('fx_inviterId') : 0,
          registerChannel: false
        },
        inviterInfo: '',
        errMsg: {
          name: '',
          tel: '',
          verifyCode: ''
        },
        // logo: process.env.VUE_APP_RESRC_PATH + 'logo_bg_white.png',
        logo: require('../assets/images/h5_logo_yfz.jpg'),
        userInfo: null,
        readStatus: false,
        agreementChecked: false,  //合同确认
        showAgreement: false  //展示合同否
      };
    },
    created() {
      let thiz = this;
      // window.addEventListener('resize', this.getHeight);
      // this.getHeight();
      // console.log('created---->', this.$route.params);
      thiz.brandId = thiz.$route.query.brandId ? thiz.$route.query.brandId : 1;
      thiz.form.inviterId = storeUtil('fx_inviterId') ? storeUtil('fx_inviterId') : 0;
      thiz.form.registerChannel = storeUtil('fx_registerChannel') || false;
    },
    mounted() {
      let thiz = this;
      // console.log('isLogin===========>', this.$store);
      if (storeUtil('fx_inviterId')) {
        thiz.getInviterInfo(storeUtil('fx_inviterId'));
      }
    },
    computed: {},
    methods: {
      setName(val) {
        this.form.name = val;
      },
      setTel(val) {
        this.form.tel = val;
      },
      setCode(val) {
        this.form.validCode = val;
      },
      validatorName() {
        let thiz = this;
        thiz.form.name = validUtil.trim(thiz.form.name);
        if (validUtil.checkTitle(thiz.form.name)) {
          thiz.errMsg.vaildCode = '姓名填写不正确';
        } else {
          thiz.errMsg.vaildCode = '';
        }
      },
      validatorTel() {
        let thiz = this;
        thiz.form.tel = validUtil.trim(thiz.form.tel);
        if (validUtil.isLikeCellphone(thiz.form.tel)) {
          this.errMsg.tel = '';
        } else {
          this.errMsg.tel = '手机号码不正确';
        }
      },
      /**
       * 清除倒计时
       * @private
       */
      _btn_cancelTimerMode: function() {
        clearTimeout(this.timer);
      },

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
      },
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
          sendScene: 'REGISTER'
        };
        verifyCode(req).then(response => {
          console.log('==========>', response);
          thiz._btn_timerMode();// 下发成功后，设置成倒计时模式
        });
      },
      registerHandle() {
        let thiz = this;
        if (!thiz.form.tel) {
          if (!thiz.form.name) {
            Toast('姓名不能为空！');
            return false;
          }
          Toast('电话号码不能为空或非法！');
          return false;
        }
        if (!thiz.form.verifyCode) {
          Toast('验证码不能为空！');
          return false;
        }
        if (!thiz.agreementChecked) {
          Toast('您还未同意《英妃庄品牌联盟入驻服务协议书》！');
          return false;
        }
        let req = {
          tel: thiz.form.tel,
          name: thiz.form.name,
          verifyCode: thiz.form.verifyCode,
          brandId: thiz.form.brandId,
          inviterId: thiz.form.inviterId ? parseInt(thiz.form.inviterId) : 0,
          registerChannel: thiz.form.registerChannel
        };
        register(req).then(reponse => {
          storeUtil('fx_sessionId', reponse.data.data.sessionId);
          storeUtil('fx_userId', reponse.data.data.userId.toString());
          storeUtil('fx_brandId', reponse.data.data.brandId.toString());
          let userInfo = {
            id: reponse.data.data.userId,
            brandId: reponse.data.data.brandId,
            name: reponse.data.data.name
          };
          thiz.$store.dispatch('SaveUserInfo', userInfo).then((res) => {
            thiz.weixinOauth();
          });
        }).catch(error => {
          console.log(error);
        });
      },

      readAgreement() {
        let thiz = this;
        thiz.readStatus = true;
        thiz.showAgreement = true;
      },
      closeAgreement() {
        let thiz = this;
        thiz.showAgreement = false;
      },

      comfirmAgreement(e) {
        let thiz = this;
        // console.log('comfirmAgreement====>', thiz.agreementChecked);
        if (!thiz.readStatus) {
          Toast('请先仔细阅读《英妃庄品牌联盟申请须知》！');
        }
      },

      //去登录
      loginHandle() {
        let thiz = this;
        thiz.$router.push({ path: '/login', query: { tt: new Date().getTime() } });
        // thiz.weixinOauth();
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
      getInviterInfo(inviterId) {
        let thiz = this;
        inviterId = parseInt(inviterId);
        let req = {
          id: inviterId
        };
        inviterInfo(req).then(response => {
          if (response.data.data) {
            thiz.inviterInfo = response.data.data;
          }
        });
      }
    }
  };
</script>

<style scoped>

</style>
