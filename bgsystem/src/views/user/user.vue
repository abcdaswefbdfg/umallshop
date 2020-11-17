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
import elBread from '../../components/bread'
import vTable from './list'
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
     vDialog,
     vTable
  },
  methods: {
    //打开弹框事件
    add(){
      this.addInfo.isShow = true;
      this.addInfo.isAdd = true;
    },
    cancel(e){
      this.addInfo.isShow = e;
    },
    edit(uid){
      this.addInfo.isShow = true;
      this.addInfo.isAdd = false;
      // console.log(id);
      this.$refs.dialog.look(uid);
    }
  }

};
</script>

<style lang="stylus" scoped>
.el-button 
  margin-bottom 20px
</style>


