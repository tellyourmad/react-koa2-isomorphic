import Router from 'koa-router'
import utils from '../common/utils';
import Config from './config.json';     // 后端服务地址

const router = new Router({ prefix: '/login' });


//// get接口传参演示
// router.get('/checkMobileUniqueness',async function(ctx){
//     ctx.body=await utils.sendHttp(
//         {
//             protocol: Config.protocol,
//             host:Config.host,
//             port:Config.port,
//             path:Config.prefix+'/merchant_mobile_exist',
//             method: 'POST'
//         },
//         {
//             params:ctx.request.query
//         }
//     ).then(function(data){return data;});
// });


//// post接口传参演示
// router.post('/submit',async function(ctx){
//     ctx.body=await utils.sendHttp(
//         {
//             protocol: Config.protocol,
//             host:Config.host,
//             port:Config.port,
//             path:Config.prefix+'/merchant_apply',
//             method: 'POST'
//         },
//         {
//             params:ctx.request.body
//         }
//     ).then(function(data){return data;});
// });



export default router;
