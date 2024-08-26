import Vue from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'primevue/button';
import AutoComplete from 'primevue/autocomplete';
import VueRouter from 'vue-router';
import Routes from './routes';
import PrimeVue from 'primevue/config';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import 'primevue/resources/themes/saga-blue/theme.css'; 
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';            
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup'; 
import store from './store';
import RadioButton from 'primevue/radiobutton';
import Checkbox from 'primevue/checkbox';

Vue.use(VueRouter);
Vue.use(PrimeVue);

const router = new VueRouter({
  routes: Routes,
  mode: 'history'
});


Vue.component("PButton", Button);
Vue.component("AutoComplete", AutoComplete);
Vue.component("InputText", InputText)
Vue.component("DropDown", Dropdown)
Vue.component('DataTable', DataTable)
Vue.component('PColumn', Column)
Vue.component('ColumnGroup', ColumnGroup)
Vue.component('RadioButton', RadioButton)
Vue.component('CheckBox', Checkbox)


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')