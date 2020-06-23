<template>
    <div class="flex_col full_screen border-box bg_F5F6FA">
        <div v-if="storeList.length>0" class="pd_30">
            <div class="flex_col align_left pd_lr_20 pd_tb_30 bg_white mg_b_20 border_radius_18"
                 v-for="(item,index) in storeList" @click="toStoreInfo(item)">
                <div class="flex_row_between flex_align_middle f28">
                    <div>{{item.storeName}}</div>
                    <div>{{item.address}}</div>
                </div>
                <div class="mg_b_10 f28 pd_tb_20">登录账号:{{item.storeAccount}}
                </div>
            </div>
        </div>
        <div v-else class="f30 align_center fc_black">
            您当前没有入驻的门店
        </div>
    </div>
</template>

<script>
  import { storeList } from '../api/public';

  export default {
    name: 'myStoreList',
    data() {
      return {
        pageIndex: 1,
        pageSize: 99,
        storeList: [],
        loginUrl:''
      };
    },
    created() {
      let thiz = this;
    },
    mounted() {
      let thiz = this;
      console.log('router--->', this.$router);
      thiz.getStoreList();
      // thiz.test()
      // this.WxMpInit.wxMpShareShowMenu(this, this.$router.history.current.meta.title, this.$router.history.current.meta.wx_share_content);
      // thiz.initCanvas();
    },
    computed: {},
    methods: {
      getStoreList() {
        let thiz = this;
        let req = {
          page: thiz.pageIndex,
          pageSize: thiz.pageSize
        };
        storeList(req).then((res) => {
          if (res.data.data.storeItemList && res.data.data.storeItemList.length > 0) {
            thiz.loginUrl = res.data.data.loginUrl;
            thiz.storeList = res.data.data.storeItemList;
          }
        });
      },
      toStoreInfo(e) {
        let thiz = this;
        thiz.$router.push({ path: '/myStoreInfo', query: { relaId: e.relaId,tt:new Date().getTime() } });
      }
    }
  };

</script>

<style>
    .list > div {
        background-color: white;
        padding: 4vw;
        border-bottom: 1px dashed #dddddd;
    }
</style>
