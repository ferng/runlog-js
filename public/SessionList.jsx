import React from 'react';
import PropTypes from 'prop-types';
import Session from './Session';
import { getItemsByParent } from './lapDataSvcs';
import { createSession } from './lapTools';

class SessionList extends React.Component {

  static createNewSession(parentId) {
    const newSess = createSession(parentId);
    return newSess;
  }

  
  onSessionEdit(id){
    let sessions = this.state.sessions;
    sessions.forEach((session) => {
      if (session.id === id) {
        session.editSession = true;
      } else {
        session.editSession = false;
      }
    });
    this.setState(sessions);
  }


  constructor(props) {
    super(props);
    SessionList.context = this;
  }

  componentDidMount() {
    const parentId = this.props.parentId;
    getItemsByParent('session', parentId)
      .then((data) => {
        let sessions;
        if (data.length > 0) {
          sessions = data;
        } else {
          sessions = [];
        }
        const newEntry = SessionList.createNewSession(this.props.parentId);
//         sessions.push(newEntry);
        SessionList.context.setState({ sessionToEdit: 0, sessions });

      });
  }
  

  render() {
    if (SessionList.context.state === null) 
    {
      return null;
    }
    
    let {sessions} = SessionList.context.state; 
    let sessionRows = sessions.map((session, index) => 
              <Session session={session} key={index} parentId={this.props.parentId}/>
    );

    return (
      <div>
        {sessionRows}
      </div>
    );
  
  }

}

SessionList.propTypes = {
  parentId: PropTypes.number,
};

export default SessionList;
