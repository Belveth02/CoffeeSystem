<template>
  <el-card class="change-password-card">
    <el-form @submit.prevent="changePassword" label-width="100px" class="change-password-form">
      <el-form-item label="当前密码" prop="currentPassword">
        <el-input v-model="passwordForm.currentPassword" type="password"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input v-model="passwordForm.newPassword" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="confirmPassword">
        <el-input v-model="passwordForm.confirmPassword" type="password"></el-input>
      </el-form-item>
      <el-form-item class="form-item-center">
        <el-button type="primary" class="change-button" @click="changePassword">确认修改</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
import { ElButton, ElForm, ElFormItem, ElInput, ElMessage } from 'element-plus';

export default {
  components: {
    ElButton,
    ElForm,
    ElFormItem,
    ElInput
  },
  setup() {
    const store = useStore();
    const passwordForm = ref({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });

    const changePassword = () => {
      if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
        ElMessage.error('新密码与确认密码不匹配');
        return;
      }
      axios.put(`http://localhost:8080/users/${store.state.userid}/changePassword`, passwordForm.value)
          .then(response => {
            console.log('密码修改成功', response.data);
            ElMessage.success('密码修改成功');
            // 清空密码表单
            passwordForm.value.currentPassword = '';
            passwordForm.value.newPassword = '';
            passwordForm.value.confirmPassword = '';
          })
          .catch(error => {
            console.error('密码修改失败', error);
            ElMessage.error('密码修改失败，请稍后再试');
          });
    };

    return {
      passwordForm,
      changePassword
    };
  }
};
</script>

<style scoped>
.change-password-card {
  padding: 20px;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff8dc; /* 米白色 */
}

.change-password-form {
  display: flex;
  flex-direction: column;
}

.form-item-center {
  text-align: center;
  margin-top: 20px;
}
.change-button {
  background-color: #885f41; /* 深咖啡色 */
  border-color: #885f41; /* 深咖啡色 */
  color: #ffffff; /* 白色字体 */
}

.change-button:hover {
  background-color: #3e2723; /* 更深的咖啡色 */
  border-color: #3e2723; /* 更深的咖啡色 */
  color: #ffffff; /* 白色字体 */
}
</style>
