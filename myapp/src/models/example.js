import { formItemLayout } from '../common/const';
import { queryList, queryColumns } from '../services/api';


export default {

  namespace: 'example',

  state: {
    data: { id: '1', roleCode: '1', roleName: 'admin', description: '系统管理员' },
    fields: [
      { label: '角色ID', fieldId: 'id', placeholder: 'roleId', formItemLayout },
      { label: '角色代码', fieldId: 'roleCode', code: 'BAD305', placeholder: 'roleCode', formItemLayout },
      { label: '角色名称', fieldId: 'roleName', placeholder: 'roleName', formItemLayout },
      { label: '角色描述', fieldId: 'description', placeholder: 'description', formItemLayout },
    ],
    dataSource: [],
    pagination: [],
    cacheTableData: {},
    testdata: '测试字符串',
    columns: [],
    list: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },

    *fetchList(_, { call, put }) {  // eslint-disable-line
      const response = yield call(queryList);
      yield put({
        type: 'saveList',
        payload: response.data ? response.data : [],
      });
    },

    *fetchColumns(_, { call, put }) {  // eslint-disable-line
      const response = yield call(queryColumns);
      yield put({
        type: 'saveColumns',
        payload: response.data ? response.data : [],
      });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },

    editrow(state, action) {
      const index = action.payload.index;
      state.cacheTableData[index] = Object.assign({}, state.dataSource[index]);

      const target = Object.assign([], state.dataSource);
      target[index].editable = true;
      return { ...state, dataSource: target };
    },

    canceledit(state, action) {
      const index = action.payload.index;
      state.dataSource[index] = Object.assign({}, state.cacheTableData[index]);
      delete state.cacheTableData[index];
      const target = Object.assign([], state.dataSource);
      return { ...state, dataSource: target };
    },

    saveList(state, action) {
      return {
        ...state,
        list: state.list.concat(action.payload),
      };
    },

    saveColumns(state, action) {
      return {
        ...state,
        columns: action.payload,
      };
    },
  },
};
