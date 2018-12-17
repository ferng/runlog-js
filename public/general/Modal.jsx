import React from 'react';
import PropTypes from 'prop-types';

const Modal = (props) => {
  let modal = null;
  if (props.show) {
    modal =
      (
        <div className='modal-popup'>
          <div>
            <button onClick={props.onClose}>
               Close
            </button>
            <h1>{props.errHead}</h1>
            <div>{props.errMsg}</div>
          </div>
        </div>
      );
  }
  return modal;
};


Modal.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  errHead: PropTypes.string,
  errMsg: PropTypes.string,
};

Modal.defaultProps = {
  show: false,
  errHead: 'Error',
  errMsg: 'Unknow Error',
};

export default Modal;
