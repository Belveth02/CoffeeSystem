<template>
  <div class="common-layout">
    <el-container>
      <el-header>

        <!-- 顶部菜单栏 -->
        <div class="top-menu" id="topMenu">
          <div class="container">
            <a href="#" class="logo">Your Logo</a>
            <nav>
              <ul>
                <li><a href="#"><router-link to="/login">登录</router-link></a></li>
                <li><a href="#" ><router-link to="/personalcenter">个人中心</router-link></a></li>
              </ul>
            </nav>
          </div>
        </div>
      </el-header>
      <el-container>
        <el-aside height="100" width="400px">
          <div>
            <img src="../assets/images/coffee1.jpg" height="100" width="400"/>
          </div>
        </el-aside>
        <el-container>
          <el-main>
            <div class="content" >
              <!-- Search Bar -->
              <div class="search-bar">
                <input type="text" placeholder="Search...">
                <button>Search</button>
              </div>
            </div>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
  <!-- 页面内容 -->
  <div>
    <img src="../assets/images/coffee2.jpg" height="640" width="960"/>
  </div>
  <el-container>
    <el-row class="row">
      <el-col :span="23">
        <el-menu>
          <el-menu-item index="1">
            <el-icon><Avatar /></el-icon>
            <span>热门</span>
          </el-menu-item>
          <el-menu-item index="2">
            <el-icon><CoffeeCup /></el-icon>
            <span><router-link to ="/home/coffeepage">咖啡</router-link ></span>
          </el-menu-item>
          <el-menu-item index="3">
            <el-icon><Tickets /></el-icon>
            <span>果茶</span>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon><Tickets /></el-icon>
            <span>甜品</span>
          </el-menu-item>
          <el-menu-item index="5">
            <el-icon><Tickets /></el-icon>
            <span>订单</span>
          </el-menu-item>
          <el-menu-item index="">
            <el-icon><Tickets /></el-icon>
            <span><router-link to="/home/cartpage">购物车</router-link></span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
    <el-main><router-view></router-view></el-main>
  </el-container>


</template>

<script>
import { mapState } from 'vuex';

export default {


  computed: {
    ...mapState(['loggedIn', 'userid', 'password'])
  },
  name: 'Home',



}
</script>

<style scoped>
.row {
  margin-left: auto;
  width: 300px; /* 设置合适的宽度 */
}

/* 重置默认的外边距和内边距 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif; /* 设置字体 */
  line-height: 1.6; /* 设置行高 */
}

.top-menu {
  background-color: #333; /* 背景颜色 */
  color: #fff; /* 文字颜色 */
  position: sticky; /* 固定定位，保持在页面顶部 */
  top: 0; /* 与顶部的距离 */
  z-index: 1000; /* 层级 */
}

.container {
  display: flex; /* 使用 flex 布局 */
  justify-content: space-between; /* 在容器内部水平方向上均匀分布子元素 */
  align-items: center; /* 在容器内部垂直方向上居中子元素 */
  padding: 10px 20px; /* 内边距 */
}

.logo {
  color: #fff; /* 文字颜色 */
  text-decoration: none; /* 文本修饰：无下划线 */
  font-size: 1.5rem; /* 字体大小 */
}

nav ul {
  list-style-type: none; /* 去除列表默认样式 */
  margin: 0; /* 外边距 */
  padding: 0; /* 内边距 */
  display: flex; /* 使用 flex 布局 */
}

nav ul li {
  margin: 0 10px; /* 外边距 */
}

nav ul li a {
  color: #fff; /* 文字颜色 */
  text-decoration: none; /* 文本修饰：无下划线 */
  font-size: 1rem; /* 字体大小 */
}

/* 搜索栏样式 */
.content {
  padding: 20px;
  /* 与下方组件之间的间距 */
  /* 与左侧组件之间的间距 */
  /* 与右侧组件之间的间距 */
  margin: 0;
  background-color: #faebd7;
}

.search-bar {
  text-align: center; /* 文本居中对齐 */
  margin-bottom: 20px; /* 根据需要调整下方边距 */

}

/* 输入框样式 */
.search-bar input[type="text"] {
  padding: 10px; /* 内边距为10像素 */
  width: 300px; /* 宽度为300像素，根据需要调整 */
  margin-right: 10px; /* 右侧外边距为10像素 */
}

/* 按钮样式 */
.search-bar button {
  padding: 10px 20px; /* 内边距为10像素顶部和底部，20像素左右 */
  background-color: #007bff; /* 背景颜色为深蓝色 */
  color: #fff; /* 文字颜色为白色 */
  border: none; /* 没有边框 */
  cursor: pointer; /* 鼠标悬停时显示手型光标 */
}

/* 按钮悬停样式 */
.search-bar button:hover {
  background-color: #0056b3; /* 悬停时背景颜色变为浅蓝色 */
}

</style>
