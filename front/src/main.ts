import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index'
import PrimeVue from 'primevue/config';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import ProgressBar from 'primevue/progressbar';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

const app = createApp(App);

app.use(router);
app.use(PrimeVue);

app.component('InputText', InputText);
app.component('Button', Button);
app.component('ProgressBar', ProgressBar);

app.mount('#app');
