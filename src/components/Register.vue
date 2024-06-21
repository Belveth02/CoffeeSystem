<template>
  <div class="register-box">
    <h2>注册系统</h2>
    <form @submit.prevent="handleRegister">
      <div class="user-box">
        <input type="text" required v-model="name">
        <label>用户名</label>
      </div>
      <div class="user-box">
        <input type="number" required v-model="id">
        <label>账号</label>
      </div>
      <div class="user-box">
        <input type="password" required v-model="password">
        <label>密码</label>
      </div>
      <div class="user-box">
        <input type="password" required v-model="confirmPassword">
        <label>确认密码</label>
      </div>
      <a @click.prevent="handleRegister">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        注册
      </a>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Register",
  data() {
    return {
      name: '',
      id: '',
      password: '',
      confirmPassword: '',
      msg: ''
    }
  },
  methods: {
    openMessage(type) {
      this.$message({
        showClose: true,
        message: this.msg,
        type: type
      });
    },
    handleRegister() {
      if (this.password !== this.confirmPassword) {
        this.msg = "密码不一致";
        this.openMessage('error');
        return;
      }

      const userData = {
        name: this.name,
        id: this.id,
        password: this.password
      };

      axios.post("http://localhost:8080/adduser", userData)
          .then(response => {
            this.msg = "注册成功";
            this.openMessage('success');
            this.$router.push({ name: 'login' });
          })
          .catch(error => {
            console.error(error);
            this.msg = "账号重复或不合要求，请稍后再试";
            this.openMessage('error');
          });
    }
  }
}
</script>

<style scoped>
.register-box {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  padding: 40px;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, .6);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, .6);
  border-radius: 10px;
}

.register-box h2 {
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
  text-align: center;
}

.register-box .user-box {
  position: relative;
}

.register-box .user-box input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
}

.register-box .user-box label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: .5s;
}

.register-box .user-box input:focus ~ label,
.register-box .user-box input:valid ~ label {
  top: -20px;
  left: 0;
  color: #03e9f4;
  font-size: 12px;
}

.register-box form a {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: #03e9f4;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: .5s;
  margin-top: 40px;
  letter-spacing: 4px
}

.register-box a:hover {
  background: #03e9f4;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px #03e9f4,
  0 0 25px #03e9f4,
  0 0 50px #03e9f4,
  0 0 100px #03e9f4;
}

.register-box a span {
  position: absolute;
  display: block;
}
</style>