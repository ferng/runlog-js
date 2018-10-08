import React from 'react';
import PropTypes from 'prop-types';

const replaceAt = (str, pos, charVal) => {
  return str.substring(0,pos) + charVal + str.substring(pos+1)
}

const parseKeys = (key, pos, str) => {
  pos--;
  let parsedTime = str;
  if (key === 'Delete') {
    pos++;
    if (pos === 2 || pos === 5) {
      pos++;
    }
    parsedTime =  replaceAt(str, pos, '0');
  } else if (key === 'Backspace') {
    if (pos !== 4 && pos != 1) {
      pos++;
    }
    parsedTime =  replaceAt(str, pos, '0');
    if (pos === 3 || pos === 6) {
      pos--;
    }
  } else if (key === '0' || key === '1' || key === '2') {
    if (pos === 0 || pos === 1 || pos === 3 || pos === 4 || pos === 6 || pos === 7) {
      parsedTime = replaceAt(str, pos, key);
      pos++;
    } else if (pos === 2 || pos === 5) {
      parsedTime = replaceAt(str, pos+1, key);
      pos+=2;
    }
  } else if (key === '3') {
    if (pos === 1 || pos === 3 || pos === 4 || pos === 6 || pos === 7) {
      parsedTime = replaceAt(str, pos, key);
      pos++;
    } else if (pos === 2 || pos === 5) {
      parsedTime = replaceAt(str, pos+1, key);
      pos+=2;
    }
  } else if (key === '4' || key === '5') {
    if (pos === 1 || pos === 3 || pos === 4 || pos === 6 || pos === 7) {
      if (pos !== 1 || str.charAt(pos-1) !== '2') {
        parsedTime = replaceAt(str, pos, key);
        pos++;
      }
    } else if (pos === 2 || pos === 5) {
      parsedTime = replaceAt(str, pos+1, key);
      pos+=2;
    }
  } else if (key === '6' || key === '7' || key === '8' || key === '9') {
    if (pos === 1 || pos === 4 || pos === 7) {
      if (pos !== 1 || str.charAt(pos-1) !== '2') {
        parsedTime = replaceAt(str, pos, key);
        pos++;
      }
    }
  }
  return {parsedTime, pos};
}




class TimeEntry extends React.Component {
  static registerKey(e) {
    TimeEntry.context.setState({ keyVal: e.key });
  }

  handleTimeChange() {
    const key = this.state.keyVal;
    this.setState({ keyVal: undefined });
    const pos = TimeEntry.context.myRef.current.selectionStart;
    const timeStr = this.state.time;
    const updated = parseKeys(key, pos, timeStr);
    this.setState(
      { time: updated.parsedTime },
      () => {
        TimeEntry.context.myRef.current.setSelectionRange(updated.pos, updated.pos);
      }
    );
  }

  static handleBlur(e) {
     TimeEntry.context.props.onUpdate(e.target.value);
  }

  constructor(props) {
    super(props);
    this.myRef = React.createRef()
    TimeEntry.context = this;
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.state  = {
      time: props.time,
    }
  }

  render() {
    return (
    <div>
      <label id='timeLabel' htmlFor='time'>Time: </label>
      <input
        type='text'
        id='time'
        ref={this.myRef}
        placeholder='Time'
        value={this.state.time}
        onChange={this.handleTimeChange}
        onKeyDown={TimeEntry.registerKey}
        onBlur={TimeEntry.handleBlur}
      />
    </div>
    )
  }
}

export default TimeEntry;

