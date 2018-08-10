import React from 'react';
import PropTypes from 'prop-types';
import SelectOpts from './SelectOpts';
import { postNewItem, prepSelectOpts, prepDistanceMultiplier } from './lapDataSvcs';
import Lap from './Lap';
import { createLap, createActivity } from './lapTools';

      <div className='activityForm'>
        <Modal errHead={this.state.errHead} errMsg={this.state.errMsg} show={this.state.showModal} onClose={ActivityForm.toggleModal} />
        <div className='twelve columns left'>
          <form className='ActivityForm' onSubmit={ this.handleSubmit }>
            <div className='one column'>
              <button display="primary" type="submit" >OK</button>
            </div>
          </form>
        </div>
      </div>



/**
 * A React component to enter activity data.
 * The {@link module:public/types~lapContext|context} should contain:
 *      a Map with {@link module:public/types~refData|refData}.
 * it adds a Map with {@link module:public/types~multipliers|multipliers} to the context.
 * @param {props} props - The properties object containing the properties for this React component
 * @property {object} activity - An object defining a {@link module:public/types~activity|activity}
 * @property {function} onActivitySubmit - Callback function to execute when an activity being entered or edited is submitted
 * @return {object} A React select element that will be rendered on the browser or null if properties are missing or invalid.
 */
class ActivityForm extends React.Component {
  constructor(props) {
    super(props);
    ActivityForm.context = this;
  }

  getChildContext() {
    return { multipliers: this.state.multipliers };
  }

  componentWillMount() {
    ActivityForm.context.setState({ multipliers: prepDistanceMultiplier(this.context.refData) });
  }

  onLapEdit(e) {
    console.log('yeay');
  }




  handleSubmit(e) {

    postNewItem(newActivity, 'activity');
    // ActivityForm.context.props.onActivitySubmit(newActivity);
    // LapForm.context.setState(createCleanLap());
  }

  render() {
    const lap = createLap();
    return (
      <div className='lapList'>
        <div className='twelve columns left'>
          <form className='ActivityForm' onSubmit={ this.handleSubmit }>
            Rdiv className='one column'>
              <label id='newFeelsLabel' htmlFor='newFeels'>Feels: </label>
              <SelectOpts
                id='newFeels'
                value={ this.state.feels }
                defaultValue={ this.state.feels }
                options={ this.state.feelsOpts }
                onChange={ this.handleFeelsChange }
              />
            </div>

            <div className='one column'>
              <label id='newEffortLabel' htmlFor='newEffort'>Effort: </label>
              <SelectOpts
                id='newEffort'
                value={ this.state.effort }
                defaultValue={ this.state.effort }
                options={ this.state.effortOpts }
                onChange={ this.handleEffortChange }
              />
            </div>

            <Lap lap={ lap } onLapEdit={ this.onLapEdit } />

            <div className='one column'>
              <button display="primary" type="submit" >OK</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
};

ActivityForm.contextTypes = {
  refData: PropTypes.any.isRequired,
};

ActivityForm.childContextTypes = {
  multipliers: PropTypes.any.isRequired,
};

export {
  ActivityForm,
};
