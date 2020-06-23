<template>
    <div class="flex_col full_screen border-box bg_F5F6FA">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <div class="flex_col align_center pd_30">
                <div class="f30">{{totalCount>0?'共'+totalCount+'个批次' +totalCount*500 +'张卡':'当前没有流量卡！'}}
                </div>
            </div>
            <div v-if="cardList" class="pd_30">
                <div class="flex_row_around flex_align_middle f28 mg_b_30">
                    <div class="flex_col choosed_item" @click="selectBatchType(1)">
                        <div :class="batchType == 1 ? 'fc_D4A867' : ''">卡库存</div>
                        <div :class="batchType == 1 ? 'bg_D4A867' : ''"></div>
                    </div>
                    <div class="flex_col choosed_item">
                        <div :class="batchType == 2 ? 'fc_D4A867' : ''" @click="selectBatchType(2)">
                            {{userType>20?'已绑定':'已发出'}}
                        </div>
                        <div :class="batchType == 2 ? 'bg_D4A867' : ''"></div>
                    </div>
                </div>

                <div v-if="cardList.length>0 && userType>20 && batchType==1"
                     class="flex_row_between flex_align_middle f30 mg_b_20">
                    <div></div>
                    <div class="flex_row_end flex_align_middle">
                        <div class="mg_r_20">
                            <van-checkbox shape="square" checked-color="#D4A867"
                                          v-model="choosedAll"
                                          @click="selectAllBatch"></van-checkbox>
                        </div>
                        <div>全选</div>
                    </div>
                </div>
                <van-list
                        v-model="loading"
                        :finished="finished"
                        finished-text="没有更多了"
                        @load="onLoad"
                >
                    <div class="flex_col align_center pd_lr_20 pd_tb_30 bg_white mg_b_20 border_radius_18 f28 "
                         v-for="item in cardList">
                        <div class="flex_row_between flex_align_middle mg_b_10">
                            <div class="flex_start flex_align_middle mg_lr_30">
                                <div v-if="userType>20 && batchType==1" class="align_center">
                                    <van-checkbox shape="square" checked-color="#D4A867"
                                                  v-model="item.choosed"
                                                  @click="selectBatch(item)"> 批号:{{item.productName}}--{{item.id}}
                                    </van-checkbox>
                                </div>
                                <div v-if="userType>20 && batchType==2">批号:{{item.productName}}--{{item.id}}</div>
                                <div v-if="userType<30">批号:{{item.productName}}--{{item.id}}</div>
                            </div>
                            <div v-if="userType>20">{{item.ownerName?item.ownerName:'未绑定门店'}}</div>
                        </div>
                        <div class="flex_row_center flex_align_middle">
                            <div class="flex_col align_center col_2">
                                <div class="bg_F5F6FA pd_tb_10">数量</div>
                                <div class="pd_tb_10">{{item.cardAmount}}</div>
                            </div>
                            <div class="flex_col align_center col_5">
                                <div class="bg_F5F6FA pd_tb_10">首卡ID</div>
                                <div class="pd_tb_10">{{item.firstSerialCode}}</div>
                            </div>
                            <div class="flex_col align_center col_5">
                                <div class="bg_F5F6FA pd_tb_10">尾卡ID</div>
                                <div class="pd_tb_10">{{item.lastSerialCode}}</div>
                            </div>
                        </div>
                    </div>
                </van-list>
            </div>
            <div class="holder_place"></div>
            <!--<p>刷新次数: {{ count }}</p>-->
        </van-pull-refresh>
        <div class="f30 bg_F5F6FA" style="position: fixed;bottom: 0;width: 100%;padding-bottom: 4vw;">
            <div v-if="userType<30 || cardList.length<1" class="pd_lr_30">
                <van-button block size="large" color="#D4A867" class="fc_white border_radius_18" @click="toBuyCard">
                    去购卡
                </van-button>
            </div>

            <div v-if="userType>20 && cardList && cardList.length>0" class="pd_lr_30">
                <van-button block size="large" color="#D4A867" class="fc_white border_radius_18"
                            @click="showBindStoreDialog">
                    绑定店铺
                </van-button>
            </div>
        </div>
        <van-popup
                v-model="showBindDialog"
                position="bottom"
                style="height: 30%"
                close-icon-position="top-left"
                safe-area-inset-bottom
                overlay
                lock-scroll
        >
            <van-picker
                    title="选择店铺"
                    show-toolbar
                    :columns="storeList"
                    :default-index="0"
                    @change="selectStoreId"
                    @confirm="confirmBindStore"
                    @cancel="cancelBind"
            />
        </van-popup>
    </div>
</template>

