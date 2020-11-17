<template>
  <div>
    <!-- 面包屑导航 -->
    <el-bread></el-bread>
    <!-- 添加按钮 -->
    <el-button type="primary" plain size="small" @click="add">添加</el-button>
    <!-- 列表 -->
    <v-table @edit="edit"></v-table>
    <v-dialog :addInfo="addInfo" @cancel="cancel" ref="dialog"></v-dialog>
  </div>
</template>

<script>
import vTable from './list'
import elBread from '../../components/bread'
import vDialog from './add'
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
     elBread,
     vTable,
     vDialog
  },
  methods: {
    add(){
      this.addInfo.isShow = true;
      this.addInfo.isAdd = true;
    },
    cancel(e){
      this.addInfo.isShow = false
    },
    edit(e){
      this.addInfo.isShow = true;
      this.addInfo.isAdd = false;
      this.$refs.dialog.look(e);
    }
  }

};
</script>

<style lang="stylus" scoped>
.el-button
    margin-bottom 20px
</style>


