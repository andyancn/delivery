export default {

  //获取百分比
  getPercent: function(s) {
    let per = parseInt(s);
    return (per * 10 / 100).toFixed(1);
  }
  ,
  //转化折扣数字
  percentage2Number: function(percent) {
    let per = parseInt(percent);
    return (per * 10 / 100).toFixed(1);
  },

  //获取随机数
  getRandom: function(lower, upper) {
    return Math.floor(Math.random() * (upper - lower + 1)) + lower;
  }
};
