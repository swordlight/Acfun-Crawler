import App from './app';

Vue.use(VueRouter);
const routes=[
    {path:'/alllist',component:require('./alllist/alllist')},
    {path:'/personlist',component:require('./personlist/personlist')},
    {path:'/content',component:require('./content/content')},
    {path:'/',redirect:'/alllist'}
]
var router=new VueRouter({
    routes
})
const app=new Vue({
    router,
    el: '#app',
    template: '<app></app>',
    components: {
        App
    }
})