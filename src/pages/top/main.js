import { createApp } from 'vue'
import App from './top.vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

const app = createApp(App);
app.config.productionTip = false;
app.mount('#main-contents');
