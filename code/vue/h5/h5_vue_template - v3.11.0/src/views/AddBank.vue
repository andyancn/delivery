<template>
    <div class="flex_col align_center full_screen pd_t_80 border-box bg_white">
        <div class="mg_lr_30 mg_t_60 pd_30 bg_white f24">
            <div class="pd_b_20 border_bottom_1 mg_b_30">
                <van-field class="border-box f28"
                           required
                           label-width="120px;"
                           label="开户人"
                           v-model="bankInfo.accountOwner"
                           placeholder="开户人姓名"
                           @input="setAccountOwner"
                           clearable
                />
            </div>
            <div class="pd_b_20 border_bottom_1 mg_b_30">
                <van-field class="border-box f28"
                           required
                           type="number"
                           label-width="120px;"
                           label="银行账号"
                           v-model="bankInfo.accountNumber"
                           placeholder="银行账号"
                           @input="setAccountNumber"
                           @blur="checkAccount"
                           :error-message="errMsg.accountNumber"
                           clearable
                />
            </div>
            <div class="pd_b_20 border_bottom_1 mg_b_30">
                <van-field class="border-box f28"
                           disabled
                           required
                           label-width="120px;"
                           label="开户行"
                           v-model="bankInfo.accountBank"
                />
            </div>
            <div class="pd_b_20">
                <van-field class="border-box f28"
                           disabled
                           required
                           label-width="120px;"
                           label="卡类型"
                           v-model="bankInfo.cardTypeName"
                           placeholder=""
                />
            </div>
        </div>
        <div style="position: fixed;bottom: 10vw;width: 100%;">
            <div class="pd_30">
                <van-button block size="large" color="#D4A867" class="fc_white" @click="onSubmit">
                    确认
                </van-button>
            </div>
        </div>
    </div>
</template>

<script>
  import validUtil from '../utils/ValidateUtil';
  import { userBankDetail, userBankSave } from '../api/public';
  import { bankCardAttribution } from '../utils/BankUtil';

  export default {
    name: 'addBank',
    data() {
      return {
        bankInfo: {
          id: '',
          accountBank: '',
          accountOwner: '',
          accountNumber: '',
          cardTypeName: ''
        },
        errMsg: {
          accountNumber: ''
        }
      };
    },
    mounted() {
      let thiz = this;
      thiz.getUserBandDetail();
    },
    methods: {
      //提交修改保存银行卡信息
      onSubmit: function() {
        let thiz = this;
        let req = {
          accountBank: thiz.bankInfo.accountBank,
          accountOwner: thiz.bankInfo.accountOwner,
          accountNumber: thiz.bankInfo.accountNumber
        };
        userBankSave(req).then((res) => {
            thiz.$router.go(-1)
        });
        console.log('submit==========>', thiz.bankInfo);
      },
      setAccountOwner(e) {
        let thiz = this;
        thiz.bankInfo.accountOwner = e;
      },
      setAccountNumber(e) {
        let thiz = this;
        thiz.bankInfo.accountNumber = e;
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

</style>
