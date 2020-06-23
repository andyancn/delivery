function JSONUtil() {

}

const app = getApp();

JSONUtil.prototype = {
    // obj对象转为json格式的字符串
    toString: function (obj) {
        return JSON.stringify(obj);
    },
    // json格式的字符串转为obj
    fromString: function (str) {
        return JSON.parse(str);
    }
};

JSONUtil.prototype.constructor = JSONUtil;
module.exports = new JSONUtil();
