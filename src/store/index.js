import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


const state = {
    _defaultMapView: '', //默认地图视图
    _defaultMaptreeVisible: false, //地图目录树的可见性
};

const getters = {
    _getDefaultMapView() {
        return state._defaultMapView;
    },
    _getDefaultMaptreeVisible() {
        return state._defaultMaptreeVisible;
    }
};

const mutations = {
    _setDefaultMapView(state, value) {
        state._defaultMapView = value;
    },
    _setDefaultMaptreeVisible(state, value) {
        state._defaultMaptreeVisible = value;
    }
};

const store = new Vuex.Store({
    state,
    getters,
    mutations,
});

export default store;