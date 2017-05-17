<template>
    <div>
        <header>
            <img src="../../../../assets/img/blogtop.gif" alt="博客">
            <h1>{{blog.title}}</h1>
            <span>{{blog.viewnumber}}围观·{{blog.comment}}评论· / 发布于 {{blog.timestamp | formatTime}}</span>
        </header>
        <article>
            <p v-for="p in blog.content">&nbsp;&nbsp;{{p}}</p>
        </article>
        <footer>
            <div>
                <img src="../../../../assets/img/poster.gif" :alt="blog.author">
                <p>{{blog.author}}</p>
            </div>
        </footer>
        <div class="comments">
            <div class="comment-top">
                <el-button type="primary" size="small" @click="clickComment">我要评论</el-button>
                <div class="article" v-if="isComment">
                    <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 10}" placeholder="请输入内容" v-model="comment">
                    </el-input>
                    <el-button type="danger" size="small" @click="cancel">取消</el-button>
                    <el-button type="success" size="small" @click="publish">提交</el-button>
                </div>
            </div>
            <div v-for="(item,index) in comments" class="comment">
                <div class="comment_poster">
                    <img src="../../../../assets/img/biaoqing.gif" alt="评论">
                </div>
                <div class="comment_time">
                    <p>发表于 {{item.timestamp | formatTime}}</p>
                </div>
                <div class="comment_info">
                    <p class="comment_name">{{item.name}}</p>
                    <p class="comment_content" v-for="comment_p in item.info">{{comment_p}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {request,timetransform} from '../../../lib/util';
    export default{
        data(){
            return{
                blog:{},
                comments:[],
                comment:'',
                isComment:false
            }
        },
        mounted(){
            let self=this;
            let bid=this.$store.getters.bid;
            request('content',{bid:bid},self,function(data){
                if(data.state===200){
                    data.data.content=data.data.content.split('\n');
                    self.blog=data.data;
                    request('comments',{bid:bid},self,function(data){
                        if(data.state===200){
                            self.comments=data.data;
                            self.comments.forEach(function(e,index){
                                e.info=e.info.split('\n');                                                                     
                            })
                        }
                    })
                }
            })
        },
        methods:{
            clickComment(){
                this.isComment=true;
            },
            publish(){
                var self=this;
                var bid=this.$store.getters.bid;
                request('comment',{bid:bid,comment:self.comment},self,function(data){
                    if(data.state===200){
                        self.$message.success('评论成功');
                        request('comments',{bid:bid},self,function(data){
                            if(data.state===200){
                                self.comments=data.data;
                                self.comments.forEach(function(e,index){
                                    if(e.info.indexOf('\n')){
                                        e.info=e.info.split('\n');                                                                     
                                    };
                                })
                            }
                        })
                    }
                })
            },
            cancel(){
                this.comment='';
                this.isComment=false;
            }
        }
    }
</script>
<style lang="less" scoped>
    header{
        height:115px;
        border-bottom:1px solid #ddd;

        img{
            max-height:40px;
            margin-top:10px;
        }
        h1{
            font-size:24px;
            font-weight:bold;
            margin:5px 0 10px;
        }
        span{
            font-size:13px;
            color:#aaa3a0;
        }
    }
    article{
        font-size:16px;
        border-bottom:1px solid #ddd;

        p{
            line-height:200%;
        }
    }
    footer{
        height:80px;

        div{
            float:right;
            margin-top:20px;
            margin-right:50px;

            img{
                float:left;
                width:40px;
                border-radius:50%;
                cursor:pointer;
            }
            p{
                margin-left:50px;
                font-size:14px;
                color:#322;
                cursor:pointer;
                text-overflow:ellipsis;
                white-space:nowrap;
            }
            p:hover{
                color:#c66;
            }
        }
    }
    .comments{
        border-top:1px solid #ddd;
        padding-top:20px;

        .comment-top{
            margin-bottom:20px;
            .article{
                text-align:right;
                margin-bottom:20px;    
                margin-top:10px;        
            }
        }
        .comment{
            border-top:1px solid #ddd;

            .comment_poster{
                float:left;
                width:80px;

                img{
                    max-height:80px;
                }
            }
            .comment_info{
                margin-left:100px;
                margin-right:180px;

                .comment_name{
                    color:#aaa;
                    font-size:12px;
                }
                .comment_content{
                    font-size:13px;
                    margin-left:20px;
                }
            }
            .comment_time{
                float:right;
                color:#aaa;
                font-size:13px;
            }
        }
    }
    
</style>