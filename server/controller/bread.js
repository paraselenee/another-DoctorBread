const mysql = require('mysql');
const $conf = require('../db/db');
const $util = require('../db/util');
const $sqlMap = require('../db/sqlMap');
const $sql = $sqlMap.bread;
const pool = mysql.createPool($util.extend({}, $conf.mysql));
const express = require('express');
const router = express.Router();

const jsonWrite = function (res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};

const queryByBakery = function (req, res, next) {
    pool.getConnection(function (err, connection) {
        if (err) console.log(err);
        connection.query($sql.queryByBakery, req.query.bakeryId, function (err, result) {
            debugger
            if (err) console.log(err);
            jsonWrite(res, result);
            connection.release();
        });
    });
};

const queryAll = function(req, res, next) {
	pool.getConnection((err, connection) => {
		if (err) {
			console.log('err:' + err);
			throw error;
		}
		connection.query($sql.queryAll, (err, result) => {
			if (err) console.log('err:' + err)
			console.log(String(result))
			jsonWrite(res, result);
			connection.release();	//wfnuser的神来之笔：不能res.send()
		});
	});
};
// const addChart = function(req, res, next){
//         //returns all the bakeries in chart bakery
//         pool.getConnection(function(err, connection) {
//             connection.query($sqlBakery.queryAll, function(err, result) {
//                 res.render('addBread', {
//                     bakeryList : result
//                 });
//             });
//         });
//     };

// const add = function (req, res, next) {
//         pool.getConnection(function(err, connection) {
//             if (err) throw err; 
//             var param = req.body;
//             if((param.breadName == '' )||(param.breadName == undefined )) {
//                 jsonWrite(res, '面包叫啥勒');
//                 return;
//             }
//             param.rating = param.rating ? (param.rating - 0) : null; //''->null, 0->0
//             param.buyAgain = param.buyAgain ? (param.buyAgain - 0) : null; //''->null, 0->0
//             connection.query($sql.insert, [param.bakeryId, param.breadName, param.rating, 
//             param.comment, param.buyAgain, param.image], function(err, result) {
//                 console.log(err);               
//                 if(result) {
//                     res.render('suc');
//                 }
//                 connection.release();
//             });
//         });
//     };

// const remove = function (req, res, next) {
//         pool.getConnection(function(err, connection) {
//             connection.query($sql.delete, req.body.breadId, function(err, result) {
//                 if(result.affectedRows > 0) {
//                     res.render('suc');
//                 } else {
//                     res.render('fail',{
//                         result: result
//                     });
//                 }
//                 connection.release();
//             });
//         });
//     };

// const updateChart = function (req, res, next) {
//         var id = req.body.breadId;
//         var bakeryList = [];
//         //returns all the bakeries in chart bakery
//         pool.getConnection(function(err, connection) {
//             connection.query($sqlBakery.queryAll, function(err, result) {
//                 bakeryList = result;
//                 connection.release();
//             });
//         });
//         //returns information of the chosen bread
//         pool.getConnection(function(err, connection) {
//             connection.query($sql.queryById, id, function(err, result) {
//                 res.render('updateBread', {
//                     title: '编辑面包',
//                     list: result,
//                     bakeryList : bakeryList   
//                 });     
//                 connection.release();
//             });
//         });
//     };

// const update = function (req, res, next) {
//         var param = req.body;
//         if(param.breadName == '' ) {
//             jsonWrite(res, '面包叫啥勒');
//             return;
//         }
//         pool.getConnection(function(err, connection) {
//             param.rating = param.rating ? (param.rating - 0) : null;
//             param.buyAgain = param.buyAgain ? (param.buyAgain - 0) : null;
//             connection.query($sql.update, [param.bakeryId, param.breadName, param.rating, 
//             param.comment, param.buyAgain, param.image, req.params.breadId], function(err, result) {
//                 console.log('err:'+err);
//                 // 使用页面进行跳转提示
//                 if(result && result.affectedRows > 0) {
//                     res.render('suc', {
//                         result: result
//                     }); // 第二个参数可以直接在jade中使用
//                 } else {
//                     res.render('fail',  {
//                         result: result
//                     });
//                 }
//                 connection.release();
//             });
//         });
//     };

// const queryById = function (req, res, next) {
//         var id = +req.query.breadId; // 为了拼凑正确的sql语句，这里要转下整数
//         pool.getConnection(function(err, connection) {
//             connection.query($sql.queryById, id, function(err, result) {
//                 jsonWrite(res, result);
//                 connection.release();
//             });
//         });
//     };


module.exports = (router) => {
    router.get('/bakery/queryByBakery', queryByBakery),
    router.get('/bakery/queryAllBread', queryAll)
    // router.post('/bread/add', add),	
    // router.post('/bread/remove', remove)
    // router.get('/bread/update', updateChart),	
    // router.post('/bread/update', update)
    // router.get('/bread/query', queryById)
}
