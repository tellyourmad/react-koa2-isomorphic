import ActionTypes from "./ActionTypes";

function mapStateToProps(state, ownProps) {
  return {
    ReduxState: state
  };
}
function mapDispatchToProps(dispatch, ownProps) {
  return {
    ReduxAction: (type, preload) => {
      dispatch({
        type: type,
        preload: preload
      });
    }
  };
}

export { mapStateToProps, mapDispatchToProps };
