import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './general/Modal';
import Week from './week/Week';
import { getRefData, prepDistanceMultiplier } from './lapDataSvcs';
import { RefDataContext } from './refData-context';


class TopLevel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { refData: [], multipliers: [], showModal: false };
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    getRefData()
      .then((data) => {
        this.setState({ refData: data });
        this.setState({ multipliers: prepDistanceMultiplier(data) });
        this.setState({ dataLoaded: true });
      })
      .catch((err) => {
        this.setState({ errHead: 'Error', errMsg: err.message });
        this.toggleModal();
      });
  }

  toggleModal() {
    this.setState({
      showModal: !this.state.showModal,
    });
  }

  render() {
    if (this.state.dataLoaded) {
      const globalRef = { refData: this.state.refData, multipliers: this.state.multipliers };
      return (
        <RefDataContext.Provider value={globalRef}>
          <div className='twelve columns'>
            <div className='topLevel'>
              <Week multipliers={globalRef.multipliers} />
            </div>
          </div>
        </RefDataContext.Provider>
      );
    }
    return (
      <Modal errHead={this.state.errHead} errMsg={this.state.errMsg} show={this.state.showModal} onClose={this.toggleModal} />
    );
  }
}


ReactDOM.render(
  <TopLevel pollInterval={2000} />,
  document.getElementById('content'),
);

export default TopLevel;
