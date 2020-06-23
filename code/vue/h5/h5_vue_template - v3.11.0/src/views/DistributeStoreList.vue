<template>
    <div class="flex_col full_screen border-box bg_F5F6FA">
        <div class="flex_row_around flex_align_middle border_radius_18 bg_white mg_30 pd_30">
            <div class="col_6 flex_col align_center">
                <div class="f40 mg_b_24">{{storeList.length>0?storeList.length:0}}</div>
                <div class="f22 fc_888888">门店总数</div>
            </div>
        </div>
        <div class="pd_0_20 f30 ">
            <van-search style="font-size: 34px;" v-model="searchStoreName" shape="round" background="transparent"
                        placeholder="请输入搜索关键词"
                        input-align="center" left-icon="" @input="setSearchStoreName"
                        @search="searchStoreList" @blur="searchStoreList"/>
        </div>
        <div v-if="storeList.length>0" class="pd_30">
            <div class="flex_row_start flex_align_middle pd_lr_20 pd_tb_30 bg_white mg_b_20 border_radius_18"
                 v-for="(item,index) in storeList">
                <div class="mg_r_20">
                    <van-image
                            width="12.27vw"
                            heigh="12.27vw"
                            round
                            fit="cover"
                            :src="PIC_HOST + item.headImg"/>
                </div>
                <div class="flex_col align_left col_12 f24">
                    <div class="flex_row_between flex_align_middle mg_b_10">
                        <div class="f28 fc_333333 B">{{item.name}}</div>
                        <div>2020-06-01 24:00</div>
                    </div>
                    <div>{{item.province+item.city+item.district+item.address}}</div>
                </div>
            </div>
        </div>
        <div v-else class="f30 align_center fc_black">
            您当前没有推广的门店
        </div>
    </div>
</template>

<script>
  import { fansStoreList } from '../api/public';
  import validUtil from '../utils/ValidateUtil';

  export default {
    name: 'distributeStoreList',
    data() {
      return {
        pageIndex: 1,
        pageSize: 99,
        storeList: [],
        loginUrl: '',
        PIC_HOST: process.env.VUE_APP_PIC_HOST,
        searchStoreName: ''
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
          storeName: thiz.searchStoreName,
          page: thiz.pageIndex,
          pageSize: thiz.pageSize
        };
        fansStoreList(req).then((res) => {
          if (res.data.data.itemList && res.data.data.itemList.length > 0) {
            for (let one of res.data.data.itemList) {
              one.headImg = one.headImg ? one.headImg : '/Nailart/images/store_default_v1@2x.png';
            }
            thiz.storeList = res.data.data.itemList;
          }
        });
      },

      setSearchStoreName(e) {
        let thiz = this;
        thiz.searchStoreName = e;
      },

      searchStoreList() {
        let thiz = this;
        if (!thiz.searchStoreName) {
           Toast("搜索内容不能为空！");
           return false
        }
        thiz.searchStoreName = validUtil.trim(thiz.searchStoreName)
        thiz.storeList = [];
        thiz.pageIndex = 1;
        thiz.getStoreList();
      },

      toStoreInfo(e) {
        let thiz = this;
        thiz.$router.push({ path: '/myStoreInfo', query: { relaId: e.relaId, tt: new Date().getTime() } });
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
    .van-search__content{
        background-color: #ffffff !important;
    }
</style>
