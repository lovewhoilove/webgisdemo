import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


const state = {
    _defaultMapView: '', //默认地图视图
    _defaultMaptreeVisible: false, //地图目录树的可见性
    _defaultXZQHVisible: false,//行政区划面板的可见性
    _defaultQueryResultVisible: false, //空间查询结果面板
    _defaultQueryResult: [], //空间查询结果
};

const getters = {
    _getDefaultMapView() {
        return state._defaultMapView;
    },
    _getDefaultMaptreeVisible() {
        return state._defaultMaptreeVisible;
    },
    _getDefaultXZQHVisible() {
        return state._defaultXZQHVisible;
    },
    _getDefaultQueryResultVisible() {
        return state._defaultQueryResultVisible;
    },
    _getDefaultQueryResult() {
        return state._defaultQueryResult;
    },
};

const mutations = {
    _setDefaultMapView(state, value) {
        state._defaultMapView = value;
    },
    _setDefaultMaptreeVisible(state, value) {
        state._defaultMaptreeVisible = value;
    },
    _setDefaultXZQHVisible(state, value) {
        state._defaultXZQHVisible = value;
    },
    _setDefaultQueryResultVisible(state, value) {
        state._defaultQueryResultVisible = value;
    },
    _setDefaultQueryResult(state, value) {
        state._defaultQueryResult = value;
    },
};

const store = new Vuex.Store({
    state,
    getters,
    mutations,
});

export default store;