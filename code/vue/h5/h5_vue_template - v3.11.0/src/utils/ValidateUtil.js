export default {
  rmvAllSpace: function(str) {
    return str.replace(/ /g, '');
  }
  /**
   * 检查是否数字
   */
  , isNumber: function(str) {
    return /^(-)?\d+$/.test(str);
  }
  /**
   * 类似手机号码格式
   * @param str
   * @returns {boolean}
   */
  , isLikeCellphone: function(str) {
    return /^1[1-9]\d{9}$/.test(str);
  }
  /**
   * 检查是否座机
   * @param telephone_number
   * @returns {boolean}
   */
  , checkTelephone: function(telephone_number) {
    return /^0\d{10}$/.test(telephone_number);
  }
  /**
   *
   * 校验小标题：只能是中文、中文括号、英文字母大小写、数字、中括号小括号、空格
   * @param str
   */
  , checkSubTitle: function(str) {
    return /^[a-zA-Z\u4e00-\u9fa5\s]{1,20}$/.test(str);
  }
  /**
   * 校验标题：只能是中文、中文括号、英文字母大小写、数字、中括号小括号
   * @param title
   */
  , checkTitle: function(title) {
    return /^[\u4e00-\u9fa50-9a-zA-Z_-]+$/.test(title);
  }
  /**
   * 校验联系人名称：只能是中文
   * @param linkman
   * @returns {boolean}
   */
  , checkLinkman: function(linkman) {
    return /^[\u4e00-\u9fa5]+$/.test(linkman);
  }
  , checkEmail: function(email) {
    return /^['_A-Za-z0-9-&+]+(\.['_A-Za-z0-9-&+]+)*[.]{0,1}@([A-Za-z0-9-])+(\.[A-Za-z0-9-]+)*((\.[A-Za-z0-9]{2,})|(\.[A-Za-z0-9]{2,}\.[A-Za-z0-9]{2,}))$/.test(email);
  }
  , checkWebsite: function(website) {
    return /^((https|http|ftp|rtsp|mms)?:\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=?%\-&_~`@[\]':+!]*([^<>"])*$/.test(website);
  }
  , checkUrl: function(url) {
    return /^((ht|f)tps?):\/\/([\w-]+(\.[\w-]+)*\/?)+(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?$/.test(url);
  },
  /**
   *
   * 去除收尾空格
   * @returns {*}
   */

  trim: function(str) {
    if (str == null) return '';
    // 去除前面所有的空格
    while (str.charAt(0) == ' ') {
      str = str.substring(1, str.length);
    }
    // 去除后面的空格
    while (str.charAt(str.length - 1) == ' ') {
      str = str.substring(0, str.length - 1);
    }
    return str;
  }


};

