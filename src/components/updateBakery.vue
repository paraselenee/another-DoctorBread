<template>
    <div class="">
        <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
            <el-form :model="bakeryUpdateForm" label-width="100px" ref="bakeryUpdateForm">
                <el-form-item prop="bakeryName" label="面包店" :rules="rules.bakeryName">
                    <el-autocomplete v-model="state4" :fetch-suggestions="querySearchAsync" @select="handleSelect">
                    </el-autocomplete>
                </el-form-item>
                <el-form-item prop="address" label="地址">
                    <el-input v-model="bakeryUpdateForm.bakeryName"></el-input>
                </el-form-item>
                <el-form-item prop="image" label="图片">
                    <el-input v-model="bakeryUpdateForm.image"></el-input>
                </el-form-item>
                <el-button type="primary" @click="submitForm('bakeryUpdateForm')">确定</el-button>
                <el-button @click="cancel('bakeryUpdateForm')">取消</el-button>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import axios from '../axios'
export default {
    name: 'updateBakery',
    data() {
        return {
            bakeryUpdateForm: {
                bakeryName: '',
                address: '',
                image: ''
            },
            bakery_list: [],
            state4: '',
            timeout: null,
            rules: {
                bakeryName: [{
                    required: true,
                    message: '请输入面包店名称',
                    trigger: 'blur'
                }]
            },
        };
    },
    methods: {
        loadAll() {
            return [
            ];
        },
        querySearchAsync(queryString, cb) {
            var restaurants = this.restaurants;
            var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                cb(results);
            }, 3000 * Math.random());
        },
        createStateFilter(queryString) {
            return (state) => {
                return (state.value.indexOf(queryString.toLowerCase()) === 0);
            };
        },
        handleSelect(item) {
            console.log(item);
        },

        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        cancel(formName) {
        }
    },
    created() {
        this.$http.get('/api/bakery/query').then((response) => {
            response = response.data;
            if (response.code === ERR_OK) { //?
                this.tableData = response.datas;
            }
        });
        this.$http.get('/api/getOptions').then((response) => {
            response = response.data;
            if (response.code === ERR_OK) {
                this.options = response.datas;
                this.places = response.places;
            }
        });
    },
    mounted() {
        this.restaurants = this.loadAll();
    }
};
</script>