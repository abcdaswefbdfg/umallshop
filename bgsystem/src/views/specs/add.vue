<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加商品规格' : '修改商品规格'"
      :visible.sync="addInfo.isShow"
      center
      :before-close="cancel"
    >
      <el-form :model="form" :rules="rules" ref="formDialog">
        <el-form-item
          label="规格名称"
          :label-width="formLabelWidth"
          prop="specsname"
        >
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          v-for="(item, index) in arrAttr"
          :key="index"
          label="规格属性"
          :label-width="formLabelWidth"
        >
          <el-input
            class="wid"
            v-model="item.value"
            autocomplete="off"
          ></el-input>
          <el-button type="primary" @click="addAttr" v-if="index === 0"
            >新增规格属性</el-button
          >
          <el-button type="danger" v-else @click="delAttr(item)">删除</el-button>
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
          v-if="addInfo.isAdd"
          @click="add('formDialog')"
          >添 加</el-button
        >
        <el-button type="primary" v-else @click="update('formDialog')"
          >编 辑</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { getSpecsAdd, getSpecsInfo, getSpecsEdit } from "../../util/axios";
export default {
  data() {
    return {
      form: {
        specsname: "",
        status: 1,
        attrs: "",
      },
      arrAttr: [
        {
          value: "",
        },
      ],
      formLabelWidth: "120px",
      rules: {
        specsname: [
          { required: true, message: "请输入规格名称", trigger: "blur" },
          {
            min: 2,
            max: 8,
            message: "长度在 2 到 8 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    ...mapGetters({
      specslist: "specs/getSpecsList",
    }),
  },
  props: ["addInfo"],
  methods: {
    reset() {
      this.form = {
        specsname: "",
        status: 1,
        attrs: "",
      };
      this.arrAttr = [
        {
          value: "",
        },
      ];
      this.$refs["formDialog"].resetFields();
    },
    ...mapActions({
      getSpecsList: "specs/getSpecsListAction",
      getSpecsCount: "specs/getSpecsCountAction",
    }),
    addAttr() {
      if (this.arrAttr.length <= 6) {
        this.arrAttr.push({
          value: "",
        });
      } else {
        this.$message.warning("最多只能添加5项");
      }
    },
    delAttr(item) {
      var index = this.arrAttr.indexOf(item);
      if (index !== -1) {
        this.arrAttr.splice(index, 1);
      }
    },
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    look(id) {
      getSpecsInfo({ id }).then((res) => {
        if (res.data.code === 200) {
          let data = res.data.list[0];
          this.form = data;
          data.attrs.map((item, index) => {
            if (index === 0) {
              this.arrAttr[0].value = item;
            } else {
              this.arrAttr.push({
                value: item
              });
            }
          });
        }
        this.form.id = id;
      });
    },
    add(formName) {
      this.form.attrs = this.arrAttr.map((item) => item.value).join(",");
      this.$refs[formName].validate((valid) => {
        if (valid) {
          getSpecsAdd(this.form).then((res) => {
            //   console.log(res);
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getSpecsList();
              this.getSpecsCount();
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
      this.form.attrs = this.arrAttr.map((item) => item.value).join(",");
      this.$refs[formName].validate((valid) => {
        if (valid) {
          getSpecsEdit(this.form).then((res) => {
            //   console.log(res);
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getSpecsList();
              this.getSpecsCount();
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

<style lang="stylus" scoped>
.wid {
  width: 70%;
}
</style>
