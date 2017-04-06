<template>
    <div>
        <header>
            <img src="../../../../assets/img/blogtop.gif" alt="博客">
            <h1>{{blog.title}}</h1>
            <span>{{blog.viewnumber}}围观·{{blog.comment}}评论· / 发布于 {{blog.timestamp}}</span>
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
            <div v-for="(item,index) in comments" class="comment">
                <div class="comment_poster">
                    <img src="../../../../assets/img/biaoqing.gif" alt="评论">
                </div>
                <div class="comment_time">
                    <p>发表于 {{item.timestamp}}</p>
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
                comments:[]
            }
        },
        created(){
            let self=this;
            let bid=this.$store.getters.bid;
            console.log(bid);
            request('content',{bid:bid},function(data){
                if(data.state===200){
                    data.data.content=data.data.content.split('\n');
                    console.log(data.data);
                    self.blog=data.data;
                    request('comments',{bid:bid},function(data){
                        if(data.state===200){
                            self.comments=data.data;
                            self.comments.forEach(function(e,index){
                                e.info=e.info.split('\n');
                                e.timestamp=timetransform(e.timestamp);                                                                        
                            })
                        }
                    })
                }
            })
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
</style>