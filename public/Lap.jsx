import React from 'react';
import PropTypes from 'prop-types';
import LapForm from './LapForm';
import LapInfo from './LapInfo';
import { postNewItem } from './lapDataSvcs';
import Modal from './Modal';
import { RefDataContext } from './refData-context';

/**
 * A React component to display or enter lap data.
 * @param {props} props - The properties object containing the properties for this React component
 * @property {object} lap - Object defining a {@link module:public/types~lap|lap}
 * @property {function} onLapEdit - Callback function to execute when a lap being displayed is clicked for editing
 * @property {function} onLapSubmit - Callback function to execute when a lap being entered or edited is submitted for processing
 * @return {object} A React select element that will be rendered on the browser or null if properties are missing or invalid.
 */
class Lap extends React.Component {
  static toggleModal() {
    Lap.context.setState({
      showModal: !Lap.context.state.showModal,
    });
  }

  onSubmit(lapData) {
   lapData.parentId=this.state.parentId;
   postNewItem(lapData, 'lap')
      .then((response) => {
        lapData.id = response.id;
        this.props.onLapSubmit(lapData);
      })
      .catch((err) => {
        this.setState({ errHead: 'Error', errMsg: 'Error saving data, please try later' });
        Lap.toggleModal();
      });
  }
  
  onEdit() {
    this.props.onLapEdit(this.props.lap.id);
  }

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      parentId: props.parentId,
      lap: props.lap
    };
    Lap.context = this;
    this.onSubmit = this.onSubmit.bind(this); 
    this.onEdit = this.onEdit.bind(this); 
  }

  componentDidMount() {
    const {parentId} = Lap.context.state
  }

  render() {
    const { lap } = this.props;
    const { editLap } = lap; 
    let lapAction;
    if (editLap) {
      lapAction = 
        <RefDataContext.Consumer>
          {globalRef => (<LapForm lap={lap} refData={globalRef.refData} onSubmit={this.onSubmit}/>)}
        </RefDataContext.Consumer>
    } else {
      lapAction = 
        <RefDataContext.Consumer>
          {globalRef => (<LapInfo lap={lap} borderOn={true} multipliers={globalRef.multipliers} onEdit={this.onEdit}/>)}
        </RefDataContext.Consumer>
    }

    return (
      <div className='four columns'>
        <Modal errHead={this.state.errHead} errMsg={this.state.errMsg} show={this.state.showModal} onClose={Lap.toggleModal} />
        <div className='twelve columns left'>
          {lapAction}      
        </div>
      </div>
    );
  }
}

  
Lap.propTypes = {
  editLap: PropTypes.bool,
  lap: PropTypes.shape({
    parentId: PropTypes.number.isRequired,
    distance: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    time: PropTypes.string.isRequired,
    unit: PropTypes.string.isRequired,

  }),
};

Lap.defaultProps = {
  lap: {
    parentId: 0,
    distance: 0,
    id: -1,
    time: '00:00:00',
    unit: '--',
  },
};

export default Lap;
