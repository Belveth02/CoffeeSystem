<template>
  <div>
    <div class="image-box">
    </div>
    <div class="login-box">
      <h2>登录系统</h2>
      <form>
        <div class="user-box">
          <input type="number" name="" required="" v-model="userid">
          <label>账号</label>
        </div>
        <div class="user-box">
          <input type="password" name="" required="" v-model="password">
          <label>密码</label>
        </div>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <a @click.prevent="handleSubmit">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          登录
        </a>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <a @click.prevent="signUp_asd">注册</a>
        <a @click.prevent="clerklogin_asd">店员登录</a>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions } from 'vuex';

export default {
  name: "Login",
  data() {
    return {
      userid: '',
      password: '',
      msg: ''
    }
  },
  methods: {
    ...mapActions(['setUserInfo']),
    signUp_asd() {
      this.$router.replace({ path: '/register' });
    },
    clerklogin_asd(){
      this.$router.replace({path:'/clerklogin'})
    },
    openMessage(type) {
      this.$message({
        showClose: true,
        message: this.msg,
        type: type
      });
    },
    handleSubmit() {
      if (this.userid === "" || this.password === "") {
        this.msg = "请输入用户ID和密码";
        this.openMessage('error');
        return;
      }

      axios.get(`http://localhost:8080/users/getById/${this.userid}`)
          .then(response => {
            const user = response.data;
            if (user && user.password === this.password) {
              this.msg = "登录成功";
              this.openMessage('success');
              this. setUserInfo({ userid: this.userid, password: this.password });
              this.$router.push({ name: 'home' });
              // 在此处可以添加重定向到主页面或其他操作
            } else {
              this.msg = "用户ID或密码错误";
              this.openMessage('error');
            }
          })
          .catch(error => {
            console.error(error);
            this.msg = "请求失败，请稍后再试";
            this.openMessage('error');
          });
    }
  }
}
</script>

<style>
.login-box {
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
.login-box h2 {
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
  text-align: center;
}
.login-box .user-box {
  position: relative;
}
.login-box .user-box input {
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
.login-box .user-box label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: .5s;
}
.login-box .user-box input:focus ~ label,
.login-box .user-box input:valid ~ label {
  top: -20px;
  left: 0;
  color: #03e9f4;
  font-size: 12px;
}
.login-box form a {
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
.login-box a:hover {
  background: #03e9f4;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px #03e9f4,
  0 0 25px #03e9f4,
  0 0 50px #03e9f4,
  0 0 100px #03e9f4;
}
.login-box a span {
  position: absolute;
  display: block;
}
@keyframes btn-anim1 {
  0% {
    left: -100%;
  }
  50%, 100% {
    left: 100%;
  }
}
@keyframes btn-anim2 {
  0% {
    top: -100%;
  }
  50%, 100% {
    top: 100%;
  }
}
@keyframes btn-anim3 {
  0% {
    right: -100%;
  }
  50%, 100% {
    right: 100%;
  }
}
@keyframes btn-anim4 {
  0% {
    bottom: -100%;
  }
  50%, 100% {
    bottom: 100%;
  }
}
</style>