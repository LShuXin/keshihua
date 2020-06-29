<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />
    <el-avatar class="header" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
    <span class="nameBox">{{ Username }}</span>
    <div class="right-menu">
      <el-dialog id="dialog" title="确定退出吗？" center :visible.sync="logout" width="30%">
        <div />
        <div slot="footer">
          <el-button @click="logout = false">取 消</el-button>
          <el-button type="primary" @click="logoutFunT">确 定</el-button>
        </div>
      </el-dialog>
      <el-dropdown split-button trigger="click" size="small" type="primary" class="avatar-container" :hide-on-click="false" @click="logoutFun">
        退出登录
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>设备升级</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.nameBox{
  line-height: 50px;
  display: inline-block;
  position: absolute;
  right: 180px;
  color: #666666;
}
#dialog >>> .el-dialog__title {
  color: red;
}
.header{
  position: absolute;
  right: 250px;
  top: 5px;
}
</style>
<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Cookies from 'js-cookie'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      logout: false,
      Username: localStorage.getItem('userName')
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar'])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    logoutFun() {
      this.logout = true
    },
    async logoutFunT() {
      Cookies.remove('vue_admin_template_token')
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      this.$router.go(0)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
