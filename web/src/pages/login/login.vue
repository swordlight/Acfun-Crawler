<template>
    <div>
        <header>
            <div class="top">登录AcFun-Crawler</div>
        </header>
        <div class="main">
            <el-form :model="loginrule" :rules="rule" ref="loginrule" label-width="100px" class="demo-ruleForm">
                <el-form-item prop="name">
                    <el-input type="text" v-model="loginrule.name" auto-complete="off" placeholder="请输入用户名" :autofocus="true"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" v-model="loginrule.password" auto-complete="off" placeholder="请输入密码"></el-input>
                </el-form-item>
            </el-form>
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
    import util from '../../lib/util'
    export default{
        data(){
            var name=(rule,value,callback)=>{
                if(value===''){
                    callback(new Error('请输入用户名'));
                }else{
                    callback();
                }
            };
            var password=(rule,value,callback)=>{
                if(value===''){
                    callback(new Error('请输入密码'));
                }else{
                    callback();
                }
            }
            return{
                loginrule:{
                    name:'',
                    password:''
                },
                rule:{
                    name:[
                        {validator:name,trigger:'blur'}
                    ],
                    password:[
                        {validator:password,trigger:'blur'}
                    ]
                }
            }
        },
        methods:{
            login(){
                var self=this;
                this.$refs.loginrule.validate((valid)=>{
                    if(valid){
                        util.request('login',this.loginrule,function(data){
                            switch (data.state) {
                                case 301:
                                self.$message({
                                    showClose: true,
                                    message: '用户名不存在',
                                    type: 'error'
                                });
                                break;
                                case 302:
                                self.$message({
                                    showClose: true,
                                    message: '密码错误',
                                    type: 'error'
                                });
                                break;
                                case 200:
                                self.$message({
                                    showClose: true,
                                    message: '登陆成功',
                                    type: 'success'
                                });
                                break;
                                default:
                                break;
                            }
                        })
                    }
                })
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