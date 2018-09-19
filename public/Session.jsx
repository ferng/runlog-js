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

  
  static onSubmit(sessionData) {
    sessionData.parentId=Session.context.state.parentId;
    postNewItem(sessionData, 'session')
      .then((response) => {
        Session.context.setState({ editSession: false });
        Session.context.setState({ session: sessionData });
      })
      .catch((err) => {
        Session.context.setState({ errHead: 'Error', errMsg: 'Error saving data, please try later' });
        Session.toggleModal();
      });
  }

  static onEdit(id) {
    Session.context.setState({ editSession: true });
  }

  constructor(props) {
    super(props);
    this.state = {showModal: false, parentId: props.parentId};
    Session.context = this;
  }

  componentDidMount() {
    const {parentId} = Session.context.state
    let session;
    getItemsByParent('session', parentId)
      .then((data) => {
        session = data[0];

        let editSession = true;
        if (session === undefined) {
          session = createSession();
        } else {
          editSession = false;
        }
        const lapTotals = createLap(3, '03:10:10', 23, 'yard');
        Session.context.setState({editSession, session, lapTotals});

      });
    

    //get session data with id (0) is default for non loaded
    //if 0 === not present
    //  blank session ready for entry
    //  blank lap
    //else 
    //  get it and display it
    //  if available
    //    display lap
    //  else
    //    blank lap
//     const lap1 = createLap(1, '01:10:10', 21, 'yard');
//     const lap2 = createLap(2, '02:10:10', 22, 'yard');
//     const laps1= new Array();
//     laps1.push(lap1);
//     laps1.push(lap2);
//     Session.context.setState({ laps1});
  
  }

  render() {
    if (Session.context.state.session === undefined) {
      return null;
    }
    const { editSession } = Session.context.state;
//     const { laps1 } = Session.context.state;
//     const reactLaps = lapsToReactRows(laps1);
//     const laps = lapArrayToMap(laps1);
    const { session } = Session.context.state;
    const { lapTotals } = Session.context.state
    const sessionId = Session.context.state.session.id;
    const lap = lapTotals;

    let sessionAction;
    if ( editSession ) {
      sessionAction = 
        <RefDataContext.Consumer>
          {globalRef => (
            <SessionForm session={session} onSubmit={Session.onSubmit} refData={globalRef.refData} />)
          }
        </RefDataContext.Consumer> ;
    } else {
      sessionAction = <SessionInfo session={session} onEdit={Session.onEdit} />;
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
              {globalRef => (<LapInfo lap={lap} borderOn={true} multipliers={globalRef.multipliers} />)}
            </RefDataContext.Consumer>
          </div>
        </div>

        <div className='twelve columns'>
          <LapList parentId={sessionId}/>
        </div>
      </div>
    );
  }
}

export default Session;
