const mysql = require('mysql');
const $conf = require('../db/db');
const $util = require('../db/util');
const $sqlMap = require('../db/sqlMap');
const $sql = $sqlMap.bakery;
const pool = mysql.createPool($util.extend({}, $conf.mysql));
const express = require('express');
const router = express.Router();

const jsonWrite = function (res, ret) {
    if(typeof ret === 'undefined') {
        res.json({
            code:'1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};

const queryAll = (req, res) => {
	pool.getConnection((err, connection) => {
		if (err) {
			console.log('err:'+err);
			throw error;
		}
		connection.query($sql.queryAll, (err, result) => {
			if (err) console.log('err:'+err)
				console.log(String(result))
			jsonWrite(res, result);
			connection.release();	//wfnuser的神来之笔：不能res.send()
		});
	});
};

const add = function (req, res, next) {
	pool.getConnection(function(err, connection) {
		if (err) throw err; 
		var param = req.body;
		if((param.bakeryName == undefined )||(param.bakeryName == '' )) {
			jsonWrite(res, '面包店叫啥勒');
			return;
		}            
		connection.query($sql.insert, [param.bakeryName, param.address, param.image], function(err, result) {
		console.log(err);
			if(result) {
				res.render('suc');    
			}
			connection.release();
		});
	});
};

const remove = function (req, res) {
	console.log('comon')
	console.log('req:'+String(req));
	pool.getConnection(function(err, connection) {
		console.log('body:'+String(req.body));
		console.log('params:'+String(req.params));
		connection.query($sql.delete, req.body.bakeryId, function(err, result) {
			console.log('result:'+String(result));
			if (err) console.log(err);
			else{
				if(result.affectedRows > 0) {
					jsonWrite(res, result);
					// res.render('suc');
				} else {
					jsonWrite(res, result);
					// res.render('fail',{
					// 	result: result
					// });
				}
				connection.release();
			}
		});
	});
};

// const updateChart = function (req, res, next) {
// 	pool.getConnection(function(err, connection) {
// 		connection.query($sql.queryById, req.params.bakeryId, function(err, result) {
// 			res.render('updateBakery',{
// 				list: result
// 			});
// 			connection.release();
// 		});
// 	});
// };

// const update = function (req, res, next) {
// 	var param = req.body;
// 	if(param.bakeryName == null || param.bakeryName == '') {
// 		jsonWrite(res, '面包叫啥勒');            
// 		return;
// 	}
// 	pool.getConnection(function(err, connection) {
// 		connection.query($sql.update, [param.bakeryName, param.address, param.image, req.params.bakeryId], function(err, result) {
// 			// 使用页面进行跳转提示
// 			if(result.affectedRows > 0) {
// 				res.render('suc'); // 第二个参数可以直接在jade中使用
// 			} else {
// 				res.render('fail',  {
// 					result: result
// 				});
// 			}
// 			connection.release();
// 		});
// 	});
// };

// const queryById = function (req, res, next) {
// 	pool.getConnection(function(err, connection) {
// 		connection.query($sql.queryById, req.query.bakeryId, function(err, result) {
// 			jsonWrite(res, result);
// 			connection.release();
// 		});
// 	});
// };

module.exports = (router) => {
	router.get('/bakery', queryAll),
	// router.post('/bakery/add', add),	
	router.post('/bakery/remove', remove)
	// router.get('/bakery/update/:bakeryId', updateChart),	
	// router.post('/bakery/update/:bakeryId', update),	
	// router.get('/bakery/query', queryById)
}
	
