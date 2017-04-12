import { getCatalogues, getArticle } from '../services/writer';

export default {
  namespace: 'writer',
  state: {
    notebooksKeys: 0,
    notesKey: 0,
    cataloguesSuccess: false,
    showCatalog: false,
    list: [],
    lodding: false,
    darkTheme: false,
    editIsLoading: false,
    currentArtcile: {
      title: '',
      content: '',
    },
    editShow: true,
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    // 获取文章 并 获取当前key
    *getArticle({ payload }, { call, put }) {
      if (!payload.first) {
        yield put({
          type: 'startRequireEdit',
        });
      }
      yield put({
        type: 'changeCurrentKey',
        payload: {
          notebooksKeys: payload.catalogKey,
          notesKey: payload.notesKey,
        },
      });
      const data = yield call(getArticle);
      if (data.success) {
        yield put({
          type: 'getArtcileSuccess',
          payload: { data: data.data },
        });
      }
    },
    *getCatalogues({ payload }, { call, put }) {
      yield put({
        type: 'startCatalogues',
      });
      const data = yield call(getCatalogues);
      if (data.success) {
        yield put({
          type: 'getListSuccess',
          payload: {
            data: data.data,
          },
        });
      }
    },
    // 点击确认新增文集
    *makeCatalog({ payload }, { call, put }) {

    },

  },

  reducers: {
    changeCurrentKey(state, action) {
      console.log(action.payload);
      return {
        ...state,
        notebooksKeys: action.payload.notebooksKeys,
        notesKey: action.payload.notesKey,
      };
    },
    startRequireEdit(state) {
      return {
        ...state,
        editIsLoading: true,
      };
    },
    getArtcileSuccess(state, action) {
      return {
        ...state,
        currentArtcile: {
          title: action.payload.data.title,
          content: action.payload.data.content,
        },
        requireSuccess: true,
        editIsLoading: false,
      };
    },
    startCatalogues(state) {
      return {
        ...state,
        lodding: true,
      };
    },
    getListSuccess(state, action) {
      return {
        ...state,
        list: action.payload.data,
        lodding: false,
        cataloguesSuccess: true,
      };
    },
    changeTheme(state, action) {
      return {
        ...state,
        darkTheme: action.payload,
      };
    },
    showCatalog(state) {
      return {
        ...state,
        showCatalog: true,
      };
    },
    cancelCatalog(state) {
      return {
        ...state,
        showCatalog: false,
      };
    },
  },

};
