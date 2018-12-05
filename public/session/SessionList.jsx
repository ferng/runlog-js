import React from 'react';
import PropTypes from 'prop-types';
import Session from './Session';
import { getItemsByParent } from '../lapDataSvcs';
import { createSession } from '../lapTools';

class SessionList extends React.Component {

  createNewSession(parentId) {
    const newSess = createSession(parentId);
    return newSess;
  }


  onSessionEdit(id) {
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

  onSessionDel(id) {
    let sessions = this.state.sessions;
    let newSessions =[];
    sessions.forEach((sess) => {
      if (sess.id !== id) {
        newSessions.push(sess);
      }
    })
    this.setState({sessions: newSessions});
  }

  onSessionSubmit(updatedSess) {
    let sessions = this.state.sessions;
    let newSess = true;
    sessions.forEach((session) => {
      if (session.id === updatedSess.id) {
        session.time = updatedSess.time;
        session.activity = updatedSess.activity;
        session.kit = updatedSess.kit;
        session.weather = updatedSess.weather;
        session.feels = updatedSess.feels;
        session.effort = updatedSess.effort;
        newSess = false;
      }
      session.editSession = false;
    })
    if (newSess) {
      sessions.pop();
      updatedSess.editSession = false;
      sessions.push(updatedSess);
      const newEntry = this.createNewSession(this.props.parentId);
      sessions.push(newEntry);
      this.setState(sessions);
    }
    this.forceUpdate();
  }


  constructor(props) {
    super(props);
    SessionList.context = this;
    this.onSessionSubmit = this.onSessionSubmit.bind(this); 
    this.onSessionEdit = this.onSessionEdit.bind(this);
    this.onSessionDel = this.onSessionDel.bind(this);
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
        const newEntry = this.createNewSession(this.props.parentId);
        sessions.push(newEntry);
        this.setState({ sessions });
      });
  }
  

  render() {
    if (this.state === null) 
    {
      return null;
    }
    
    let {sessions} = this.state; 
    let sessionRows = sessions.map((session) => 
      <Session session={session} key={session.id} onSessionEdit={this.onSessionEdit} onSessionSubmit={this.onSessionSubmit} onSessionDel={this.onSessionDel} parentId={this.props.parentId}/>
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
