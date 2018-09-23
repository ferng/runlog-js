import React from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';
import SelectOpts from './SelectOpts';
import { postNewItem } from './lapDataSvcs';
import { prepSelectOpts } from './lapDataSvcs';
import { createLap } from './lapTools';


/**
 * A React component to enter and submit lap data.
 * @param {props} props - The properties object containing the properties for this React component
 * @property {object} lap - An object defining a {@link module:public/types~lap|lap}
 * @property {function} onLapSubmit - Callback function to execute when a lap being entered or edited is submitted
 * @return {object} A React select element that will be rendered on the browser or null if properties are missing or invalid.
 */
class LapForm extends React.Component {
  static handleTimeChange(e) {
    LapForm.context.setState({ time: e.target.value });
  }

  static handleDistanceChange(e) {
    LapForm.context.setState({ distance: e.target.value });
  }

  static handleUnitChange(e) {
    LapForm.context.setState({ unit: e.target.value });
    LapForm.handleChange(e);
  }

  static handleChange(e) {
    const data = {};
    data[e.target.id] = e.target.value;
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

    const newLap = createLap(id, time, distance, unit);
    postNewItem(newLap, 'lap')
      .catch(() => {
        LapForm.context.setState({ errHead: 'Error', errMsg: 'Error saving data, please try later' });
        LapForm.toggleModal();
      });

    // what if we're just editing'
    LapForm.context.setState(createLap());
  }


  constructor(props) {
    console.log(props);
    super(props);
    const options = prepSelectOpts(props.refData, 'unit');
    this.state = {
      options,
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

        <div className='three columns'>
          <label id='timeLabel' htmlFor='time'>Time: </label>
          <input
            type='time'
            id='time'
            placeholder='Time'
            value={this.state.time}
            step='1'
            onChange={LapForm.handleTimeChange}
            onBlur={LapForm.handleChange}
          />
        </div>

        <div className='three columns'>
          <label id='distanceLabel' htmlFor='distance'>Distance: </label>
          <input
            type='number'
            id='distance'
            placeholder='Distance'
            value={this.state.distance}
            onChange={LapForm.handleDistanceChange}
            onBlur={LapForm.handleChange}
          />
        </div>

        <div className='three columns'>
          <label id='unitLabel' htmlFor='unit'>Unit: </label>
          <SelectOpts
            id='unit'
            value={this.state.unit}
            defaultValue={this.state.unit}
            options={this.state.options}
            onChange={LapForm.handleUnitChange}
          />
        </div>

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
