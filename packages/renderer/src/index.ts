import {createApp} from 'vue';
import App from '/@/App.vue';
import 'vuetify/styles'
 


 
import { createVuetify } from  'Vuetify';

const vuetify = createVuetify()

/*
    var $ = require('jquery');
     alert($('#great').text()); 

     */
     
createApp(App).use(vuetify).mount('#app');

