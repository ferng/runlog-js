import React from 'react';
import SessionForm from './SessionForm';
import SessionInfo from './SessionInfo';
import LapList from '../lap/LapList';
import LapInfo from '../lap/LapInfo';
import Modal from '../general/Modal';
import { prepSelectOpts, postNewItem, removeItem } from '../lapDataSvcs';
import { lapArrayToMap, lapsToReactRows, createLap, createSession } from '../lapTools';
import { RefDataContext } from '../refData-context';

class Session extends React.Component {
  toggleModal() {
    this.setState({
      showModal: !this.state.showModal,
    });
  }

  updateTotals(totalLap) {
    this.setState({ totalLap });
    totalLap.id = this.props.session.id;
    this.props.onUpdateTotals(totalLap);
  }

  onSubmit(sessionData) {
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

  onEdit() {
    this.props.onSessionEdit(this.props.session.id);
  }

  onDel() {
    const {id} = this.props.session;
    removeItem('session', id)
      .then(() => {
        this.props.onSessionDel(id);
      })
      .catch((err) => {
        this.setState({ errHead: 'Error', errMsg: err.message });
        this.toggleModal();
      })
      
  }

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      session: props.session,
    };
    this.updateTotals = this.updateTotals.bind(this);
    this.onSubmit= this.onSubmit.bind(this); 
    this.onEdit= this.onEdit.bind(this);
    this.onDel = this.onDel.bind(this); 
    this.toggleModal = this.toggleModal.bind(this); 
  }


  render() {
    if (this.state.session === undefined) {
      return null;
    }
    const { session } = this.state;
    const { editSession } = this.props.session;
    const {totalLap} = this.state;
    const sessionId = session.id;

    let sessDel = false;
    if (totalLap !== undefined && totalLap.distance === 0) {
      sessDel = true;
    }
    let sessionAction;
    if ( editSession ) {
      sessionAction = 
        <RefDataContext.Consumer>
          {globalRef => (
            <SessionForm session={session} onSubmit={this.onSubmit} refData={globalRef.refData} />)
          }
        </RefDataContext.Consumer> ;
    } else {
      sessionAction = <SessionInfo session={session} onEdit={this.onEdit} onDel={this.onDel} allowSessDel={sessDel}/>;
    }

    let sessionLaps;
    if(sessionId !== -1) {
      sessionLaps =
        <div className='twelve columns'>
            <RefDataContext.Consumer>
              {globalRef => (<LapList parentId={sessionId} updateTotals={this.updateTotals} multipliers={globalRef.multipliers}/>)}
            </RefDataContext.Consumer>
        </div>
    }


    return (
      <div>
        <div className='twelve columns'>
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

export default Session;
