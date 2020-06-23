<template>
    <div class="flex_col align_center full_screen pd_t_30 border-box bg_F5F6FA">
        <div v-if="!bankInfo.accountNumber || bankInfo.accountNumber.length<8"
             class="bank_card fc_white align_center f30">
            您当前未绑定银行卡
        </div>
        <div v-else class="flex_row_between flex_align_middle bank_card" @click="toAddBank">
            <div class="flex_col align_left fc_white f32">
                <div class="mg_b_30">{{bankInfo.accountBank}}</div>
                <div>{{bankInfo.accountNumber}}</div>
            </div>
            <div class="f32 fc_AF8357">{{bankInfo.cardTypeName}}</div>
        </div>
        <div v-if="!bankInfo.accountNumber || bankInfo.accountNumber.length<8"
             style="position: fixed;bottom: 4vw;width: 100%;">
            <div class="pd_lr_30">
                <van-button block size="large" color="#D4A867" class="fc_white border_radius_18" @click="toAddBank">
                    添加银行卡
                </van-button>
            </div>
        </div>
    </div>
</template>

<script>
  import validUtil from '../utils/ValidateUtil';
  import { bankCardAttribution } from '../utils/BankUtil';
  import { userBankDetail } from '../api/public';

  export default {
    name: 'bankList',
    data() {
      return {
        bankInfo: ''
      };
    },
    mounted() {
      let thiz = this;
      thiz.getUserBandDetail();
    },
    methods: {
      toAddBank: function() {
        let thiz = this;
        thiz.$router.push({ path: '/addBank', query: { tt: new Date().getTime() } });
      },
      checkAccount() {
        //6225760008219524
        let thiz = this;
        if (bankCardAttribution(thiz.bankInfo.accountNumber) != 'error') {
          console.log('res======>', bankCardAttribution(thiz.bankInfo.accountNumber));
          let bankInfo = bankCardAttribution(thiz.bankInfo.accountNumber);
          thiz.bankInfo.accountBank = bankInfo.bankName;
          thiz.bankInfo.cardTypeName = bankInfo.cardTypeName;
          thiz.errMsg.accountNumber = '';
        } else {
          thiz.errMsg.accountNumber = '银行账号录入出错,请重新输入！';
        }
      },
      getUserBandDetail() {
        let thiz = this;
        userBankDetail().then((res) => {
          thiz.bankInfo = res.data.data;
          let bankInfo = bankCardAttribution(thiz.bankInfo.accountNumber);
          thiz.bankInfo.cardTypeName = bankInfo.cardTypeName;
        });
      }

    }


  };
</script>

<style scoped>
    .bank_card {
        margin: 8vw 4vw;
        padding: 5.3vw 4vw;
        background: linear-gradient(90deg, rgba(102, 102, 102, 1) 0%, rgba(41, 41, 41, 1) 100%);
        border-radius: 2.4vw
    }
</style>
