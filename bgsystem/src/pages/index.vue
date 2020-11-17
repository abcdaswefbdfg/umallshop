<template>
  <div>
    <el-container>
      <el-header
        >XX商城后台管理系统
        <div v-if="getUserInfo" class="userInfo">
          欢迎用户 {{ getUserInfo.username}}
        <el-button @click="logout" type='danger' size='small'>退出</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <v-nav></v-nav>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import vNav from "../components/nav";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getUserInfo"]),
  },
  methods: {
    ...mapActions(['changeUserInfoAction']),
    logout(){
      this.changeUserInfoAction(null);
      this.$router.push('/login');
    }
  },
  components: {
    vNav,
  },
};
</script>

<style lang="stylus" scoped>
@import '../stylus/index.styl';

.el-header
  background $firstBackgroundColor;


.userInfo
  float: right;

</style>
