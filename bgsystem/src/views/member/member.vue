<template>
  <div>
    <!-- 面包屑导航 -->
    <el-bread></el-bread>
    <!-- 表格 -->
    <v-table  @edit="edit"></v-table>
    <v-dialog :isShow="isShow" ref="dialog" @cancel="cancel"></v-dialog>
  </div>
</template>

<script>

import elBread from "../../components/bread";
import vTable from "./list";
import vDialog from "./add";
export default {
  data() {
    return {
      isShow: false
    };
  },
  components: {
    elBread,
    vTable,
    vDialog,
  },
  methods: {
    edit(id){
      this.isShow =true;
      this.$refs.dialog.look(id);
    },
    cancel(e) {
      this.isShow = e;
    }
  },
};
</script>

<style lang="" scoped>
</style>

