import React from 'react';
import { connect } from 'dva';
import { Table, Button, Row } from 'antd';

class ScrapyModule extends React.PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'example/fetchColumns',
    });
  }

  handleScrapy = (e) => {
    e.preventDefault();

    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setInterval(() => {
      this.props.dispatch({
        type: 'example/fetchList',
      });
    }, 1000);
  }

  handleStop = (e) => {
    e.preventDefault();
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  handleClear = (e) => {
    e.preventDefault();
    this.props.dispatch({
      type: 'example/save',
      payload: {
        list: [],
      },
    });
  }

  render() {
    return (
      <div>
        <Row>
          <Table dataSource={this.props.list} columns={this.props.columns} />
        </Row>
        <Row>
          <Button type="primary" onClick={this.handleScrapy}>开始采集</Button>
          <Button type="primary" onClick={this.handleStop}>结束采集</Button>
          <Button type="primary" onClick={this.handleClear}>清除数据</Button>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    testdata: state.example.testdata,
    columns: state.example.columns,
    list: state.example.list,
  };
}

export default connect(mapStateToProps)(ScrapyModule);
