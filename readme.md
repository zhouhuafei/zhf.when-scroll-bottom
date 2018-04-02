# 当滚动到浏览器的底部
```
const WhenScrollBottom = require('zhf.when-scroll-bottom');
new WhenScrollBottom({
    callback: {
        success: function () {
            console.log('滚动到底部了');
            whenScrollBottom.dataLoadContinue(); // 数据如果没有加载完毕，调用这个，如果加载完毕了就不要调用这个了。
        },
        failure: function () {
        },
    },
    isBindScrollEvent: true, // 是否绑定滚动事件
    isInitRender: true, // 是否初始化的时候就进行渲染
    interval: 80, // 函数节流时间(延迟时间)
    errorHeight: 0, // 滚动到底部上面一定高度就算是滚动到底部了(误差高度)
});
```
