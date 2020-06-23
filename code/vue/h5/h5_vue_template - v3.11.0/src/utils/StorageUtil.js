function StorageUtil() {

}

const app = getApp();

StorageUtil.prototype = {
    ls_prefix: 'ysm__',

    // --------------------------------------------------------------- jsCode
    setJSCode: function (jsCode) {
        this.setLS('js_code', jsCode);
    },
    getJSCode: function () {
        return this.getLS('js_code');
    },

    // --------------------- byTanj@2018-01-10：缓存用户id
    setUserId: function (userId) {
        this.setLS(this.ls_prefix + 'user_id', userId);
    }
    , getUserId: function () {
        return this.getLS(this.ls_prefix + 'user_id');
    },

    // --------------------- registerFlag
    setRegisterFlag: function (registerFlag) {
        this.setLS(this.ls_prefix + 'registerFlag', registerFlag);
    }
    , getRegisterFlag: function () {
        return this.getLS(this.ls_prefix + 'registerFlag');
    },

    // --------------------- memberLevel
    setMemberLevel: function (memberLevel) {
        this.setLS(this.ls_prefix + 'memberLevel', memberLevel);
    }
    , getMemberLevel: function () {
        return this.getLS(this.ls_prefix + 'memberLevel');
    }

    // --------------------------------------------------------------- sessionId
    /**
     * 缓存登录会话id
     * @param sessId
     */
    , setSessionId: function (sessId) {
        this.setLS('session_id', sessId);
    }
    /**
     * 获取登录会话id
     * @returns {*}
     */
    , getSessionId: function () {
        return this.getLS('session_id');
    }
    // --------------------------------------------------------------- category list
    , setCategoryList: function (categoryList) {
        this.setLS('category_list', categoryList);
    }
    , getCategoryList: function () {
        return this.getLS('category_list');
    }
    , clearCategoryList: function () {
        this.rmLS('category_list');
    }
    // --------------------------------------------------------------- userQrcodeUrl
    , getUserQrcodeUrl: function () {
        this.getLS('userQrcodeUrl');
    }

    , setUserQrcodeUrl: function (userQrcodeUrl) {
        this.setLS('userQrcodeUrl', userQrcodeUrl);
    }

    // --------------------------------------------------------------- defaultAddressId
    , getDefaultAddressId: function () {
        this.getLS('defaultAddressId');
    }
    , setDefaultAddressId: function (defaultAddressId) {
        this.setLS('defaultAddressId', defaultAddressId);
    }
    , clearDefaultAddressId: function () {
        this.rmLS('defaultAddressId');
    }
    //-------------------------------------------------设置微信授权否
    // , getWxAuthorizeFlag: function () {
    //     this.getLS('wxAuthorizeFlag');
    // }
    //
    // , setWxAuthorizeFlag: function (wxAuthorizeFlag) {
    //     this.setLS('wxAuthorizeFlag', wxAuthorizeFlag);
    // }

    //-------------------------------------------------购物车 cartInfo
    , getCartInfo: function () {
        this.getLS('cartInfo');
    }

    , setCartInfo: function (cartInfo) {
        this.setLS('cartInfo', cartInfo);
    }

    // 设置本地缓存
    , setLS: function (key, val) {
        try {
            wx.setStorageSync(key, val);
        } catch (e) {
            // console.debug(e);
        }
    }
    ,
    // 获取本地缓存
    getLS: function (key) {
        return wx.getStorageSync(key);
    }
    ,
    rmLS: function (key) {
        try {
            wx.removeStorageSync(key);
        } catch (e) {
            // console.debug(e);
        }
    }
    ,
    //删除本地缓存
    rmAllLS: function () {
        try {
            wx.clearStorageSync();
        } catch (e) {
            // console.debug(e);
        }
    }
    /**
     * 将一个KB单位的大小换算为MB
     * @param size_in_KB
     * @returns {string}
     */
    , getHumanitySize: function (size_in_KB) {
        if (size_in_KB > 1024) {// 大于1MB
            return size_in_KB / 1024 + 'MB';
        }
        return size_in_KB + "KB";
    }
};

StorageUtil.prototype.constructor = StorageUtil;
module.exports = new StorageUtil();
