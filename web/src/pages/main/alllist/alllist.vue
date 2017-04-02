<template>
    <div class="content">
        <div v-for="(item,index) in alllist" class="item" @click="lookarticle(index)">
            <a href="javascript:void(null)" class="title">{{item.title}}</a>
            <el-breadcrumb class="des">
                <el-breadcrumb-item class="author">作者{{item.author}}</el-breadcrumb-item>
                <el-breadcrumb-item class="timestamp">时间{{item.timestamp}}</el-breadcrumb-item>
                <el-breadcrumb-item class="comment">{{item.comment}}个评论</el-breadcrumb-item>
                <el-breadcrumb-item class="viewnumber">{{item.viewnumber}}次阅读</el-breadcrumb-item>
            </el-breadcrumb>
            <p class="subtitle">{{item.subtitle}}</p>
        </div>
    </div>
</template>
<script>
    import util from '../../../lib/util'
    export default{
        data(){
            return{
                alllist:[
                    {title:'主标题',author:'赵大树',timestamp:'2017年3月30日',viewnumber:'20',comment:'300',subtitle:'副标题'},
                    {title:'主标题',author:'赵大树',timestamp:'2017年3月30日',viewnumber:'20',comment:'300',subtitle:'副标题'},
                    {title:'主标题',author:'赵大树',timestamp:'2017年3月30日',viewnumber:'20',comment:'300',subtitle:'副标题'},
                    {title:'主标题',author:'赵大树',timestamp:'2017年3月30日',viewnumber:'20',comment:'300',subtitle:'副标题'},
                    {title:'主标题',author:'赵大树',timestamp:'2017年3月30日',viewnumber:'20',comment:'300',subtitle:'副标题'},
                    {title:'主标题',author:'赵大树',timestamp:'2017年3月30日',viewnumber:'20',comment:'300',subtitle:'副标题'},
                    {title:'主标题',author:'赵大树',timestamp:'2017年3月30日',viewnumber:'20',comment:'300',subtitle:'副标题'},
                    {title:'主标题',author:'赵大树',timestamp:'2017年3月30日',viewnumber:'20',comment:'300',subtitle:'副标题'}
                ]
            }
        },
        created(){
            let self=this;
            util.request('alllist',{},function(data){
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