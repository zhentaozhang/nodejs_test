const db = require('../db/index');
const bcrypt = require('bcryptjs');
// 用这个包来生成 Token 字符串
const jwt = require('jsonwebtoken')
const config = require('../config')

exports.regUser = (req, res) => {
	const userinfo = req.body;
	const sqlStr = `select * from ev_users where username=?`
	db.query(sqlStr, userinfo.username, (err, results) => {
		if (err) {
			return res.cc(err.message)
		}
		if (results.length > 0) {
			return res.cc('用户名被占用，请更换其他用户名')
		}
		userinfo.password = bcrypt.hashSync(userinfo.password, 10);
		const sql = 'insert into ev_users set ?'
		db.query(sql, {username: userinfo.username, password: userinfo.password}, (err, results) => {
			if (err) return res.cc(err.message)
			if (results.affectedRows !== 1) return res.cc('注册失败');
			res.cc('注册成功', 0)
		})
	})
}

// 登录的处理函数
exports.login = (req, res) => {
	const userinfo = req.body;
	const sql = `select * from ev_users where username=?`
	db.query(sql, userinfo.username, (err, results) => {
		if (err) return res.cc(err);
		if (results.length !== 1) return res.cc('登录失败');
		const compareRusult = bcrypt.compareSync(userinfo.password, results[0].password);
		if (!compareRusult) {
			return res.cc('登陆失败');
		}
		const user = {...results[0], password: '', user_pic: ''}
		const tokenStr = jwt.sign(user, config.jwtSecretKey, {expiresIn: config.expiresIn,})
		res.setHeader('Access-Control-Allow-Origin','*')
		res.send({
			status: 0,
			message: '登陆成功',
			token: 'Bearer ' + tokenStr,
		})
	})
}