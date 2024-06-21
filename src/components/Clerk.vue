<template>
  <div class="clerk-container">
    <div class="clerk-info">
      <p><strong>店员ID:</strong> {{ clerkInfo.clerkid }}</p>
      <p><strong>姓名:</strong> {{ clerkInfo.clerkname }}</p>
      <p><strong>级别:</strong> {{ clerkInfo.level }}</p>
    </div>
    <el-container>
      <el-aside class="side-menu">
        <el-menu default-active="1" class="el-menu-vertical-demo" @select="handleMenuSelect">
          <el-menu-item index="1" :toggleable="true">
            <i class="el-icon-lock"></i>
            <span>修改密码</span>
          </el-menu-item>
          <el-menu-item index="2" :toggleable="true">
            <i class="el-icon-document"></i>
            <span>订单操作</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="main-content">
        <router-view></router-view>
      </el-main>
    </el-container>
    <el-button type="primary" class="return-home-button" @click="returnHome">返回主页</el-button>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const clerkInfo = ref({});
const currentRoute = ref(router.currentRoute.value.path);

const getClerkInfo = computed(() => store.getters.getClerkInfo);

const fetchClerkInfo = async (clerkid) => {
  try {
    const response = await axios.get(`http://localhost:8080/clerk/getById/${clerkid}`);
    clerkInfo.value = response.data;
  } catch (error) {
    console.error('获取店员信息出错：', error);
  }
};

const handleMenuSelect = (index) => {
  if (index === '1') {
    if (currentRoute.value === '/clerk/modifypassword') {
      router.push('/clerk'); // 如果已经在相同路径，切换回主路径
    } else {
      router.push('/clerk/modifypassword');
    }
  } else if (index === '2') {
    if (currentRoute.value === '/clerk/orders') {
      router.push('/clerk'); // 如果已经在相同路径，切换回主路径
    } else {
      router.push('/clerk/orders');
    }
  }
};

const returnHome = () => {
  router.push({ path: '/home' });
};

router.afterEach((to) => {
  currentRoute.value = to.path;
});

onMounted(() => {
  fetchClerkInfo(getClerkInfo.value.clerkid);
});
</script>

<style scoped>
.clerk-container {
  position: relative; /* 让子元素的绝对定位相对于这个容器 */
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #f5f5f5;
}



.clerk-info {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.side-menu {
  width: 200px;
  background-color: #ffffff;
  border-right: 1px solid #ebeef5;
}

.el-menu-vertical-demo {
  height: 100%;
}

.main-content {
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.el-menu-item i {
  margin-right: 10px;
}

.return-home-button {
  position: absolute;
  top: 20px;
  right: 20px;
}
</style>
