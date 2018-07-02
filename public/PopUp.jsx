import React from 'react';
import PropTypes from 'prop-types';

class PopUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
    PopUp.context = this;
  }

  render() {
    if (!this.props.show) {
      return null;
    } else {
      return (
        <div className='modal-popup'>

          <div>
            <button onClick={this.props.onClose}>
                           Close
            </button>


            <h1>{this.props.errHead}</h1>
            <div>{this.props.errMsg}</div>

          </div>
        </div>
      );
    }
  }
}


PopUp.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  errHead: PropTypes.string,
  errMsg: PropTypes.string,
};

PopUp.defaultProps = {
  show: false,
  errHead: 'Error',
  errMsg: 'Unknow Error',
};

export default PopUp;
