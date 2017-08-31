
// 首页
var home = {
    template: `
        <div class="home">
            <mt-header title="">
                <mt-button slot="left">豆瓣电影</mt-button>
                <mt-button icon="search" slot="right"></mt-button>
            </mt-header> 
            <div class="list-title">
                <h3>正在热映</h3>
                <a>更多<a>
            </div>
            <div class="swipe-box">
                <mt-swipe :auto="0">
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
                <div class="movie-list-box" v-for="movie in in_theaters">
                    <img :src="movie.images.medium" :alt="movie.title">
                    <p>{{ movie.title }}</p>
                    <p>
                        <span class="star-yellow" v-for="index in Math.round(movie.rating.average / 2)"></span>
                        <span class="star-white" v-for="index in (5 - Math.round(movie.rating.average / 2))"></span>
                    </p>
                </div>
            </div>
            <div class="list-title">
                <h3>即将上映</h3>
                <a>更多<a>
            </div>
            <div class="movie-list">
                <div class="movie-list-box" v-for="movie in coming_soon">
                    <img :src="movie.images.medium" :alt="movie.title">
                    <p>{{ movie.title}}</p>
                    <p>
                        <span class="star-yellow" v-for="index in Math.round(movie.rating.average / 2)"></span>
                        <span class="star-white" v-for="index in (5 - Math.round(movie.rating.average / 2))"></span>
                    </p>
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
                    <p>片名：{{ movie.title}}</p>
                    <p>评分：<span>{{ movie.rating.average }}</sapn></p>
                    <p>导演：{{ movie.directors[0].name }}</p>
                    <p>类型：<span>{{ movie.genres.join('/') }}</sapn></p>
                    <p>主演：<span>{{ movie.casts[0].name}}</span></p>
                </div>
            </div>
            <div class="movie-summary">
                <h4>剧情简介</h4>
                <p>{{ movie.summary }}</p>
            </div>
            <div class="movie-directors">
                <h4>导演</h4>
                <div v-for="director in movie.directors">
                    <img :src="director.avatars.medium" :alt="director.name">
                    <p>{{ director.name }}</p>
                </div>
            </div>
            <div class="movie-casts">
                <h4>主演</h4>
                <div v-for="cast in movie.casts">
                    <img :src="cast.avatars.medium" :alt="cast.name">
                    <p>{{ cast.name }}</p>
                </div>
            </div>
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
            <div class="person-title">
                <div class="person-title-left">
                    <img :src="person.avatars.medium" :alt="person.name">
                </div>
                <div class="person-title-right">
                    <p>中文名：{{ person.name }}</p>
                    <p>英文名：<span>{{ person.name_en }}</sapn></p>
                    <p>性别：{{ person.gender }}</p>
                    <p>出生地：<span>{{ person.born_place }}</sapn></p>
                </div>
            </div>
            <div class="works-list">
                <h4>作品列表</h4>
                <div v-for="work in person.works">
                    <img :src="work.subject.images.medium" :alt="work.subject.title" />
                    <p>{{ work.subject.title }}</p>
                    <p>{{ work.roles[0] }}</p>
                <div>
            </div>
        </div>
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
            <mt-header :title="电影列表">
                <mt-button icon="back" slot="left">返回</mt-button>
                <mt-button icon="more" slot="right"></mt-button>
            </mt-header>
            <div class="all-list">
                <div>
                    <div class="coming-soon-movie" v-for="movie in coming_soon">
                        <img :src="movie.images.medium" :alt="movie.title">
                        <p>{{ movie.title}}</p>
                        <p>
                            <span class="star-yellow" v-for="index in Math.round(movie.rating.average / 2)"></span>
                            <span class="star-white" v-for="index in (5 - Math.round(movie.rating.average / 2))"></span>
                        </p>
                    </div>
                <div>
            </div>
        </div>
    `,
};

// 我的详情页
var me = {
    template: `
        <div class="me">
            
        </div>
    `,
}