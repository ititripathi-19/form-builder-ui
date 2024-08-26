/* eslint-disable no-unused-vars */
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    forms: [],
  },
  mutations: {
    SET_FORM_LIST(state, forms) {
      state.forms = forms.data;
    },
    ADD_FORM(state, form) {
      state.forms.push(form);
    },
  },
  actions: {
    fetchFormsList({ commit }) {
      console.log('mnasdbmnasb')
      axios.post(`http://localhost:3000/api/list-all-forms`)
        .then(response => {
          commit('SET_FORM_LIST', response.data);
        })
        .catch(error => {
          console.error('Error fetching forms:', error);
        });
    },
    createForm({ commit }, form) {
      return axios.post(`http://localhost:3000/api/create-form`, form)
        .catch(error => {
          console.error('Error adding form:', error);
        });
    },
    updateForm({ commit }, form) {
      axios.post(`http://localhost:3000/api/update-form/${form.id}`, form)
        .then(response => {
          commit('UPDATE_FORM', response.data);
        })
        .catch(error => {
          console.error('Error updating form:', error);
        });
    },
    fetchInfo({ commit }, formId) {
      return axios.post(`http://localhost:3000/api/list-one-form/?id=${formId}`)
        .catch(error => {
          console.error('Error updating form:', error);
      });
    },
  },
  getters: {
    getForms: state => state.forms,
    getFormById: state => id => state.forms.find(form => form.id === id),
  },
});