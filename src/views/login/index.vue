<template>
  <div class="login-container">
    <el-form
      v-if="passWordBox"
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
      show-message:false
    >
      <div class="title-container">
        <h3 class="title" style="color:#000">AI智能可视化线路监测系统</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="用户名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLogin"
      >登录</el-button>
      <span style="cursor:pointer" @click="passWordBox=false">短信登录</span>
    </el-form>
    <el-form
      v-if="!passWordBox"
      ref="loginForm2"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title" style="color:#000">AI智能可视化线路监测系统</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username2"
          v-model="loginForm2.username"
          placeholder="手机号"
          name="username"
          tabindex="1"
          auto-complete="on"
        />
        <!-- <el-input v-model="domain.value"></el-input> -->
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password2"
          v-model="loginForm2.password"
          placeholder="验证码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="phoneNum">{{ yzmMsg }}</span>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click="phoneLogin"
      >登录</el-button>
      <span style="cursor:pointer" @click="passWordBox=true">密码登录</span>
    </el-form>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";
import Axios from "axios";
import Cookies from "js-cookie";
import { setToken } from "@/utils/auth";

export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码不能小于6位"));
      } else {
        callback();
      }
    };
    return {
      timer: "",
      yzmMsg: "获取验证码",
      passWordBox: true,
      msgVal: "获取验证码",
      loginForm: {
        username: "admin",
        password: "123456"
      },
      loginRules: {
        username: [{ required: true, trigger: "blur" ,message:"用户名不能为空"}],
        password: [{ required: true, trigger: "blur" ,message:"密码不能为空"}]
      },
      loginForm2: {
        username: "",
        password: ""
      },
      loginRules2: {
        username: [{ required: true, trigger: "blur" ,message:"手机号不能为空"}],
        password: [{ required: true, trigger: "blur" ,message:"验证码不能为空"}]
      },
      loading: false,
      passwordType: "password",
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(res => {
              this.$router.push({ path: this.redirect || "/" });
              this.loading = false;

              console.log(res);
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          // console.log("密码错误");
          return false;
        }
      });
    },
    phoneNum() {
      Axios({
        method: "POST",
        url:
          this.GLOBAL.AJAX_URL +
          "/v1/sim/send-login-code?phone=" +
          this.loginForm2.username
      }).then(msg => {
        // console.log(msg);
        if (msg.data.code === 0) {
          this.$message.success("验证码发送成功");
          this.yzmMsg = 60;

          this.timer = setInterval(this.set, 1000);
        } else {
          if (msg.data.code === 31818) {
            this.$message.error("该号码没有此权限");
          } else {
            this.$message.error("手机号不能为空");
          }
        }
      });
    },
    set() {
      if (this.yzmMsg === 1) {
        this.yzmMsg = "获取验证码";
        clearInterval(this.timer);
      } else {
        this.yzmMsg = this.yzmMsg - 1;
        // console.log(1);
      }
    },
    phoneLogin() {
      this.loading = true;
      this.$store
        .dispatch("user/login2", this.loginForm2)
        .then(msg => {
          // console.log(msg + "shuj")
          this.$router.push({ path: this.redirect || "/" });

          this.loading = false;
        })
        .catch(err => {
          this.$message.error("验证码错误");
          this.loading = false;
        });
    }
  }
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #e5e5e5;
$light_gray: #000;
$cursor: rgb(0, 0, 0);

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  background: url("../../assets/back.png") no-repeat;
  background-size: 100% 100%;
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 1440px;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
