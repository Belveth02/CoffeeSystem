<template>
  <el-container class="personal-center">
    <el-header class="header">
      个人中心
      <el-button type="primary" class="return-home-button" @click="returnHome">返回主页</el-button>
    </el-header>
    <el-container>
      <el-aside class="side-menu">
        <el-menu default-active="1" class="el-menu-vertical-demo" @select="handleMenuSelect">
          <el-menu-item index="1" route="/personalcenter/user-info">个人信息</el-menu-item>
          <el-menu-item index="2" route="/personalcenter/myorder">我的订单</el-menu-item>
          <el-menu-item index="3" route="/personalcenter/change-password">修改密码</el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="main-content">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'PersonalCenter',
  methods: {
    handleMenuSelect(index) {
      switch (index) {
        case '1':
          this.$router.push({ path: '/personalcenter/user-info' });
          break;
        case '2':
          this.$router.push({ path: '/personalcenter/myorder' });
          break;
        case '3':
          this.$router.push({ path: '/personalcenter/change-password' });
          break;
        default:
          break;
      }
    },
    returnHome() {
      this.$router.push({ path: '/home' });
    }
  }
};
</script>

<style scoped>
.personal-center {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f3e5ab; /* 咖啡色主题背景色 */
}

.header {
  position: relative;
  text-align: center;
  background-color: #6f4e37; /* 深咖啡色 */
  padding: 20px 0;
  border-bottom: 1px solid #d3a87c;
  font-size: 24px;
  font-weight: bold;
  color: #fff; /* 白色字体 */
}

.return-home-button {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  background-color: #885f41; /* 浅咖啡色 */
  border-color: #885f41; /* 边框颜色 */
  color: #ffffff; /* 字体颜色 */
}

.return-home-button:hover {
  background-color: #3e2723; /* 浅红棕色 */
  border-color: #3e2723; /* 边框颜色 */
  color: #ffffff; /* 字体颜色 */
}

.side-menu {
  width: 25%; /* 占页面横向的四分之一 */
  background-color: #d3a87c; /* 浅咖啡色 */
}

.side-menu .el-menu {
  border-right: none;
  background-color: #d3a87c;
}

.side-menu .el-menu-item {
  color: #3e2723;
  line-height: 50px;
  font-size: 16px;
}

.side-menu .el-menu-item:hover {
  background-color: #bc8f8f; /* 浅红棕色 */
  color: #ffffff;
}

.side-menu .el-menu-item.is-active {
  background-color: #bc8f8f; /* 浅红棕色 */
  color: #ffffff;
}

.main-content {
  flex: 1;
  padding: 20px;
  background-color: #fff8dc; /* 米白色 */
  overflow-y: auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin: 20px;
}
</style>
