import { query as queryUsers, queryCurrent, queryMenus } from '../services/user';
import { getRouterDatas } from '../services/api';

export default {
  namespace: 'user',

  state: {
    list: [],
    loading: false,
    currentUser: {},
    menus: [],
    routerData: [],
  },

  effects: {
    *fetch(_, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response.data ? response.data : [],
      });
    },

    *fetchMenus(_, { call, put }) {
      const response = yield call(queryMenus, {});
      yield put({
        type: 'saveMenus',
        payload: response.data ? response.data : [],
      });
    },

    *fetchRouterData(_, { call, put }) {
      const response = yield call(getRouterDatas);
      console.log('response', response)
      yield put({
        type: 'saveRouterData',
        payload: response.data ? response.data : [],
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload,
      };
    },
    saveMenus(state, action) {
      return {
        ...state,
        menus: action.payload,
      };
    },
    saveRouterData(state, action) {
      return {
        ...state,
        routerData: action.payload,
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload,
        },
      };
    },
  },
};
