var http = require('http');

// 封装http请求
// p.s. 如果后端接口是https还需要配置SSL
function sendHttp(http_request,query){
    const postData = query===undefined?'':JSON.stringify(query);
    return new Promise(function(resolve,reject){
        
        var req = http.request(
            {
                ...http_request,
                ...{
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                        'Content-Length': postData.length
                    }
                }
            },
            function(response){
                var body = '';
                response.setEncoding('utf-8');
                response.on('data',function(chunk){
                    body += chunk;
                });
                response.on('end',function(){
                    resolve(body);
                });
            }
        );
        req.on('error', (e) => {
            console.error(`problem with request: ${e.message}`);
            reject(null)
        });
        req.write(postData);
        req.end();
    })
}

export default {
    sendHttp
}
