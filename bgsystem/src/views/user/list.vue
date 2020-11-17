<template>
  <div>
    <el-table :data="userList" border style="width: 100%">
      <el-table-column prop="uid" label="用户编号" width="160">
      </el-table-column>
      <el-table-column prop="username" label="用户名称" width="160">
      </el-table-column>
      <el-table-column prop="roleid" label="所属角色" width="160">
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <div>
            <el-tag type="success" v-if="scope.row.status === 1">启用</el-tag>
            <el-tag type="danger" v-else>禁用</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" size="small" @click="edit(scope.row.uid)"
              >编辑</el-button
            >
            <el-button type="danger" size="small" @click="del(scope.row.uid)"
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :page-size="pageSize"
      background
      layout="prev, pager, next"
      :total="userCount"
      @current-change="currentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { getUserDelete } from "../../util/axios";
export default {
  data() {
    return {};
  },
  mounted() {
    this.getUserList();
    this.getUserCount();
  },
  computed: {
    ...mapGetters({
      userList: "user/getUserList",
      userCount: "user/getUserCount",
      pageSize: "user/getUserSize",
    }),
  },
  methods: {
    ...mapActions({
      getUserList: "user/getUserListAction",
      getUserCount: "user/getUserCountAction",
      getUserPage: "user/getEditPageAction",
    }),

    currentChange(e) {
      this.getUserPage(e);
    },

    edit(uid) {
      this.$emit("edit", uid);
    },

    del(uid) {
      this.$confirm("确定要删除这条数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          getUserDelete({ uid }).then((res) => {
            // console.log(res,'egjegthg');
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              this.getUserList();
              this.getUserCount();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style lang="stylus" scoped>
.el-pagination {
  float: right;
  margin: 40px 0;
}
</style>
