const store =  new Vuex.Store({
    state: {
        movie: {},
        person: {},
        movieList: [],
        url: '',
        getSearchVal: ''
    },
    mutations: {
        getMovie: function (state, movie) {
            state.movie = movie;
        },
        getPerson: function (state, person) {
            state.person = person; 
        },
        getMovieList: function (state, list) {
            state.movieList = list;
        },
        getUrl: function (state, url) {
            state.url = url;
        },
        getSearchVal: function (state, val) {
            state.searchVal = val;
        }
    },
});