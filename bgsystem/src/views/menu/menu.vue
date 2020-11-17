<template>
  <div>
    <!-- 面包屑导航 -->
    <el-bread></el-bread>
    <!-- 添加按钮 -->
    <el-button type="primary" size="small" @click="add">添加</el-button>
    <!-- 表格 -->
    <v-table @edit="edit"></v-table>
    <v-dialog :addInfo="addInfo" @cancel="cancel" ref="dialog"></v-dialog>
  </div>
</template>

<script>

import elBread from "../../components/bread";
import vTable from "./list";
import vDialog from "./add";
export default {
  data() {
    return {
      addInfo: {
        isShow: false,
        isAdd: true,
      },
    };
  },
  components: {
    elBread,
    vTable,
    vDialog,
  },
  methods: {
    add() {
      this.addInfo.isShow = true;
      this.addInfo.isAdd = true;
    },
    edit(e) {
      this.addInfo.isAdd = false;
      this.addInfo.isShow = true;
      this.$refs.dialog.look(e);
    },
    cancel(e) {
      this.addInfo.isShow = e;
    },
  },
};
</script>

<style lang="" scoped>
</style>
