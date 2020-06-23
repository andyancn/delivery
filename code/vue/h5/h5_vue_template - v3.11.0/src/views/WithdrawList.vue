<template>
    <div class="flex_col full_screen border-box pd_t_80 bg_white">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <div v-if="withdrawList" class="pd_30">
                <van-list
                        v-model="loading"
                        :finished="finished"
                        finished-text="没有更多了"
                        @load="onLoad"
                >
                    <div class="flex_col pd_lr_20 pd_tb_30 bg_white mg_b_20 border_radius_18"
                         v-for="item in withdrawList">
                        <div class="flex_row_between flex_align_middle f28 mg_b_10 pd_b_20 border_bottom_1">
                            <div class="mg_r_30">{{item.createTime}}</div>
                            <div class="">{{item.handleStatusName}}</div>
                        </div>
                        <div class="flex_row_between flex_align_middle f28">
                            <div class="flex_row_col align_left f28">
                                <div class="mg_b_20">{{item.accountBank}}</div>
                                <div>{{item.accountNumber}}</div>
                            </div>
                            <div class="">{{item.money/100}}</div>
                        </div>
                    </div>
                </van-list>
            </div>
        </van-pull-refresh>
    </div>
</template>

<script>
  import { Toast } from 'vant';
  import validUtil from '../utils/ValidateUtil';
  import { withdrawList } from '../api/public';

  export default {
    name: 'withdrawList',
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
        withdrawList: []
      };
    },
    created() {
    },
    mounted() {
      let thiz = this;
    },
    computed: {},
    methods: {
      getUserWithdrawList() {
        let thiz = this;
        let req = {
          page: thiz.pageIndex,
          pageSize: thiz.pageSize
        };
        withdrawList(req).then(res => {
          if (res.data.data.itemList && res.data.data.itemList.length > 0) {
            let withdrawList = thiz.withdrawList;
            let tmpList = res.data.data.itemList;
            for (let one of tmpList) {
              one.createTime = one.createTime.substr(0, 10);
              switch (one.handleStatus) {
                case 1:
                  one.handleStatusName = '待打款';
                  break;
                case 2:
                  one.handleStatusName = '已打款';
                  break;
                case 3:
                  one.handleStatusName = '打款失败';
                  break;
              }
            }
            thiz.withdrawList = withdrawList.concat(tmpList);
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
          thiz.withdrawList = [];
          thiz.refreshing = false;
        }
        thiz.getUserWithdrawList();
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
