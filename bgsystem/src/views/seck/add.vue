<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加限时秒杀' : '编辑限时秒杀'"
      :visible.sync="addInfo.isShow"
      :before-close="cancel"
      center
    >
      <el-form :model="form" :rules="rules" ref="formDialog">
        <el-form-item
          prop="title"
          label="秒杀管理名称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="活动期限:" :label-width="formLabelWidth">
          <el-date-picker
            v-model="timer"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="一级分类" :label-width="formLabelWidth">
          <el-select
            v-model="form.first_cateid"
            placeholder="请选择"
            @change="changeCate(false)"
          >
            <el-option
              v-for="item in catelist"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" :label-width="formLabelWidth">
          <el-select
            v-model="form.second_cateid"
            placeholder="请选择"
            @change="changeGoods(false)"
          >
            <el-option
              v-for="item in secondArr"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品" :label-width="formLabelWidth">
          <el-select v-model="form.goodsid" placeholder="请选择商品">
            <el-option
              v-for="item in goodsList"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            >
            </el-option>
          </el-select>
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
        <el-button type="primary" @click="add" v-if="addInfo.isAdd"
          >添加</el-button
        >
        <el-button type="primary" @click="update" v-else>编辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {
  getSeckAdd,
  getSeckEdit,
  getSeckInfo,
  getGoodsList,
} from "../../util/axios";
export default {
  data() {
    return {
      timer: "",
      form: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
      secondArr: [],
      goodsList: [],
      rules: {
        title: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
      formLabelWidth: "120px",
    };
  },
  props: ["addInfo"],
  computed: {
    ...mapGetters({
      catelist: "cate/getCateList",
    }),
  },
  mounted() {
    this.getCateList();
  },
  methods: {
    reset() {
      this.form = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      };
      this.timer = "";
      this.$refs["formDialog"].resetFields();
    },
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    ...mapActions({
      getCateList: "cate/getCateListAction",
      getSeckList: "seck/getSeckListAction"
    }),
    changeCate(n) {
      let index = this.catelist.findIndex(
        (item) => this.form.first_cateid === item.id
      );
      this.secondArr = this.catelist[index].children;
      if (!n) {
        this.form.second_cateid = "";
        this.form.goodsid = "";
      }
    },
    changeGoods(n) {
      getGoodsList({
        fid: this.form.first_cateid,
        sid: this.form.second_cateid,
      }).then((res) => {
        if (res.data.code === 200) {
          this.goodsList = res.data.list;
        }
      });
    },
    add() {
      // console.log(this.form);
      // console.log(this.timer);
      this.form.begintime = new Date(this.timer[0]).getTime();
      this.form.endtime = new Date(this.timer[1]).getTime();
      getSeckAdd(this.form).then((res) => {
        // console.log(res);
        if (res.data.code === 200) {
          this.$message.success(res.data.msg);
          this.cancel();
          this.getSeckList();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    update() {
      getSeckEdit(this.form).then((res) => {
        console.log(res);
        if (res.data.code === 200) {
          this.$message.success(res.data.msg);
          this.cancel();
          this.getSeckList();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    look(id) {
      getSeckInfo({ id }).then((res) => {
        console.log(res, "look");
        if (res.data.code === 200) {
          this.form = res.data.list;
          this.form.id = id;
          this.timer = [new Date(parseFloat(this.form.begintime)),new Date(parseFloat(this.form.endtime))];
          this.changeCate(true);
          this.changeGoods(true);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
  },
};
</script>

<style lang="" scoped>
</style>
