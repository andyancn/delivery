<template>
    <div class="flex_col align_center full_screen border-box bg_white">
        <div class="pd_30 flex_col">
            <div v-if="bankInfo==''" class="align_center bank_card f30 fc_white" @click="toAddBank">
                当前您还未绑定银行卡
            </div>
            <div v-if="bankInfo !=''" class="flex_row_between flex_align_middle bank_card"
                 @click="toAddBank">
                <div class="flex_col align_left fc_white f32">
                    <div class="mg_b_30">{{bankInfo.accountBank}}</div>
                    <div>{{bankInfo.accountNumber}}</div>
                </div>
                <div class="f32 fc_AF8357">{{bankInfo.cardTypeName}}</div>
            </div>
            <div class="f34 align_left mg_b_60">提现金额</div>
            <div class="flex_row_start flex_align_middle pd_b_20 border_bottom_1 mg_b_30 mg_r_20">
                <div v-if="userInfo">
                    <van-field class="border-box f32"
                               required
                               type="number"
                               label-width="120px;"
                               label="¥"
                               v-model="money"
                               :placeholder="userInfo.accountBalance > 0 ? ('可提现金额' + userInfo.accountBalance/100):'可提现金额为 0'"
                               @input="setMoney"
                               @blur=""
                    />
                </div>
                <div class="f32 fc_D4A867" @click="setAll">
                    全部
                </div>
            </div>
            <div class="align_right f32" @click="toWithdrawList">提现记录</div>
        </div>

        <div style="position: fixed;bottom: 10vw;width: 100%;">
            <div class="pd_30">
                <van-button block size="large" color="#D4A867" class="fc_white" @click="takeWithdraw">
                    提现
                </van-button>
            </div>
        </div>
    </div>
</template>

<script>
  import Toast from 'vant/es/toast';
  import ValidateUtil from '../utils/ValidateUtil.js';
  import { userBankDetail, userInfo, withdrawSave } from '../api/public';
  import { bankCardAttribution } from '../utils/BankUtil';
  import storeUtil from 'storejs';

  export default {
    name: 'withdraw',
    data() {
      let thiz = this;
      return {
        money: '',
        bankInfo: '',
        userInfo: '',
        userId: ''
      };
    },
    created() {
      let thiz = this;
    },
    mounted() {
      let thiz = this;
      thiz.getUserBandDetail();
      thiz.getUserInfo();
    },
    methods: {
      //获取用户详情
      getUserInfo() {
        let thiz = this;
        if (!thiz.$store.getters.userId) {
          Toast('没有用户或用户不合法！');
          return false;
        }
        let req = {
          id: thiz.$store.getters.userId
        };
        userInfo(req).then(response => {
          if (response.data.data.item) {
            thiz.userInfo = response.data.data.item;
            thiz.userId = response.data.data.item.id;
            // console.log('userInfo===========>', response);
            storeUtil('fx_userId', response.data.data.item.id.toString());
            storeUtil('fx_brandId', response.data.data.item.brandId.toString());
            storeUtil('fx_userInfo', JSON.stringify(response.data.data.item));
          }
        }).then(() => {
          thiz.$store.dispatch('SaveUserInfo', thiz.userInfo).then(() => {
            storeUtil('fx_fxUserType', thiz.userInfo.fxUserType.toString());
            // thiz.getUserFansState();
          });
        }).catch(error => {
          console.log('self error==========>', error);
          // thiz.$store.dispatch('FedLogOut').then(() => {
          //   thiz.$router.push('/login');
          //   console.log('self error==========>', error);
          // });
        });
      },
      getUserBandDetail() {
        let thiz = this;
        userBankDetail().then((res) => {
          if (res.data.data && res.data.data.accountNumber) {
            thiz.bankInfo = res.data.data;
            let bankInfo = bankCardAttribution(thiz.bankInfo.accountNumber);
            thiz.bankInfo.cardTypeName = bankInfo.cardTypeName;
          }
        });
      },
      toAddBank() {
        let thiz = this;
        thiz.$router.push({ path: '/addBank', query: { tt: new Date().getTime() } });
      },
      setMoney(e) {
        let thiz = this;
        thiz.money = e;
      },
      setAll() {
        let thiz = this;
        if (!thiz.userInfo) {
          Toast('没有用户或用户不合法！');
          return false;
        }
        if (thiz.userInfo.accountBalance > 0) {
          // console.log('accountBalance===>', thiz.userInfo.accountBalance);
          thiz.money = thiz.userInfo.accountBalance / 100;
        }
      },

      //提现
      takeWithdraw() {
        let thiz = this;
        if (!thiz.userInfo) {
          Toast('没有用户或用户不合法！');
          return false;
        }
        let req = {
          withdrawMoney: thiz.money * 100
        };
        withdrawSave(req).then(res => {
          // console.log(thiz.money);
          thiz.toWithdrawList();
        });
      },
      toWithdrawList() {
        let thiz = this;
        thiz.$router.push({ path: '/withdrawList', query: { tt: new Date().getTime() } });
      }
    }
  };
</script>

<style scoped>
    .bank_card {
        margin: 8vw 0 24vw 0;
        padding: 5.3vw 4vw;
        background: linear-gradient(90deg, rgba(102, 102, 102, 1) 0%, rgba(41, 41, 41, 1) 100%);
        border-radius: 2.4vw
    }
</style>
