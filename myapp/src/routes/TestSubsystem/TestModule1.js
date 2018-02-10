import React from 'react';
import { connect } from 'dva';
import { Button, Row } from 'antd';
import { SiForm } from '../../common/core/components/SiForm';
import { EditableTable } from '../../common/core/components/EditableTable';

// function TestModule1() {
class TestModule1 extends React.PureComponent {
  handleSearch = (e) => {
    e.preventDefault();
    this.siform.resetFields();
    this.props.dispatch({
      type: 'example/save',
      payload: {
        data: { id: '3', roleCode: '2', roleName: 'admin', description: '系统管理员' },
        dataSource: [{
          key: '1',
          name: {
            editable: false,
            value: 'Edward King 1',
          },
          age: {
            editable: false,
            value: '1',
          },
          address: {
            value: 'London, Park Lane no. 1',
          },
        },
        {
          key: '2',
          name: {
            editable: false,
            value: 'Edward King 2',
          },
          age: {
            editable: false,
            value: '2',
          },
          address: {
            value: 'London, Park Lane no. 2',
          },
        },
        ],
      },
    });
  }

  handleSearch2 = (e) => {
    e.preventDefault();
    this.siform.resetFields();

    this.props.dispatch({
      type: 'example/save',
      payload: {
        data: { id: '4', roleCode: '3', roleName: 'admin2', description: '系统管理员2' },
        dataSource: [{
          key: '3',
          name: {
            editable: false,
            value: 'Edward King 3',
          },
          age: {
            editable: false,
            value: '3',
          },
          address: {
            value: 'London, Park Lane no. 0',
          },
        },
        {
          key: '2',
          name: {
            editable: false,
            value: 'Edward King 222',
          },
          age: {
            editable: false,
            value: '222',
          },
          address: {
            value: 'London, Park Lane no. 2222',
          },
        },
        ],
      },
    });
  }

  render() {
    const columns = [{
      title: 'name',
      dataIndex: 'name',
      width: '25%',
    }, {
      title: 'age',
      dataIndex: 'age',
      width: '15%',
      //code: 'BAD305',
    }, {
      title: 'address',
      dataIndex: 'address',
      width: '40%',
    },
    ];

    return (
      <div>
        <Row gutter={0}>
          <SiForm
            data={this.props.data}
            fields={this.props.fields}
            ref={(c) => { this.siform = c; }}
          />
        </Row>
        <Row>
          <EditableTable
            columns={columns}
            data={this.props.dataSource}
          />
        </Row>
        <Row type="flex" justify="end">
          <Button type="primary" onClick={this.handleSearch}>修改</Button>
          <Button type="primary" onClick={this.handleSearch2}>修改2</Button>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.example.data,
    fields: state.example.fields,
    dataSource: state.example.dataSource,
    pagination: state.example.pagination,
  };
}

export default connect(mapStateToProps)(TestModule1);
