import Loadable from 'react-loadable';
import Loading from "./section/Loading";

const setLoadable=function(section){
    /// 加载效果
    return Loadable({
        loader:section,
        loading:Loading
    })
}

export default {
    routes:[
        {
            path:'/',
            exact:true,
            redirect:'/Index'
        },
        {
            path:'/Index',
            component:setLoadable(()=>import(/* webpackChunkName: "Home" */"./section/IndexPage"))
        },
        {
            path:'/Mine',
            component:setLoadable(()=>import(/* webpackChunkName: "Mine" */"./section/Mine"))
        },
        {
            path:'/BusinessPartner',
            component:setLoadable(()=>import(/* webpackChunkName: "BusinessPartner" */"./section/BusinessPartner"))
        }
    ],
    isMatch:function(uri,path){
        if(path){
            if(new RegExp(`^${path}((\\?.*)|/?|(/[^/]+)*)$`).test(uri)){
                return true;
            }
        }
        else{
            for(let {path} of this.routes){
                if(new RegExp(`^${path}((\\?.*)|/?|(/[^/]+)*)$`).test(uri)){
                    return true;
                }
            }
        }
        return false;
    }
}