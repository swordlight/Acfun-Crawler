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
    </div>
</template>
<script>
    import util from '../../../lib/util';
    export default{
        data(){
            return{
                blog:{}
            }
        },
        created(){
            let self=this;
            let bid=this.$store.getters.bid;
            console.log(bid);
            util.request('content',{bid:bid},function(data){
                if(data.state===200){
                    data.data.content=data.data.content.split('\n');
                    self.blog=data.data;
                    console.log(data.data);
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
    }
    footer{
        height:80px;
        border-bottom:1px solid #ddd;

        div{
            width:150px;
            height:100%;
            padding:20px 0;
            float:right;
            
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
</style>