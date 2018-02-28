'use strict';

var extend = require('zhf.extend');

function WhenScrollBottom(json) {
    this.opts = extend({
        callback: {
            success: function success() {},
            failure: function failure() {}
        },
        isBindScrollEvent: true, // 是否绑定滚动事件
        isInitRender: true, // 是否初始化的时候就进行渲染
        interval: 80, // 函数节流时间(延迟时间)
        errorHeight: 0 // 滚动到底部上面一定高度就算是滚动到底部了(误差高度)
    }, json);
    this.timer = null; // 定时器
    this.isLoadOver = false; // 数据是否加载完毕
    this.init();
}

WhenScrollBottom.prototype.init = function () {
    if (this.opts.isInitRender) {
        this.render();
    }
    this.power();
};

WhenScrollBottom.prototype.render = function () {
    var callback = this.opts.callback;
    var allH = document.body.scrollHeight;
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= allH - this.opts.errorHeight && !this.isLoadOver) {
        this.isLoadOver = true; // 数据加载完毕了,这里一定要设置成数据加载完毕了,否则异步请求响应比较慢的时候,会重复执行callback.success(this);
        callback.success(this);
    } else {
        callback.failure();
    }
};

// 数据尚未加载完毕
WhenScrollBottom.prototype.dataLoadContinue = function () {
    this.isLoadOver = false;
    // 数据如果没有加载完毕,手动调用这个方法,或者手动把isLoadOver属性变成false,建议调方法
};

WhenScrollBottom.prototype.scroll = function () {
    var self = this;
    clearTimeout(self.timer);
    self.timer = setTimeout(function () {
        self.render();
    }, self.opts.interval);
};

WhenScrollBottom.prototype.power = function () {
    var self = this;
    if (self.opts.isBindScrollEvent) {
        window.addEventListener('scroll', function () {
            self.scroll();
        });
    }
};

module.exports = WhenScrollBottom;