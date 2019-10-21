import {combineReducers} from 'redux'



import reducerOne from './reducer_one';
import reducerTwo from "./reducer_two";
import user from "./user";

/// 根据业务拆分多个Reducer
const rootReducer=combineReducers({
    reducerOne,
    reducerTwo,
    user
});

export default rootReducer;
