import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Modal from './general/Modal';
import Day from './day/Day';
import SessionList from './session/SessionList';
import { getItems, getRefData, prepDistanceMultiplier } from './lapDataSvcs';
import { lapArrayToMap } from './lapTools';
import { RefDataContext } from './refData-context';


class TopLevel extends React.Component {
  toggleModal() {
    this.setState({
      showModal: !this.state.showModal,
    });
  }

  constructor(props) {
    super(props);
    this.state = { laps: [], refData: [], multipliers: [], showModal: false };
    this.toggleModal = this.toggleModal.bind(this); 
  }

  componentDidMount() {
    getRefData()
      .then((data) => {
        this.setState({ refData: data });
        this.setState({ multipliers: prepDistanceMultiplier(data) });
      })
      .then(data => getItems('lap'))
      .then(lapArrayToMap)
      .then((data) => {
        this.setState({ laps: data });
        this.setState({ dataLoaded: true });
      })
      .catch((err) => {
        this.setState({ errHead: 'Error', errMsg: err.message });
        this.toggleModal();
      });
  }

  render() {
    if (this.state.dataLoaded) {
      const globalRef = { refData: this.state.refData, multipliers: this.state.multipliers };
      const id = -1;
      return (
        <RefDataContext.Provider value={globalRef}> 
          <div className='twelve columns'>
            <div className='topLevel'>
              <Day activityDate='1544684788213'/>


              </div>
          </div>
        </RefDataContext.Provider>
      );
    } else {
      return (
        <Modal errHead={this.state.errHead} errMsg={this.state.errMsg} show={this.state.showModal} onClose={this.toggleModal} />
      );
    }
  }
}


ReactDOM.render(
  <TopLevel pollInterval={2000} />,
  document.getElementById('content'),
);

export default TopLevel;
