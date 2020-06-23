<template>
    <div class="flex_col full_screen border-box bg_white">
        <div class="f30 pd_lr_30 pd_t_75">
            <div class="flex_row_between flex_align_middle mg_b_30 f26 align_left">
                <div>分销返现类型</div>
                <div>
                    <van-radio-group v-model="commissionType" direction="horizontal" @change="chooseType">
                        <van-radio name="1">按固定金额分佣</van-radio>
                        <van-radio name="2">按百分比分佣</van-radio>
                    </van-radio-group>
                </div>

            </div>
            <div class="mg_b_30 f26 align_left">
                <van-field
                        v-model="commission1"
                        type="number"
                        label="1级分销人"
                        placeholder="分销佣金或百分比(小数表示)"
                        @input="setLevel1"
                        label-width="120"
                        label-align="left"
                        input-align="center"
                        @blur="checkLevel1CommissionType"
                />
                <div class="pd_0_20 mg_t_10">一级分销人为直接推荐人</div>
            </div>
            <div class="mg_b_30 f26 align_left">
                <van-field
                        v-model="commission2"
                        type="number"
                        label="2级分销人"
                        placeholder="分销佣金或百分比(小数表示)"
                        @input="setLevel2"
                        label-width="120"
                        label-align="left"
                        input-align="center"
                        @blur="checkLevel2CommissionType"
                />
                <div class="pd_0_20 mg_t_10">二级分销人为间接推荐人</div>
            </div>
            <div class="f26 align_left">
                <van-field
                        v-model="commission3"
                        type="number"
                        label="3级分销人"
                        placeholder="分销佣金或百分比(小数表示)"
                        @input="setLevel3"
                        label-width="120"
                        label-align="left"
                        input-align="center"
                        @blur="checkLevel3CommissionType"

                />
                <div class="pd_0_20 mg_t_10">三级分销人为经销商</div>
            </div>
        </div>
        <div style="position: fixed;bottom: 10vw;width: 100%;">
            <div class="pd_30">
                <van-button block size="large" color="#D4A867" class=" fc_white" @click="toAddRule">
                    确定
                </van-button>
            </div>
        </div>
    </div>
</template>

<script>
  import { distributeRuleSave } from '../api/public.js';
  import { Toast } from 'vant';
  import vaildUtil from '../utils/ValidateUtil';

  export default {
    name: 'distributeConfig',
    data() {
      return {
        id: 0,
        commission1: 0,
        commission2: 0,
        commission3: 0,
        commissionType: 1  // 1:固定金额; 2：百分比
      };
    },
    created() {
      let thiz = this;
      thiz.id = thiz.$route.query.id ? thiz.$route.query.id : 0;
    },
    mounted() {
      let thiz = this;
      console.log('router--->', this.$router);
      console.log('env====>', process.env);
      // thiz.test()
      // this.WxMpInit.wxMpShareShowMenu(this, this.$router.history.current.meta.title, this.$router.history.current.meta.wx_share_content);
      // thiz.initCanvas();
    },
    computed: {},
    methods: {
      toLogin: function() {
        let thiz = this;
        thiz.$router.push({ path: '/login', query: { tt: new Date().getTime() } }).catch(err => {
          err;
        });
      },
      chooseType(e) {
        let thiz = this;
        console.log('chooseType====>', e);
        thiz.commissionType = e;
      },
      setLevel1(e) {
        let thiz = this;
        thiz.commission1 = e;
      },

      setLevel2(e) {
        let thiz = this;
        thiz.commission2 = e;
      },

      setLevel3(e) {
        let thiz = this;
        thiz.commission3 = e;
      },

      toAddRule() {
        let thiz = this;
        let ruleInfo = [{ level: 1, commissionValue: thiz.commission1 * 100 }, {
          level: 2,
          commissionValue: thiz.commission2 * 100
        }, { level: 3, commissionValue: thiz.commission3 * 100 }];
        let req = {
          id: thiz.id,
          commissionType: thiz.commissionType,
          ruleInfo: JSON.stringify(ruleInfo)
        };
        console.log('req=======>', req);
        distributeRuleSave(req).then(() => {
          thiz.$router.push({ path: '/distributionList', query: { tt: new Date().getTime() } });
        });
      },
      checkLevel1CommissionType() {
        let thiz = this;
        if (thiz.commissionType == 1) {
          if (thiz.commission1 < 0) {
            Toast('佣金额不得小于0');
            return false;
          }
        }
        if (thiz.commissionType == 2) {
          if (thiz.commission2 > 100) {
            Toast('佣金额不得大于100%');
            return false;
          }
        }
      },
      checkLevel2CommissionType() {
        let thiz = this;
        if (thiz.commissionType == 1) {
          if (thiz.commission2 < 0) {
            Toast('佣金额不得小于0');
            return false;
          }
        }
        if (thiz.commissionType == 2) {
          if (thiz.commission2 > 100) {
            Toast('佣金额不得大于100%');
            return false;
          }
        }
      },
      checkLevel3CommissionType() {
        let thiz = this;
        if (thiz.commissionType == 1) {
          if (thiz.commission3 < 0) {
            Toast('佣金额不得小于0');
            return false;
          }
        }
        if (thiz.commissionType == 2) {
          if (thiz.commission3 > 100) {
            Toast('佣金额不得大于100%');
            return false;
          }
        }
      },
      takeNotice() {
      }
    }
  };

</script>

<style>

</style>
