<template>
    <div class="flex_col full_screen border-box pd_t_30 bg_F5F6FA">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <div class="align_center f28">--渠道列表--</div>
            <div class="pd_30">
                <van-list
                        v-model="loading"
                        :finished="finished"
                        finished-text="没有更多了"
                        @load="onLoad"
                >
                    <div class="flex_col pd_lr_20 pd_tb_30 bg_white mg_b_20 border_radius_18"
                         v-for="item in channelList">
                        <div class="flex_row_between flex_align_middle f28 mg_b_10">
                            <div class="flex_row_start flex_align_middle">
                                <div>{{item.name}}</div>
                                <div>({{item.tel}})</div>
                            </div>
                            <div>{{item.userRegisterTime}}</div>
                        </div>
                        <div class="flex_row_between flex_align_middle f28 mg_b_10">
                            <div>经销商数:{{item.directFansCount}}</div>
                            <div>订单数：{{item.promoteOrderCount}}</div>
                        </div>
                        <div class="flex_row_between flex_align_middle f28">
                            <div>团队分佣:{{item.commissionAmount/100}}</div>
                            <div>总分佣：{{item.totalDistributeMoney/100}}</div>
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
  import { channelList } from '../api/public.js';
  import storeUitl from 'storejs';

  export default {
    name: 'channelList',
    data() {
      return {
        refreshing: false,
        loading: false,
        finished: false,
        fxUserType: storeUitl('fx_fxUserType') ? storeUitl('fx_fxUserType') : '',
        pageIndex: 1,
        pageSize: 99,
        totalCount: 0,
        channelList: []
      };
    },
    created() {
      let thiz = this;
      thiz.userId = thiz.$store.getters.userId ? thiz.$store.getters.userId : 0;
    },
    mounted() {
      let thiz = this;
      console.log('router--->', this.$router);
      console.log('env====>', process.env);
      // thiz.getChannelList();
      // this.WxMpInit.wxMpShareShowMenu(this, this.$router.history.current.meta.title, this.$router.history.current.meta.wx_share_content);
      // thiz.initCanvas();
    },
    computed: {},
    methods: {
      //获得渠道商列表
      getChannelList() {
        let thiz = this;
        let req = {
          page: thiz.pageIndex,
          pageSize: thiz.pageSize
        };
        channelList(req).then(res => {
          if (res.data.data.itemList && res.data.data.itemList.length > 0) {
            console.log('fansList======>', res.data.data.itemList);
            let channelList = thiz.channelList;
            thiz.channelList = channelList.concat(res.data.data.itemList);
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

      onLoad() {
        let thiz = this;
        if (thiz.refreshing) {
          thiz.pageIndex = 1;
          thiz.channelList = [];
          thiz.refreshing = false;
        }
        thiz.getChannelList();
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
