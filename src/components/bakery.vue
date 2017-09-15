<template scope='scope'>
    <div>
        <h1>{{msg}}</h1>
        <el-table :data="bakery_list" style="width: 100%" row-key="bakeryId" 
        :default-sort="{prop: 'bakeryName', order: 'descending'}">

            <el-table-column type="expand">
                <template scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="地址" :key="props.row.bakeryId">
                            {{props.row.address}}
                        </el-form-item>
                        <el-form-item label="图片" :key="props.row.bakeryId">
                            {{props.row.image}}
                        </el-form-item>
                        <el-form-item>

                            <!-- <el-table :data="{bread_list: props.row.bakeryId}" border style="width: 100%" max-height="250">
                                <el-table-column fixed prop="breadName" label="面包" width="150">
                                </el-table-column>
                                <el-table-column prop="rating" label="评分" width="120">
                                </el-table-column>
                                <el-table-column prop="comment" label="评论" width="120">
                                </el-table-column>
                                <el-table-column prop="buyAgain" label="回购" width="120">
                                </el-table-column>
                                <el-table-column label="操作" width="120">
                                    <template scope="breadRow">
                                        <el-button-group>
                                            <el-button type="primary" icon="edit" @click="update(breadRow.$index, bakery_list)"></el-button>
                                            <el-button type="primary" icon="delete" @click.native.prevent="deleteRow(breadRow.$index, bakery_list, 'bread')"></el-button>
                                        </el-button-group>
                                    </template>
                                </el-table-column>
                            </el-table> -->
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>

            <el-table-column prop="bakeryName" :sortable="true"></el-table-column>
            <!-- :sortMethod="getNewOrder(bakeryName)" -->
            <el-table-column>
                <template scope="bakeryRow">
                    <el-button-group>
                        <el-button type="primary" icon="edit" 
                        @click="update(bakeryRow.$index, bakery_list)">
                        </el-button>
                        <el-button type="primary" icon="delete" 
                        @click.native.prevent="deleteRow(
                                bakeryRow.row.bakeryId, 
                                bakeryRow.row.bakeryName, 
                                bakeryRow.row.arrId,
                                'bakery')">
                        </el-button>
                    </el-button-group>
                </template>
            </el-table-column>

            </el-table-column>

        </el-table>
    </div>
</template>

<script>
import axios from '../axios'
export default {
    name: 'bakery',
    data() {
        return {
            msg: '面包店',
            bakery_list: [],
            bread_list: {},
            index: '',
        }
    },
    mounted() {
        this.getBakery();
        this.getAllBread();
    },
    methods: {

        getBakery() {
            var self = this;    //then中this作用域不同，此时this = undefined
            axios.getBakery()
                .then((response) => {
                    this.bakery_list = [];
                    let arrId = 0;
                    response.data.forEach(function(obj) {
                        obj.arrId = arrId ++;
                        this.bakery_list.push(obj);
                    }, this);
                })
                .catch((error) => {
                    if (error.response) {
                        self.classFade = '';
                        self.errinfo = '服務器繁忙，請刷新頁面或者稍後重試!(Error code: 504)'
                    }
                })
        },
        // getBreadByBakery(id) {
        //     axios.getBreadByBakery(id)
        //         .then((response) => {
        //             self.bread_list = response.data;
        //         })
        //         .catch((error) => {
        //             if (error.response) {
        //                 self.classFade = '';
        //                 self.errinfo = '服務器繁忙，請刷新頁面或者稍後重試!(Error code: 504)'
        //             }
        //         })
        // },
        getAllBread() {
            axios.getAllBread()
                .then((response) => {
                    let all_bread = response.data;
                    // this.bread_list = {};
                    // if (all_bread.length > 0) {
                    //     all_bread.forEach((element) => {
                    //         if (this.bread_list.hasOwnProperty(element.bakeryId)) {
                    //             //如果该bakeryId已存在于bread_list对象中
                    //             this.bread_list[element.bakeryId].arr.push(element);
                    //         } else {
                    //             this.bread_list[element.bakeryId] = {};
                    //             this.bread_list[element.bakeryId].bakeryId = element.bakeryId;
                    //             this.bread_list[element.bakeryId].arr = [];
                    //             this.bread_list[element.bakeryId].arr.push(element);
                    //         }
                    //     }, this);
                    // }
                })
                .catch((error) => {
                    if (error.response) {
                        self.classFade = '';
                        self.errinfo = '服務器繁忙，請刷新頁面或者稍後重試!(Error code: 504)'
                    }
                })
        },
        deleteRow(id, name, index, type) {
            // if (type == 'bakery') {
                var reminder = '删掉' + name + '和里面的所有面包？';
            // } else {
            //     var reminder = '删掉' + name + '和它的信息？';
            // }
            this.$confirm(reminder, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // if (type === 'bakery') {
                    console.log("==============id==================")
                    console.log(id)
                    axios.removeBakery(id)
                        .then((response) => {
                            if (response.status == '200') {
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                                console.log(this.bakery_list);
                                this.bakery_list.splice(index, 1);
                            }
                            else {
                                this.$message({
                                    type: 'error',
                                    message: '删除失败!'
                                });
                            }
                        })
                // } else {
                //     axios.removeBread(rows[index].breadId)
                //         .then((response) => {
                //             if (response.status == '200') {
                //                 this.$message({
                //                     type: 'success',
                //                     message: '删除成功!'
                //                 });
                //                 //TODO:排序后如何使用splice：排序后index还是原来的index
                //                 //现在排第一的id是25，于是删掉第25行
                //                 self.splice(index, 1);
                //             }
                //             else {
                //                 this.$message({
                //                     type: 'error',
                //                     message: '删除失败!'
                //                 });
                //             }
                //         })

                // }
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