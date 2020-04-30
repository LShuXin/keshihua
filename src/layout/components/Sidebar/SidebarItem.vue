<template>
  <div v-if="!item.hidden" class="menu-wrapper">
    <template
      v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow"
    >
      <!-- <el-badge v-else-if="onlyOneChild.hase === 0" value=" "/> -->
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{'submenu-title-noDropdown':!isNest}"
        >
          <!-- <el-badge is-dot v-else class="itemFalse item"></el-badge> -->

          <el-badge
            is-dot
            v-if="onlyOneChild.name==='工单管理'&&this.workOrders === 1"
            class="item"
            style="position:absolute"
          >
            <item
              :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)"
              :title="onlyOneChild.meta.title"
            />
          </el-badge>
          <el-badge
            is-dot
            v-if="onlyOneChild.name==='预警页面'&&this.crealarmNum === 1"
            class="item"
            style="position:absolute"
          >
            <item
              :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)"
              :title="onlyOneChild.meta.title"
            />
          </el-badge>
          <el-badge
            is-dot
            v-if="onlyOneChild.name==='告警列表'&&this.alarms === 1"
            class="item"
            style="position:absolute"
          >
            <item
              :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)"
              :title="onlyOneChild.meta.title"
            />
          </el-badge>
          <!-- <el-badge is-dot v-else class="itemFalse item" style="positio:absolute"> -->
          <item
            :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)"
            :title="onlyOneChild.meta.title"
          />
          <!-- </el-badge> -->
        </el-menu-item>
      </app-link>
    </template>
    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <!-- <el-badge is-dot  class="itemFalse item"></el-badge> -->
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
    <!-- <el-button type="primary" @click="test">11</el-button> -->
  </div>
</template>


<style lang="scss" scoped>
.item >>> .is-dot {
  width: 10px !important;
  height: 10px !important;
  top: 20px;
  left: 5px;
}
.itemFalse >>> .el-badge__content {
  background-color: rgba(0, 0, 0, 0) !important;
  border: 0px !important;
}
.menu-wrapper {
  background: #fff;
}
.submenu-title-noDropdown {
  background: #fff;
}
.el-submenu__title {
  background: #fff !important;
}
</style>


<script>
import path from "path";
import { isExternal } from "@/utils/validate";
import Item from "./Item";
import AppLink from "./Link";
import FixiOSBug from "./FixiOSBug";
import { on } from "events";
export default {
  name: "SidebarItem",
  components: { Item, AppLink },
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ""
    },
    alarms: {
      type: Number,
      default: null
    },
    workOrders: {
      type: Number,
      default: null
    },
    crealarmNum: {
      type: Number,
      default: null
    }
  },
  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function
    this.onlyOneChild = null;
    return {};
  },
  created() {},
  watch: {},
  methods: {
    hasOneShowingChild(children = [], parent) {
      // console.log(parent)
      // console.log(children);
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false;
        } else {
          // console.log(this.crealarmNum);
          // // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item;
          // if (this.workOrders === 1) {
          //   if (this.onlyOneChild.name === "工单管理") {
          //     this.onlyOneChild.hase = 1;
          //   }
          // }
          // if (this.alarms === 1) {
          //   if (this.onlyOneChild.name === "告警列表") {
          //     this.onlyOneChild.hase = 1;
          //   }
          // }
          // if (this.crealarmNum === 1) {
          //   if (this.onlyOneChild.name === "预警页面") {
          //     this.onlyOneChild.hase = 1;
          //   }
          // }
          return true;
        }
      });

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true;
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: "", noShowingChildren: true };
        return true;
      }

      return false;
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(this.basePath)) {
        return this.basePath;
      }
      return path.resolve(this.basePath, routePath);
    }
    // autoPlay() {
    //   var msg = new SpeechSynthesisUtterance("您有新的信息请及时查看");
    //   msg.lang = "zh";
    //   msg.volume = 1;
    //   msg.rate = 0.8;
    //   msg.pitch = 2;
    //   speechSynthesis.speak(msg);
    //   // console.log(msg);
    // }
  }
};
</script>
