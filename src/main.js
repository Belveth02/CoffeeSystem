//引入Vue库的createApp函数，用于创建Vue应用程序实例
import { createApp } from 'vue'
//引入Element Plus库，用于创建UI界面
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'//引入Element Plus库的CSS样式表
import App from './App.vue'//引入应用程序的根组件
import index from "./router/index.js";//引入应用程序的路由实例
import store from './store';
const app = createApp(App)// 创建Vue应用程序实例
app.use(ElementPlus)// 在Vue实例中使用Element Plus库
app.use(index)// 在Vue实例中使用路由库
app.use(store)
app.mount('#app')// 将Vue.实例挂载到页面id为app的元素上，显示应用程序的内容
import * as ELIcons from '@element-plus/icons-vue'
// 全局导入element plus图标
for (let iconName in ELIcons) {
    app.component(iconName, ELIcons[iconName])
}
