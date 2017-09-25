<template scope='scope'>
    <div id="bakery" class="container">
        <h3>{{msg}}</h3>
        <v-text-field append-icon="search" label="搜！" single-line hide-details v-model="searchQuery"></v-text-field>
        <v-btn flat primary @click="sortBy('name')">
            按名字排序
        </v-btn>
        <v-btn flat primary @click="sortBy('rating')">
            按评分排序
        </v-btn>

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
                        <div class="white">
                            <v-text-field append-icon="search" label="搜！" single-line hide-details v-model="searchBread"></v-text-field> <br>
                            <div>
                                <v-data-table :headers="breadHeaders" :items="bakery.bread_list" :search="searchBread||searchQuery" class="elevation-1">
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
                    </v-card-text>
                </v-card>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </div>
</template>

<script>
import axios from '../axios'
import _ from 'underscore'
function compare(num1, num2) {
        var temp1 = parseInt(num1);
        var temp2 = parseInt(num2);
        if (temp1 < temp2) {
            return -1;
        } else if (temp1 == temp2) {
            return 0;
        } else {
            return 1;
        }
    }

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
            reverses: false,
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
            return this.bakery_list.filter(function(bakery) {
                var searchRegex = new RegExp(self.searchQuery, 'i') //  不分大小写
                return searchRegex.test(JSON.stringify(bakery)) //非常懒惰但貌似没有问题的搜法
            })
        }
    },
    methods: {
        sortBy: function(sortKey) {
            this.reverse = (this.sortKey == sortKey) ? !this.reverse : false;
            this.sortKey = sortKey;
            let self = this;
            if (sortKey == 'name') {
                this.bakery_list.sort(function(param1, param2) {
                    if (self.reverse) {
                        return param1.bakeryName.localeCompare(param2.bakeryName, 'zh-Hans-CN', { sensitivity: 'accent' });
                    } else {
                        return - param1.bakeryName.localeCompare(param2.bakeryName, 'zh-Hans-CN', { sensitivity: 'accent' });
                    }
                });
            } else if ((sortKey == 'rating')) {
                this.bakery_list.sort(function(param1, param2) {
                    if (self.reverse) {
                        return compare(param1.averageRating, param2.averageRating);
                    } else {
                        return - compare(param1.averageRating, param2.averageRating);
                    }
                });
            }
        },
        getBakery() {
            var self = this;    //then中this作用域不同，此时this = undefined
            axios.getBakery()
                .then(function(response) {
                    self.bakery_list = [];
                    response.data.forEach(function(bakery) {
                        axios.getBreadByBakery(bakery.bakeryId)
                            .then((resp) => {
                                bakery.bread_list = resp.data;
                                if (bakery.bread_list.length == 0) {
                                    bakery.averageRating = 0;
                                } else {
                                    let sumOfRating = 0;
                                    bakery.bread_list.forEach(function(bread) {
                                        sumOfRating += bread.rating;
                                    }, this);
                                    bakery.averageRating = sumOfRating / (bakery.bread_list.length);
                                }
                                console.log(bakery.bakeryName)
                                console.log(bakery.averageRating);
                                self.bakery_list.push(bakery);
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