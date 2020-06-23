import { login, logout, userInfo } from '../../api/public';
import { getToken, setToken, removeToken, getCookie, setCookie } from '../../utils/Auth';
import storeUtil from 'storejs'
import getters from '../getters';

const user = {
  state: {
    token: getToken(),
    userId: '',
    name: '',
    avatar: '',
    roles: [],
    loginFlag: false,
    brandId: '',
    inviterId: ''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USERID: (state, userId) => {
      state.userId = userId;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_LOGINFLAG: (state, loginFlag) => {
      state.loginFlag = loginFlag;
    },
    SET_BRANDID: (state, brandId) => {
      state.brandId = brandId;
    },
    SET_INVITERID: (state, inviterId) => {
      state.inviterId = inviterId;
    }
  },

  actions: {
    // 登录
    // Login({ commit }, userInfo) {
    //   // const username = userInfo.username.trim()
    //   return new Promise((resolve, reject) => {
    //     login(userInfo).then(response => {
    //       if (response.code < 0) {
    //         alert(response.message);
    //       } else {
    //         console.log('login====' + response.data.userId)
    //         const data = response.data;
    //         console.log('actions=========>', data);
    //         localStorage.setItem('fx_userId', "22222");
    //         localStorage.setItem('brandId', data.data.brandId);
    //         sessionStorage.setItem('sessionId', data.data.sessionId);
    //         sessionStorage.setItem('fx_userId', "11111");
    //         sessionStorage.setItem('fx_userId', data.userId);
    //         sessionStorage.setItem('brandId', data.data.brandId);
    //         console.log(localStorage.getItem("fx_userId"))
    //         setToken(data.token);
    //         commit('SET_TOKEN', data.token);
    //         commit('SET_USERID', data.data.userId);
    //         resolve();
    //       }
    //     });
    //   });
    // },


    CheckLogin({ commit }) {
      let thiz = this;
      console.log('CheckLogin===>', storeUtil('fx_userId'));
      if (storeUtil('fx_userId')) {
        console.log('has===fx_userId==>',storeUtil('fx_userId'));
        commit('SET_USERID', storeUtil('fx_userId'));
        commit('SET_LOGINFLAG', true);
      } else {
        console.log('no=>cookie==>', storeUtil('fx_userId'));
        commit('SET_TOKEN', false);
        commit('SET_LOGINFLAG', false);
      }
      console.log('getters.loginFlag========>', this.getters.loginFlag);
      return this.getters.loginFlag;
    },


    //更新USRE_STORAGE
    SaveUserInfo({ commit }, userInfo) {
      return new Promise((resolve) => {
        commit('SET_USERID', userInfo.id);
        commit('SET_LOGINFLAG', true);
        commit('SET_NAME', userInfo.name);
        commit('SET_BRANDID', userInfo.brandId);
        resolve();
      });
    },

    // // // 获取用户信息
    // GetUserInfo(userId) {
    //   return new Promise((resolve, reject) => {
    //     // id: this.getters.userId
    //     let req = {
    //       id: userId
    //     };
    //     userInfo(req).then(response => {
    //       const data = response.data;
    //       console.log('userInfo========>', data);
    //       resolve(response);
    //     });
    //   }).catch(error => {
    //     Toast(error);
    //   });
    // },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        // logout(state.token).then(() => {
        //   commit('SET_TOKEN', '');
        //   commit('SET_ROLES', []);
        //   removeToken();
        //   resolve();
        // }).catch(error => {
        //   reject(error);
        // });
      });
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '');
        commit('SET_USERID', '');
        storeUtil('fx_userId','')
        storeUtil('fx_brandId','')
        storeUtil('fx_inviterId','')
        storeUtil('fx_channelFlag','')
        storeUtil('fx_fxUserType','')
        // localStorage.setItem('fx_userId', '');
        // localStorage.setItem('fx_brandId', '');
        // localStorage.setItem('fx_inviterId', '');
        // localStorage.setItem('fx_channelFlag', '');
        // sessionStorage.setItem('fx_userId', '');
        // sessionStorage.setItem('fx_sessionId', '');
        // sessionStorage.setItem('fx_brandId', '');
        // localStorage.setItem('userInfo', '');
        removeToken();
        resolve();
      });
    }
  }
};

export default user;
