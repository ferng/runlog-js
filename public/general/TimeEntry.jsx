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
  } else if (key === ':') {
    if (pos === 2 || pos === 5) {
      pos++;
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
  registerKey(e) {
    this.setState({ keyVal: e.key });
  }

  handleTimeChange() {
    const key = this.state.keyVal;
    this.setState({ keyVal: undefined });
    const pos = this.myRef.current.selectionStart;
    const timeStr = this.state.time;
    const updated = parseKeys(key, pos, timeStr);
    this.setState(
      { time: updated.parsedTime },
      () => {
        this.myRef.current.setSelectionRange(updated.pos, updated.pos);
      }
    );
  }

  handleBlur(e) {
     this.props.onUpdate(e.target.value);
  }

  constructor(props) {
    super(props);
    this.myRef = React.createRef()
    this.state  = {
      time: props.time,
    }
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.registerKey= this.registerKey.bind(this);
    this.handleBlur= this.handleBlur.bind(this);
  }

  render() {
    return (
      <input
        className='time-entry'
        type='text'
        id='timeEntry'
        ref={this.myRef}
        placeholder='Time'
        value={this.state.time}
        onChange={this.handleTimeChange}
        onKeyDown={this.registerKey}
        onBlur={this.handleBlur}
      />
    )
  }
}

export default TimeEntry;

