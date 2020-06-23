<template>
    <div class="bg_white full_screen border-box">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <div class="flex_col pd_30 mg_b_50">
                <div class="flex_row_between flex_align_middle">
                    <div class="flex_row_start flex_align_middle mg_b_30">
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
                        <div class="flex_col align_left">
                            <div class="f36 mg_b_10">{{userInfo.name}}</div>
                            <div class="f30 mg_b_10">{{userInfo.tel}}</div>
                            <div v-if="userInfo.fxUserType==10" class="f30">合伙人</div>
                            <div v-if="userInfo.fxUserType==20" class="f30">品牌推广商</div>
                        </div>
                    </div>
                    <div v-if="userInfo.enable2CreateStore>0" class="pd_tb_10 pd_lr_30 bg_EDF5FF f26"
                         @click="toRegistStore">
                        注册店铺
                    </div>
                    <div v-if="userInfo.enableDevelopChannel==1" class="pd_tb_10 pd_lr_30 bg_EDF5FF f26"
                         @click="toShareQrcode2">渠道码</div>
                </div>
                <div class="flex_row_around flex_align_middle f50 mg_b_50">
                    <div class="flex_col align_center" @click="toFansList">
                        <div class="mg_b_24">{{fansCount}}</div>
                        <div class="f22 fc_888888">粉丝</div>
                    </div>
                    <div v-if="userInfo.fxUserType < 50" class="flex_col align_center" @click="toDistributeStoreList">
                        <div class="mg_b_24">{{promoteStoreCount?promoteStoreCount:0}}</div>
                        <div class="f22 fc_888888">推广门店</div>
                    </div>
                    <!--<div v-if="userInfo.fxUserType !== 10" class="flex_col align_center" @click="toIncomeList">-->
                    <!--<div class="mg_b_24">{{commissionAmount/100}}</div>-->
                    <!--<div class="f22 fc_888888">推广收益</div>-->
                    <!--</div>-->
                    <div class="flex_col align_center" @click="toIdCardList">
                        <div class="mg_b_24">{{totalCardAmount?totalCardAmount:0}}</div>
                        <div class="f22 fc_888888">现有卡</div>
                    </div>
                    <div v-if="userInfo.fxUserType == 20 || userInfo.fxUserType ==10" class="flex_col align_center"
                         @click="toWithdraw">
                        <div class="mg_b_24">{{userInfo.accountBalance/100}}</div>
                        <div class="f22 fc_888888">余额</div>
                    </div>
                    <div v-if="userInfo.enableDevelopChannel == 1" class="flex_col align_center" @click="toChannelList">
                        <div class="mg_b_24">{{channelCount}}</div>
                        <div class="f22 fc_888888">合伙人数</div>
                    </div>
                </div>
                <div class="flex_row_start flex_align_middle flex_wrap menu_list f22">
                    <div class="flex_col align_center" @click="toBankList">
                        <div>
                            <van-image
                                    width="12.8vw"
                                    height="12.8vw"
                                    fit="cover"
                                    round
                                    :src="icons.bankCard"
                            />
                        </div>
                        <div>
                            银行卡
                        </div>
                    </div>
                    <!--<div class="flex_col align_center" @click="toDistributeOrderList">-->
                    <!--<div>-->
                    <!--<van-image-->
                    <!--width="12.8vw"-->
                    <!--height="12.8vw"-->
                    <!--fit="cover"-->
                    <!--round-->
                    <!--:src="icons.dOrder"-->
                    <!--/>-->
                    <!--</div>-->
                    <!--<div>-->
                    <!--推广门店-->
                    <!--</div>-->
                    <!--</div>-->
                    <div class="flex_col align_center" @click="toMyOrderList">
                        <div>
                            <van-image
                                    width="12.8vw"
                                    height="12.8vw"
                                    fit="cover"
                                    round
                                    :src="icons.myOrder"
                            />
                        </div>
                        <div>
                            购卡订单
                        </div>
                    </div>
                    <div v-if="userInfo.fxUserType == 10 || userInfo.fxUserType == 20" class="flex_col align_center"
                         @click="toMyHandleOrderList">
                        <div>
                            <van-image
                                    width="12.8vw"
                                    height="12.8vw"
                                    fit="cover"
                                    round
                                    :src="icons.myOrder"
                            />
                        </div>
                        <div>
                            售卡订单
                        </div>
                    </div>
                    <div class="flex_col align_center" @click="toShareQrcode">
                        <div>
                            <van-image
                                    width="12.8vw"
                                    height="12.8vw"
                                    fit="cover"
                                    round
                                    :src="icons.qrcode"
                            />
                        </div>
                        <div>
                            推广码
                        </div>
                    </div>
                    <!--<div v-if="userInfo.fxUserType == 10 || userInfo.fxUserType == 20" class="flex_col align_center"-->
                    <!--@click="toDistributionList">-->
                    <!--<div>-->
                    <!--<van-image-->
                    <!--width="12.8vw"-->
                    <!--height="12.8vw"-->
                    <!--fit="cover"-->
                    <!--round-->
                    <!--:src="icons.team"-->
                    <!--/>-->
                    <!--</div>-->
                    <!--<div>-->
                    <!--分销规则-->
                    <!--</div>-->
                    <!--</div>-->
                    <div v-if="userInfo.fxUserType>20" class="flex_col align_center" @click="toMyStoreList">
                        <div>
                            <van-image
                                    width="12.8vw"
                                    height="12.8vw"
                                    fit="cover"
                                    round
                                    :src="icons.store"
                            />
                        </div>
                        <div>
                            我的店铺
                        </div>
                    </div>
                    <div class="flex_col align_center" @click="toAddressList">
                        <div>
                            <van-image
                                    width="12.8vw"
                                    height="12.8vw"
                                    fit="cover"
                                    round
                                    :src="icons.aboutus"
                            />
                        </div>
                        <div>
                            地址管理
                        </div>
                    </div>
                    <!--<div class="flex_col align_center" @click="toRegistStore">-->
                    <!--<div style="width: 12.8vw">-->
                    <!--<van-image-->
                    <!--width="12.8vw"-->
                    <!--height="12.8vw"-->
                    <!--fit="cover"-->
                    <!--round-->
                    <!--:src="icons.aboutus"-->
                    <!--/>-->
                    <!--</div>-->
                    <!--</div>-->
                    <div v-if="userInfo.fxUserType == 10 || userInfo.fxUserType == 20" class="flex_col align_center"
                         @click="toRechargeCommissionList">
                        <div>
                            <van-image
                                    width="12.8vw"
                                    height="12.8vw"
                                    fit="cover"
                                    round
                                    :src="icons.cmcc"
                            />
                        </div>
                        <div>
                            移动统计
                        </div>
                    </div>
                    <!--<div style="width: 12.8vw;"></div>-->
                    <div class="flex_col align_center" @click="toBuyCard">
                        <div>
                            <van-image
                                    width="12.8vw"
                                    height="12.8vw"
                                    fit="cover"
                                    round
                                    :src="icons.myOrder"
                            />
                        </div>
                        <div>
                            我要购卡
                        </div>
                    </div>
                </div>
            </div>
        </van-pull-refresh>
        <div style="position: fixed;bottom: 12vw;width: 100%;">
            <div class="pd_lr_30">
                <van-button block size="large" color="#D4A867" class=" fc_white border_radius_18" @click="logOut">
                    退出
                </van-button>
            </div>
        </div>
    </div>
