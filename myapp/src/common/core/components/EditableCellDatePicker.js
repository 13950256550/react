import React from 'react';

import { DatePicker } from 'antd';
import moment from 'moment';

export default class EditableCellDatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      editable: props.editable || false,
      dateFormat: props.dateFormat,
    };
  }
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.editable !== this.state.editable) {
      this.setState({ editable: nextProps.editable });
      if (nextProps.editable) {
        this.cacheValue = this.state.value;
      }
    }
    if (nextProps.status && nextProps.status !== this.props.status) {
      if (nextProps.status === 'save') {
        this.props.onChange(this.state.value);
      } else if (nextProps.status === 'cancel') {
        this.setState({ value: this.cacheValue });
        this.props.onChange(this.cacheValue);
      }
    }
  }
  shouldComponentUpdate = (nextProps, nextState) => {
    return nextProps.editable !== this.state.editable ||
           nextState.value !== this.state.value;
  }
  handleChange = (date, dateString) => {
    this.setState({ value: dateString });
  }
  render() {
    const { value, editable, dateFormat } = this.state;
    return (
      <div>
        {
          editable ?
            <div>
              <DatePicker
                value={moment(value, dateFormat)}
                defaultValue={moment('2015/01/01', dateFormat)}
                format={dateFormat}
                onChange={(date, dateString) => this.handleChange(date, dateString)}
              />
            </div>
            :
            <div className="editable-row-text">
              {value.toString() || ' '}
            </div>
        }
      </div>
    );
  }
}
