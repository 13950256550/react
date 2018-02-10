import { formItemLayout } from '../common/const';


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
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
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
  },
};
