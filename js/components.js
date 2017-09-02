// 页脚 
var footer = {
    template: `
        <footer>
            <a href="https://github.com/huanghaibin91">GitHub</a>
        </footer>
    `,
};

// 首页
var home = {
    template: `
        <div class="home">
            <div class="header">
                <a class="logo">豆瓣电影</a>
                <router-link to="/search" class="search-icon">电影搜索</router-link>
            </div> 
            <div class="list-title">
                <p>正在热映</p>
                <router-link to="/list">更多</router-link>
            </div>
            <div class="swipe-box">
                <mt-swipe :auto="4000">
                    <mt-swipe-item v-for="movie in banners">
                        <div class="movie-banner">
                            <div class="movie-banner-left">
                                <img :src="movie.images.large" :alt="movie.title">
                            </div>
                            <div class="movie-banner-right">
                                <p>{{ movie.title }}</p>
                                <p>评分：<span>{{ movie.rating.average }}</sapn></p>
                                <p>导演：{{ movie.directors[0].name }}</p>
                                <p>类型：<span>{{ movie.genres.join('/') }}</sapn></p>
                            </div>
                        </div>
                    </mt-swipe-item>
                </mt-swipe>
            </div>
            <div class="movie-list">
                <router-link tag="div" to="/movie" class="movie-list-box" v-for="movie in in_theaters">
                    <img :src="movie.images.medium" :alt="movie.title">
                    <p>{{ movie.title }}</p>
                    <p>
                        <span class="star-yellow" v-for="index in Math.round(movie.rating.average / 2)"></span>
                        <span class="star-white" v-for="index in (5 - Math.round(movie.rating.average / 2))"></span>
                    </p>
                </router-link>
            </div>
            <div class="list-title">
                <p>即将上映</p>
                <router-link to="/list">更多</router-link>
            </div>
            <div class="movie-list">
                <router-link tag="div" to="/movie" class="movie-list-box" v-for="movie in coming_soon">
                    <img :src="movie.images.medium" :alt="movie.title">
                    <p>{{ movie.title}}</p>
                    <p>
                        <span class="star-yellow" v-for="index in Math.round(movie.rating.average / 2)"></span>
                        <span class="star-white" v-for="index in (5 - Math.round(movie.rating.average / 2))"></span>
                    </p>
                </router-link>
            </div>
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
                that.banners = response.subjects.slice(0, 4);
            }
        });
        this.$jsonp({
            url: 'https://api.douban.com/v2/movie/in_theaters',
            callback: function (response) {
                that.in_theaters = response.subjects.slice(4);
            }
        });
        this.$jsonp({
            url: 'https://api.douban.com/v2/movie/coming_soon',
            callback: function (response) {
                that.coming_soon = response.subjects.slice(0, 20);
            }
        });
    },
};

// 搜索页
var search = {
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
};

// 电影详情页
var movie = {
    template: `
        <div class="movie">
            <mt-header :title="movie.title">
                <mt-button icon="back" slot="left">返回</mt-button>
                <mt-button icon="more" slot="right"></mt-button>
            </mt-header> 
            <div class="movie-banner">
                <div class="movie-banner-left">
                    <img :src="movie.images.large" :alt="movie.title">
                </div>
                <div class="movie-banner-right">
                    <p>{{ movie.title}}</p>
                    <p>评分：<span>{{ movie.rating.average }}</sapn></p>
                    <p>导演：<span>{{ movie.directors[0].name }}</span></p>
                    <p>类型：<span>{{ movie.genres.join('/') }}</sapn></p>
                    <p>主演：<span>{{ movie.casts[0].name}}</span></p>
                </div>
            </div>
            <div class="movie-summary">
                <h4>剧情简介</h4>
                <p>{{ movie.summary }}</p>
            </div>
            <router-link tag="div" to="/person" class="movie-directors">
                <h4>导演</h4>
                <div class="movie-list">
                    <div v-for="director in movie.directors">
                        <img :src="director.avatars.medium" :alt="director.name">
                        <p>{{ director.name }}</p>
                    </div>
                </div>
            </router-link>
            <router-link tag="div" to="/person" class="movie-casts">
                <h4>主演</h4>
                <div class="movie-list">
                    <div class="movie-list-box" v-for="cast in movie.casts">
                        <img :src="cast.avatars.medium" :alt="cast.name">
                        <p>{{ cast.name }}</p>
                    </div>
                </div>
            </router-link>
        <div>
    `,
    data: function () {
        return {
            movie: '',
        }
    },
    mounted: function () {
        var that = this;
        this.$jsonp({
            url: 'https://api.douban.com/v2/movie/subject/1764796',
            callback: function (response) {
                that.movie = response;
            }
        });
    }
};

// 影人详情页
var person = {
    template: `
        <div class="person">
            <mt-header :title="person.name">
                <mt-button icon="back" slot="left">返回</mt-button>
                <mt-button icon="more" slot="right"></mt-button>
            </mt-header>
            <div class="movie-banner">
                <div class="movie-banner-left">
                    <img :src="person.avatars.medium" :alt="person.name">
                </div>
                <div class="movie-banner-right">
                    <p>{{ person.name }}</p>
                    <p>英文名：<span>{{ person.name_en }}</sapn></p>
                    <p>性别：{{ person.gender }}</p>
                    <p>出生地：<span>{{ person.born_place }}</sapn></p>
                </div>
            </div>
            <div class="works-list">
                <h4>个人作品</h4>
                <router-link tag="div" to="/movie" class="movie-list">
                    <div class="movie-list-box" v-for="work in person.works">
                        <img :src="work.subject.images.medium" :alt="work.subject.title" />
                        <p>{{ work.subject.title }}</p>
                        <p>{{ work.roles[0] }}</p>
                    <div>
                </div>
            </div>
        </router-link>
    `,
    data: function () {
        return {
            person: '',
        }
    },
    mounted: function () {
        var that = this;
        this.$jsonp({
            url: 'https://api.douban.com/v2/movie/celebrity/1054395',
            callback: function (response) {
                that.person = response;
            } 
        });
    }
};

// 搜索结果列表
var list = {
    template: `
        <div class="list">
            <mt-header title="电影列表">
                <mt-button icon="back" slot="left">返回</mt-button>
                <mt-button icon="more" slot="right"></mt-button>
            </mt-header>
            <div class="movie-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
                <div class="movie-list-box" v-for="movie in movie_list">
                    <img :src="movie.images.medium" :alt="movie.title">
                    <p>{{ movie.title}}</p>
                    <p>
                        <span class="star-yellow" v-for="index in Math.round(movie.rating.average / 2)"></span>
                        <span class="star-white" v-for="index in (5 - Math.round(movie.rating.average / 2))"></span>
                    </p>
                </div>
            </div>
            <mt-spinner v-if="load_flag" color="#26a2ff" type="triple-bounce"></mt-spinner>
        </div>
    `,
    data: function () {
        return {
            movie_list: [],
            start: 20,
            load_flag: false
        }
    },
    mounted: function () {
        var that = this;
        this.$jsonp({
            url: 'https://api.douban.com/v2/movie/top250',
            callback: function (response) {
                that.movie_list = response.subjects;
            }
        });
    },
    methods: {
        loadMore: function () {
            var that = this;
            this.loading = true;
            this.load_flag = true;
            this.$jsonp({
                url: 'https://api.douban.com/v2/movie/top250',
                data: {
                    start: that.start
                },
                callback: function (response) {
                    that.movie_list = that.movie_list.concat(response.subjects);
                    this.load_flag = false;
                }
            });
            this.start += 20;
            this.loading = false;
        }
    }
};

// 我的详情页
var me = {
    template: `
        <div class="me">
            
        </div>
    `,
}