<template>
    <div class="flex_col full_screen border-box pd_t_75 bg_white">
        <div class="list mg_t_20 f20 mg_lr_30">
            <div class="flex_row_between flex_align_middle f26 align_left">
                <div>用户姓名</div>
                <div class="">{{userInfo.name}}</div>
            </div>
            <div class="flex_row_between flex_align_middle f26 align_left">
                <div>绑定手机号</div>
                <div class="">{{userInfo.tel}}</div>
            </div>
            <div class="flex_row_between flex_align_middle f26 align_left">
                <div>店铺名称</div>
                <div class="">{{storeInfo.storeName}}</div>
            </div>
            <div class="flex_row_between flex_align_middle f26 align_left">
                <div>店铺地址</div>
                <div class="">{{storeInfo.address}}</div>
            </div>
            <div class="flex_row_between flex_align_middle f26 align_left">
                <div>店铺管理员账号</div>
                <div class="">{{storeInfo.storeAccount}}</div>
            </div>
            <div class="flex_row_between flex_align_middle f26 align_left">
                <div>初始密码</div>
                <div class="">88888888</div>
            </div>
            <div class="flex_row_between flex_align_middle f26 align_left">
                <div>店铺管理地址</div>
                <div class="">{{loginUrl}}</div>
            </div>
        </div>
        <div style="position: fixed;bottom: 10vw;width: 100%;">
            <div class="pd_30">
                <van-button block size="large" color="#D4A867" class=" fc_white" @click="toOrderConfirm">
                    马上购卡
                </van-button>
            </div>
        </div>
    </div>
</template>
<script>
  import { storeInfo } from '../api/public';

  export default {
    name: 'myStoreInfo',
    data() {
      return {
        storeInfo: '',
        userInfo: '',
        relaId: this.$route.query.relaId ? this.$route.query.relaId : 0,
        loginUrl: ''
      };
    },
    created() {
      let thiz = this;
    },
    mounted() {
      let thiz = this;
      console.log('router--->', this.$router);
      thiz.getStoreInfo();
      // thiz.test()
      // this.WxMpInit.wxMpShareShowMenu(this, this.$router.history.current.meta.title, this.$router.history.current.meta.wx_share_content);
      // thiz.initCanvas();
    },
    computed: {},
    methods: {
      getStoreInfo() {
        let thiz = this;
        let req = {
          relaId: thiz.relaId
        };
        storeInfo(req).then((res) => {
          if (res.data.data.storeItem) {
            thiz.storeInfo = res.data.data.storeItem;
          }
          if (res.data.data.userItem) {
            thiz.userInfo = res.data.data.userItem;
          }
          thiz.loginUrl = res.data.data.loginUrl ? res.data.data.loginUrl : '';
        });
      },
      toOrderConfirm() {
        let thiz = this;
        thiz.$router.push({ path: '/orderConfirm', query: {orderType:'', storeId: thiz.storeInfo.storeId, tt: new Date().getTime() } });
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
