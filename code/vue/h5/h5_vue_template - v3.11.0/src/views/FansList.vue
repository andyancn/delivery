<template>
    <div class="flex_col full_screen border-box bg_F5F6FA">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <div v-if="fxUserType !='10'"
                 class="flex_row_around flex_align_middle border_radius_18 bg_white mg_lr_30 pd_60 mg_t_30 mg_b_30 f50">
                <div class="col_6 flex_col align_center">
                    <div class="mg_b_24">{{stateInfo.directFansCount?stateInfo.directFansCount:0}}</div>
                    <div class="f22 fc_888888">直接粉丝</div>
                </div>
                <div class="col_4 flex_col align_center">
                    <div class="mg_b_24">{{stateInfo.promoteFansCount?stateInfo.promoteFansCount:0}}</div>
                    <div class="f22 fc_888888">推广粉丝</div>
                </div>
            </div>
            <div v-if="fxUserType=='10'"
                 class="flex_row_around flex_align_middle border_radius_18 bg_white mg_lr_30 pd_60 mg_t_30 mg_b_30 f50">
                <div class="col_4 flex_col align_center">
                    <div class="mg_b_24">{{stateInfo.directFansCount?stateInfo.directFansCount:0}}</div>
                    <div class="f22 fc_888888">直接粉丝</div>
                </div>
                <div class="col_4 flex_col align_center">
                    <div class="mg_b_24">{{stateInfo.promoteFansCount?stateInfo.promoteFansCount:0}}</div>
                    <div class="f22 fc_888888">推广粉丝</div>
                </div>
                <div class="col_4 flex_col align_center">
                    <div class="mg_b_24">{{stateInfo.commissionAmount?stateInfo.commissionAmount/100:0}}</div>
                    <div class="f22 fc_888888">累计收益粉丝</div>
                </div>
            </div>
            <div class="align_center f28">--粉丝收益列表--</div>
            <div class="pd_0_20 f30">
                <van-search style="font-size: 28px;" v-model="searchInfo" shape="round" background="transparent "
                            placeholder="请输入搜索关键词"
                            input-align="center" left-icon="" @input="setSearchInfo" @blur="vaildateKeyword"
                            search="toSearch"/>
            </div>

            <div class="pd_30">
                <van-list
                        v-model="loading"
                        :finished="finished"
                        finished-text="没有更多了"
                        @load="onLoad"
                >
                    <div class="flex_row_between flex_align_middle pd_lr_20 pd_tb_30 bg_white mg_b_20 border_radius_18"
                         v-for="item in fansList" @click="toFansDetail(item)">
                        <div class="flex_col align_left">
                            <div class="mg_b_10 f28">{{item.name}}</div>
                            <div class="flex_row_start flex_align_middle f24">
                                <div v-if="item.fxUserType==20" class="mg_r_30 pd_tb_10 pd_lr_20 bg_EDF5FF">经销商
                                </div>
                                <div v-if="item.fxUserType==30" class="mg_r_30 pd_tb_10 pd_lr_20 bg_EDF5FF">伙伴
                                </div>
                                <div v-if="item.fxUserType==40" class="mg_r_30 pd_tb_10 pd_lr_20 bg_EDF5FF">普通用户
                                </div>
                                <div class="pd_tb_10 pd_lr_20 bg_EDF5FF">{{item.tel}}</div>
                            </div>
                        </div>
                        <div v-if="fxUserType=='10'" class="pd_lr_30 pd_tb_10 f28 bg_white border_radius_18">
                            ¥{{item.accCommission/100}}
                        </div>
                    </div>
                </van-list>
            </div>
            <!--<p>刷新次数: {{ count }}</p>-->
        </van-pull-refresh>
    </div>
</template>

<script>
  import { Toast } from 'vant';
  import validUtil from '../utils/ValidateUtil';
  import { userFansList, userFansState, userCommissionnList } from '../api/public.js';
  import storeUitl from 'storejs';

  export default {
    name: 'fansList',
    data() {
      return {
        refreshing: false,
        loading: false,
        finished: false,
        searchInfo: '',
        count: 0,
        fxUserType: storeUitl('fx_fxUserType') ? storeUitl('fx_fxUserType') : '',
        pageIndex: 1,
        pageSize: 99,
        totalCount: 0,
        userId: '',
        stateInfo: '',
        fansList: [],
      }
    },
    created() {
      let thiz = this;
      thiz.userId = thiz.$store.getters.userId ? thiz.$store.getters.userId : 0;
    },
    mounted() {
      let thiz = this;
      console.log('router--->', this.$router);
      console.log('env====>', process.env);
      thiz.getUserFansState();
      // this.WxMpInit.wxMpShareShowMenu(this, this.$router.history.current.meta.title, this.$router.history.current.meta.wx_share_content);
      // thiz.initCanvas();
    },
    computed: {},
    methods: {
      getUserFansList() {
        let thiz = this;
        let req = {
          userId: thiz.userId,
          page: thiz.pageIndex,
          pageSize: thiz.pageSize,
          keyword: thiz.searchInfo !='' ? thiz.searchInfo :''
        };
        userFansList(req).then(res => {
          if (res.data.data && res.data.data.itemList && res.data.data.itemList.length > 0) {
            // console.log('fansList======>', res.data.data.itemList);
            let fansList = thiz.fansList;
            thiz.fansList = fansList.concat(res.data.data.itemList);
            thiz.totalCount = res.data.data.totalCount;
            thiz.loading = false;
            if (thiz.pageIndex * thiz.pageSize < thiz.totalCount) {
              thiz.pageIndex = thiz.pageIndex + 1;
            } else {
              thiz.finished = true;
            }
          } else {
            thiz.finished = true;
          }
          thiz.loading = false;
        });
      },
      vaildateKeyword(){
        let thiz = this;
        thiz.searchInfo = validUtil.trim(thiz.searchInfo)
      },

      //获取粉丝及累计收益统计
      getUserFansState() {
        let thiz = this;
        let req = {
          userId: thiz.userId
        };
        userFansState(req).then((res) => {
          thiz.stateInfo = res.data.data.item;
        });
      },
      onLoad() {
        let thiz = this;
        if (thiz.refreshing) {
          thiz.pageIndex = 1;
          thiz.fansList = [];
          thiz.refreshing = false;
        }
        thiz.getUserFansList();
      },

      onRefresh() {
        let thiz = this;
        // 清空列表数据
        thiz.finished = false;
        thiz.loading = true;
        thiz.onLoad();
      },
      setSearchInfo(e) {
        let thiz = this;
        thiz.searchInfo = e;
        console.log('setSearchInfo====>', e);
      },
      toSearch() {
        let thiz = this;
        if(thiz.searchInfo){
          thiz.pageIndex = 1;
          thiz.fansList = [];
          thiz.getUserFansList();
        }
      },
      toFansDetail(e) {
        let thiz = this;
        thiz.$router.push({ path: '/fansDetail', query: { userId: e.id } }).catch(error => {
        });
      }
    }
  };

</script>

<style>

</style>
