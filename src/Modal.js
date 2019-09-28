import React from "react";
export default class Modal extends React.Component {

  close() {
    this.setState({ showModal: false });
  }
  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };
  render() {
    const {show} = this.props;
    console.log(show)
    if (!show) {
        return null;
    }
    return (
        <div>
          <div>{this.props.children}</div>
          <div>
            <button
              onClick={e => {
                this.onClose(e);
              }}>Close</button>
          </div>
        </div>
      );
  }
  
}