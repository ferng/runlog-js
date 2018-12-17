import React from 'react';
import PropTypes from 'prop-types';

class SessionInfo extends React.Component {
  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDel = this.handleDel.bind(this);
  }

  handleEdit() {
    if (this.props.onEdit !== undefined) {
      this.props.onEdit();
    }
  }

  handleDel(e) {
    e.stopPropagation();
    this.props.onDel();
  }

  render() {
    const { session } = this.props;
    const { allowSessDel } = this.props;
    let delButton;
    if (allowSessDel) {
      delButton = <button display='primary' type='button' onClick={this.handleDel}>DEL</button>;
    }

    return (
      <div
        className='twelve columns'
        onClick={() => this.handleEdit()}
        role='presentation'
      >

        <div className='one wide column'>
          <label id='dataTimeLabel' htmlFor='dataTime'>Time:
            <div className='data' id='dataTime'>
              {session.time}
            </div>
          </label>
        </div>
        <div className='one wide column'>
          <label id='dataActivityLabel' htmlFor='dataActivity'>Activity:
            <div className='data' id='dataActivity'>
              {session.activity}
            </div>
          </label>
        </div>

        <div className='one wide column'>
          <label id='dataKitLabel' htmlFor='dataKit'>Kit:
            <div className='data' id='dataKit'>
              {session.kit}
            </div>
          </label>
        </div>

        <div className='one wide column'>
          <label id='dataWeatherLabel' htmlFor='dataWeather'>Weather:
            <div className='data' id='dataWeather'>
              {session.weather}
            </div>
          </label>
        </div>

        <div className='one wide column'>
          <label id='dataFeelsLabel' htmlFor='dataFeels'>Feels:
            <div className='data' id='dataFeels'>
              {session.feels}
            </div>
          </label>
        </div>

        <div className='one wide column'>
          <label id='dataEffortLabel' htmlFor='dataEffort'>Effort:
            <div className='data' id='dataEffort'>
              {session.effort}
            </div>
          </label>
        </div>

        <div className='one narrow column'>
          {delButton}
        </div>

      </div>

    );
  }
}

SessionInfo.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onDel: PropTypes.func.isRequired,
  allowSessDel: PropTypes.bool.isRequired,
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


export default SessionInfo;
