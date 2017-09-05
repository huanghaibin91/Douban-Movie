
const router =  new VueRouter({
    scrollBehavior (to, from, savedPosition) { 
        return { x: 0, y: 0 }; 
    },
    routes: [
        { path: '/', component: home },
        { path: '/search', component: search },
        { path: '/list/:val', component: list },
        { path: '/movie/:id', component: movie },
        { path: '/person/:id', component: person }
    ]
});