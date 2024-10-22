import './assets/main.css'
import './utils/request'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import OSS from '@/lib/aliyun-upload-sdk/lib/aliyun-oss-sdk-6.17.1.min'
window.OSS = OSS
import '@/lib/aliyun-upload-sdk/aliyun-upload-sdk-1.5.6.min'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
