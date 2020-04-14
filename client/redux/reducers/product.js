import ActionTypes from "../ActionTypes";

const DEFAULT = {
  loadedPage: 0,
  list: [],
};

export default function product(state = DEFAULT, action) {
  let newState = {};
  console.log(action);
  switch (action.type) {
    case ActionTypes.PRODUCT_LIST:
      newState = {
        list: state.list.concat(action.preload.list),
        loadedPage: +action.preload.page,
      };
      break;
    default:
      return state;
  }
  return { ...state, ...newState };
}
