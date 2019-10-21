import request from 'superagent'

/**
 * @param  {Object} options
 * @return {Object}         Return Promise
 */
function send(options) {
    const defaults = {
        url: null,
        type: 'get',
        data: {}
    }
    let promise, action;
    options = Object.assign({}, defaults, options)
    promise = request[options.type](options.url).withCredentials()
    Object.keys(options).forEach(key => {
        if (!key.match(/url|type|data/)) {
            promise.set(key, options[key])
        }
    })
    action = options.type === 'get' ? 'query' : 'send'

    return new Promise(resolve => {
        promise[action](options.data).then(res => {
            console.log('!!!!');
            console.log(res);
            resolve(res.body||JSON.parse(res.text))
        }).catch(err => {
            console.log(err)
        })
    })
}

/**
 * @return {Object} Return url params
 */
function getURLParams() {
    const search = location.search.slice(1),
        rParam = /([^&]*)=([^&]*)/g
    let ret = {},
        param

    while (param = rParam.exec(search)) {
        ret[param[1]] = param[2]
    }

    return ret
}

export default {
    send,
    getURLParams
}