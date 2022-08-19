const express = require('express');
const app = express();
const cors = require('cors');
const Joi = require("joi");
const config = require('./config');
const {expressjwt: jwt} = require('express-jwt');
const bodyParser = require('body-parser');
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin','*')
	res.setHeader('Access-Control-Allow-Headers', "*")
	res.cc = function (err, status = 1) {
		res.send({
			status,
			message: err instanceof Error ? err.message : err,
		})
	}
	next();
})
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(jwt({secret: config.jwtSecretKey, algorithms: ["HS256"]}).unless({path: [/^\/api\//]}))
const userRouter = require('./router/user');
app.use('/api', userRouter);
// 导入并使用用户信息路由模块
const userinfoRouter = require('./router/userinfo')
// 注意：以 /my 开头的接口，都是有权限的接口，需要进行 Token 身份认证
app.use('/my', userinfoRouter)
app.use((err, req, res, next) => {
	//验证失败导致的错误
	if (err instanceof Joi.ValidationError) {
		//身份认证失败后的错误
		if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
	}
	return res.cc(err);
	res.cc(err);
})
const artCateRouter = require('./router/artcate');
app.use('/my/artcate', artCateRouter);
app.use(cors());

// 导入并使用文章路由模块
const articleRouter = require('./router/article')
// 为文章的路由挂载统一的访问前缀 /my/article
app.use('/my/article', articleRouter)
// 托管静态资源文件
app.use('/uploads', express.static('./uploads'))
app.listen(3007, function () {
	console.log('api server running at http://127.0.0.1:3007');
})