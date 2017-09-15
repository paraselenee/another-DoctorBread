var sqlMap = {
	bakery: {
		insert: 'INSERT INTO bakery(bakeryName, address, image) VALUES(?,?,?)',
		update: 'UPDATE bakery SET bakeryName=?, address=?, image=? WHERE bakeryId=?',
		delete: 'DELETE FROM bakery WHERE bakeryId=?',
		queryById: 'SELECT * FROM bakery WHERE bakeryId=?',
		queryAll: 'SELECT * FROM bakery',
		bakeryIdOrderByBakeryName: 'SELECT bakeryId FROM bakery ORDER BY CONVERT (bakeryName USING GBK) ASC'
	},
	bread: {
		insert: 'INSERT INTO bread(bakeryId, breadName, rating, comment, buyAgain, image) VALUES(?,?,?,?,?,?)',
		update: 'UPDATE bread SET bakeryId=?, breadName=?, rating=?, comment=?, buyAgain=?, image=? WHERE breadId=?',
		delete: 'DELETE FROM bread WHERE breadId=?',
		queryById: 'SELECT * FROM bread WHERE breadId=?',
		queryByBakery: 'SELECT * FROM bread WHERE bakeryId=?',
		queryAll: 'SELECT * FROM bread'
	},
	user: {
		insert: 'INSERT INTO user(username, password) VALUES(?,?)',
		update: 'UPDATE user SET username=?, password=? WHERE id=?',
		delete: 'DELETE FROM user WHERE id=?',
		queryById: 'SELECT * FROM user WHERE id=?',
		queryAll: 'SELECT * FROM user'
	}
}

module.exports = sqlMap;