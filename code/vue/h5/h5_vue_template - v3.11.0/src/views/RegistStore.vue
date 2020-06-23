<template>
    <div class="flex_col full_screen border-box bg_white">
        <div class="flex_col align_center pd_60">
            <div class="f32 mg_b_50">请完善店铺资料，生成店铺后台账号</div>
            <div>
                <van-form validate-first @submit="onSubmit">
                    <div>
                        <van-field class="mg_b_30 border_1 border-box f32"
                                   required
                                   border
                                   label-width="32px"
                                   v-model="form.name"
                                   name="name"
                                   placeholder="请输入店铺名称"
                                   @blur="validatorStoreName"
                                   :error-message="errMsg.name"
                                   clearable
                        />
                    </div>
                    <div>
                        <van-field class="mg_b_30 border_1 border-box f32"
                                   required
                                   border
                                   label-width="32px"
                                   v-model="form.storeRegion"
                                   name="storeRegion"
                                   placeholder="请输入店铺所在区域"
                                   @click="showAreaList"
                                   clearable
                                   disabled
                        />
                    </div>
                    <div>
                        <van-field class="mg_b_30 border_1 border-box f32"
                                   required
                                   border
                                   label-width="32px"
                                   v-model="form.address"
                                   name="name"
                                   placeholder="请输入店铺详细地址"
                                   @input="setAddress"
                                   @blur="validatorAddress"
                                   :error-message="errMsg.address"
                                   clearable
                        />
                    </div>
                    <div>
                        <van-field class="mg_b_30 border_1 border-box f32"
                                   required
                                   border
                                   label-width="32px"
                                   v-model="form.accountOwner"
                                   name="accountUserName"
                                   placeholder="请输入持卡人姓名"
                                   @input="setAccountOwner"
                                   @blur="validatorAccountOwner"
                                   :error-message="errMsg.accountOwner"
                                   clearable
                        />
                    </div>
                    <div class="mg_b_60">
                        <van-field class="mg_b_30 border_1 border-box f32"
                                   required
                                   border
                                   label-width="32px"
                                   type="number"
                                   v-model="form.accountNumber"
                                   @input="setAccountNumber"
                                   @blur="checkAccount"
                                   name="bankAccount"
                                   placeholder="请输入银行账号"
                                   clearable
                        />
                    </div>
                    <div>
                        <van-field class="mg_b_30 border_1 border-box f32"
                                   disabled
                                   border
                                   label-width="32px"
                                   v-model="form.accountBank"
                                   placeholder="开户行"
                                   name="accountBank"
                                   clearable
                        />
                    </div>
                    <div>
                        <van-button block size="large" color="#D4A867" class=" fc_white" native-type="submit">
                            确定
                        </van-button>
                    </div>
                </van-form>
            </div>
            <van-popup v-model="show" position="bottom" overlay safe-area-inset-bottom lock-scroll>
                <van-area :area-list="areaList" title="请选择地址" @confirm="addCity"
                          @cancel="closeArea" :value="addrCode" :columns-num="3"/>
            </van-popup>
            <van-popup
                    v-model="showAccount"
                    closeable
                    position="bottom"
                    :style="{ height: '30%' }"
                    @close="closePop"
            >
                <div class="flex_col bg_white pd_60 border-box f28">
                    <div class="f26 fc_D4A867 mg_b_20 mg_t_20">恭喜您，成功入驻英妃庄品牌联盟！</div>
                    <div class="flex_row_center flex_align_middle fc_black mg_b_10">
                        <div>登录账号:</div>
                        <div class="fc_D4A867">{{accountInfo.account?accountInfo.account:'xxx'}}</div>
                    </div>
                    <div class="flex_row_center flex_align_middle mg_b_10">
                        <div>登录密码:</div>
                        <div class="fc_D4A867">{{accountInfo.password?accountInfo.password:'xxxxxx'}}</div>
                    </div>
                    <div class="flex_row_center flex_align_middle mg_b_10">
                        <div>登录地址:</div>
                        <div class="fc_D4A867">{{accountInfo.loginUrl?accountInfo.loginUrl:'xxxxxx'}}</div>
                    </div>
                </div>
            </van-popup>
        </div>
    </div>
</template>

