<template>
    <div class="content">
        <div style="text-align:center;">
            <h1 style="color:#1D8CE0;">个人中心</h1>
            <el-button type="primary" @click="createBlog=true;">我要写新博客</el-button>
        </div>
        <div v-for="(item,index) in personlist" class="item">
            <a href="javascript:void(null)" class="title" @click="lookarticle(index)">{{item.title}}</a>
            <el-breadcrumb class="des">
                <el-breadcrumb-item class="author">作者{{item.author}}</el-breadcrumb-item>
                <el-breadcrumb-item class="timestamp">时间{{item.timestamp}}</el-breadcrumb-item>
                <el-breadcrumb-item class="comment">{{item.comment}}个评论</el-breadcrumb-item>
                <el-breadcrumb-item class="viewnumber">{{item.viewnumber}}次阅读</el-breadcrumb-item>
            </el-breadcrumb>
            <p class="subtitle">{{item.subtitle}}</p>
        </div>
        <div class="create-card" v-show="createBlog">
            <el-card class="box-card">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
                    <el-form-item label="标题" prop="title">
                        <el-input v-model="ruleForm.title" placeholder="请输入标题"></el-input>
                    </el-form-item>
                    <el-form-item label="副标题" prop="subtitle">
                        <el-input v-model="ruleForm.subtitle" placeholder="请输入副标题"></el-input>
                    </el-form-item>
                    <el-form-item label="博客内容" prop="context">
                        <el-input v-model="ruleForm.context" placeholder="请输入内容" type="textarea" :autosize="{ minRows: 6, maxRows: 8}"></el-input>
                    </el-form-item>
                </el-form>
                <div style="float:right; margin-bottom:20px;">
                    <el-button type="warning" @click="cancel">取消</el-button>
                    <el-button type="success" @click="ok">确定</el-button>
                </div>
            </el-card>
        </div>
    </div>
</template>
<script>
    import {request} from '../../../lib/util'
    export default{
        data(){
            return{
                personlist:[],
                createBlog:false,
                ruleForm:{
                    title:'',
                    subtitle:'',
                    context:''
                },
                rules:{
                    title:[
                        {required:true,message:'标题不能为空',trigger:'blur'}
                    ],
                    subtitle:[
                        {required:true,message:'副标题不能为空',trigger:'blur'}
                    ],
                    context:[
                        {required:true,message:'博客内容不能为空',trigger:'blur'}
                    ]
                }
            }
        },
        created(){
            this.initData();
        },
        methods:{   
            initData(){
                let self=this;
                request('personlist',{},self,function(data){
                    if(data.state===200){
                        self.personlist=data.data;
                    }
                })
            },
            lookarticle(index){
                let self=this;
                let bid=this.personlist[index].bid;
                this.$store.dispatch('setbid',bid);  //修改vuex博客id
                this.$router.push('/content');
            },
            ok(){
                var self=this;
                this.$refs['ruleForm'].validate(valid=>{
                    if(valid){
                        request('createBlog',self.ruleForm,self,function(data){
                            if(data.state==200){
                               self.$message.success('提交成功');
                               self.$refs['ruleForm'].resetFields();
                               self.createBlog=false;
                               self.initData();
                            }else{
                               self.$message.success('提交失败');
                            }
                        })
                    }else{
                        return;
                    }
                })
            },  
            cancel(){
                this.$refs['ruleForm'].resetFields();
                this.createBlog=false;
            }
        }
    }
</script>
<style lang="less" scoped>
    .content{
        margin-top:30px;
        
        .item{
            margin-top:20px;

            .title{
                margin-top:20px;
                font-size:20px;
                color:#0187c5;
                text-decoration:none;
            }
            a:hover{
                color:#c66;
            }
            .des{
                margin-top:15px;
                margin-left:30px;
            }
            .subtitle{
                font-size:15px;
                margin-top:15px;
                margin-left:30px;
            }
        }
        
    }
    .create-card{
        position:fixed;
        left:100px;
        bottom:100px;

        .text {
            font-size: 14px;
        }

        .item {
            padding: 18px 0;
        }

        .clearfix:before,
        .clearfix:after {
            display: table;
            content: "";
        }
        .clearfix:after {
            clear: both
        }

        .box-card {
            width: 900px;
        }
    }
</style>