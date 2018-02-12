import mockjs from 'mockjs';
import { format, delay } from 'roadhog-api-doc';
import { getRule, postRule } from './mock/rule';
import { getActivities, getNotice, getFakeList } from './mock/api';
import { getFakeChartData } from './mock/chart';
import { imgMap } from './mock/utils';
import { getProfileBasicData, getProfileAdvancedData } from './mock/profile';
import { getNotices } from './mock/notices';


// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {
  // 支持值为 Object 和 Array
  'GET /api/currentUser': {
    $desc: '获取当前用户接口',
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: {
      name: '测试用户',
      avatar: '/headimg.png',
      userid: '00000001',
      notifyCount: 12,
    },
  },
  // GET POST 可省略
  'GET /api/users': [{
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  }, {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  }, {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  }],
  'GET /api/project/notice': getNotice,
  'GET /api/activities': getActivities,
  'GET /api/rule': getRule,
  'POST /api/rule': {
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: postRule,
  },
  'POST /api/forms': (req, res) => {
    res.send({ message: 'Ok' });
  },
  'GET /api/tags': mockjs.mock({
    'list|100': [{ name: '@city', 'value|1-100': 150, 'type|0-2': 1 }],
  }),
  'GET /api/fake_list': getFakeList,
  'GET /api/fake_chart_data': getFakeChartData,
  'GET /api/profile/basic': getProfileBasicData,
  'GET /api/profile/advanced': getProfileAdvancedData,
  'POST /api/login/account': (req, res) => {
    const { password, userName, type } = req.body;
    res.send({
      status: password === '888888' && userName === 'admin' ? 'ok' : 'error',
      type,
    });
  },
  'POST /api/register': (req, res) => {
    res.send({ status: 'ok' });
  },
  'GET /api/notices': getNotices,
  'GET /api/500': (req, res) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req, res) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req, res) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },

  'POST /api/menus': [
    {
      name: 'dashboard',
      icon: 'dashboard',
      path: 'dashboard',
      children: [{
        name: '分析页',
        path: 'analysis',
      }],
    },
    {
      name: '表单页',
      icon: 'form',
      path: 'form',
      children: [{
        name: '基础表单',
        path: 'basic-form',
      }, {
        name: '分步表单',
        path: 'step-form',
      }, {
        name: '高级表单',
        path: 'advanced-form',
      }],
    },
    {
      name: '测试子系统',
      icon: 'form',
      path: 'test-subsystem',
      children: [{
        name: '测试模块',
        path: 'test-module',
      }, {
        name: '数据',
        path: 'scrapy-module',
      }],
    },
  ],

  'GET /api/routerData': [
    { path: '/app', depend: ['user', 'login'], file: '../layouts/BasicLayout' },
    { path: '/app/home', depend: [], file: '../routes/IndexPage' },
    { path: '/app/dashboard/analysis', depend: ['chart'], file: '../routes/Dashboard/Analysis' },
    { path: '/user', depend: [], file: '../layouts/UserLayout' },
    { path: '/user/login', depend: ['login'], file: '../routes/User/Login' },
    { path: '/app/test-subsystem/test-module', depend: ['example'], file: '../routes/TestSubsystem/TestModule1' },
    { path: '/app/form/basic-form', depend: ['form'], file: '../routes/Forms/BasicForm' },
    { path: '/app/form/step-form', depend: ['form'], file: '../routes/Forms/StepForm' },
    { path: '/app/form/step-form/info', depend: ['form'], file: '../routes/Forms/StepForm/Step1' },
    { path: '/app/form/step-form/confirm', depend: ['form'], file: '../routes/Forms/StepForm/Step2' },
    { path: '/app/form/step-form/result', depend: ['form'], file: '../routes/Forms/StepForm/Step3' },
    { path: '/app/form/advanced-form', depend: ['form'], file: '../routes/Forms/AdvancedForm' },
  ],

  'GET /api/list': [{
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  }, {
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  }],

  'GET /api/columns': [{
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  }, {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  }],
};


export default noProxy ? {} : delay(proxy, 1000);
