<template>
    <div class="container">
        <div class="header"> 
            <div class="top">
                <router-link :to="'alllist'"><img class="logo" src="../../../assets/img/logo-new.png" alt="AcFun" title="AcFun"></router-link>
                <el-input class="search" placeholder="请输入内容" v-model="search">
                    <el-select class="select" v-model="select" slot="prepend" placeholder="请选择">
                        <el-option label="文章" value="article"></el-option>
                        <el-option label="用户" value="user"></el-option>
                    </el-select>
                    <el-button slot="append" icon="search"></el-button>
                </el-input>
                <router-link to="personlist"><img class="poster" src="../../../assets/img/poster.gif" alt=""></router-link>
            </div>
        </div>
        <div class="article">
            <router-view></router-view>
        </div>
    </div>                    
</template>
<script>
    export default{
        data(){
            return{
                select:'',
                search:''
            }
        }
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

            .top{
                width:980px;
                height:100%;
                margin:auto;
                text-align:center;
            
                .logo{
                    float:left;
                    padding:10px 0 10px;
                }
                .poster{
                    float:right;
                    max-width:50px;
                }
                .search{
                    width:500px;
                    margin-top:5px;

                    .select{
                        width:100px;
                    }
                }
            }
        }

        .article{
            width:980px;
            margin:auto;
        }
    }
</style>