</template>
<script>
  // CHANNEL((byte) 10, "渠道商"),//最顶级
  // DEALER((byte) 20, "经销商"),//渠道商下级
  // DISTRIBUTOR((byte) 30, "分销商"),//经销商下级
  // COMMON((byte) 40, "普通用户"),//普通用户
  import { userInfo, userFansState, channelList, batchStat } from '../api/public.js';
  import storeUtil from 'storejs';

  export default {
    name: 'self',
    // components: { MyNavbar },
    data() {
      return {
        refreshing: false,
        channelCount: 0,
        // imgs: {
        //   channel: process.env.VUE_APP_RESRC_PATH + 'h5_channel.png',
        //   dealer: process.env.VUE_APP_RESRC_PATH + 'h5_dealer.png',
        //   distributor: process.env.VUE_APP_RESRC_PATH + 'h5_distributor.png',
        //   common: process.env.VUE_APP_RESRC_PATH + 'h5_common.png'
        // },
        imgs: {
          channel: require('../assets/images/h5_channel.png'),
          dealer: require('../assets/images/h5_dealer.png'),
          distributor: require('../assets/images/h5_distributor.png'),
          common: require('../assets/images/h5_common.png')
        },
        icons: {
          dOrder: require('../assets/images/h5_d_order@2x.png'),
          bankCard: require('../assets/images/h5_bank_card@2x.png'),
          myOrder: require('../assets/images/h5_my_order@2x.png'),
          qrcode: require('../assets/images/h5_qrcode@2x.png'),
          team: require('../assets/images/h5_team@2x.png'),
          addOrder: require('../assets/images/h5_add_order@2x.png'),
          aboutus: require('../assets/images/h5_aboutus@2x.png'),
          store: require('../assets/images/h5_store@2x.png'),
          cmcc: require('../assets/images/h5_cmcc@2x.png')
        },
        userInfo: '',
        userId: this.$store.getters.userId,
        fansCount: 0,
        commissionAmount: 0, //分佣金额
        directFansCount: 0,   //直接粉细数
        promoteFansCount: 0,  //粉丝总数
        totalDistributeMoney: 0, //分销金额
        promoteStoreCount: 0,  //推广门店数
        totalCardAmount: 0  //卡数量
      };
    },
    created() {
      let thiz = this;
      // window.addEventListener('resize', this.getHeight);
      // this.getHeight();
      // console.log('created---->', this.$route.params);
      // if (thiz.$route.params.resultId) {
      //   thiz.resultId = this.$route.params.resultId;
      //   thiz.resultImage = thiz.images[thiz.resultId - 1].url;
      //   thiz.storeName = this.$route.params.storeName;
      // } else {
      //   thiz.$router.push('/h5/store_calculation').catch(err => {err});
      // }
    },
    mounted() {
      let thiz = this;
      console.log('router--->', thiz.$router);
      console.log('thiz.$store.getters.userId--->', thiz.$store.getters.userId);
      console.log('storeUtil--cookie--->', storeUtil('fx_inviterId'));
      thiz.$store.dispatch('CheckLogin').then((res) => {
        if (!res) {
          thiz.$router.push({ path: '/login', query: { tt: new Date().getTime() } });
          return false;
        } else {
          thiz.getUserInfo();
        }
      });

      // this.WxMpInit.wxMpShareShowMenu(this, this.$router.history.current.meta.title, this.$router.history.current.meta.wx_share_content);
      // thiz.initCanvas();
    },
    computed: {},
    methods: {

      //获取用户详情
      getUserInfo() {
        let thiz = this;
        // console.log('store====>', thiz.$store);
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
            thiz.getUserFansState();
            thiz.getChannelList();
            thiz.getBatchStat();
          });
        }).catch(error => {
          console.log('self error==========>', error);
          // thiz.$store.dispatch('FedLogOut').then(() => {
          //   thiz.$router.push('/login');
          //   console.log('self error==========>', error);
          // });
        });
      },

      //获取粉丝及累计收益统计
      getUserFansState() {
        let thiz = this;
        let req = {
          userId: thiz.userId
        };
        userFansState(req).then((res) => {
          thiz.fansCount = res.data.data.item.fansCount || 0;
          thiz.directFansCount = res.data.data.item.directFansCount || 0;
          thiz.commissionAmount = res.data.data.item.commissionAmount || 0;
          thiz.totalDistributeMoney = res.data.data.item.totalDistributeMoney || 0;
          thiz.promoteStoreCount = res.data.data.item.promoteStoreCount || 0;
        });
      },

      //获取用户流量卡统计
      getBatchStat() {
        let thiz = this;
        batchStat().then((res) => {
          thiz.totalCardAmount = res.data.data.totalCardAmount || 0;
        });
      },

      //获得渠道商列表
      getChannelList() {
        let thiz = this;
        if (thiz.userInfo.enableDevelopChannel == 1) {
          let req = {
            page: 1,
            pageSize: 99
          };
          channelList(req).then(res => {
            if (res.data.data.itemList && res.data.data.itemList.length > 0) {
              thiz.channelCount = res.data.data.totalCount;
            }
          });
        }
      },

      onRefresh() {
        let thiz = this;
        thiz.$store.dispatch('CheckLogin').then((res) => {
          if (!res) {
            thiz.$router.push({ path: '/login', query: { tt: new Date().getTime() } });
            return false;
          } else {
            thiz.getUserInfo();
            thiz.getChannelList();
          }
        });
        thiz.refreshing = false;
      },

      logOut() {
        let thiz = this;
        thiz.$store.dispatch('FedLogOut').then(() => {
          thiz.$router.push({ path: '/login', query: { tt: new Date().getTime() } });
        });
      },
      toFansList() {
        let thiz = this;
        thiz.$router.push({ path: '/fansList', query: { tt: new Date().getTime() } });
      },
      toIncomeList() {
        let thiz = this;
        thiz.$router.push({ path: '/incomeList', query: { tt: new Date().getTime() } });
      },
      toMyOrderList() {
        let thiz = this;
        thiz.$router.push({ path: '/myOrderList', query: { tt: new Date().getTime() } });
      },
      toMyHandleOrderList() {
        let thiz = this;
        thiz.$router.push({ path: '/myHandleOrderList', query: { tt: new Date().getTime() } });
      },
      toDistributionList() {
        let thiz = this;
        thiz.$router.push({ path: '/distributionList', query: { tt: new Date().getTime() } });
      },
      toMyStoreList() {
        let thiz = this;
        thiz.$router.push({ path: '/myStoreList', query: { tt: new Date().getTime() } });
      },
      toDistributeOrderList() {
        let thiz = this;
        thiz.$router.push({ path: '/distributeOrderList', query: { tt: new Date().getTime() } });
      },
      toBankList() {
        let thiz = this;
        thiz.$router.push({ path: '/bankList', query: { tt: new Date().getTime() } });
      },
      toShareQrcode() {
        let thiz = this;
        thiz.$router.push({ path: '/shareQrcode', query: { registerChannel: false, tt: new Date().getTime() } });
      },
      toShareQrcode2() {
        let thiz = this;
        thiz.$router.push({ path: '/shareQrcode', query: { registerChannel: true, tt: new Date().getTime() } });
      },
      toAddressList() {
        let thiz = this;
        thiz.$router.push({ path: '/addressList', query: { tt: new Date().getTime() } });
      },
      toRegistStore() {
        let thiz = this;
        thiz.$router.push({ path: '/registStore', query: { tt: new Date().getTime() } });
      },
      toWithdraw() {
        let thiz = this;
        thiz.$router.push({ path: '/withdraw', query: { tt: new Date().getTime() } });
      },
      toChannelList() {
        let thiz = this;
        thiz.$router.push({ path: '/channelList', query: { tt: new Date().getTime() } });
      },
      toRechargeCommissionList() {
        let thiz = this;
        thiz.$router.push({ path: '/cmccRechargeRecordList', query: { tt: new Date().getTime() } });
      },
      //购买流量卡
      toBuyCard() {
        let thiz = this;
        thiz.$router.push({ path: '/orderConfirm', query: { tt: new Date().getTime() } });
      },
      toIdCardList() {
        let thiz = this;
        thiz.$router.push({ path: '/idCardList', query: { tt: new Date().getTime() } });
      },
      toDistributeStoreList(){
        let thiz = this;
        thiz.$router.push({ path: '/distributeStoreList', query: { tt: new Date().getTime() } });
      }
    }
  };

</script>

<style scoped>
    .menu_list {
    }

    .menu_list > div {
        padding: 3.467vw 5.6vw;
        width: 21%;
    }

    .menu_list > div > div:first-child {
        margin-bottom: 2.667vw;
    }

</style>
