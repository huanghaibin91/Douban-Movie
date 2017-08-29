// 全局声明jsonp方法
Vue.prototype.$jsonp = function  (options) {
    var head = document.getElementsByTagName("head")[0];
    if (!options || !options.url) return;
    var script = document.createElement("script"),
        data = options.data || {},
        url = options.url,
        callback = options.callback,
        fnName = "jsonp" + Math.ceil(Math.random() * 10000);
    data["callback"] = fnName;
    var params = [];
    for (var key in data) {
        params.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
    }
    url = url.indexOf("?") > 0 ? (url + "&") : (url + "?");
    url += params.join("&");
    script.src = url;
    window[fnName] = function (res) {
        callback && callback(res);
        head.removeChild(script);
        delete window[fnName];
    }
    script.onerror = function () {
        callback && callback({
            error: "error"
        });
        head.removeChild(script);
        window[fnName] && delete window[fnName];
    }
    script.type = "text/javascript";
    head.appendChild(script);
};

new Vue({
    el: '#app',
    data: {
        
    },
    methods: {
        hello: function () {
            console.log('测试');
        }
    }
});
