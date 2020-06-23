function ArrayUtil() {

}

ArrayUtil.prototype = {
    //数组去重
    unique: function (arr) {//list去重
        let res = [];
        let json = {};
        for (let i = 0; i < arr.length; i++) {
            if (!json[arr[i]]) {
                res.push(arr[i]);
                json[arr[i]] = 1;
            }
        }
        return res;
    },
    //字符串切割成数组
    splitStr: function (str, delimiter) {
        if (!!!delimiter) {
            delimiter = ',';
        }
        let res = new Array();
        if (str) {
            let list = str.split(delimiter);
            list.forEach(function (val) {
                if (val && val != 'null') {
                    res.push(val);
                }
            });
        }
        return res;
    },
    indexOf: function (arr, val) {
        let idx = 0;
        if (arr && val) {
            let a = arr;
            for (let i = 0; i < a.length; i++) {
                if (a[i] == val) {
                    idx = i;
                    break;
                }
            }
            return idx;
        } else {
            return idx;
        }
    },
    isInArray: function (arr, val) {
        if (arr && val) {
            let a = arr;
            for (let i = 0; i < a.length; i++) {
                if (a[i] == val) {
                    return 1;
                    break;
                }
            }
            return 0;
        } else {
            return 0;
        }
    }
};

ArrayUtil.prototype.constructor = ArrayUtil;
module.exports = new ArrayUtil();