<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" @mouseenter="mouseFun" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :alarms="alarmNum"
          :work-orders="workNum"
          :crealarm-num="crealarmNum"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import Axios from 'axios'
import Cookies from 'js-cookie'
// Vue.forceUpdate()

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters(['sidebar']),
    routes() {
      return this.$router.options.routes
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  data() {
    return {
      alarmNum: 0,
      workNum: 0,
      set: setInterval(this.msgCode, 500),
      workOrders: [],
      alarms: [],
      crealarmNum: 0,
      earlyAlarms: []
    }
  },
  created() {
    this.msgCode()
    this.set
  },
  methods: {
    msgCode() {
      Axios({
        method: 'post',
        url:
          this.GLOBAL.AJAX_URL +
          '/v1/hub/message?user-id=' +
          localStorage.getItem('userId'),
        headers: {
          Authorization: 'Bearer ' + Cookies.get('vue_admin_template_token')
        }
      }).then(msg => {
        // console.log(msg);
        // console.log(this.alarmNum + "alarms");
        // this.alarms = msg.data.data.message.alarms;
        // this.workOrders = msg.data.data.message.workOrders;
        // console.log(sessionStorage.getItem("earlyAlarms"));
        if (msg.data.data.message.workOrders.length !== 0) {
          // console.log("dier")
          this.workNum = 1
          if (this.workOrders.length !== 0) {
            // console.log(this.workOrders);
            for (let i = 0; i < msg.data.data.message.workOrders.length; i++) {
              var a = false
              for (let o = 0; o < this.workOrders.length; o++) {
                if (this.workOrders[o] == msg.data.data.message.workOrders[i]) {
                  a = true
                }
              }
              if (!a) {
                this.autoPlay('工单')
                break
              }
            }
          } else {
            this.autoPlay('工单')
          }
          this.workOrders = msg.data.data.message.workOrders
        } else {
          this.workNum = 0
        }

        if (msg.data.data.message.alarms.length !== 0) {
          // console.log(msg.data.data.message.alarms.length)
          this.alarmNum = 1
          if (this.alarms.length !== 0) {
            // console.log(this.alarms);
            for (let i = 0; i < msg.data.data.message.alarms.length; i++) {
              var a = false
              for (let o = 0; o < this.alarms.length; o++) {
                if (this.alarms[o] == msg.data.data.message.alarms[i]) {
                  a = true
                }
              }
              if (!a) {
                this.autoPlay('告警')
                break
              }
            }
          } else {
            this.autoPlay('告警')
          }
          this.alarms = msg.data.data.message.alarms
        } else {
          this.alarmNum = 0
        }
        if (msg.data.data.message.earlyAlarms.length !== 0) {
          // console.log("diyi")
          this.crealarmNum = 1
          // console.log(this.crealarmNum)
          if (this.earlyAlarms.length !== 0) {
            // console.log(this.earlyAlarms);
            for (let i = 0; i < msg.data.data.message.earlyAlarms.length; i++) {
              var a = false
              for (let o = 0; o < this.earlyAlarms.length; o++) {
                if (
                  this.earlyAlarms[o] == msg.data.data.message.earlyAlarms[i]
                ) {
                  a = true
                }
              }
              if (!a) {
                this.autoPlay('预警')
                this.LABEL_DATA.Early_Alarms = true
                // console.log(this.LABEL_DATA.Early_Alarms);
                break
              }
            }
          } else {
            this.autoPlay('预警')
            this.LABEL_DATA.Early_Alarms = true
            // console.log(this.LABEL_DATA.Early_Alarms);
          }
          this.earlyAlarms = msg.data.data.message.earlyAlarms
        } else {
          this.crealarmNum = 0
        }
      })
    },
    autoPlay(val) {
      var msg = new SpeechSynthesisUtterance(
        '您有新的' + val + '信息请及时查看'
      )
      msg.lang = 'zh'
      msg.volume = 1
      msg.rate = 0.9
      msg.pitch = 2
      speechSynthesis.speak(msg)
      // console.log(msg)
    }
  }
}
</script>
