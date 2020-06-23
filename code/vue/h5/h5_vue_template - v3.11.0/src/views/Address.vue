<template>
    <div class="flex_col align_center full_screen pd_t_80 border-box bg_F5F6FA">
        <div class="flex_col pd_20 bg_white f28 mg_t_60 mg_lr_30 pd_tb_30">
            <div class="flex_row_between flex_align_middle mg_b_30 pd_b_20 border_bottom_1">
                <div>收货人</div>
                <div>
                    <van-field class="border_1 border-box f32"
                               required
                               border
                               v-model="form.linkman"
                               placeholder="收货人姓名"
                               @input="setLinkman"
                               clearable
                    />
                </div>
            </div>
            <div class="flex_row_between flex_align_middle mg_b_30 pd_b_20 border_bottom_1">
                <div>手机号</div>
                <div>
                    <van-field class="border_1 border-box f32"
                               required
                               border
                               v-model="form.tel"
                               placeholder="收货人电话"
                               @input="setTel"
                               clearable
                    />
                </div>
            </div>
            <div class="flex_row_between flex_align_middle mg_b_30 pd_b_20 border_bottom_1">
                <div>所在地区</div>
                <div>
                    <van-field class=" border_1 border-box f32"
                               required
                               border
                               label-width="32px"
                               v-model="form.storeRegion"
                               placeholder="请输入店铺所在区域"
                               @click="showAreaList"
                               clearable
                               disabled
                    />
                </div>
            </div>
            <div class="align_left f28 mg_b_10">详细地址</div>
            <div>
                <van-field class=" border_1 border-box f32"
                           type="textarea"
                           required
                           border
                           v-model="form.detail"
                           placeholder="详细地址"
                           @input="setDetail"
                           clearable
                />
            </div>
        </div>
        <div style="position: fixed;bottom: 10vw;width: 100%;">
            <div class="pd_20">
                <van-button block size="large" color="#D4A867" class="fc_white" @click="saveAddress">
                    确认
                </van-button>
            </div>
        </div>
        <van-popup v-model="show" position="bottom" overlay safe-area-inset-bottom lock-scroll>
            <van-area :area-list="areaList" title="请选择地址" @confirm="addCity"
                      @cancel="closeArea" :value="addrCode" :columns-num="3"/>
        </van-popup>
    </div>

</template>

<script>
  import AreaList from '../utils/Area.js';
  import Toast from 'vant/es/toast';
  import ValidateUtil from '../utils/ValidateUtil.js';
  import { userAddressDetail, userAddressSave } from '../api/public';

  export default {
    name: 'address',
    data() {
      let thiz = this;
      return {
        show: false,
        addrCode: '440105',
        form: {
          id: 0,
          province: '',
          city: '',
          district: '',
          storeRegion: '',
          detail: '',
          linkman: '',
          tel: ''
        },
        areaList: {},
        source: thiz.$route.query.source ? thiz.$route.query.source : ''
      };
    },
    created() {
      let thiz = this;
      thiz.form.id = thiz.$route.query.id ? thiz.$route.query.id : 0;
      console.log('created==========>', thiz.$route.query);
    },
    mounted() {
      let thiz = this;
      thiz.areaList = AreaList;
      console.log('mounted==========>', thiz.$route.query);
      thiz.getAddressDetail();
      // thiz.getHomePage(this.$route.query.id);
      // thiz.WxMpInit.wxMpShareShowMenu(thiz, '', '');
    },
    methods: {
      getAddressDetail() {
        let thiz = this;
        if (thiz.form.id) {
          let req = { id: thiz.form.id };
          userAddressDetail(req).then(response => {
            if (response.data.data.item) {
              thiz.form = response.data.data.item;
              thiz.form.storeRegion = response.data.data.item.province + ' ' + response.data.data.item.city + ' ' + response.data.data.item.district;
            }
          });
        }
      },
      saveAddress: function() {
        let thiz = this;
        console.log('submit==========>', thiz.form);
        userAddressSave(thiz.form).then(() => {
          if(thiz.source === 'orderConfirm'){
            thiz.$router.replace('/orderConfirm');
          }else{
            thiz.$router.replace('/addressList');
          }
        });
      },
      setLinkman(e) {
        let thiz = this;
        thiz.form.linkman = e;
      },
      setTel(e) {
        let thiz = this;
        thiz.form.tel = e;
      },
      //填写店铺详细地址
      setDetail(e) {
        let thiz = this;
        thiz.form.detail = e;
      },
      //城市选择弹窗
      showAreaList() {
        this.show = true;
      },

      //城市选择关窗
      closeArea() {
        this.show = false;
      },

      //添加已选城市
      addCity(e) {
        let thiz = this;
        console.log('this.onAddrConfirm=>e', e);
        thiz.form.province = e[0].name;
        thiz.form.city = e[1].name;
        thiz.form.district = e[2].name;
        thiz.form.storeRegion = e[0].name + ' ' + e[1].name + ' ' + e[2].name;
        thiz.show = false;
      }
    }

  };
</script>

<style scoped>

</style>
