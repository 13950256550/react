import React from 'react';
import { Select } from 'antd';
import { getShowValue, getSelectOptions } from '../../../utils/codeList';

export default class EditableCellSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      editable: props.editable || false,
      code: props.code,
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
  handleChange = (value) => {
    this.setState({ value });
  }
  render() {
    const { value, editable, code } = this.state;
    const options = getSelectOptions(code);
    const showValue = getShowValue(code, value);
    return (
      <div>
        {
          editable ?
            <div>
              <Select value={value} onChange={this.handleChange} allowClear style={{ width: 200 }}>
                {options}
              </Select>
            </div>
            :
            <div className="editable-row-text">
              {showValue}
            </div>
        }
      </div>
    );
  }
}
