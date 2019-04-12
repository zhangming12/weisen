const router = require('koa-router')()
const Monk = require('monk')
const mongodb = Monk('122.152.208.20:27017/test') //连接数据库
const formateTime = require("../util/formateTime.js")
    // 读取集合
const myData = mongodb.get('my-data')
router.prefix('/users')

router.post('/', function(ctx, next) {
    ctx.body = 'this is a users response!'
})
router.post('/get', async(ctx, next) => {
    // ctx.body = 'this is a users response!'
    await myData.find().then((res) => {
        ctx.body = {
            status: 1,
            errorMsg: null,
            data: res
        }
    }).catch(err => {
        ctx.body = {
            status: 0,
            errorMsg: "失败",
            data: null
        }
    });
})
router.post('/save', async(ctx, next) => {
    let {
        name,
        phone,
        type
    } = ctx.query
    let time = Date.now();
    time = formateTime(time);
    const data1 = await myData.insert({
        name,
        phone,
        type,
        time
    }).then(() => {
        ctx.body = {
            status: 1,
            errorMsg: null
        }
    }).catch(err => {
        ctx.body = {
            status: 0,
            errorMsg: "存储失败"
        }
    })
})

module.exports = router