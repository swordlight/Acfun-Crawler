<template>
    <div class="container">
        <div class="header">

        </div>
        <div class="article">
            <div class="login-img"></div>
            <div class="login-reg">
                <router-view></router-view>
            </div>
        </div>
    </div>                    
</template>
<script>
    export default{
        
    }
</script>
<style lang="less" scoped>
    .container{
        position:relative;
        width:100%;
        height:auto;

        .header{
            width:100%;
            height:48px;
            border-bottom:1px #FFA5C7 solid;
        }

        .article{
            height:400px;
            width:980px;
            margin:auto;
            margin-top:100px;

            .login-img{
                float:left;
                width:420px;
                height:320px;
                background:url('../../../assets/img/login-420-320.jpg');
                background-size:100% 100%;
                background-repeat:no-repeat;
                box-shadow: 0 0 70px 10px rgb(249, 249, 249) inset;
            }
            .login-reg{
                float:right;
                width:40%;
            }
        }
    }
</style>