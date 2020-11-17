<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加角色' : '编辑角色'"
      :visible.sync="addInfo.isShow"
      :before-close="cancel"
      center
    >
      <el-form :model="form" :rules="rules" ref="formDialog">
        <el-form-item
          prop="rolename"
          label="角色名称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" :label-width="formLabelWidth">
          <el-tree
            :data="menulist"
            default-expand-all
            node-key="id"
            :props="defaultProps"
            ref="tree"
            show-checkbox
            check-strictly
          >
          </el-tree>
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
          >添加</el-button
        >
        <el-button type="primary" @click="update('formDialog')" v-else
          >编辑</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { getRoleAdd, getRoleEdit, getRoleInfo } from "../../util/axios";
export default {
  data() {
    return {
      form: {
        rolename: "",
        menus: "",
        status: 1,
      },
      rules: {
        rolename: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          {
            min: 2,
            max: 8,
            message: "长度在 2 到 8 个字符",
            trigger: "blur",
          },
        ],
      },
      defaultProps: {
        children: "children",
        label: "title",
      },
      formLabelWidth: "120px",
    };
  },
  props: ["addInfo"],
  computed: {
    ...mapGetters({
      menulist: "menu/getMenuList",
    }),
  },
  methods: {
    reset() {
      this.form = {
        rolename: "",
        status: 1,
      };
      this.$refs.tree.setCheckedKeys([]);
      this.$refs["formDialog"].resetFields();
    },
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    ...mapActions({
      getMenuList: "menu/getMenuListAction",
      getRoleList: "role/getRoleListAction",
    }),
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.form.menus = this.$refs.tree.getCheckedKeys().join(",");
          // console.log(this.form);
          getRoleAdd(this.form).then((res) => {
            // console.log(res);
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getRoleList();
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
          this.form.menus = this.$refs.tree.getCheckedKeys().join(",");
          getRoleEdit(this.form).then((res) => {
            console.log(res);
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getRoleList();
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
    look(id) {
      getRoleInfo({ id }).then((res) => {
        // console.log(res,'look');
        if (res.data.code === 200) {
          this.form = res.data.list;
          this.form.menus = this.$refs.tree.setCheckedKeys(
            this.form.menus.split(",")
          );
          this.form.id = id;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
  },
  mounted() {
    if (this.menulist.length === 0) {
      this.getMenuList();
    }
  },
};
</script>

<style lang="" scoped>
</style>
