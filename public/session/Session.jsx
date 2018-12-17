import React from 'react';
import PropTypes from 'prop-types';
import SessionForm from './SessionForm';
import SessionInfo from './SessionInfo';
import LapList from '../lap/LapList';
import LapInfo from '../lap/LapInfo';
import Modal from '../general/Modal';
import { postNewItem, removeItem } from '../lapDataSvcs';
import { cloneData } from '../lapTools';
import { RefDataContext } from '../refData-context';

class Session extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      session: props.session,
    };
    this.handleUpdateTotals = this.handleUpdateTotals.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDel = this.handleDel.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({
      showModal: !this.state.showModal,
    });
  }

  handleUpdateTotals(prevTotalLap) {
    const totalLap = cloneData(prevTotalLap);
    this.setState({ totalLap });
    totalLap.id = this.props.session.id;
    this.props.onUpdateTotals(totalLap);
  }

  handleSubmit(updatedSessionData) {
    const sessionData = cloneData(updatedSessionData);
    postNewItem(sessionData, 'session')
      .then((response) => {
        sessionData.id = response.id;
        this.props.onSessionSubmit(sessionData);
      })
      .catch((err) => {
        this.setState({ errHead: 'Error', errMsg: err.message });
        this.toggleModal();
      });
  }

  handleEdit() {
    this.props.onSessionEdit(this.props.session.id);
  }

  handleDel() {
    const { id } = this.props.session;
    removeItem('session', id)
      .then(() => {
        this.props.onSessionDel(id);
      })
      .catch((err) => {
        this.setState({ errHead: 'Error', errMsg: err.message });
        this.toggleModal();
      });
  }


  render() {
    if (this.state.session === undefined) {
      return null;
    }
    const { session } = this.props;
    const { editSession } = this.props.session;
    const { totalLap } = this.state;
    const sessionId = session.id;

    let sessDel = false;
    if (totalLap !== undefined && totalLap.distance === 0) {
      sessDel = true;
    }
    let sessionAction;
    if (editSession) {
      sessionAction =
        (
          <RefDataContext.Consumer>
            {globalRef => (
              <SessionForm session={session} onSubmit={this.handleSubmit} refData={globalRef.refData} />)
          }
          </RefDataContext.Consumer>
        );
    } else {
      sessionAction = <SessionInfo session={session} onEdit={this.handleEdit} onDel={this.handleDel} allowSessDel={sessDel} />;
    }

    let sessionLaps;
    if (sessionId !== -1) {
      sessionLaps =
        (
          <div className='twelve columns'>
            <RefDataContext.Consumer>
              {globalRef => (<LapList parentId={sessionId} onUpdateTotals={this.handleUpdateTotals} multipliers={globalRef.multipliers} />)}
            </RefDataContext.Consumer>
          </div>);
    }


    return (
      <div>
        <div className='twelve columns bkg-session'>
          <Modal errHead={this.state.errHead} errMsg={this.state.errMsg} show={this.state.showModal} onClose={this.toggleModal} />
          <div className='eight columns'>
            {sessionAction}
          </div>
          <div className='four columns'>
            <RefDataContext.Consumer>
              {globalRef => (<LapInfo lap={totalLap} borderOn={true} multipliers={globalRef.multipliers} />)}
            </RefDataContext.Consumer>
          </div>
        </div>

        {sessionLaps}
      </div>
    );
  }
}

Session.propTypes = {
  onSessionSubmit: PropTypes.func.isRequired,
  onSessionEdit: PropTypes.func.isRequired,
  onSessionDel: PropTypes.func.isRequired,
  onUpdateTotals: PropTypes.func.isRequired,
  session: PropTypes.shape({
    time: PropTypes.string.isRequired,
    activity: PropTypes.string.isRequired,
    kit: PropTypes.string.isRequired,
    weather: PropTypes.string.isRequired,
    feels: PropTypes.string.isRequired,
    effort: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    parentId: PropTypes.number.isRequired,
    editSession: PropTypes.bool,
  }).isRequired,
};

export default Session;
