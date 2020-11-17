<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加管理员' : '修改管理员'"
      :visible.sync="addInfo.isShow"
      center
      :before-close="cancel"
    >
      <el-form :model="form" :rules="rules" ref="formDialog">
        <el-form-item
          label="所属角色"
          :label-width="formLabelWidth"
          prop="roleid"
        >
          <el-select v-model="form.roleid" placeholder="请选择">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="username"
          label="用户名称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button
          type="primary"
          @click="add('formDialog')"
          v-if="addInfo.isAdd"
          >添 加</el-button
        >
        <el-button type="primary" @click="update('formDialog')" v-else
          >编 辑</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { getUserAdd, getUserInfo, getUserEdit } from "../../util/axios";
export default {
  data() {
    return {
      form: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          {
            min: 2,
            max: 8,
            message: "长度在 2 到 8 个字符",
            trigger: "blur",
          },
        ],
        roleid: [
          { required: true, message: "请选择所属角色", trigger: "blur" },
        ],
      },
      formLabelWidth: "120px",
    };
  },
  props: ["addInfo"],
  computed: {
    ...mapGetters({
      roleList: "role/getRoleList",
    }),
  },
  mounted() {
    if (this.roleList.length === 0) {
      this.getRoleList();
    }
  },
  methods: {
    ...mapActions({
      getRoleList: "role/getRoleListAction",
      getUserList: "user/getUserListAction",
      getUserCount: "user/getUserCountAction",
    }),
    reset() {
      this.form = {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      };
      this.$refs["formDialog"].resetFields();
    },
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    look(uid) {
      getUserInfo({ uid }).then((res) => {
        //   console.log(res,'UID');
        if (res.data.code === 200) {
          this.form = res.data.list;
          this.form.uid = uid;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    add(formName) {
      // console.log(this.form,'hehehgehg');
      this.$refs[formName].validate((valid) => {
        if (valid) {
          getUserAdd(this.form).then((res) => {
            // console.log(res);
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getUserList();
              this.getUserCount();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    update(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          getUserEdit(this.form).then((res) => {
            // console.log(res,"edit_response");
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              this.getUserList();
              this.getUserCount();
              this.cancel();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="stylus" scoped></style>
