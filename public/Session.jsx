import React from 'react';
import PropTypes from 'prop-types';
import SessionForm from './SessionForm';
import SessionInfo from './SessionInfo';
import LapList from './LapList';
import Lap from './Lap';
import { lapArrayToMap, lapsToReactRows, createLap } from './lapTools';

  function EditSession(props) {
    return (
      <SessionForm session={props.session} onSubmit={Session.onSubmit} />
    );
  }

  function DisplaySession(props) {
    return (
      <SessionInfo session={props.session} onEdit={Session.onEdit} />
    );
  }
class Session extends React.Component {
  
  static onSubmit(id) {
    Session.context.setState({ editSession: false });
  }

  static onEdit(id) {
    Session.context.setState({ editSession: true });
  }

  constructor(props) {
    super(props);
    Session.context = this;
  }

  componentWillMount() {
    Session.context.setState({ editSession: false });
    const lap1 = createLap(1, '01:10:10', 21, 'yard');
    const lap2 = createLap(2, '02:10:10', 22, 'yard');
    const dispLap = createLap(3, '03:10:10', 23, 'yard');
    const laps1= new Array();
    laps1.push(lap1);
    laps1.push(lap2);
    Session.context.setState({ laps1, dispLap });
  
  }



  render() {
    const { editSession } = Session.context.state;
    const { laps1 } = Session.context.state;
    const reactLaps = lapsToReactRows(laps1);
    console.log(reactLaps);
    const session = { activity: 'fartlek', kit: 'fast', weather: 'rainy', feels: 'muggy', effort: 'ok' };
    const { dispLap } = Session.context.state
    const laps = lapArrayToMap(laps1);

    let sessionAction;
    if ( editSession ) {
      sessionAction = <EditSession session={session} />;
    } else {
      sessionAction = <DisplaySession session={session} />;
    }
      
    return (
      <div>
      <div className='twelve columns'>
        <div className='eight columns'>
          {sessionAction}
        </div>
        <div className='four columns'>
          <Lap lap={dispLap}/>
        </div>
      </div>
      <div className='twelve columns'>
        <LapList laps={laps} onLapSubmit={Session.onSubmit} /> 
      </div>
      </div>
    );
  }
}

export default Session;
