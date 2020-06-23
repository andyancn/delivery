<template>
    <div class="flex_col col_12 border-box bg_EDF5FF">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <div class="flex_row_start flex_align_middle bg_white pd_lr_30 pd_tb_60">
                <div v-if="userInfo.fxUserType === 10" style="margin-left: 8.8vw;margin-right: 5.87vw">
                    <van-image
                            width="18.2vw"
                            height="18.2vw"
                            fit="cover"
                            round
                            :src="imgs.channel"
                    />
                </div>
                <div v-if="userInfo.fxUserType === 20" style="margin-left: 8.8vw;margin-right: 5.87vw">
                    <van-image
                            width="18.2vw"
                            height="18.2vw"
                            fit="cover"
                            round
                            :src="imgs.distributor"
                    />
                </div>
                <div v-if="userInfo.fxUserType === 30" style="margin-left: 8.8vw;margin-right: 5.87vw">
                    <van-image
                            width="18.2vw"
                            height="18.2vw"
                            fit="cover"
                            round
                            :src="imgs.dealer"
                    />
                </div>
                <div v-if="userInfo.fxUserType === 40" style="margin-left: 8.8vw;margin-right: 5.87vw">
                    <van-image
                            width="18.2vw"
                            height="18.2vw"
                            fit="cover"
                            round
                            :src="imgs.common"
                    />
                </div>
                <div class="flex_col align_center">
                    <div class="mg_b_20 f34">
                        {{userInfo.name}}
                    </div>
                    <div class="mg_b_20 f24">
                        {{userInfo.tel}}
                    </div>
                </div>
            </div>
            <div>
                <div class="flex_row_around flex_align_middle f28 pd_tb_60 border_bottom_1">
                    <div class="flex_col align_center col_4">
                        <div class="mg_b_20">注册时间</div>
                        <div>{{userInfo.createTime}}</div>
                    </div>
                    <div class="flex_col align_center col_4">
                        <div class="mg_b_20">加入时间</div>
                        <div>{{userInfo.createTime}}</div>
                    </div>
                    <div class="flex_col align_center col_4">
                        <div class="mg_b_20">总分享(人)</div>
                        <div>{{fansInfo.fansCount?fansInfo.fansCount:0}}</div>
                    </div>
                </div>
                <div class="flex_row_around flex_align_middle f28 pd_tb_60 border_bottom_1">
                    <div class="flex_col align_center col_4">
                        <div class="mg_b_20">累计收益(元)</div>
                        <div>{{fansInfo.commissionAmount?fansInfo.commissionAmount/100:0}}</div>
                    </div>
                    <div class="flex_col align_center col_4">
                        <div class="mg_b_20">推广订单(单)</div>
                        <div>{{fansInfo.promoteOrderCount?fansInfo.promoteOrderCount:0}}</div>
                    </div>
                    <div class="col_4">
                        <div v-if="userInfo.accountOwner != null" class="flex_col align_center">
                            <div class="mg_b_20">开户人</div>
                            <div>{{userInfo.accountOwner}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="userInfo.accountNumber !=null" class="flex_col align_left f28 pd_tb_60 border_bottom_1 pd_lr_60">
                <div>银行卡号</div>
                <div>{{userInfo.accountNumber}}</div>
            </div>
            <div v-if="userInfo.accountBank !=null" class="flex_col align_left f28 pd_tb_60 border_bottom_1 pd_lr_60">
                <div>开户行</div>
                <div>{{userInfo.accountBank}}</div>
            </div>
        </van-pull-refresh>
    </div>
</template>

<script>
  import { Toast } from 'vant';
  import { userInfo, userFansState, userFansInfo } from '../api/public.js';

  export default {
    name: 'fansDetail',
    data() {
      return {
        userId: '',
        userInfo: '',
        fansInfo: '',
        refreshing: false,
        pageIndex: 1,
        pageSize: 99,
        imgs: {
          channel: require('../assets/images/h5_channel.png'),
          dealer: require('../assets/images/h5_dealer.png'),
          distributor: require('../assets/images/h5_distributor.png'),
          common: require('../assets/images/h5_common.png')
        }
      };
    },
    created() {
      let thiz = this;
      thiz.userId = thiz.$route.query.userId ? thiz.$route.query.userId : 0;
    },
    mounted() {
      let thiz = this;
      console.log('router--->', this.$router);
      console.log('env====>', process.env);
      thiz.getUserInfo();
      thiz.getFansInfo();
      // thiz.test()
      // this.WxMpInit.wxMpShareShowMenu(this, this.$router.history.current.meta.title, this.$router.history.current.meta.wx_share_content);
      // thiz.initCanvas();
    },
    computed: {},
    methods: {
      getUserInfo() {
        let thiz = this;
        let req = {
          id: thiz.userId
        };
        userInfo(req).then((res) => {
          if (res.data.data.item) {
            let userInfo = res.data.data.item;
            userInfo.createTime = userInfo.createTime.substr(0, 10);
            thiz.userInfo = userInfo;
          }
        });
      },
      getFansInfo() {
        let thiz = this;
        let req = {
          userId: thiz.userId
        };
        userFansInfo(req).then((res) => {
          if (res.data.data.item) {
            thiz.fansInfo = res.data.data.item;
          }
        });
      },

      onRefresh() {
        let thiz = this;
        // 清空列表数据
        thiz.refreshing = true;
        thiz.fansInfo = '';
        thiz.userInfo = '';
        let p = new Promise(resolve => {
          thiz.getUserInfo();
          thiz.getFansInfo();
          resolve();
        }).then(() => {
          thiz.refreshing = false;
        });
      }
    }
  };

</script>

<style>

</style>
