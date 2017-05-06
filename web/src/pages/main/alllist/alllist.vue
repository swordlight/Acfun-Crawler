<template>
    <div class="content">
        <div v-for="(item,index) in alllist" class="item">
            <a href="javascript:void(null)" class="title" @click="lookarticle(index)">{{item.title}}</a>
            <el-breadcrumb class="des">
                <el-breadcrumb-item class="author">作者{{item.author}}</el-breadcrumb-item>
                <el-breadcrumb-item class="timestamp">时间{{item.timestamp | formatTime}}</el-breadcrumb-item>
                <el-breadcrumb-item class="comment">{{item.comment}}个评论</el-breadcrumb-item>
                <el-breadcrumb-item class="viewnumber">{{item.viewnumber}}次阅读</el-breadcrumb-item>
            </el-breadcrumb>
            <p class="subtitle">{{item.subtitle}}</p>
        </div>
    </div>
</template>
<script>
    import {request} from '../../../lib/util'
    export default{
        data(){
            return{
                alllist:[]
            }
        },
        mounted(){
            let self=this;
            request('alllist',{},self,function(data){
                if(data.state===200){
                    self.alllist=data.data;
                }
            })
        },
        methods:{   
            lookarticle(index){
                let self=this;
                let bid=this.alllist[index].bid;
                this.$store.dispatch('setbid',bid);  //修改vuex博客id
                this.$router.push('/content');
            }
        }
    }
</script>
<style lang="less" scoped>
    .content{
        margin-top:30px;
        
        .item{
            margin-top:20px;

            .title{
                margin-top:20px;
                font-size:20px;
                color:#0187c5;
                text-decoration:none;
            }
            a:hover{
                color:#c66;
            }
            .des{
                margin-top:15px;
                margin-left:30px;
            }
            .subtitle{
                font-size:15px;
                margin-top:15px;
                margin-left:30px;
            }
        }
        
    }
    
</style>