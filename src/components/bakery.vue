<template scope='scope'>
    <div>
        <h1>{{msg}}</h1>
        <div v-for="(bakery,index) in bakery_list">
            <el-collapse  v-model="activeNames" accordion>
                <!-- v-bind:change="handleChange"> -->
                <el-collapse-item :title="bakery.bakeryName" :name="index">
                    <div> 
                        <p>{{bakery.address}}</p>
                        <el-button-group>
                            <el-button type="primary" icon="edit"></el-button>
                            <el-button type="primary" icon="delete"
                            @click="remove(bakery.bakeryName, bakery.bakeryId)"></el-button>
                        </el-button-group>
                    </div>
                </el-collapse-item>
            </el-collapse>
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
            bakery_list: {},
            bakeryName: '',
            address:'',
            bakeryId: '',
            activeNames: ["1"]
        }
    },
    mounted() {
        var self = this;
        axios.getBakery()
        .then(function(response){
            self.bakery_list = response.data;
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
    },
    methods:{
        remove(name, id){
            let reminder = '删掉'+name+'和里面的所有面包？';
            this.$confirm(reminder, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let bakeryId = id
                console.log('id:'+bakeryId)
                axios.removeBakery(bakeryId)
                .then((response)=> {  
                    if (response.status == '200'){
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    }    
                    else{
                        console.log('data:'+error.response.data);
                        console.log('status:'+error.response.status);
                        console.log('headers:'+error.response.headers);
                        this.$message({
                            type: 'error',
                            message: '删除失败'
                        }); 
                    }                 
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });

        }
    }
}

//TODO:selected option
// #app
//   select(@change="changeItem(rowId, $event)")
//     option select item
//     option(value="value1") value1
//     option(value="value2") value2
//   p {{selected}}

// const app = new Vue({
//     el: '#app',
//     data: {
//     selected: "selected",
//     rowId: 10
// },
// methods: {
//     changeItem(rowId, event) {
//         this.selected = `${rowId}, ${event.target.value}`
//     }
// }
// })

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