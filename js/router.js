
const router =  new VueRouter({
    routes: [
        { path: '/', component: home },
        { path: '/search', component: search },
        { path: '/movie', component: movie },
        { path: '/person', component: person },
        { path: '/list', component: list }
    ]
});