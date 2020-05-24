import Vue from 'vue'
import App from './components/App.vue'
import store from './store'

import './styles/index.css'

new Vue ({
  el: '#app',
  store,
  render: h => h(App)
})