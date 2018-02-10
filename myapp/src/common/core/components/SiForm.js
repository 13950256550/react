
import React from 'react';
import { Form, Col, Input, Select, DatePicker } from 'antd';
import { getSelectOptions } from '../../../utils/codeList';

const FormItem = Form.Item;

const defaultColSpan = 6;
const formItemLayout_span1 = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const formItemLayout_span2 = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const formItemLayout_span3 = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 },
};
const formItemLayout_span4 = {
  labelCol: { span: 2 },
  wrapperCol: { span: 22 },
};

@Form.create()
export class SiForm extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    const { data, fields } = this.props;
    const children = [];

    let colSpan = this.props.col;
    if (this.props.col === null || this.props.col === undefined) {
      colSpan = defaultColSpan;
    }

    for (let i = 0; i < fields.length; i += 1) {
      if (fields[i].span === null || fields[i].span === undefined) {
        fields[i].span = 1;
      }
      if (fields[i].formItemLayout === null || fields[i].formItemLayout === undefined) {
        if (fields[i].span == 2) {
          fields[i].formItemLayout = formItemLayout_span2;
        } else if (fields[i].span == 3) {
          fields[i].formItemLayout = formItemLayout_span3;
        } else if (fields[i].span == 4) {
          fields[i].formItemLayout = formItemLayout_span4;
        } else {
          fields[i].formItemLayout = formItemLayout_span1;
        }
      }

      let input;
      if (fields[i].code !== null && fields[i].code !== undefined) {
        const options = getSelectOptions(fields[i].code);
        input = (
          <Select allowClear style={{ width: 200 }}>
            {options}
          </Select>
        );
      } else if (fields[i].dateFormat !== null && fields[i].dateFormat !== undefined) {
        input = <DatePicker />;
      } else {
        input = <Input placeholder={fields[i].placeholder} />;
      }
      const item = getFieldDecorator(`${fields[i].fieldId}`, { rules: fields[i].rules })(input);

      // const item = getFieldDecorator(fields[i].fieldId, { rules: fields[i].rules })(input);
      const value = data[fields[i].fieldId];
      children.push(
        <Col span={colSpan} key={i}>
          <FormItem {...fields[i].formItemLayout} label={fields[i].label}>
            {getFieldDecorator(`${fields[i].fieldId}`, { initialValue: value })(input)}
          </FormItem>
        </Col>,
      );
    }

    return (
      <Form className="ant-advanced-search-form" onSubmit={this.handleSearch} >
        {children}
      </Form>
    );
  }
}
