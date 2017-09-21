<template scope='scope'>
    <div id="bakery" class="container">
        <h3>{{msg}}</h3>
        <v-text-field append-icon="search" label="搜！" single-line hide-details v-model="searchQuery"></v-text-field>
        <table class="table table-striped">
            <thead>
                <v-btn flat primary @click="sortBy('bakeryName')">
                    按名字排序
                </v-btn>
            </thead>

            <tbody>
                <template>
                    <v-expansion-panel popout class="lime accent-1">
                        <v-expansion-panel-content class="white" v-for="(bakery,index) in filtered_bakery_list" :key="index">
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

                            <v-card class="lime accent-2">
                                <v-card-text>
                                    {{bakery.address}} <br> {{bakery.image}} <br>
                                    <template>
                                        <div class="white">
                                            <v-text-field append-icon="search" label="搜！" single-line hide-details v-model="searchBread"></v-text-field> <br>
                                            <div>
                                                <v-data-table :headers="breadHeaders" :items="bakery.bread_list" :search="searchBread" class="elevation-1">
                                                    <template slot="headerCell" scope="props">
                                                        <span v-tooltip:bottom="{ 'html': props.header.text }">
                                                            {{ props.header.text }}
                                                        </span>
                                                    </template>
                                                    <template slot="items" scope="props">
                                                        <td class="text-xs-left">{{ props.item.breadName }}</td>
                                                        <td class="text-xs-left">{{ props.item.rating }}</td>
                                                        <td class="text-xs-left">{{ props.item.comment }}</td>
                                                        <td class="text-xs-left">{{ props.item.buyAgain }}</td>
                                                    </template>
                                                </v-data-table>
                                            </div>
                                        </div>
                                    </template>
                                </v-card-text>
                            </v-card>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </template>
            </tbody>
        </table>
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
            msg: '面包店',
            bakery_list: [],
            bread_list: {},
            searchQuery: '',
            searchBread: '',
            sortKey: "bakeryName",
            reverse: false,
            breadHeaders: [
                { text: '面包', align: 'left', sortable: false, value: 'breadName' },
                { text: '评分', sortable: true, value: 'rating' },
                { text: '评价', sortable: false, value: 'comment' },
                { text: '买了几次', sortable: true, value: 'buyAgain' }
            ],
        }
    },
    mounted() {
        this.getBakery();
    },
    computed: {
        filtered_bakery_list: function(index) {
            if (this.searchQuery == '') {
                return this.bakery_list
            }
            var self = this
            var temp_bakery_list = [];
            temp_bakery_list = this.bakery_list.filter(function(bakery) {
                var searchRegex = new RegExp(self.searchQuery, 'i') //  不分大小写
                return searchRegex.test(bakery.bakeryName) ||
                    searchRegex.test(bakery.address) ||
                    bakery.bread_list.filter(function(bread) {
                        //   return bread.breadName.indexOf(self.searchQuery) !== -1
                        return searchRegex.test(bread.breadName) ||
                            searchRegex.test(bread.comment)
                    }).length != 0

            })
            //wfnuser TODO: 把下面的改好
            temp_bakery_list.forEach(function(element) {
                element.bread_list = element.bread_list.filter(function(bread) {
                    return bread.breadName.indexOf(self.searchQuery) !== -1
                })
            }, this)
            
            // //wfnuser TODO: 把下面的改好
            // temp_bakery_list.forEach(function(element) {
            //     element.bread_list = element.bread_list.filter(function(bread) {
            //         var searchRegex = new RegExp(self.searchQuery, 'i')
            //         return searchRegex.test(bread.breadName) || searchRegex.test(bread.comment)                
            //     })
            // }, this)
            return temp_bakery_list
            // var temp_bakery_list = [];
            // var temp = temp_bakery_list.filter(function(bakery) {
            //     var searchRegex = new RegExp(self.searchQuery, 'i')
            //     var temp_bread_list = bakery.bread_list.filter(function(bread){
            //         return searchRegex.test(bread.breadName)                
            //     })
            //     bakery.bread_list = temp_bread_list;
            //     return searchRegex.test(bakery.bakeryName) || bakery.bread_list.length != 0
            //     debugger
            // })
            // return temp
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