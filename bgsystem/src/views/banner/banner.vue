<template>
  <div>
    <!-- 面包屑导航 -->
    <el-bread></el-bread>
    <!-- 按钮 -->
    <el-button type="primary" plain size="small" @click="add">添加</el-button>
    <!-- 弹出框 -->
    <v-dialog :addInfo="addInfo" @cancel="cancel" ref="dialog"></v-dialog>
    <!-- 数据表格 -->
    <v-table @edit="edit"></v-table>
  </div>
</template>

<script>
import vTable from './list'
import vDialog from './add'
import elBread from '../../components/bread'
export default {
  data() {
    return {
      addInfo: {
        isShow: false,
        isAdd: true
      }
    };
  },
  components: {
      vTable,
      vDialog,
      elBread
  },
  methods: {
    add(){
      this.addInfo.isShow = true;
      this.addInfo.isAdd = true;
    },
    cancel(e){
      this.addInfo.isShow = e;
    },
    edit(e){
      this.addInfo.isShow = true;
      this.addInfo.isAdd = false;
      this.$refs.dialog.look(e);
    },

  }

};
</script>

<style lang="stylus" scoped>
.el-button
  margin-bottom 20px

</style>
