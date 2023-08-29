import { createApp } from 'vue'
import App from './App.vue'
import router from './routes/index.js'
// 특정한 폴더 안의 index파일을 가져올 때는 해당 이름 생략할 수 있음
// import store from './store'
import store from './store/index.js' 
import loadImage from './plugins/loadImage' 

createApp(App)
  .use(router)
  .use(store)
  .use(loadImage)
  .mount('#app')