import App from './app';
import store from '../../vuex/store';
import '../../assets/css/all.css';

Vue.use(VueRouter);

Vue.filter('formatTime', function (value) {
    return new Date(value).toLocaleString().replace(/\//g, "-");
})

const routes=[
    {path:'/alllist',component:require('./alllist/alllist')},
    {path:'/personlist',component:require('./personlist/personlist')},
    {path:'/content',component:require('./content/content')},
    {path:'/userinfo',component:require('./userinfo/userinfo')},
    {path:'/',redirect:'/alllist'}
]
var router=new VueRouter({
    routes
})
const app=new Vue({
    router,
    store,
    el: '#app',
    template: '<app></app>',
    components: {
        App
    }
})