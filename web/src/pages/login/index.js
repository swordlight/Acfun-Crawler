import App from './app';
import store from '../../vuex/store';
import '../../assets/css/all.css';

Vue.use(VueRouter); //调用vuerouter

const routes=[ //创建路由
    {path:'/login',component:require('./login')},
    {path:'/reg',component:require('./reg')},
    {path:'/',redirect:'/login'}
]

const router=new VueRouter({  //创建router实例
    routes
})

const app = new Vue({
    router,
    store,
    el: '#app',
    template: '<app></app>',
    components: {
        App
    }
})