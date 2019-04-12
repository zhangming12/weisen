const router = require('koa-router')()
const Monk = require('monk')
    // const mongodb = Monk('122.152.208.20:27017/test') //连接数据库
    //     // 读取集合
    // const myData = mongodb.get('my-data')
const formateTime = require("../util/formateTime.js")

router.get('/', async(ctx, next) => {
    await ctx.render('index', {
        title: 'Hello Koa 2!'
    })
})
router.post('/getdata', async(ctx) => {
    let mongodb = Monk('122.152.208.20:27017/test') //连接数据库
        // 读取集合
    let myData = mongodb.get('my-data')
    await myData.find().then((res) => {
        mongodb.close();
        ctx.response.body = {
            status: 1,
            errorMsg: null,
            data: res
        }
    }).catch(() => {
        mongodb.close();
        ctx.response.body = {
            status: 0,
            errorMsg: "失败",
            data: null
        }
    });
});
//保存数据，name--姓名，phone--手机号，time--提交时间，type--类型
//P--手机，C-电脑
router.post('/save', async(ctx, next) => {
    let {
        name,
        phone,
        type,
        memo
    } = ctx.request.body;
    let mongodb = Monk('122.152.208.20:27017/test') //连接数据库
        // 读取集合
    let myData = mongodb.get('my-data')
    let time = Date.now();
    time = formateTime(time);
    await myData.insert({
        name,
        phone,
        type,
        time,
        memo
    }).then(() => {
        mongodb.close();
        ctx.body = {
            status: 1,
            errorMsg: null
        }
    }).catch(err => {
        mongodb.close();
        ctx.body = {
            status: 0,
            errorMsg: "存储失败"
        }
    })

})

module.exports = router

//接口文档

//1，存储数据
//地址：http://122.152.208.20:4000/save
// post
// 参数
// {
//     name:"张三",//姓名 非空
//     phone:"16709870987",//手机号 非空
//     time:"12763746735",//时间戳 非空
//     type:"P"//类型 P--手机  C--电脑 非空
// }

//返回数据
// {
//     status:1,//状态 1--成功 0--失败
//     errorMsg:"失败原因"//状态为1时，为null,为0时返回存储失败原因
// }

// 2，取数据
//地址：http://122.152.208.20:4000/getData
//post
//参数 {}
//返回

// {
//     status: 1, //状态1，成功 0，失败
//     errorMsg: "失败原因", //状态为1时，为null,为0时返回失败原因
//     data: {
//         datalist: [{
//                 name: "",
//                 phone: "",
//                 time: "",//格式为 2019-03-20 11:20:19
//                 type: ""
//             },
//             {
//                 name: "",
//                 phone: "",
//                 time: "",
//                 type: ""
//             },
//         ]
//     }
// }