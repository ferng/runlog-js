import React from 'react';
import PropTypes from 'prop-types';
import LapEntry from './LapEntry';
import Modal from './Modal';
import { postNewItem } from './lapDataSvcs';
import { createLap } from './lapTools';


/**
 * A React component to enter and submit lap data.
 * @param {props} props - The properties object containing the properties for this React component
 * @property {object} lap - An object defining a {@link module:public/types~lap|lap}
 * @property {function} onLapSubmit - Callback function to execute when a lap being entered or edited is submitted
 * @return {object} A React select element that will be rendered on the browser or null if properties are missing or invalid.
 */
class LapForm extends React.Component {
  static handleChange(data) {
    LapForm.context.setState(data);
  }

  static toggleModal() {
    LapForm.context.setState({
      showModal: !LapForm.context.state.showModal,
    });
  }

  static handleSubmit(e) {
    e.preventDefault();
    const id = LapForm.context.state.id !== 0 ? LapForm.context.state.id : Date.now();
    let { time } = LapForm.context.state;
    const distance = parseFloat(LapForm.context.state.distance);
    const { unit } = LapForm.context.state;
    if (!time || time === '00:00:00' || time === '00:00' || !distance || distance === 0 || Number.isNaN(distance) || !unit || unit === '--') {
      return;
    }
    time = time.length === 5 ? `${time}:00` : time;

    const newLap = { lap: createLap(id, time, distance, unit) };
    postNewItem(newLap, 'lap')
      .catch(() => {
        LapForm.context.setState({ errHead: 'Error', errMsg: 'Error saving data, please try later' });
        LapForm.toggleModal();
      });
    LapForm.context.props.onLapSubmit(newLap);

    LapForm.context.setState(createLap());
  }


  constructor(props) {
    super(props);
    this.state = {
      id: props.lap.id, distance: props.lap.distance, time: props.lap.time, unit: props.lap.unit, showModal: false,
    };
    LapForm.context = this;
  }

  render() {
    return (
      <div>
        <Modal errHead={this.state.errHead} errMsg={this.state.errMsg} show={this.state.showModal} onClose={LapForm.toggleModal} />
      <div
        className='twelve columns left'
        role='presentation'
      >
          <form className='LapForm' onSubmit={LapForm.handleSubmit}>
            <LapEntry
              time={this.state.time}
              distance={this.state.distance}
              unit={this.state.unit}
              onChange={LapForm.handleChange}
              format='three columns'
            />

            <div className='three columns'>
              <button display='primary' type='submit' >OK</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}


LapForm.propTypes = {
  lap: PropTypes.shape({
    distance: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    time: PropTypes.string.isRequired,
    unit: PropTypes.string.isRequired,

  }),
};

LapForm.defaultProps = {
  lap: {
    distance: 0,
    id: -1,
    time: '00:00:00',
    unit: '--',
  },
};

export default LapForm;
