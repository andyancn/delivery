<template>
    <div class="flex_col full_screen border-box bg_div">
        <!--<my-tabbar v-if="showTabbar"></my-tabbar>-->
        <div class="flex_col">
            <div v-for="(item,index) in list">
                <v-touch @panstart="panstart(item)" @swiperight="swiperright(index)" @swipeleft="swiperleft(index)"
                         class="wrapper">
                    <div class="flex_row_start flex_align_middle">
                        <div>
                            <van-image
                                    width="20vw"
                                    heigh="20vw"
                                    fit="fit"
                                    :src="defaultImg"/>
                        </div>
                        <div>
                            11111
                        </div>
                    </div>
                </v-touch>
            </div>
        </div>
        <!--<div style="position: fixed;bottom: 10vw;width: 100%;" class="">-->
        <div v-if="userInfo.fxUserType !=10 && userInfo.fxUserType !=20" class="mg_b_20 mg_lr_30">
            <van-button block size="large" color="#D4A867" class="fc_white border_radius_18"
                        @click="toOrderConfirm(productInfo)">
                立即购买
            </van-button>
        </div>
        <!--<a href="http://mp.weixin.qq.com/mp/getmasssendmsg?__biz=MzU3Nzg1MzMzOA==#wechat_redirect">公众号</a>-->
        <div class="footer">
            <div class="flex_col align_center f18 pd_b_20 text_color mg_t_20">
                <div>Copyright ©2020-2021 andy co.,Ltd .All Rights Reserved</div>
                <div><a href="http://www.miitbeian.gov.cn/">粤ICP备xxx号-1</a></div>
            </div>
        </div>
    </div>
</template>

<script>
    import {productDetail, userInfo, weixinOauth, productList} from '../api/public.js';
    import storeUtil from 'storejs';

    import {Toast} from 'vant';
    import MyTabbar from '../components/TabBar';

    export default {
        name: 'home',
        // components: { MyTabbar },
        data() {
            return {
                defaultImg: require('../assets/images/logo.png'),
                productInfo: '',
                registFlag: 0,
                accountInfo: '',
                userInfo: '',
                userId: '',
                list: ['a', 'b', 'c']
            };
        },
        created() {
            let thiz = this;
        },
        mounted() {
            let thiz = this;
            console.log('innerWidth===>', window.innerHeight);
            console.log('innerHeight===>', window.innerHeight);
            console.log('clientHeight===>', document.body.clientHeight);
            // console.log('home_inviterId====>', thiz.inviterId);
            // thiz.getProductDetail();
            if (storeUtil('fx_userId')) {
                thiz.userId = parseInt(storeUtil('fx_userId'));
                thiz.getUser(thiz.userId);
            }
            thiz.getProductList();
            // this.WxMpInit.wxMpShareShowMenu(this, this.$router.history.current.meta.title, this.$router.history.current.meta.wx_share_content);
        },
        computed: {},
        methods: {
            swiperleft: function (e) {
                Toast("左划");
                console.log("swiperleft=======>", e)
                // this.$router.push({'path':'/self'});
            },
            swiperright: function (e) {
                Toast("右划");
                console.log("swiperright=======>", e)
                // this.$router.push({'path':'/home'});
            },

            panstart: function (e) {
                Toast("移动");
                console.log("panstart=======>", e)
                // this.$router.push({'path':'/home'});
            },

            //获取用户详情
            getUser(userId) {
                let thiz = this;
                // console.log('getUser2222o============>', userId);
                let req = {
                    id: userId
                };
                userInfo(req).then(response => {
                    if (response.data.data.item) {
                        thiz.userInfo = response.data.data.item;
                        thiz.userId = response.data.data.item.id;
                        console.log('userInfo===========>', response.data.data.item);
                        storeUtil('fx_userId', response.data.data.item.id.toString());
                        storeUtil('fx_brandId', response.data.data.item.brandId.toString());
                        storeUtil('fx_userInfo', JSON.stringify(response.data.data.item));
                    }
                }).then(() => {
                    thiz.$store.dispatch('SaveUserInfo', thiz.userInfo).then(() => {
                        storeUtil('fx_fxUserType', thiz.userInfo.fxUserType.toString());
                    });
                }).catch(error => {
                    console.log('self error==========>', error);
                });
            },

            toLogin: function () {
                let thiz = this;
                thiz.$router.push({path: '/login', query: {tt: new Date().getTime()}}).catch(err => {
                    err;
                });
            },

            toRegist() {
                let thiz = this;
                thiz.$router.push({path: '/register', query: {tt: new Date().getTime()}}).catch(err => {
                    err;
                });
            },

            getUserInfo() {
                console.log('cache===>', sessionStorage.getItem('userName'));
            },
            // , getProductDetail() {
            //   let thiz = this;
            //   let req = {
            //     id: 2,
            //     brandId: 1
            //   };
            //   productDetail(req).then((res) => {
            //     if (res.data.data.item) {
            //       thiz.productInfo = res.data.data.item;
            //       if (process.env.VUE_APP_ENV_NAME != 'dev') {
            //         thiz.productInfo.cover = process.env.VUE_APP_PIC_HOST + JSON.parse(thiz.productInfo.coverPicture)[0];
            //       } else {
            //         thiz.productInfo.cover = require('../assets/images/h5_goods_v3.jpg');
            //       }
            //       console.log('thiz.productInfo.cover===>', thiz.productInfo.cover);
            //     }
            //   });
            // },

            //下单
            toOrderConfirm(e) {
                let thiz = this;
                if (storeUtil('fx_userId')) {
                    thiz.$router.push({
                        path: '/orderConfirm',
                        query: {productId: e.id, brandId: e.brandId, tt: new Date().getTime()}
                    });
                } else {
                    thiz.$router.push({
                        path: '/login',
                        query: {inviterId: e.id, brandId: e.brandId, tt: new Date().getTime()}
                    });
                }
            },

            //商品列表
            getProductList() {
                let thiz = this;
                let req = {
                    productType: 3,
                    page: 1,
                    pageSize: 10
                };
                productList(req).then(resp => {
                    if (resp.data.data.itemList && resp.data.data.itemList.length > 0) {
                        thiz.productInfo = resp.data.data.itemList[0]
                        if (process.env.VUE_APP_ENV_NAME != 'dev') {
                            thiz.productInfo.cover = process.env.VUE_APP_PIC_HOST + JSON.parse(thiz.productInfo.coverPicture)[0];
                        } else {
                            thiz.productInfo.cover = require('../assets/images/cmccRechargeWebCover_v2.png');
                        }
                        console.log('thiz.productInfo.cover===>', thiz.productInfo.cover);

                    }
                });
            },
        }

    };

</script>

<style>

</style>
