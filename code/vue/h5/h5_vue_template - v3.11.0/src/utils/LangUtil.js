function LangUtil() {
}

LangUtil.prototype = {
    isUndefined: function (data) {
        return typeof(data) === 'undefined';
    }
    , isNumber: function (data) {
        return typeof(data) === 'number';
    }
    , isBoolean: function (data) {
        return typeof(data) === 'boolean';
    }
    , isString: function (data) {
        return typeof(data) === 'string';
    }
    , isObject: function (data) {
        return typeof(data) === 'object';
    }
    , isFunction: function (data) {
        return typeof(data) === 'function';
    }
};

LangUtil.prototype.constructor = LangUtil;
module.exports = new LangUtil();