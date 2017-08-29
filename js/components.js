
// 首页
Vue.component('home', {
    template: `
        <div class="home">
            <mt-header title="">
                <mt-button slot="left">豆瓣电影</mt-button>
                <mt-button icon="search" slot="right"></mt-button>
            </mt-header> 
            <div class="in-theaters-title">
                <h4>正在热映</h4>
                <a>更多<a>
            </div>
            <div class="swipe-box">
                <mt-swipe :auto="4000">
                    <mt-swipe-item v-for="movie in banners">
                        <div class="swipe-item">
                            <div class="swipe-item-left">
                                <img :src="movie.images.medium" :alt="movie.title">
                            </div>
                            <div class="swipe-item-right">
                                <p>片名：{{ movie.title}}</p>
                                <p>评分：<span>{{ movie.rating.average }}</sapn></p>
                                <p>导演：{{ movie.directors[0].name }}</p>
                                <p>类型：<span>{{ movie.genres.join('/') }}</sapn></p>
                                <p>主演：<span>{{ movie.casts[0].name}}</span></p>
                            </div>
                        </div>
                    </mt-swipe-item>
                </mt-swipe>
            </div>
            <div class="in-theaters">
                <div class="in-theaters-movie" v-for="movie in in_theaters">
                    <img :src="movie.images.medium" :alt="movie.title">
                    <p>{{ movie.title}}</p>
                </div>
            </div>
            <div class="coming-soon-title">
                <h4>即将上映</h4>
                <a>更多<a>
            </div>
            <div class="coming-soon">
                <div class="coming-soon-movie" v-for="movie in coming_soon">
                    <img :src="movie.images.medium" :alt="movie.title">
                    <p>{{ movie.title}}</p>
                </div>
            </div>
            <mt-header title="Writed By Huang Haibin"></mt-header> 
        </div>
    `,
    data: function () {
        return {
            banners: [],
            in_theaters: [],
            coming_soon: [],            
        }
    },
    mounted: function () {
        var that = this;
        this.$jsonp({
            url: 'https://api.douban.com/v2/movie/in_theaters',
            callback: function (response) {
                that.banners = response.subjects.slice(0, 5);
            }
        });
        this.$jsonp({
            url: 'https://api.douban.com/v2/movie/in_theaters',
            callback: function (response) {
                that.in_theaters = response.subjects.slice(5);
            }
        });
        this.$jsonp({
            url: 'https://api.douban.com/v2/movie/coming_soon',
            callback: function (response) {
                that.coming_soon = response.subjects.slice(0, 20);
            }
        });
    },
});

// 搜索页
Vue.component('search', {
    template: `
        <div class="search">
            <div class="search-input">
                <mt-search v-model="value" cancel-text="取消" placeholder="搜索"></mt-search>
            </div>
            <div class="tag-box">
                <div class="tag" v-for="tag in tagArr">
                    <mt-button type="primary">{{ tag }}</mt-button>
                </div>
            </div>
        </div>
    `,
    data: function () {
        return {
            value: '',
            tagArr: ['经典', '冷门佳片', '豆瓣高分', '动作', '喜剧', '爱情', '悬疑', '恐怖', '科幻', 
            '治愈', '文艺', '成长', '动画 ', '华语', '欧美', '韩国', '日本'],
        }
    }
});

// 电影详情页
Vue.component('movie', {

});

// 影人详情页
Vue.component('person', {

});

// 搜索结果列表
Vue.component('list', {

});