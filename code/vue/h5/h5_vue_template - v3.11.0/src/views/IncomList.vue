<template>
    <div class="flex_col full_screen border-box bg_F5F6FA">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <div class="flex_row_around flex_align_middle border_radius_18 bg_white mg_lr_30 pd_60 mg_t_30 mg_b_30">
                <div class="col_6 flex_col align_center">
                    <div class="f40 mg_b_24">¥{{accCommissionAmount?accCommissionAmount/100:0}}</div>
                    <div class="f22 fc_888888">累计收益</div>
                </div>
            </div>
            <div class="align_center f28">--收益记录--</div>
            <div v-if="incomeList" class="pd_30">
                <van-list
                        v-model="loading"
                        :finished="finished"
                        finished-text="没有更多了"
                        @load="onLoad"
                >
                    <div class="flex_row_between flex_align_middle pd_lr_20 pd_tb_30 bg_white mg_b_20 border_radius_18"
                         v-for="item in incomeList">
                        <div class="flex_col align_left">
                            <div class="flex_row_start flex_align_middle f28 mg_b_10">
                                <div class="mg_r_30">{{item.commissionLevel==1?'分享返现':'推广返现'}}</div>
                                <div class="">({{item.userTel}})</div>
                            </div>
                            <div class="f22">{{item.createTime}}</div>
                        </div>
                        <div class="pd_lr_30 pd_tb_10 f28 bg_white border_radius_18">佣金: ¥{{item.distributeMoney/100}}
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
  import { userCommissionnList } from '../api/public';

  export default {
    name: 'incomeList',
    data() {
      let thiz = this;
      return {
        userId: thiz.$store.getters.userId ? thiz.$store.getters.userId : 0,
        refreshing: false,
        loading: false,
        finished: false,
        pageIndex: 1,
        pageSize: 99,
        totalCount: 0,
        incomeList: [],
        accCommissionAmount: 0
      };
    },
    created() {
      let thiz = this;
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
      toRegist() {
        let thiz = this;
        thiz.$router.push({ path: '/registStore', query: { tt: new Date().getTime() } }).catch(err => {
          err;
        });
      },
      getUserCommissionnList() {
        let thiz = this;
        let req = {
          userId: thiz.userId,
          page: thiz.pageIndex,
          pageSize: thiz.pageSize
        };
        userCommissionnList(req).then(res => {
          thiz.accCommissionAmount = res.data.data.accCommissionAmount ? res.data.data.accCommissionAmount : 0;
          if (res.data.data.itemList && res.data.data.itemList.length > 0) {
            let incomeList = thiz.incomeList;
            let tmpList = res.data.data.itemList;
            for (let one of tmpList) {
              one.createTime = one.createTime.substr(0, 10);
            }
            thiz.incomeList = incomeList.concat(tmpList);
            thiz.totalCount = res.data.data.totalCount;
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

      onLoad() {
        let thiz = this;
        if (thiz.refreshing) {
          thiz.pageIndex = 1;
          thiz.incomeList = [];
          thiz.refreshing = false;
        }
        thiz.getUserCommissionnList();
      },

      onRefresh() {
        let thiz = this;
        // 清空列表数据
        thiz.finished = false;
        thiz.loading = true;
        thiz.onLoad();
      }

    }
  };

</script>

<style>

</style>
