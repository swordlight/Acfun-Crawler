<template>
    <div>
        <header>
            <div class="top">注册AcFun-Crawler</div>
        </header>
        <div class="main">
            <el-input class="name" v-model="name" placeholder="请输入账号"></el-input>
            <el-input class="password" v-model="password" placeholder="请输入密码"></el-input>
            <el-input class="check-password" v-model="check_password" placeholder="请再次输入密码"></el-input>
        </div>
        <div class="buttons">
            <el-button class="reg" type="primary" size="large" @click="reg">注册</el-button>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                name:'',
                password:'',
                check_password:''
            }
        },
        methods:{
            reg(){
                return;
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
        .password{
            margin-bottom:20px;
        }
    }
    .buttons{
        width:80%;
        height:auto;
        margin:auto;
        text-align:center;

        .reg{
            width:90%;
            background-color:#67BDCD;
            border-radius:6px;
            border:none;
            color:white;
        }
    }
</style>