<template>
  <div>
    <el-card class="info-card">
      <div slot="header" class="clearfix">
        <span>个人信息</span>
      </div>
      <div class="info-content">
        <p><strong>账号:</strong> {{ user.userid }}</p>
        <p><strong>姓名:</strong> {{user.username}}</p>
        <p><strong>电话:</strong> {{ user.phone }}</p>
        <p><strong>邮箱:</strong> {{ user.email }}</p>
        <p><strong>地址:</strong> {{ user.address }}</p>
      </div>
    </el-card>

    <el-card class="edit-card">
      <div slot="header" class="clearfix">
        <span>修改个人信息</span>
      </div>
      <el-form @submit.prevent="updateUser" label-width="100px" class="edit-form">
        <el-form-item label="姓名">
          <el-input v-model="updatedUserInfo.username"></el-input>
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input v-model="updatedUserInfo.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱地址">
          <el-input v-model="updatedUserInfo.email"></el-input>
        </el-form-item>
        <el-form-item label="联系地址">
          <el-input v-model="updatedUserInfo.address"></el-input>
        </el-form-item>
        <el-form-item class="form-item-center">
          <el-button type="primary" class="update-button" @click="updateUser">保存修改</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
import { ElCard, ElForm, ElFormItem, ElInput, ElButton, ElMessage } from 'element-plus';

export default {
  name: "User",
  setup() {
    const store = useStore();
    const updatedUserInfo = ref({
      username:'',
      phone: '',
      email: '',
      address: ''
    });

    const user = computed(() => store.getters.getUserInfo);
    const loadUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/users/getById/${user.value.userid}`);
        store.commit('SET_USER_INFO', response.data);
        updatedUserInfo.value.username = response.data.username || '';
        updatedUserInfo.value.phone = response.data.phone || ''; // 设置默认值防止未定义
        updatedUserInfo.value.email = response.data.email || ''; // 设置默认值防止未定义
        updatedUserInfo.value.address = response.data.address || ''; // 设置默认值防止未定义
      } catch (error) {
        console.error('获取用户信息失败', error);
        ElMessage.error('获取用户信息失败，请稍后再试');
      }
    };

    const updateUser = () => {
      axios.put(`http://localhost:8080/users/${user.value.userid}`, updatedUserInfo.value)
          .then(response => {
            console.log('用户信息更新成功', response.data);
            store.commit('SET_USER_INFO', { ...user.value, ...updatedUserInfo.value });
            ElMessage.success('用户信息更新成功');
          })
          .catch(error => {
            console.error('用户信息更新失败', error);
            ElMessage.error('用户信息更新失败，请稍后再试');
          });
    };

    onMounted(() => {
      loadUserData();
    });

    return {
      user,
      updatedUserInfo,
      updateUser
    };
  }
};
</script>

<style scoped>
.info-card,
.edit-card {
  padding: 20px;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff8dc; /* 米白色 */
  margin-bottom: 20px;
}

.info-content {
  padding: 20px;
}

.edit-form {
  display: flex;
  flex-direction: column;
}

.form-item-center {
  text-align: center;
  margin-top: 20px;
}

.update-button {
  background-color: #885f41; /* 深咖啡色 */
  border-color: #885f41; /* 深咖啡色 */
  color: #ffffff; /* 白色字体 */
}

.update-button:hover {
  background-color: #3e2723; /* 更深的咖啡色 */
  border-color: #3e2723; /* 更深的咖啡色 */
  color: #ffffff; /* 白色字体 */
}
</style>
