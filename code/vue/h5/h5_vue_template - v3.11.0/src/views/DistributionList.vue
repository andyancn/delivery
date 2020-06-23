<template>
    <div class="flex_col full_screen border-box bg_white">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <div class="mg_b_34">
                <van-image
                        width="100vw"
                        fit="cover"
                        :src="descriptionImage"
                />
            </div>
            <div class="flex_col pd_30" style="padding-bottom: 30vw;">
                <div class="flex_row_col flex_align_middle pd_lr_20 pd_tb_30 bg_white mg_b_20 border_radius_18"
                     v-for="(ruleItem, index) in list">
                    <div class="flex_row_between flex_align_middle mg_b_20 pd_b_20 border_bottom_1 f24">
                        <div>规则:{{ruleItem.id}}</div>
                        <!--<div>-->
                        <!--&lt;!&ndash;<van-radio :name="index"></van-radio>&lt;!&ndash;&ndash;&gt;&ndash;&gt;-->
                        <!--<van-checkbox v-model="ruleItem.runFlag" @click="selectRuler(index)"></van-checkbox>-->
                        <!--</div>-->
                    </div>
                    <div class="flex_row_start flex_align_middle">
                        <div v-if="item.commissionValue>0" v-for="(item,key) in ruleItem.itemInfoVO.commissionInfo" class="col_4 align_center">
                            <div class="flex_row_start flex_align_middle f26 align_center">
                                <div>{{item.levelName}}</div>
                                <div>返{{item.commissionValue/100}}{{ruleItem.itemInfoVO.commissionType==1?'元':'%'}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </van-pull-refresh>
        <!--<div style="position: fixed;bottom: 10vw;width: 100%;">-->
        <!--<div class="pd_30">-->
        <!--<van-button block size="large" color="#D4A867" class=" fc_white" @click="toAddRule">-->
        <!--新增规则-->
        <!--</van-button>-->
        <!--</div>-->
        <!--</div>-->
    </div>
</template>

<script>
  import { distributeRuleList, distributeRuleSwitch } from '../api/public';

  export default {
    name: 'distributeList',
    data() {
      return {
        refreshing: false,
        checkFlag: false,
        pageIndex: 1,
        pageSize: 99,
        descriptionImage: process.env.VUE_APP_RESRC_PATH + 'distribution_description.jpg',
        list: []
      };
    },
    created() {
      let thiz = this;
      thiz.getDistributeRuleList();
    },
    mounted() {
      let thiz = this;
      // this.WxMpInit.wxMpShareShowMenu(this, this.$router.history.current.meta.title, this.$router.history.current.meta.wx_share_content);
      // thiz.initCanvas();
    },
    computed: {},
    methods: {
      // toAddRule: function() {
      //   let thiz = this;
      //   thiz.$router.push('/distributionConfig').catch(err => {
      //     err;
      //   });
      // },
      getDistributeRuleList() {
        let thiz = this;
        let req = {
          page: thiz.pageIndex,
          pageSize: thiz.pageSize
        };
        distributeRuleList(req).then(response => {
          if (response.data.data.itemList && response.data.data.itemList.length > 0) {
            let list = response.data.data.itemList;
            for (let one of list) {
              for(let levelItem of one.itemInfoVO.commissionInfo){
                switch (levelItem.level) {
                  case 1:
                    levelItem.levelName='直推人';
                    break;
                  case 2:
                    levelItem.levelName='间推人';
                    break;
                  case 3:
                    levelItem.levelName='经销商';
                    break;
                }
              }
              one.runFlag = one.closeFlag == 1 ? 0 : 1;
            }
            thiz.list = response.data.data.itemList;
          }
        });
      },
      //选择启用规则
      // selectRuler(e) {
      //   let thiz = this;
      //   console.log('selectRuler==>', e);
      //   // let list = thiz.list;
      //   //如果当前是为启动的
      //   let p = new Promise((reslove) => {
      //     if (thiz.list[e].closeFlag == 1) {
      //       for (let i = 0;i<thiz.list.length;i++) {
      //         if (thiz.list[i].closeFlag == 0 && i != e) {
      //           let req = {
      //             id: thiz.list[i].id,
      //             closeFlag: 1
      //           };
      //           distributeRuleSwitch(req).then((res) => {
      //             thiz.list[i].closeFlag = 1;
      //             thiz.list[i].runFlag = 0;
      //           });
      //         }
      //       }
      //     }
      //     reslove();
      //   });
      //   p.then(() => {
      //     let req1 = {
      //       id: thiz.list[e].id,
      //       closeFlag: 0
      //     };
      //     distributeRuleSwitch(req1).then((res) => {
      //       thiz.getDistributeRuleList();
      //     });
      //   });
      // },

      onRefresh() {
        let thiz = this;
        console.log('onRefresh=========>', thiz.refreshing);
        thiz.list = [];
        thiz.getDistributeRuleList();
        thiz.refreshing = false;
      }
    }
  };

</script>

<style>

</style>
