<template>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <div class="flex_col col_12 full_screen border-box pd_t_30 bg_F5F6FA">
            <div v-if="addressList.length>0" class="pd_30">
                <div class="flex_col align_left pd_lr_20 pd_tb_30 bg_white mg_b_20 border_radius_18"
                     v-for="(item,index) in addressList">
                    <div class="flex_row_between flex_align_middle f28">
                        <div>{{item.linkman}}</div>
                        <div>{{item.tel}}</div>
                    </div>
                    <div class="mg_b_10 f28 pd_tb_20 border_bottom_1">{{item.province + item.city +
                        item.district + item.detail}}
                    </div>
                    <div class="flex_row_between flex_align_middle f18">
                        <div>
                            <van-checkbox v-model="item.defaultFlag" @click="selectRuler(item)"></van-checkbox>
                        </div>
                        <div class="flex_row_end flex_align_middle f20">
                            <div class="mg_r_30" @click="toAddress(item)">编辑</div>
                            <div @click="delAddress(item)">删除</div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="f30 align_center fc_black">
                您当前没有设置收货地址
            </div>
            <div style="position: fixed;bottom: 10vw;width: 100%;">
                <div class="pd_20">
                    <van-button block size="large" color="#D4A867" class=" fc_white" @click="newAddress">
                        新增地址
                    </van-button>
                </div>
            </div>
        </div>
    </van-pull-refresh>
    <!--<van-dialog v-model="show" title="删除" show-cancel-button>-->
    <!--<img src="https://img.yzcdn.cn/vant/apple-3.jpg"/>-->
    <!--</van-dialog>-->
</template>

<script>
  import { Toast, Dialog } from 'vant';
  import validUtil from '../utils/ValidateUtil';
  import { userAddressList, userAddressSwitch, userAddressDelete } from '../api/public.js';

  export default {
    name: 'addressList',
    data() {
      return {
        pageIndex: 1,
        pageSize: 99,
        radio: 0,
        checkFlag: false,
        refreshing: false,
        loading: false,
        finished: false,
        addressList: [],
        source: this.$route.query.source ? this.$route.query.source : ''
      };
    },
    created() {
      let thiz = this;
    },
    mounted() {
      let thiz = this;
      console.log('router--->', this.$router);
      console.log('env====>', process.env);
      thiz.getAddressList();
      // thiz.test()
      // this.WxMpInit.wxMpShareShowMenu(this, this.$router.history.current.meta.title, this.$router.history.current.meta.wx_share_content);
      // thiz.initCanvas();
    },
    computed: {},
    methods: {
      getAddressList() {
        let thiz = this;
        let req = {
          page: thiz.pageIndex,
          pageSize: thiz.pageSize
        };
        userAddressList(req).then(response => {
          if (response.data.data.itemList && response.data.data.itemList.length > 0) {
            thiz.addressList = response.data.data.itemList;
          }
        }).then(() => {
          // thiz.radioInit();
        });
      },
      onRefresh() {
        let thiz = this;
        // 清空列表数据
        thiz.refreshing = true;
        thiz.addressList = [];
        // 重新加载数据
        // 将 loading 设置为 true，表示处于加载状态
        thiz.getAddressList();
        thiz.refreshing = false;
      },
      setSearchInfo(e) {
        let thiz = this;
        thiz.searchInfo = e;
        console.log('setSearchInfo====>', e);
      },
      toSearch(e) {
        let thiz = this;
        thiz.searchInfo = validUtil.trim(thiz.searchInfo);
        console.log('search====>', e);
      },
      //设置默认地址
      selectRuler(e) {
        // console.log('selectRuler====>', e);
        let thiz = this;
        let list = thiz.addressList;
        let ori_default_id = '';
        for (let one of list) {
          if (one.defaultFlag) {
            ori_default_id = one.id;
          }
        }
        if (ori_default_id && ori_default_id != e.id) {
          let req = {
            id: ori_default_id,
            defaultFlag: 0
          };
          userAddressSwitch(req).then(() => {
            req = {
              id: e.id,
              defaultFlag: 1
            };
            userAddressSwitch(req).then(() => {
              thiz.getAddressList();
            }).then(() => {
              if (thiz.source === 'orderConfirm') {
                thiz.$router.push({ path: '/orderConfirm', tt: new Date().getTime() });
              }
            });
          });
        } else {
          console.log('!ori_default_id====>', ori_default_id);
          let req = {
            id: e.id,
            defaultFlag: 1
          };
          userAddressSwitch(req).then(() => {
            thiz.getAddressList();
          }).then(() => {
            if (thiz.source === 'orderConfirm') {
              thiz.$router.push({ path: '/orderConfirm', tt: new Date().getTime() });
            }
          });
        }
      },

      delAddress(e) {
        let thiz = this;
        // thiz.show = true;
        Dialog.alert({
          title: '注意',
          message: '确实要删除改地址吗？'
        }).then(() => {
          let req = {
            id: e.id
          };
          userAddressDelete(req).then(() => {
            thiz.getAddressList();
          }).catch(error => {
            console.log('del======>', e);
          });
        });
      },
      toAddress(e) {
        let thiz = this;
        thiz.$router.push({ path: '/address', query: { id: e.id, tt: new Date().getTime() } });
      }
      ,
      newAddress() {
        let thiz = this;
        thiz.$router.push({ path: '/address', query: { tt: new Date().getTime() } });
      }
    }
  }
  ;

</script>

<style>

</style>
