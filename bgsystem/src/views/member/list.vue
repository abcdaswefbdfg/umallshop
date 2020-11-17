<template>
  <div>
    <el-table
      :data="memberList"
      style="width: 100%"
    >
      <el-table-column prop="uid" label="用户编号" width="160">
      </el-table-column>
      <el-table-column prop="nickname" label="昵称" width="160">
      </el-table-column>
      <el-table-column prop="phone" label="手机号"> </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <div>
            <el-tag type="success" v-if="scope.row.status===1">启用</el-tag>
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
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  mounted() {
    this.getMemberList();
  },
  computed: {
    ...mapGetters({
      memberList: "member/getMemberList",
    }),
  },
  methods: {
    ...mapActions({
      getMemberList: "member/getMemberListAction",
    }),
    edit(uid) {
      this.$emit("edit", uid);
    }  
  },
};
</script>

<style lang="stylus" scoped></style>

