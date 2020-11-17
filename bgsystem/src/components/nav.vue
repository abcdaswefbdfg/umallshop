<template>
  <div>
    <el-menu
      :default-active="defaultActive"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      unique-opened
      router
    >
      <el-menu-item index="/home">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu
        :index="item.id.toString()"
        v-for="item in getUserInfo.menus"
        :key="item.id"
      >
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{ item.title }}</span>
        </template>
        <el-menu-item
          :index="menu.url"
          v-for="menu in item.children"
          :key="menu.id"
        >
          <span slot="title">{{ menu.title }}</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      defaultActive: "/home",
    };
  },
  mounted() {
    this.defaultActive = this.$route.path;
  },
  computed: {
    ...mapGetters(["getUserInfo"]),
  },
};
</script>

<style lang="stylus" scoped>
@import '../stylus/index.styl';

.el-menu {
  min-height: 90vh;
}
</style>
