<template>
    <van-tabbar :tarBarActiveName="activePath" v-model="active" @change="onChange" active-color="#D4A867"
                inactive-color="#000">
        <van-tabbar-item name="home" icon="home-o">活动{{version=='test'?'测试版':''}}</van-tabbar-item>
        <van-tabbar-item name="self" icon="friends-o">我的{{version=='test'?'测试版':''}}</van-tabbar-item>
    </van-tabbar>
</template>

<script>
  export default {
    name: 'my-tabbar',
    props: {
      // msg: String,
      tarBarActiveName: {
        type: String,
        default: 'home'
      }
    },
    data() {
      return {
        active: '',
        activePath: this.tarBarActiveName,
        version:process.env.VUE_APP_ENV_NAME
      };
    },
    mounted() {
      let thiz = this;
      thiz.active = thiz.tarBarActiveName.substr(1,thiz.tarBarActiveName.length);

      // console.log("tab==mounted==>",thiz.tarBarActiveName.substr(1,this.tarBarActiveName.length))
    },
    watch: {
      tarBarActiveName(s1,s2){
         this.active = this.tarBarActiveName.substr(1,this.tarBarActiveName.length);
        // console.log("watch===========>",this.tarBarActiveName)
      }

    },
    methods: {
      onChange(index) {
        let thiz = this;
        console.log('==tabbar====onChange======>', index);
        thiz.active = index;
        // console.log('========>',  thiz.active);
        this.$router.push('/' + index).catch(err => {
          err;
        });
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
