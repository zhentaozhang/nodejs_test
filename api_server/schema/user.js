// 导入 Joi 来定义验证规则
const Joi = require('joi');

const username = Joi.string().alphanum().min(1).max(12).required();
const password = Joi.string().pattern(/^\S{6,12}/).required();
const id = Joi.number().integer().min(1).required();
const nickname = Joi.string().required();
const email = Joi.string().email().required();
// const avatar = Joi.string().dataUri().required();
const avatar = Joi.string().required();
exports.reg_login_schema = {
	body: {
		username,
		password
	}
};
exports.update_userinfo_schema = {
	body: {
		id,
		nickname,
		email
	}
};
exports.update_password_schema = {
	body:{
		oldPwd: password,
		newPwd:Joi.not(Joi.ref('oldPwd')).concat(password)
	}
}
exports.update_avatar_schema={
	body:{
		avatar
	}
}