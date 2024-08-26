import CreateForm from './components/CreateForm.vue'
import LandingPage from './components/LandingPage.vue';

export default ([
    {path: '/', component: LandingPage, name: 'LandingPage'},
    {path: '/create-form', component: CreateForm, name: 'CreateForm'},
]);