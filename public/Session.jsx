import React from 'react';
import SessionForm from './SessionForm';
import SessionInfo from './SessionInfo';
import LapList from './LapList';
import LapInfo from './LapInfo';
import Modal from './Modal';
import { getItemsByParent, prepSelectOpts, postNewItem } from './lapDataSvcs';
import { lapArrayToMap, lapsToReactRows, createLap, createSession } from './lapTools';
import { RefDataContext } from './refData-context';

class Session extends React.Component {
  static toggleModal() {
    Session.context.setState({
      showModal: !Session.context.state.showModal,
    });
  }


  static updateTotals(totalLap) {
    Session.context.setState({ totalLap });
  }

  onSubmit(sessionData) {
    console.log(sessionData);
    sessionData.parentId=this.state.parentId;
    console.log(sessionData);
    postNewItem(sessionData, 'session')
      .then((response) => {
        sessionData.id = response.id;
        this.setState({ editSession: false });
        this.setState({ session: sessionData });
      })
      .catch((err) => {
        Session.context.setState({ errHead: 'Error', errMsg: 'Error saving data, please try later' });
        Session.toggleModal();
      });
  }

  onEdit(id) {
    this.setState({ editSession: true });
  }

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      parentId: props.parentId,
      session: props.session
    };
    Session.context = this;
    this.onSubmit= this.onSubmit.bind(this); 
    this.onEdit= this.onEdit.bind(this); 
  }

  componentDidMount() {
  }

  render() {
    if (this.state.session === undefined) {
      return null;
    }
    const { editSession } = this.state;
//     const { laps1 } = Session.context.state;
//     const reactLaps = lapsToReactRows(laps1);
//     const laps = lapArrayToMap(laps1);
    const { session } = this.state;
    const sessionId = this.state.session.id;
    const {totalLap} = this.state;
    const {parentId} = this.state

    let sessionAction;
    if ( editSession ) {
      sessionAction = 
        <RefDataContext.Consumer>
          {globalRef => (
            <SessionForm session={session} onSubmit={this.onSubmit} refData={globalRef.refData} />)
          }
        </RefDataContext.Consumer> ;
    } else {
      sessionAction = <SessionInfo session={session} onEdit={this.onEdit} />;
    }


    return (
      <div>
        <div className='twelve columns'>
          <Modal errHead={this.state.errHead} errMsg={this.state.errMsg} show={this.state.showModal} onClose={Session.toggleModal} />
          <div className='eight columns'>
            {sessionAction}
          </div>
          <div className='four columns'>
            <RefDataContext.Consumer>
              {globalRef => (<LapInfo lap={totalLap} borderOn={true} multipliers={globalRef.multipliers} />)}
            </RefDataContext.Consumer>
          </div>
        </div>

        <div className='twelve columns'>
            <RefDataContext.Consumer>
              {globalRef => (<LapList parentId={sessionId} updateTotals={Session.updateTotals} multipliers={globalRef.multipliers}/>)}
            </RefDataContext.Consumer>
        </div>
      </div>
    );
  }
}

export default Session;
