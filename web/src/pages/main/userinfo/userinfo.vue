<template>
    <div>
        <h1>个人资料</h1>
        <div class="content">
            <span style="margin-left:650px; color:#1D8CE0">点击上传头像</span>
            <div class="form">
                <el-card class="box-card">
                    <div>
                        <span>用户名：{{username}}</span>
                        <span class="el-icon-edit edit"></span>
                    </div>
                    <div>
                        <span>昵称：{{nickname}}</span>
                        <span class="el-icon-edit edit"></span>
                    </div>
                    <div>
                        <span>签名：{{signature}}</span>
                        <span class="el-icon-edit edit"></span>
                    </div>
                </el-card>
            </div>
            <div class="avatar-uploader" @click="upload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </div>
        </div>
    </div>
</template>    
<script>
    export default{
        data(){
            return {
                imageUrl:'',
                nickname:'',
                username:'',
                signature:''
            }
        },
        methods:{
            upload(){

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

                    .edit{
                        float:right;
                        font-size:12px;
                        color:#1D8CE0;
                        cursor:pointer;
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