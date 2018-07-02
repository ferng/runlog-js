import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import PopUp from './PopUp';
import LapList from './LapList';
// import {ActivityForm} from './ActivityForm';
import { getItems, getRefData } from './lapDataSvcs';
import { lapArrayToMap } from './lapTools';


class TopLevel extends React.Component {
  static toggleModal() {
    TopLevel.context.setState({
      isOpen: !TopLevel.context.state.isOpen,
    });
  }

  static handleLapSubmit(lapData) {
    const { laps } = TopLevel.context.state;
    laps.set(lapData.lap.id, lapData.lap);
    TopLevel.context.setState({ laps });
  }


  constructor(props) {
    super(props);
    this.state = { laps: [], refData: [], isOpen: false };
    TopLevel.context = this;
  }

  getChildContext() {
    return { refData: TopLevel.context.state.refData };
  }

  componentDidMount() {
    getRefData()
      .then((data) => {
        TopLevel.context.setState({ refData: data });
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
        <div className='topLevel'>
          <LapList laps={this.state.laps} onLapSubmit={TopLevel.handleLapSubmit} />
        </div>
      );
    } else {
      return (
        <PopUp errHead={this.state.errHead} errMsg={this.state.errMsg} show={this.state.isOpen} onClose={TopLevel.toggleModal} />
      );
    }
  }
}

TopLevel.childContextTypes = {
  refData: PropTypes.any.isRequired,
};


ReactDOM.render(
  <TopLevel pollInterval={2000} />,
  document.getElementById('content'),
);
