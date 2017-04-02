import mutation from './mutations-types';
import main from './modules/main';
export default new Vuex.Store({
    modules:{
        main  //多store模块
    },
    state:{  //状态数据
        bid:''
    },
    mutations:{  //接收commit改变state，只能同步
        [mutation.SET_BID](state,bid){  //使用常量作为属性名
            state.bid=bid;
        }
    },
    actions:{  //用于提交commit触发mutations,可异步
        setbid({commit},bid){
            sessionStorage.setItem('bid',bid);  //在sessionStorage中存储Bid,防止页面刷新后vuex数据状态初始化
            commit(mutation.SET_BID,bid);
        }
    },
    getters:{  //store计算属性，共用函数
        bid:(state)=>{
            if(state.bid===''){
                return sessionStorage.getItem('bid');
            }else{
                return state.bid;
            }
        }
    }
})