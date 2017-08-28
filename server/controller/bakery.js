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
		if (err) console.log(err)
		connection.query($sql.queryAll, (err, result) => {
			if (err) console.log(err)
			jsonWrite(res, result);
			res.send(result); 
			console.log(result);
			connection.release();
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

const remove = function (req, res, next) {
	pool.getConnection(function(err, connection) {
		connection.query($sql.delete, req.params.bakeryId, function(err, result) {
			if(result.affectedRows > 0) {
				res.render('suc');
			} else {
				res.render('fail',{
					result: result
				});
			}
			connection.release();
		});
	});
};

const updateChart = function (req, res, next) {
	pool.getConnection(function(err, connection) {
		connection.query($sql.queryById, req.params.bakeryId, function(err, result) {
			res.render('updateBakery',{
				list: result
			});
			connection.release();
		});
	});
};

const update = function (req, res, next) {
	var param = req.body;
	if(param.bakeryName == null || param.bakeryName == '') {
		jsonWrite(res, '面包叫啥勒');            
		return;
	}
	pool.getConnection(function(err, connection) {
		connection.query($sql.update, [param.bakeryName, param.address, param.image, req.params.bakeryId], function(err, result) {
			// 使用页面进行跳转提示
			if(result.affectedRows > 0) {
				res.render('suc'); // 第二个参数可以直接在jade中使用
			} else {
				res.render('fail',  {
					result: result
				});
			}
			connection.release();
		});
	});
};

const queryById = function (req, res, next) {
	pool.getConnection(function(err, connection) {
		connection.query($sql.queryById, req.query.bakeryId, function(err, result) {
			jsonWrite(res, result);
			connection.release();
		});
	});
};

module.exports = (router) => {
	router.get('/bakery', queryAll),
	router.post('/add', add),	
	router.post('/delete/:bakeryId', remove),	
	router.get('/update/:bakeryId', updateChart),	
	router.post('/update/:bakeryId', update),	
	router.get('/query', queryById)
}
	
