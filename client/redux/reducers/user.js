
import ActionTypes from '../ActionTypes';


const DEFAULT={
    name:'',
    password:''
}

export default function user(state=DEFAULT,action){
    let newState={};
    switch(action.type){
        case ActionTypes.CHANGE_NAME:newState={name:action.preload};break;
        case ActionTypes.CHANGE_PWD:newState={password:action.preload};break;
        default:
            return state
    }
    return {...state,...newState};
}