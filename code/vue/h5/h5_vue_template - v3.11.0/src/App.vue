<template>
    <div id="app" class="border-box" :style="contentStyleObj">
        <router-view/>
        <!--<my-navbar></my-navbar>-->
        <my-tabbar :tarBarActiveName="currentPath" @checkPath="getCurrentPath" v-if="showTabbar"></my-tabbar>
    </div>
</template>
<script>
  import MyTabbar from './components/TabBar';
  // import MyNavbar from './components/NavBar';
  import storeUtil from 'storejs';

  export default {
    components: { MyTabbar },
    data() {
      return {
        currentPath: '',
        contentStyleObj: {
          width: '',
          height: ''
        },
        showTabbar: true,
        inviterId: ''
      };
    },
    created() {
      let thiz = this;
      window.addEventListener('resize', thiz.getHeight);
      thiz.getHeight();
      // console.log('app===sm=>', this.$route.query);
      if (this.$route.query.inviterId) {
        storeUtil('fx_inviterId', this.$route.query.inviterId);
      }
      if (this.$route.query.registerChannel) {
        storeUtil('fx_registerChannel', this.$route.query.registerChannel);
      }
      thiz.$store.dispatch('CheckLogin').then((res) => {
        if (res) {
          // console.log('true====CheckLogin========>', res);
          thiz.$router.push({ path: '/home', query: { tt: new Date().getTime() } });
        } else {
          // console.log('false====CheckLogin========>', res);
          thiz.$router.push({ path: '/register', query: { tt: new Date().getTime() } });
        }
      });
    },
    destroyed() {
      window.removeEventListener('resize', this.getHeight);
    },
    mounted() {
    }
    ,
    methods: {
      getHeight() {
        // 获取浏览器高度，减去顶部导航栏的值，70该值也可以动态获取
        // this.contentStyleObj.minHeight = (window.innerHeight - 50) + 'px';
        this.contentStyleObj.minHeight = document.body.clientHeight + 'px';
        this.contentStyleObj.width = window.innerWidth + 'px';
      },
      getCurrentPath() {
        console.log('@checkPath=====>', this.$router.history.current.path);
      }
    },
    watch: {
      $route(to, from) {
        let thiz = this;
        thiz.currentPath = to.path;
        console.log('路由======>', to, '/', from);
        if (thiz.$router.options.tabBars.indexOf(thiz.$router.history.current.path) == -1) {
          thiz.showTabbar = false;
        } else {
          thiz.showTabbar = true;
        }
      }
    }
  };
</script>

<style lang="less">
    @import "./assets/css/theme.less";

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
</style>

