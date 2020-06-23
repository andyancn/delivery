const app = getApp();

function StringUtil() {
}

StringUtil.prototype = {
    /**
     * 获取随机字符串
     * @param len 长度
     * @returns {string}
     */
    randomString: function (len) {
        len = len || 32;
        let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
        /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
        let maxPos = $chars.length;
        let str = '';
        for (let i = 0; i < len; i++) {
            str += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return str;
    },
    //转化折扣数字
    percentS2N: function (percent) {
        let per = parseInt(percent);
        return (per * 10 / 100).toFixed(1);
    },
    //截取日期字符串,并将'-'换为'.'
    parserDate: function (str) {
        return str.substring(0, 10).replace(/-/gm, '.');
    }
    , trimMilliSeconds: function (time) {
        return time.replace('\.0', '');
    }
    , replaceAll: function (str) {
        if (!str) return '';
        return str.replace(/\s+/g, "");
    }
    , getFileExtName: function (fileName) {
        let fileNameLength = fileName.length;//取到文件名长度
        let fileExtName = fileName.substring(fileName.lastIndexOf(".") + 1, fileNameLength);//
        return fileExtName
    },

};

StringUtil.prototype.constructor = StringUtil;
module.exports = new StringUtil();
