import mutation from './mutations-types';
import main from './modules/main';
import{request} from '../lib/util'
export default new Vuex.Store({
    modules:{
        main  //多store模块
    },
    state:{  //状态数据
        bid:'',
        userinfo:{
            username:'未登录'
        }
    },
    mutations:{  //接收commit改变state，只能同步
        [mutation.SET_BID](state,bid){  //使用常量作为属性名
            state.bid=bid;
        },
        [mutation.GET_USERINFO](state,userinfo){
            state.userinfo=userinfo;
        }
    },
    actions:{  //用于提交commit触发mutations,可异步
        setbid({commit},bid){
            sessionStorage.setItem('bid',bid);  //在sessionStorage中存储Bid,防止页面刷新后vuex数据状态初始化
            commit(mutation.SET_BID,bid);
        },
        getuserinfo({commit}){
            console.log(1);
            request('getuserinfo',{},new Vue(),data=>{
                if(data.state===200 && data.data){
                    commit(mutation.GET_USERINFO,data.data)
                };
            })
        }
    },
    getters:{  //store计算属性，共用函数
        bid:(state)=>{
            if(state.bid===''){
                return sessionStorage.getItem('bid');
            }else{
                return state.bid;
            }
        },
        userinfo:(state)=>{
            return state.userinfo;
        }
    }
})