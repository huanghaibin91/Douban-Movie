new Vue({
    el: '#app',
    data: {
        banners: [],
        in_theaters: [],
        coming_soon: [],
    },
    mounted: function () {
        var that = this;
        this.jsonp({
            url: 'https://api.douban.com/v2/movie/in_theaters',
            callback: function (response) {
                that.banners = response.subjects.slice(0, 5);
            }
        });
        this.jsonp({
            url: 'https://api.douban.com/v2/movie/in_theaters',
            callback: function (response) {
                that.in_theaters = response.subjects.slice(5);
            }
        });
        this.jsonp({
            url: 'https://api.douban.com/v2/movie/coming_soon',
            callback: function (response) {
                that.coming_soon = response.subjects.slice(0, 20);
            }
        });
    },
    methods: {
        jsonp: function (options) {
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
            head.appendChild(script)
        },
        hello: function () {
            console.log('测试');
        }
    }
});

