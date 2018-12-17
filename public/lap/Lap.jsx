import React from 'react';
import PropTypes from 'prop-types';
import LapForm from './LapForm';
import { cloneData } from '../lapTools';
import LapInfo from './LapInfo';
import { postNewItem, removeItem } from '../lapDataSvcs';
import { RefDataContext } from '../refData-context';
import Modal from '../general/Modal';

/**
 * A React component to display or enter lap data.
 * @param {props} props - The properties object containing the properties for this React component
 * @property {object} lap - Object defining a {@link module:public/types~lap|lap}
 * @property {function} onLapEdit - Callback function to execute when a lap being displayed is clicked for editing
 * @property {function} onLapSubmit - Callback function to execute when a lap being entered or edited is submitted for processing
 * @return {object} A React select element that will be rendered on the browser or null if properties are missing or invalid.
 */
class Lap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDel = this.handleDel.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  handleSubmit(prevLapData) {
    const lapData = cloneData(prevLapData);
    postNewItem(lapData, 'lap')
      .then((response) => {
        lapData.id = response.id;
        this.props.onLapSubmit(lapData);
      })
      .catch((err) => {
        this.setState({ errHead: 'Error', errMsg: err.message });
        this.toggleModal();
      });
  }

  handleEdit() {
    this.props.onLapEdit(this.props.lap.id);
  }

  handleDel() {
    const { id } = this.props.lap;
    removeItem('lap', id)
      .then(() => {
        this.props.onLapDel(id);
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
    const { lap } = this.props;
    const { editLap } = lap;
    const style = `four columns ${this.props.style}`;
    let lapAction;
    if (editLap) {
      lapAction =
        (
          <RefDataContext.Consumer>
            {globalRef => (<LapForm lap={lap} refData={globalRef.refData} onSubmit={this.handleSubmit} />)}
          </RefDataContext.Consumer>
        );
    } else {
      lapAction =
        (
          <RefDataContext.Consumer>
            {globalRef => (<LapInfo lap={lap} borderOn={true} multipliers={globalRef.multipliers} onEdit={this.handleEdit} onDel={this.handleDel} />)}
          </RefDataContext.Consumer>
        );
    }

    return (
      <div>
        <Modal errHead={this.state.errHead} errMsg={this.state.errMsg} show={this.state.showModal} onClose={this.toggleModal} />
        <div className={style}>
          {lapAction}
        </div>
      </div>
    );
  }
}


Lap.propTypes = {
  onLapSubmit: PropTypes.func.isRequired,
  onLapEdit: PropTypes.func.isRequired,
  onLapDel: PropTypes.func.isRequired,
  style: PropTypes.string,
  lap: PropTypes.shape({
    parentId: PropTypes.number.isRequired,
    distance: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    time: PropTypes.string.isRequired,
    unit: PropTypes.string.isRequired,
  }),
};

Lap.defaultProps = {
  style: '',
  lap: {
    parentId: 0,
    distance: 0,
    id: -1,
    time: '00:00:00',
    unit: '--',
  },
};

export default Lap;