<script>
  import AreaList from '../utils/Area.js';
  import Toast from 'vant/es/toast';
  import ValidateUtil from '../utils/ValidateUtil.js';
  import { bankCardAttribution } from '../utils/BankUtil';
  import { userBankDetail, saveStore } from '../api/public';

  export default {
    name: 'registStore',
    data() {
      return {
        // 6225760008219524
        form: {
          name: '',
          province: '',
          city: '',
          district: '',
          storeRegion: '',
          address: '',
          accountBank: '',
          accountOwner: '',
          accountNumber: '',
          cardTypeName: '',
          orderId: 0,
          lng: '',
          lat: ''
        },
        errMsg: {
          name: '',
          province: '',
          city: '',
          district: '',
          address: '',
          accountOwner: '',
          accountNumber: ''
        },
        show: false,
        showAccount: false,
        addrCode: '440105',
        areaList: {},
        showFinish: false,
        toRunning: true,
        accountInfo: ''
      };
    },
    created() {
      let thiz = this;
      // thiz.form.orderId = thiz.$route.query.orderId ? thiz.$route.query.orderId : 1;
    },
    mounted() {
      let thiz = this;
      thiz.areaList = AreaList;
      // thiz.getHomePage(this.$route.query.id);
      // thiz.WxMpInit.wxMpShareShowMenu(thiz, '', '');
    },
    computed: {},
    methods: {

      //填写店铺名称
      setStoreName(e) {
        let thiz = this;
        thiz.form.name = e;
      },

      validatorStoreName() {
        let thiz = this;
        thiz.form.name = ValidateUtil.trim(thiz.form.name);
        if (ValidateUtil.checkTitle(thiz.form.name)) {
          thiz.errMsg.name = '';
        } else {
          thiz.errMsg.name = '店铺名称不合法！';
        }
      },

      //填写店铺详细地址
      setAddress(e) {
        let thiz = this;
        thiz.form.address = e;
      },

      validatorAddress() {
        let thiz = this;
        thiz.form.address = ValidateUtil.trim(thiz.form.address);
        if (ValidateUtil.checkTitle(thiz.form.address)) {
          thiz.errMsg.address = '';
          thiz.searchByStationName();
        } else {
          thiz.errMsg.address = '店铺地址不合法！';
        }
      },
      validatorAccountBank() {
        let thiz = this;
        thiz.form.accountBank = ValidateUtil.trim(thiz.form.accountBank);
      },

      //填写开户人姓名
      setAccountOwner(e) {
        let thiz = this;
        thiz.form.accountOwner = e;
      },

      validatorAccountOwner() {
        let thiz = this;
        thiz.form.accountOwner = ValidateUtil.trim(thiz.form.accountOwner);
      },

      //填写开户行账号
      setAccountNumber(e) {
        let thiz = this;
        thiz.form.accountNumber = e;
      },

      checkAccount() {
        //6225760008219524
        let thiz = this;
        if (bankCardAttribution(thiz.form.accountNumber) != 'error') {
          console.log('res======>', bankCardAttribution(thiz.form.accountNumber));
          let bankInfo = bankCardAttribution(thiz.form.accountNumber);
          thiz.form.accountBank = bankInfo.bankName;
          thiz.form.cardTypeName = bankInfo.cardTypeName;
          thiz.errMsg.accountNumber = '';
        } else {
          thiz.errMsg.accountNumber = '银行账号录入出错,请重新输入！';
        }
      },

      //城市选择弹窗
      showAreaList() {
        this.show = true;
      },

      //城市选择关窗
      closeArea() {
        this.show = false;
      },

      //添加已选城市
      addCity(e) {
        let thiz = this;
        console.log('this.onAddrConfirm=>e', e);
        thiz.form.province = e[0].name;
        thiz.form.city = e[1].name;
        thiz.form.district = e[2].name;
        thiz.form.storeRegion = e[0].name + ' ' + e[1].name + ' ' + e[2].name;
        thiz.show = false;
      },

      searchByStationName() {
        let thiz = this;
        if (!thiz.form.address) {
          Toast('请输入地址');
          return;
        }
        // 成功回调函数
        var callbacks = {
          complete: function(result) {
            if (result.detail.location.lng && result.detail.location.lng > 0) {
              console.log('location=========>', result);
              thiz.form.lng = result.detail.location.lng;
              thiz.form.lat = result.detail.location.lat;
            } else {
              Toast('地址输入不正确，未能获得地理坐标！');
            }
          }
        };
        thiz.geocoder = new qq.maps.Geocoder(callbacks);
        thiz.geocoder.getLocation(thiz.form.province + thiz.form.city + thiz.form.district + thiz.form.address);
      },


      //提交注册店铺资料
      onSubmit(e) {
        let thiz = this;
        if (!thiz.form.lng || !thiz.form.lat) {
          Toast('商铺地址不能为空或地址不正确！');
          return false;
        }
        if (!thiz.form.accountNumber || !thiz.form.accountOwner) {
          Toast('银行账号或开户人不能为空');
          return false;
        }
        let req = thiz.form;
        saveStore(req).then((res) => {
          thiz.accountInfo = res.data.data;
          thiz.showAccount = true;
        });
      },
      closePop() {
        let thiz = this;
        thiz.showAccount = false;
        thiz.$router.push({ path: '/self', query: { tt: new Date().getTime() } });
      }
    }
  };

</script>

<style>
    .sub_title {
        padding: 0.48rem 0.8rem 0.48rem 0.46rem;
        background-color: #EEEFEF;
        color: #100F0F;
    }

    .add_tag {
        color: #56A9B7;
    }

    .border_b_1 {
        border-bottom: 1px solid #dddddd;
    }

    delete_icon {
        right: 0;
        bottom: 0;
        width: 0.533rem;
        height: 0.533rem;
    }

    .tag_list {
        margin: .1rem 0;
    }

    .delete_icon {
        position: absolute;
        right: 0;
        bottom: 0;
        width: .64rem;
        height: .64rem;
    }

    .delete_icon > img {
        width: .64rem;
        height: .64rem;
        display: block;
    }

    .tag_list > div {
        min-width: 2.69rem;
        padding: 0 0.133rem;
        box-sizing: border-box;
        height: 1.15rem;
        color: #56A9B7;
        background-color: #E7EDEE;
        border-radius: 0.1rem;
        line-height: 1.15rem;
        text-align: center;
        margin: 0.2rem 0.14rem 0 0.14rem;
    }

    .btn_confirm {
        width: 10rem;
        text-align: center;
        background-color: #56A9B7;
        color: #ffffff;
        font-size: .4rem;
        margin-top: 1rem;
    }
</style>
