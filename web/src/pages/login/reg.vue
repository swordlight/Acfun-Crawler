<template>
    <div>
        <header>
            <div class="top">注册AcFun-Crawler</div>
        </header>
        <div class="main">
            <el-form :model="regrule" :rules="rule" ref="regrule" label-width="100px" class="demo-ruleForm">
                <el-form-item prop="name">
                    <el-input type="text" v-model="regrule.name" auto-complete="off" placeholder="请输入用户名" :autofocus="true"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" v-model="regrule.password" auto-complete="off" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item prop="check_password">
                    <el-input type="password" v-model="regrule.check_password" auto-complete="off" placeholder="请再次输入密码确认"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div class="buttons">
            <el-button class="reg" type="primary" size="large" @click="reg">注册</el-button>
        </div>
    </div>
</template>
<script>
    import {request} from '../../lib/util';
    export default{
        data(){
            var name=(rule,value,callback)=>{
                if(value===''){
                    callback(new Error('请输入用户名'))
                }else{
                    if(/\s/g.test(value)){
                        callback(new Error('非法字符'));
                    }else{
                        if(value.length<3){
                            callback(new Error('请设置3个以上字符'))
                        }else{
                            callback();
                        }
                    }
                }
            };
            var password=(rule,value,callback)=>{
                if(value===''){
                    callback(new Error('请输入密码'))
                }else{
                    if(/\s/g.test(value)){
                        callback(new Error('非法字符'));
                    }else{
                        if(value.length<3){
                            callback(new Error('请设置3个以上字符'))
                        }else{
                            callback();
                        }
                    }
                }
            };
            var check_password=(rule,value,callback)=>{
                if(value===''){
                    callback(new Error('请再次输入密码'))
                }else{
                    if(value!==this.regrule.password){
                        callback(new Error('两次输入密码不一致'));
                    }
                    callback();
                }
            };
            return{
                regrule:{
                    name:'',
                    password:'',
                    check_password:''
                },
                rule:{
                    name:[
                        {validator:name,trigger:'blur'}
                    ],
                    password:[
                        {validator:password,trigger:'blur'}
                    ],
                    check_password:[
                        {validator:check_password,trigger:'blur'}
                    ]
                }
            }
        },
        methods:{
            reg(){
                var self=this;
                this.$refs['regrule'].validate((valid)=>{
                    if(valid){
                        request('reg',this.regrule,self,function(data){
                            if(data.state===301){
                                self.$message({
                                    showClose: true,
                                    message: '账号已存在',
                                    type: 'error'
                                });
                                self.$refs.regrule.resetFields();  //重置表单
                            }else{
                                if(data.state===200){
                                    self.$message({
                                        showClose: true,
                                        message: '注册成功',
                                        type: 'success'
                                    });
                                    if(data.data.token){
                                        localStorage.setItem('token',data.data.token);
                                    };
                                    setTimeout(function(){
                                        window.location.href='http://localhost:4000/main.html';
                                    },1000);
                                };
                            };
                        })
                    }else{
                        return false;
                    };
                })
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