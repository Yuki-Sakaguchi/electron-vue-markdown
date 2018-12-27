import Vue from 'vue';
import Vuex from 'vuex';
import Datastore from 'nedb';
import path from 'path';
import { remote } from 'electron';

const db =  new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath('userData'), '/data.db'),
});

// データの登録
// const newDate = {
//   name: 'sample3'
// }
// db.insert(newDate, (error, newDoc) => {
//   if (error) console.error(error)
// })

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentFile: null,
    fileList: {},
  },
  mutations: {
    getFileList: (state) => {
      db.find({}, (error: any, docs: any) => {
        state.fileList = docs;
      });
    },
    setCurrentFile: (state) => {
      state.currentFile = state.currentFile;
    },
  },
  actions: {
    get: ({commit}) => {
      commit('getFileList');
    },
    set: ({commit}) => {
      commit('setCurrentFile');
    },
  },
  getters: {
    fileList: (state) => {
      return state.fileList;
    },
  },
});
