// 页脚
Vue.component('h-footer', {
    template: `
        <footer>
            <a href="https://github.com/huanghaibin91">GitHub</a>
        </footer>
    `,
});

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
                <a @click="sendMovieList('in_theaters')">更多</a>
            </div>
            <div class="swipe-box">
                <mt-swipe :auto="4000">
                    <mt-swipe-item v-for="movie in banners">
                        <div class="banner" @click="sendMovie(movie.id)">
                            <div class="banner-left">
                                <img :src="movie.images | imgFilter" :alt="movie.title">
                            </div>
                            <div class="banner-right">
                                <p>{{ movie.title }}</p>
                                <p>评分：<span>{{ movie.rating.average }}</sapn></p>
                                <p>导演：{{ movie.directors[0].name }}</p>
                                <p>类型：<span>{{ movie.genres.join('/') }}</sapn></p>
                            </div>
                        </div>
                    </mt-swipe-item>
                </mt-swipe>
            </div>
            <div class="content-list">
                <div @click="sendMovie(movie.id)" class="content-list-box" v-for="movie in in_theaters">
                    <img :src="movie.images | imgFilter" :alt="movie.title">
                    <p>{{ movie.title }}</p>
                    <p>
                        <span class="star-yellow" v-for="index in Math.round(movie.rating.average / 2)"></span>
                        <span class="star-white" v-for="index in (5 - Math.round(movie.rating.average / 2))"></span>
                    </p>
                </div>
            </div>
            <div class="list-title">
                <p>即将上映</p>
                <a @click="sendMovieList('coming_soon')">更多</a>
            </div>
            <div class="content-list">
                <div @click="sendMovie(movie.id)" class="content-list-box" v-for="movie in coming_soon">
                    <img :src="movie.images | imgFilter" :alt="movie.title">
                    <p>{{ movie.title}}</p>
                    <p>
                        <span class="star-yellow" v-for="index in Math.round(movie.rating.average / 2)"></span>
                        <span class="star-white" v-for="index in (5 - Math.round(movie.rating.average / 2))"></span>
                    </p>
                </div>
            </div>
            <h-footer></h-footer>
        </div>
    `,
    data: function () {
        return {
            banners: [],
            in_theaters: [],
            coming_soon: [],            
        }
    },
    created: function () {
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
    methods: {
        sendMovie: function (id) {
            var that = this;
            this.$jsonp({
                url: 'https://api.douban.com/v2/movie/subject/' + id,
                callback: function (response) {
                    store.commit('getMovie', response);
                    router.push({
                        path: '/movie/' + id
                    })
                }
            });
        },
        sendMovieList: function (name) {
            var that = this;
            if (name === 'coming_soon') {
                store.commit('getSearchVal', '即将上映');
            } else {
                store.commit('getSearchVal', '正在热映');
            }
            var url = 'https://api.douban.com/v2/movie/' + name
            store.commit('getUrl', url);
            this.$jsonp({
                url: url,
                callback: function (response) {
                    store.commit('getMovieList', response.subjects);
                    router.push({
                        path: '/list/' + name
                    });
                }
            });
        }
    }
};

// 搜索页
var search = {
    template: `
        <div class="search">
            <div class="search-input">
                <mt-search v-model="value" @keyup.enter.native="sendMovieList(true, value)" cancel-text="取消" placeholder="搜索"></mt-search>
            </div>
            <div class="tag-box">
                <div class="tag" v-for="(tag, index) in tagArr">
                    <a @click="sendMovieList(false, tag)" :style="{color: colorArr[index]}" to="/list">
                        {{ tag }}
                    </a>
                </div>
            </div>
        </div>
    `,
    data: function () {
        return {
            value: '',
            tagArr: ['经典', '动作', '喜剧', '爱情', '悬疑', '恐怖', '科幻', 
            '治愈', '文艺', '成长', '动画 ', '华语', '欧美', '韩国', '日本', '冷门佳片', '豆瓣高分'],
            colorArr: ['rgb(35, 132, 232)', 'rgb(122, 106, 219)', 'rgb(159, 120, 96)', 'rgb(230, 70, 126)', 
            'rgb(42, 184, 204)', 'rgb(42, 184, 204)', 'rgb(244, 143, 46)', 'rgb(159, 120, 96)', 'rgb(87, 116, 197)', 
            'rgb(225, 100, 77)', 'rgb(89, 108, 221)', 'rgb(64, 207, 169)', 'rgb(122, 106, 219)', 'rgb(66, 189, 86)',
            'rgb(230, 70, 126)', 'rgb(244, 143, 46)', 'rgb(42, 184, 204)']
        }
    },
    methods: {
        sendMovieList: function (flag, val) {
            var that = this;
            var data = null;
            var url  = 'https://api.douban.com/v2/movie/search?';
            if (flag) {
                data = {q: val};
                url = url + 'q=' + encodeURIComponent(val);
            } else {
                data = {tag: val};
                url = url + 'tag=' + encodeURIComponent(val);
            }
            store.commit('getSearchVal', val);
            store.commit('getUrl', url);
            this.$jsonp({
                url: 'https://api.douban.com/v2/movie/search',
                data: data,
                callback: function (response) {
                    store.commit('getMovieList', response.subjects);
                    router.push({
                        path: '/list/' + val
                    });
                }
            });
        }
    }
};

// 电影详情页
var movie = {
    template: `
        <div class="movie">
            <mt-header :title="movie.title">
                <mt-button @click.native="goBack" icon="back" slot="left">返回</mt-button>
                <mt-button @click.native="goHome" icon="more" slot="right"></mt-button>
            </mt-header> 
            <div class="banner">
                <div class="banner-left">
                    <img :src="movie.images | imgFilter" :alt="movie.title">
                </div>
                <div class="banner-right">
                    <p>{{ movie.title}}</p>
                    <p>评分：<span>{{ movie.rating.average }}</sapn></p>
                    <p>导演：<span>{{ movie.directors[0].name }}</span></p>
                    <p>类型：<span>{{ movie.genres.join('/') }}</sapn></p>
                    <p>上映时间：<span>{{ movie.year }}</span></p>
                </div>
            </div>
            <div class="movie-summary">
                <h4>剧情简介</h4>
                <p>{{ movie.summary }}</p>
            </div>
            <div class="movie-directors">
                <h4>导演</h4>
                <div class="content-list">
                    <div @click="sendPerson(director.id)" v-for="director in movie.directors">
                        <img :src="director.avatars | imgFilter" :alt="director.name">
                        <p>{{ director.name }}</p>
                    </div>
                </div>
            </div>
            <div class="movie-casts">
                <h4>主演</h4>
                <div class="content-list">
                    <div @click="sendPerson(cast.id)" class="movie-list-box" v-for="cast in movie.casts">
                        <img :src="cast.avatars | imgFilter" :alt="cast.name">
                        <p>{{ cast.name }}</p>
                    </div>
                </div>
            </div>
            <h-footer></h-footer>
        <div>
    `,
    computed: {
        movie: function () {
            return store.state.movie;
        }
    },
    methods: {
        sendPerson: function (id) {
            var that = this;
            this.$jsonp({
                url: 'https://api.douban.com/v2/movie/celebrity/' + id,
                callback: function (response) {
                    store.commit('getPerson', response);
                    router.push({
                        path: '/person/' + id
                    });
                }
            });
        },
        goBack: function () {
            router.go(-1);
        },
        goHome: function () {
            router.push({
                path: '/'
            });
        }
    }
};

// 影人详情页
var person = {
    template: `
        <div class="person">
            <mt-header :title="person.name">
                <mt-button @click.native="goBack" icon="back" slot="left">返回</mt-button>
                <mt-button @click.native="goHome" icon="more" slot="right"></mt-button>
            </mt-header>
            <div class="banner">
                <div class="banner-left">
                    <img :src="person.avatars | imgFilter" :alt="person.name">
                </div>
                <div class="banner-right">
                    <p>{{ person.name }}</p>
                    <p>英文名：<span>{{ person.name_en }}</span></p>
                    <p>性别：{{ person.gender }}</p>
                    <p>出生地：<span>{{ person.born_place }}</sapn></p>
                </div>
            </div>
            <div class="works-list">
                <h4>个人作品</h4>
                <div class="content-list">
                    <div @click="sendMovie(work.subject.id)" class="contentlist-box" v-for="work in person.works">
                        <img :src="work.subject.images | imgFilter" :alt="work.subject.title" />
                        <p>{{ work.subject.title }}</p>
                        <p>{{ work.roles[0] }}</p>
                    </div>
                </div>
            </div>
            <h-footer></h-footer>
        </div>
    `,
    computed: {
        person: function () {
            return store.state.person;
        }
    },
    methods: {
        sendMovie: function (id) {
            console.log(id);
            var that = this;
            this.$jsonp({
                url: 'https://api.douban.com/v2/movie/subject/' + id,
                callback: function (response) {
                    store.commit('getMovie', response);
                    router.push({
                        path: '/movie/' + id
                    });
                }
            });
        },
        goBack: function () {
            router.go(-1);
        },
        goHome: function () {
            router.push({
                path: '/'
            });
        }
    }
};

// 搜索结果列表
var list = {
    template: `
        <div class="list">
            <mt-header :title="searchVal">
                <mt-button @click.native="goBack" icon="back" slot="left">返回</mt-button>
                <mt-button @click.native="goHome" icon="more" slot="right"></mt-button>
            </mt-header>
            <div class="content-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="500">
                <div @click="sendMovie(movie.id)" class="content-list-box" v-for="movie in movie_list">
                    <img :src="movie.images | imgFilter" :alt="movie.title">
                    <p>{{ movie.title}}</p>
                    <p>
                        <span class="star-yellow" v-for="index in Math.round(movie.rating.average / 2)"></span>
                        <span class="star-white" v-for="index in (5 - Math.round(movie.rating.average / 2))"></span>
                    </p>
                </div>
            </div>
            <mt-spinner v-if="load_flag" color="#26a2ff" type="triple-bounce"></mt-spinner>
            <h-footer></h-footer>
        </div>
    `,
    data: function () {
        return {
            start: 20,
            load_flag: false
        }
    },
    computed: {
        movie_list: function () {
            return store.state.movieList;
        },
        url: function () {
            return store.state.url;
        },
        searchVal: function () {
            return store.state.searchVal;
        }
    },
    methods: {
        loadMore: function () {
            console.log('hello');
            var that = this;
            this.loading = true;
            this.load_flag = true;
            setTimeout(function () {
                that.$jsonp({
                    url: that.url,
                    data: {
                        start: that.start
                    },
                    callback: function (response) {
                        var movie_list = that.movie_list.concat(response.subjects);
                        store.commit('getMovieList', movie_list);
                        that.load_flag = false;
                        this.start += 20;
                        this.loading = false;
                    }
                });
            }, 2500)
        },
        sendMovie: function (id) {
            var that = this;
            this.$jsonp({
                url: 'https://api.douban.com/v2/movie/subject/' + id,
                callback: function (response) {
                    store.commit('getMovie', response);
                    router.push({
                        path: '/movie/' + id
                    });
                }
            });
        },
        goBack: function () {
            router.go(-1);
        },
        goHome: function () {
            router.push({
                path: '/'
            });
        }
    }
};
