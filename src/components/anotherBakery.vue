<template scope='scope'>
    <div id="bakery" class="container">
        <!-- <h1>{{msg}}</h1> -->
        <input v-model="searchQuery" class="form-control" placeholder="面包房叫啥...">
        <table class="table table-striped">
            <thead>
                <v-btn flat primary @click="sortBy('bakeryName')">
                    按名字排序
                </v-btn>
            </thead>

            <tbody>
                <template>
                    <v-expansion-panel focusable>
                        <v-expansion-panel-content v-for="(bakery,index) in filtered_bakery_list" :key="index">
                            <div slot="header">
                                <v-btn flat primary @click="update()">
                                    <v-icon> edit </v-icon>
                                </v-btn>
                                <v-btn flat primary @click="deleteRow(
                                            bakery.bakeryId, 
                                            bakery.bakeryName, 
                                            index,
                                            'bakery')">
                                    <v-icon> delete </v-icon>
                                </v-btn>
                                {{bakery.bakeryName}}
                            </div>

                            <v-card>
                                <v-card-text class="grey lighten-3">
                                    {{bakery.address}}
                                    <br> {{bakery.image}}
                                    <br>
                                    <template>
                                        <div>
                                            <v-data-table :headers="headers" :items="items" :search="searchBread" v-bind:pagination.sync="pagination" :total-items="totalItems" :loading="loading" class="elevation-1">
                                                <template slot="headerCell" scope="props">
                                                    <span v-tooltip:bottom="{ 'html': props.header.text }">
                                                        {{ props.header.text }}
                                                    </span>
                                                </template>
                                                <template slot="items" scope="props">
                                                    <td>{{ props.item.name }}</td>
                                                    <td class="text-xs-right">{{ props.item.calories }}</td>
                                                    <td class="text-xs-right">{{ props.item.fat }}</td>
                                                    <td class="text-xs-right">{{ props.item.carbs }}</td>
                                                    <td class="text-xs-right">{{ props.item.protein }}</td>
                                                    <td class="text-xs-right">{{ props.item.sodium }}</td>
                                                    <td class="text-xs-right">{{ props.item.calcium }}</td>
                                                    <td class="text-xs-right">{{ props.item.iron }}</td>
                                                </template>
                                            </v-data-table>
                                        </div>
                                    </template>
                                </v-card-text>
                            </v-card>

                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </template>
            </tbody>
        </table>

        <!-- <el-table-column type="expand">
                <template scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="地址" :key="props.row.bakeryId">
                            {{props.row.address}}
                        </el-form-item>
                        <el-form-item label="图片" :key="props.row.bakeryId">
                            {{props.row.image}}
                        </el-form-item>
                        <el-form-item>

                            <el-table :data="{bread_list: props.row.bakeryId}" border style="width: 100%" max-height="250">
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
                                            </el-table>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>

            <el-table-column label="操作">
                <template scope="bakeryRow">
                    <el-button-group>
                        <el-button type="primary" icon="edit" @click="update(bakeryRow.$index, bakery_list)">
                        </el-button>
                        <el-button type="primary" icon="delete" @click.native.prevent="deleteRow(
                                                bakeryRow.row.bakeryId, 
                                                bakeryRow.row.bakeryName, 
                                                bakeryRow.row.arrId,
                                                'bakery')">
                        </el-button>
                    </el-button-group>
                </template>
            </el-table-column> -->
    </div>
</template>

<script>
import axios from '../axios'
import _ from 'underscore'
var times = 0;
export default {
    name: 'anotherBakery',
    data() {
        return {
            // msg: '面包店',
            bakery_list: [],
            bread_list: {},
            searchQuery: '',
            searchBread: '',
            sortKey: "bakeryName",
            reverse: false,
            toggle_multiple: [0, 1, 2],
            breadHeaders: [
                { text: '面包', align: 'left', sortable: false, value: 'breadName'},
                { text: '评分', sortable: true, value: 'rating' },
                { text: '评价', value: 'comment' },
                { text: '买了几次', sortable: true, value: 'buyAgain' }
            ]
        }
    },
    mounted() {
        this.getBakery();
    },
    computed: {
        filtered_bakery_list: function() {
            var self = this;
            return self.bakery_list.filter(function(bakery) {
                return bakery.bakeryName.indexOf(self.searchQuery) !== -1
            })
        }
    },
    methods: {
        sortBy: function(sortKey) {
            this.reverse = (this.sortKey == sortKey) ? !this.reverse : false;
            this.sortKey = sortKey;
            let self = this;
            this.bakery_list.sort(function(param1, param2) {
                if (self.reverse) {
                    return param1.bakeryName.localeCompare(param2.bakeryName, 'zh-Hans-CN', { sensitivity: 'accent' });
                } else {
                    return - param1.bakeryName.localeCompare(param2.bakeryName, 'zh-Hans-CN', { sensitivity: 'accent' });
                }
            });
        },
        getBakery() {
            var self = this;    //then中this作用域不同，此时this = undefined
            axios.getBakery()
                .then(function(response) {
                    self.bakery_list = [];
                    response.data.forEach(function(element) {
                        axios.getBreadByBakery(element.bakeryId)
                            .then((resp) => {
                                element.bread_list = resp.data;
                                self.bakery_list.push(element);
                            })
                            .catch((error) => {
                                if (error.response) {
                                    self.classFade = '';
                                    self.errinfo = '服務器繁忙，請刷新頁面或者稍後重試!(Error code: 504)'
                                }
                            })
                    }, self);
                })
                .catch(function(error) {
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
        // getAllBread() {
        //     axios.getAllBread()
        //         .then((response) => {
        //             let all_bread = response.data;
        //             // this.bread_list = {};
        //             // if (all_bread.length > 0) {
        //             //     all_bread.forEach((element) => {
        //             //         if (this.bread_list.hasOwnProperty(element.bakeryId)) {
        //             //             //如果该bakeryId已存在于bread_list对象中
        //             //             this.bread_list[element.bakeryId].arr.push(element);
        //             //         } else {
        //             //             this.bread_list[element.bakeryId] = {};
        //             //             this.bread_list[element.bakeryId].bakeryId = element.bakeryId;
        //             //             this.bread_list[element.bakeryId].arr = [];
        //             //             this.bread_list[element.bakeryId].arr.push(element);
        //             //         }
        //             //     }, this);
        //             // }
        //         })
        //         .catch((error) => {
        //             if (error.response) {
        //                 self.classFade = '';
        //                 self.errinfo = '服務器繁忙，請刷新頁面或者稍後重試!(Error code: 504)'
        //             }
        //         })
        // },
        deleteRow(id, name, index, type) {
            if (type == 'bakery') {
                var reminder = '删掉' + name + '和里面的所有面包？';
            } else {
                var reminder = '删掉' + name + '和它的信息？';
            }
            this.$confirm(reminder, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                if (type === 'bakery') {
                    axios.removeBakery(id)
                        .then((response) => {
                            if (response.status == '200') {
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                                this.bakery_list.splice(index, 1);
                            }
                            else {
                                this.$message({
                                    type: 'error',
                                    message: '删除失败!'
                                });
                            }
                        })
                } else {
                    axios.removeBread(rows[index].breadId)
                        .then((response) => {
                            if (response.status == '200') {
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                                self.splice(index, 1);
                            }
                            else {
                                this.$message({
                                    type: 'error',
                                    message: '删除失败!'
                                });
                            }
                        })
                }
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
body {
    margin: 2em 0;
}

a.active {
    font-weight: bold;
    color: black;
}

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

sortable {
    cursor: pointer;
}
</style>