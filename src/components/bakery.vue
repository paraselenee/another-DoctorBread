<template scope='scope'>
    <div>
        <h1>{{msg}}</h1>
        <div v-for="item in bakery">
            <li> {{item.bakeryName}} </li> 
            <!-- <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item v-title="item" name="1">
                    <div> {{bakeryAdress}} </div>
                </el-collapse-item>
            </el-collapse> -->
        </div>
    </div>
</template>

<script>
// import * as types from '../store/types'
import axios from 'axios'
// import api from '../axios'
export default{
    name: 'bakery',
    data(){
        return{
            msg: '面包店',
            bakery: '',
            bakeryName: ''
        }
    },
    created() {
        axios({
            method: 'get',
            url: '/bakery',
            data: {
                bakeryName: bakeryName,
            },
            timeout: 3000
        }).then(function(response){
            debugger
            self.bakery = response.data;
        }).catch(function(error) {
            console.log(error);
            self.classFade = '';
            self.errinfo = '服務器繁忙，請刷新頁面或者稍後重試!(Error code: 504)'
        })
        // getBakery() {
        //     let loadingInstance = Loading.service();
        //     api.getBakery.then((data) => {
        //         this.bakery = {};
        //         data.data.forEach((element) => {
        //             this.groups.arr.push(element);
        //         },this)
        //         loadingInstance.close();
        //         console.log(data)
        //     },(err) => {
        //         loadingInstance.close();
        //     })
        // }
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