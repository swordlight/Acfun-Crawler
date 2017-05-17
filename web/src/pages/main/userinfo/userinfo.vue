<template>
    <div>
        <h1>个人资料</h1>
        <div class="content">
            <span style="margin-left:650px; color:#1D8CE0">点击上传头像</span>
            <div class="form">
                <el-card class="box-card">
                    <div>
                        <span class="label">用户名：</span>
                        <span v-show="ifuser" class="value">{{userinfo.username}}</span>
                        <el-input class="input" v-show="!ifuser" v-model="upinfo.username" @blur="upuser" style="width:100px;"></el-input>
                        <span class="el-icon-edit edit" @click="edituser"></span>
                    </div>
                    <div>
                        <span class="label">昵称：</span>
                        <span v-show="ifnick" class="value">{{userinfo.nickname}}</span>
                        <el-input class="input" v-show="!ifnick" v-model="upinfo.nickname" @blur="upnick" style="width:100px;"></el-input>
                        <span class="el-icon-edit edit" @click="editnick"></span>
                    </div>
                    <div>
                        <span class="label">签名：</span>
                        <span v-show="ifsign" class="value">{{userinfo.signature}}</span>
                        <el-input class="input" v-show="!ifsign" v-model="upinfo.signature" @blur="upsign" style="width:200px;"></el-input>
                        <span class="el-icon-edit edit" @click="editsign"></span>
                    </div>
                </el-card>
            </div>
            <div class="avatar-uploader" @click="upload">
                <img v-if="isposter" :src="upinfo.poster" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </div>
        </div>
    </div>
</template>    
<script>
    import {request} from '../../../lib/util'
    export default{
        data(){
            return {
                userinfo:{
                    username:'未登录',
                    nickname:'未登录',
                    signature:'未登录',
                    poster:''
                },
                upinfo:{},
                ifuser:true,
                ifnick:true,
                ifsign:true,
                isposter:true
            }
        },
        mounted(){
            request('getuserinfo',{},this,data=>{
                if(data.state===200 && data.data){
                    this.userinfo=data.data;
                    var ob={}
                    Object.keys(this.userinfo).forEach((key)=>{
                        ob[key]=this.userinfo[key];
                    })
                    this.upinfo=ob;
                };
            })
        },
        methods:{
            upload(){
                var self=this;
                var up=document.createElement('input');  //模拟一个文件框
                up.type="file";
                up.click();
                up.addEventListener('change',()=>{
                    if(typeof FileReader == 'undefined'){  
                        alert('垃圾浏览器，赶紧滚去升级吧');
                    }else{
                        if(up.files[0].size>=2*1024*1024){
                            alert('只接受小于2MB的图片');
                        }else{
                            self.isposter=false;
                            var read=new FileReader();
                            read.readAsDataURL(up.files[0])
                            read.onload=(e)=>{
                                request('edituserinfo',{poster:e.target.result},self,(data)=>{
                                    if(data.state===200){
                                        self.$message.success('图片上传成功');
                                        self.upinfo.poster=e.target.result;
                                        self.isposter=true;
                                        self.$store.dispatch('getuserinfo');
                                    }
                                })
                            }
                        }
                        // request('edituserinfo',{poster:up.files[0]},self,(data)=>{
                        //     if(data.state===200){
                        //         self.$message.success('图片上传成功');
                        //         self.upinfo.poster=data.data.poster;
                        //         self.isposter=true;
                        //         self.$store.dispatch('getuserinfo');
                        //     }
                        // })
                    }; 
                },false)
            },
            edituser(){
                this.ifnick=true;
                this.ifsign=true;
                if(this.ifuser){
                    this.ifuser=false;
                }else{
                    this.ifuser=true;
                }
            },
            editnick(){
                this.ifuser=true;
                this.ifsign=true;
                if(this.ifnick){
                    this.ifnick=false;
                }else{
                    this.ifnick=true;
                }
            },
            editsign(){
                this.ifuser=true;
                this.ifnick=true;
                if(this.ifsign){
                    this.ifsign=false;
                }else{
                    this.ifsign=true;
                }
            },
            upuser(){
                if(this.upinfo.username && this.upinfo.username!==this.userinfo.username){
                    request('edituserinfo',{username:this.upinfo.username},this,data=>{
                        if(data.state===200){
                            this.$message.success('修改用户名成功');
                            this.userinfo.username=this.upinfo.username;
                            this.ifuser=true;
                            this.$store.dispatch('getuserinfo');
                        }else if(data.state===10001){
                            this.$message.error('用户名已被占用');
                            this.ifuser=true;
                        }else{
                            this.$message.error('修改用户名失败');
                            this.ifuser=true;
                        };
                    })
                }else{
                    this.ifuser=true;
                };
            },
            upnick(){
                if(this.upinfo.nickname && this.upinfo.nickname!==this.userinfo.nickname){
                    request('edituserinfo',{nickname:this.upinfo.nickname},this,data=>{
                        if(data.state===200){
                            this.$message.success('修改昵称成功');
                            this.userinfo.nickname=this.upinfo.nickname;
                            this.ifnick=true;
                        }else{
                            this.$message.error('修改昵称失败');
                            this.ifnick=true;
                        };
                    })
                }else{
                    this.ifnick=true;
                }
            },
            upsign(){
                if(this.upinfo.signature && this.upinfo.signature!==this.userinfo.signature){
                    request('edituserinfo',{signature:this.upinfo.signature},this,data=>{
                        if(data.state===200){
                            this.$message.success('修改签名成功');
                            this.userinfo.signature=this.upinfo.signature;
                            this.ifsign=true;
                        }else{
                            this.$message.error('修改签名失败');
                            this.ifsign=true;
                        };
                    })
                }else{
                    this.ifsign=true;
                }
            }
        }
    }
</script>
<style scoped lang="less">
    h1{
        width:100px;
        margin:50px auto;
        color:#1D8CE0;
    }
    .content{
        margin-top:100px;
        .form{
            width:600px;
            float:left;
            .box-card{
                width:480px;
                height:300px;
                font-size:16px;
                div{
                    margin-top:20px;
                    position:relative;
                    height:50px;
                    .label{
                        position:absolute;
                        left:0;
                        line-height:50px;
                    }
                    .value{
                        position:absolute;
                        left:60px;
                        line-height:50px;
                    }
                    .input{
                        position:absolute;
                        margin:auto;
                        left:60px;
                        height:50px;
                    }
                    .edit{
                        position:absolute;
                        right:0;
                        line-height:50px;
                        font-size:12px;
                        color:#1D8CE0;
                        cursor:pointer;
                        font-size:18px;
                    }
                }
            }
        }
        .avatar-uploader {
            border: 1px dashed #d9d9d9;
            width:178px;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        .avatar-uploader:hover {
            border-color: #20a0ff;
        }
        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            line-height: 178px;
            text-align: center;
        }
        .avatar {
            width: 178px;
            height: 178px;
            display: block;
        }    
    }
    
</style>