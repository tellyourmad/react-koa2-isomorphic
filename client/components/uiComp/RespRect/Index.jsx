import React from "react";
import PropTypes from "prop-types";
import styles from "./style";

class RespRect extends React.Component {
  constructor() {
    super();
  }
  render() {
    var style = {
      box: {
        width: Number(this.props.size) ? this.props.size + "%" : this.props.size
      },
      funcDiv: {
        paddingTop: (this.props.h / this.props.w) * 100 + "%",
        overflow: "hidden"
      },
      content: {
        marginTop: -(this.props.h / this.props.w) * 100 + "%"
      }
    };
    return (
      <div
        id={this.props.id}
        style={Object.assign(style.box, this.props.style || {})}
        className={styles.outterBox + " " + (this.props.className || "")}
      >
        <div style={Object.assign(style.funcDiv, this.props.funcStyle || {})}>
          <div style={style.content} />
        </div>
        <div
          ref="elem"
          className={
            styles.trueContentBox + " " + (this.props.trueContentBox || "")
          }
          style={this.props.contentStyle}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

RespRect.propTypes = {
  size: function(props, propName, componentName) {
    if (
      Number(props[propName]) &&
      props[propName] > 0 &&
      props[propName] <= 100
    ) {
      return;
    }
  },
  h: PropTypes.number,
  w: PropTypes.number
};

RespRect.defaultProps = {
  size: "100%",
  h: 1,
  w: 1
};

export default RespRect;
