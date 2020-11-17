<template>
  <div>
    <el-table
      :data="goodslist"
      style="width: 100%"
      row-key="id"
      :tree-props="{ children: 'children' }"
      default-expand-all
      border
    >
      <el-table-column prop="id" label="商品编号">
      </el-table-column>
      <el-table-column prop="goodsname" label="商品名称">
      </el-table-column>
      <el-table-column prop="price" label="商品价格">
      </el-table-column>
      <el-table-column prop="market_price" label="市场价格">
      </el-table-column>
      <!-- <el-table-column prop="pid" label="上级菜单"> </el-table-column> -->
      <el-table-column label="图片">
        <template slot-scope="item">
          <div>
            <img :src="$imgUrl + item.row.img" alt="" />
          </div>
        </template>
      </el-table-column>
    
      <el-table-column label="是否新品" width="160">
         <template slot-scope="scope">
          <div>
            <el-tag type="success" v-if="scope.row.isnew === 1">启用</el-tag>
            <el-tag type="danger" v-else>禁用</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="是否热卖">
         <template slot-scope="scope">
          <div>
            <el-tag type="success" v-if="scope.row.isnew === 1">启用</el-tag>
            <el-tag type="danger" v-else>禁用</el-tag>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" size="small" @click="edit(scope.row.id)"
              >编辑</el-button
            >
            <el-button type="danger" size="small" @click="del(scope.row.id)"
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
      :total="count"
      @current-change="currentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { getGoodsDelete } from "../../util/axios";
export default {
  data() {
    return {};
  },
  mounted() {
    this.getGoodsList();
    this.getGoodsCount();
  },
  computed: {
    ...mapGetters({
      goodslist: "goods/getGoodsList",
      pageSize: "goods/getGoodsSize",
      count: "goods/getGoodsCount"
    }),
  },
  methods: {
    ...mapActions({
      getGoodsList: "goods/getGoodsListAction",
      getEditPage: "goods/getEditPageAction",
      getGoodsCount: "goods/getGoodsCountAction"
    }),
    edit(id) {
      this.$emit("edit", id);
    },
    currentChange(e){
      this.getEditPage(e);
    },
    del(id) {
      this.$confirm("确定要删除这条数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          getGoodsDelete({ id }).then((res) => {
            // console.log(res);
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              this.getGoodsList();
              this.getGoodsCount();
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
img {
  width: 100px;
}
</style>