<script>
  import { Toast, Dialog } from 'vant';
  import validUtil from '../utils/ValidateUtil';
  import { storeList, batchList, batchBindStore } from '../api/public';
  import storeUtil from 'storejs';

  export default {
    name: 'idCardList',
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
        cardList: [],
        accCommissionAmount: 0,
        showBindDialog: false,
        choosedAll: false,
        storeList: [],
        choosedStore: '',
        userType: storeUtil('fx_fxUserType') || 40,
        batchType: 1 //批次使用状态
      };
    },
    created() {
      let thiz = this;
    },
    mounted() {
      let thiz = this;
      console.log('router--->', this.$router);
      console.log('env====>', process.env);
      thiz.getStoreList();
      // thiz.test()
      // this.WxMpInit.wxMpShareShowMenu(this, this.$router.history.current.meta.title, this.$router.history.current.meta.wx_share_content);
      // thiz.initCanvas();
    },
    computed: {},
    methods: {
      getIdCardList() {
        let thiz = this;
        let req = {
          page: thiz.pageIndex,
          pageSize: thiz.pageSize,
          batchType: thiz.batchType
        };
        batchList(req).then(res => {
          if (res.data.data.itemList && res.data.data.itemList.length > 0) {
            let cardList = thiz.cardList;
            let tmpList = res.data.data.itemList;
            for (let one of tmpList) {
              one.createTime = one.createTime.substr(0, 10);
              one.choosed = false;
            }
            thiz.cardList = cardList.concat(tmpList);
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

      //选择批次
      selectBatch(e) {
        let thiz = this;
        console.log('selectBatch====>', e);
      },

      //选择所有批次
      selectAllBatch() {
        let thiz = this;
        console.log('selectAllBatch========>', thiz.choosedAll);
        let cardList = thiz.cardList;
        if (thiz.choosedAll) {
          for (let one of cardList) {
            one.choosed = true;
          }
        } else {
          for (let one of cardList) {
            one.choosed = false;
          }
        }
      },

      onLoad() {
        let thiz = this;
        if (thiz.refreshing) {
          thiz.pageIndex = 1;
          thiz.cardList = [];
          thiz.refreshing = false;
        }
        thiz.getIdCardList();
      },

      onRefresh() {
        let thiz = this;
        // 清空列表数据
        thiz.finished = false;
        thiz.loading = true;
        thiz.onLoad();
      },
      showBindStoreDialog() {
        let thiz = this;
        thiz.showBindDialog = true;
      },

      //选择店铺
      selectStoreId(Picker, values) {
        let thiz = this;
        // console.log('getStoreId===========>', values.value);
        thiz.choosedStore = values;
      },

      //确认绑定门店
      confirmBindStore() {
        let thiz = this;
        //todo
        if (!thiz.choosedStore) {
          Toast('当前沒有选中店铺！');
        }
        let cardList = thiz.cardList;
        let batchIds = [];
        for (let one of cardList) {
          if (one.choosed) {
            one.bindStoreId = thiz.choosedStore.value;
            one.bindStoreName = thiz.choosedStore.text;
            batchIds.push(one.id);
          }
        }
        console.log('batchIds=choosed====>', JSON.stringify(batchIds));
        if (batchIds.length < 1) {
          Toast('当前沒有选中流量卡！');
        }
        let req = {
          selectAll: thiz.choosedAll ? 1 : 0,
          storeId: thiz.choosedStore.storeId,
          batchIds: JSON.stringify(batchIds)
        };
        batchBindStore(req).then(res => {
          thiz.cardList = [];
          thiz.pageIndex = 1;
          thiz.batchType = 2;
          thiz.getIdCardList();
        });
        // thiz.cardList = cardList;
        thiz.showBindDialog = false;
      },

      cancelBind() {
        let thiz = this;
        thiz.showBindDialog = false;
      }
      ,

      //获取店铺列表
      getStoreList() {
        let thiz = this;
        let req = {
          page: thiz.pageIndex,
          pageSize: thiz.pageSize
        };
        storeList(req).then((res) => {
          let storeList = [];
          if (res.data.data.storeItemList && res.data.data.storeItemList.length > 0) {
            // thiz.loginUrl = res.data.data.loginUrl;
            storeList = res.data.data.storeItemList;
            for (let one of storeList) {
              one.text = one.storeName;
              one.value = one.storeId;
            }
            thiz.storeList = storeList;
            thiz.choosedStore = storeList[0];
          } else {
            for (let i = 0; i < 20; i++) {
              let item = {
                value: i,
                text: '店铺' + i
              };
              storeList.push(item);
            }
            thiz.storeList = storeList;
          }
        });
      }
      ,
      toBuyCard() {
        let thiz = this;
        thiz.$router.push({ path: '/orderConfirm', query: { tt: new Date().getTime() } });
      },

      //选择卡出入类型
      selectBatchType(e) {
        let thiz = this;
        if (e) {
          thiz.cardList = [];
          thiz.pageIndex = 1;
          thiz.batchType = e;
          thiz.getIdCardList();
        }
        // console.log('selectBatchType=====>', e);


      }
    }
  }
  ;

</script>

<style>

</style>
