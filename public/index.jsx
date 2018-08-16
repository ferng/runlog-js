import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Modal from './Modal';
import LapList from './LapList';
import SessionForm from './SessionForm';
import { getItems, getRefData, prepDistanceMultiplier } from './lapDataSvcs';
import { lapArrayToMap } from './lapTools';


class TopLevel extends React.Component {
  static toggleModal() {
    TopLevel.context.setState({
      showModal: !TopLevel.context.state.showModal,
    });
  }

  static handleLapSubmit(lapData) {
    const { laps } = TopLevel.context.state;
    laps.set(lapData.lap.id, lapData.lap);
    TopLevel.context.setState({ laps });
  }


  constructor(props) {
    super(props);
    this.state = { laps: [], refData: [], multipliers: [], showModal: false };
    TopLevel.context = this;
  }

  getChildContext() {
    return { 
      refData: TopLevel.context.state.refData,
      multipliers: TopLevel.context.state.multipliers
    };
  }

  componentDidMount() {
    getRefData()
      .then((data) => {
        TopLevel.context.setState({ refData: data });
        TopLevel.context.setState({ multipliers: prepDistanceMultiplier(data) });
      })
      .then(data => getItems('lap'))
      .then(lapArrayToMap)
      .then((data) => {
        TopLevel.context.setState({ laps: data });
        TopLevel.context.setState({ dataLoaded: true });
      })
      .catch(() => {
        TopLevel.context.setState({ errHead: 'Error', errMsg: 'Error retrieving data, please try later' });
        TopLevel.toggleModal();
      });
  }

  render() {
    if (this.state.dataLoaded) {
      return (
        <div className='twelve columns'>
          <div className='topLevel'>
            <SessionForm />
          </div>
        </div>
      );
    } else {
      return (
        <Modal errHead={this.state.errHead} errMsg={this.state.errMsg} show={this.state.showModal} onClose={TopLevel.toggleModal} />
      );
    }
  }
}

TopLevel.childContextTypes = {
  refData: PropTypes.any.isRequired,
  multipliers: PropTypes.any.isRequired,
};


ReactDOM.render(
  <TopLevel pollInterval={2000} />,
  document.getElementById('content'),
);

export default TopLevel;
