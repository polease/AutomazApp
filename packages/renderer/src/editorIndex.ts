import {createApp} from 'vue';
import EditorApp from '/@/EditorApp.vue';
import 'vuetify/styles'
 


 
import { createVuetify } from  'Vuetify';

const vuetify = createVuetify()

     
createApp(EditorApp).use(vuetify).mount('#app');

