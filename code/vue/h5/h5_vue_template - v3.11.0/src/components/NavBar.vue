<template>
    <div v-if="!showBack">
        <van-nav-bar
                :title="this.$route.name"
                :left-text=backText
                right-text=""
                @click-left="back"
                @click-right="onClickRight"
                fixed
        />
    </div>
    <div v-else>
        <van-nav-bar
                :title="this.$route.name"
                :left-text=backText
                right-text=""
                left-arrow
                @click-left="back"
                @click-right=""
                fixed
        />
    </div>
</template>

<script>
  export default {
    name: 'my-navbar',
    props: {
      // title: String
    },
    data() {
      return {
        backText: '',
        showBack:true
      };
    },
    methods: {
      back() {
        let thiz = this;
        console.log('------------->', thiz.$router);
        if (thiz.$router.options.tabBars.indexOf(thiz.$router.history.current.path) == -1) {
          console.log('------------->backed');
          this.$router.go(-1);//返回上一层
        }
      },
      onClickRight() {
        Toast('按钮');
      }
    },
    watch: {
      $route(to, from) {
        let thiz = this;
        console.log(thiz.$router);
        if (thiz.$router.options.tabBars.indexOf(thiz.$router.history.current.path) == -1) {
          thiz.showBack = true;
        } else {
          thiz.showBack = false;
        }
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
