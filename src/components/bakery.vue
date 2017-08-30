<template scope='scope'>
    <div>
        <h1>{{msg}}</h1>
        <div v-for="(item,index) in bakery">
            <li> {{item.bakeryName}} {{item.address}}</li> 
            <!-- <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item v-title="item" name="1">
                    <div> {{bakeryAdress}} </div>
                </el-collapse-item>
            </el-collapse> -->
        </div>
    </div>
</template>

<script>
import axios from '../axios'
export default{
    name: 'bakery',
    data(){
        return{
            msg: '面包店',
            bakery: {},
            bakeryName: '',
            address:''
        }
    },
    mounted() {
        var self = this;
        axios.getBakery()
        .then(function(response){
            self.bakery = response.data;
            console.log('bakery:'+self.bakery[0].bakeryName);
        })
        .catch(function (error) {
            if (error.response) {
                console.log('data:'+error.response.data);
                console.log('status:'+error.response.status);
                console.log('headers:'+error.response.headers);
                self.classFade = '';
                self.errinfo = '服務器繁忙，請刷新頁面或者稍後重試!(Error code: 504)'       
            }
        })
    }
}



</script>

<style scoped>
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

a {
    color: #4078c0;
    text-decoration: none;
}
</style>