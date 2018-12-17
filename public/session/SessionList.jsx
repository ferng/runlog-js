import React from 'react';
import PropTypes from 'prop-types';
import Session from './Session';
import { getItemsByParent } from '../lapDataSvcs';
import { createSession, calcLapsTotals, updateLaps, cloneData } from '../lapTools';

class SessionList extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDel = this.handleDel.bind(this);
    this.handleUpdateTotals = this.handleUpdateTotals.bind(this);
  }

  componentDidMount() {
    const { parentId } = this.props;
    getItemsByParent('session', parentId)
      .then((data) => {
        let sessions;
        if (data.length > 0) {
          sessions = data;
        } else {
          sessions = [];
        }
        const newEntry = createSession(this.props.parentId);
        sessions.push(newEntry);
        this.setState({ sessions });
      });
  }

  handleEdit(id) {
    const { sessions } = this.state;
    const newSessions = [];
    sessions.forEach((prevSession) => {
      const session = cloneData(prevSession);
      if (session.id === id) {
        session.editSession = true;
      } else {
        session.editSession = false;
      }
      newSessions.push(session);
    });
    this.setState({ sessions: newSessions });
  }

  handleDel(id) {
    const { sessions } = this.state;
    const newSessions = [];
    sessions.forEach((sess) => {
      if (sess.id !== id) {
        newSessions.push(sess);
      }
    });
    this.setState({ sessions: newSessions });
  }

  handleSubmit(updatedSess) {
    const { sessions } = this.state;
    const newSessions = [];
    let newSess = true;
    sessions.forEach((prevSess) => {
      const session = cloneData(prevSess);
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
      newSessions.push(session);
    });
    if (newSess) {
      const session = cloneData(updatedSess);
      newSessions.pop();
      session.editSession = false;
      newSessions.push(session);
      const newEntry = createSession(this.props.parentId);
      newSessions.push(newEntry);
    }
    this.setState({ sessions: newSessions });
    this.forceUpdate();
  }

  handleUpdateTotals(updatedLapTotal) {
    const newLaps = updateLaps(this.state.laps, updatedLapTotal);
    this.setState({ laps: newLaps });
    const totalLap = calcLapsTotals(newLaps, this.props.multipliers);
    this.props.updateTotals(totalLap);
  }


  render() {
    if (this.state === null) {
      return null;
    }

    const { sessions } = this.state;
    const sessionRows = sessions.map(session =>
      <Session session={session} key={session.id} onSessionEdit={this.handleEdit} onSessionSubmit={this.handleSubmit} onSessionDel={this.handleDel} onUpdateTotals={this.handleUpdateTotals} />);
    return (
      <div>
        {sessionRows}
      </div>
    );
  }
}

SessionList.propTypes = {
  updateTotals: PropTypes.func.isRequired,
  parentId: PropTypes.number.isRequired,
  multipliers: PropTypes.objectOf(PropTypes.string, PropTypes.number).isRequired,
};

export default SessionList;
