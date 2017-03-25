<template>
    <div>
        <header>
            <div class="top">登录AcFun-Crawler</div>
        </header>
        <div class="main">
            <el-input class="name" v-model="name" placeholder="请输入账号" :autofocus="true"></el-input>
            <el-input class="password" v-model="password" placeholder="请输入密码"></el-input>
        </div>
        <div class="buttons">
            <el-button class="login" type="primary" size="large" @click="login">登录</el-button>
            <el-button class="reg" type="primary" size="large" @click="reg">注册</el-button>
        </div>
        <div class="footer">
            <a class="p-bottom">忘记密码？</a>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                name:'',
                password:''
            }
        },
        methods:{
            login(){
                return;
            },
            reg(){
                this.$router.push({path:'reg'})
            }
        }
    }
</script>
<style lang="less" scoped>
    header{
        width:100%;
        height:30px;
        text-align:center;
        vertical-align: bottom;
        .top{
            width:60%;
            height:100%;
            margin:auto;
            background:url('../../../assets/img/logo_icon.png');
            background-size:29px 26px left;
            background-repeat:no-repeat;
            font-size:22px;
            text-align:right;
            font-weight:800;
            color:#666;
        }
    }
    .main{
        width:80%;
        margin:auto;
        margin-top:20px;
        margin-bottom:20px;

        .name{
            margin-bottom:20px;
        }
    }
    .buttons{
        width:80%;
        height:auto;
        margin:auto;

        .login{
            float:left;
            width:40%;
            background-color:#67BDCD;
            border-radius:0;
            border:none;
        }
        .reg{
            float:right;
            width:40%;
            background-color:white;
            border-radius:0;
            border:1px #BBBBBB solid;
            color:#666;
        }
    }
    .footer{
        width:80%;
        margin:auto;
        margin-top:80px;
        text-align:right;
    }
</style>