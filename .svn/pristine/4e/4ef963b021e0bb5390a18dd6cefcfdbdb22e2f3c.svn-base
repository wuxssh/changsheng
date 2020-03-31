<template>
  <div class="rollbackMes">
    <div class="work_queue">
      <!-- <img src="../../assets/images/report/tab_btn@1x.png" alt=""> -->
      <span>回退信息</span>
      <div class="box"></div>
    </div>

    <div class="work_table">
      <el-table
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        style="width: 100%"
      >
        <el-table-column label="序号" type="index" align="center" width="50" :index="indexMethod"></el-table-column>
        <el-table-column prop="operator" label="回退操作人" align="center"></el-table-column>
        <el-table-column prop="backdate" label="回退时间" align="center"></el-table-column>
        <el-table-column prop="backreasonname" label="回退原因" align="center"></el-table-column>
        <!-- <el-table-column prop="backdesc" label="回退原因说明" align="center"></el-table-column> -->
        <el-table-column label="回退原因说明" align="center">
          <template slot-scope="scope">
            <div style="text-align:left">
              {{scope.row.newbackdesc1}}
              <br />
              {{scope.row.newbackdesc2}}
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="customerLogo" label="客户标识"></el-table-column>
        <el-table-column prop="accidentType" label="出险类型"></el-table-column>
        <el-table-column prop="accdentDate" label="出险日期" :formatter="dateFormat1"></el-table-column>-->
      </el-table>
      <div style="margin-top:10px;">
        <el-pagination
          background
          @size-change="currentPage"
          @current-change="currentChange(currentPage)"
          :current-page.sync="currentPage"
          :page-size="10"
          layout="prev, pager, next, jumper"
          :total="tableData.length"
        ></el-pagination>
      </div>
    </div>
    <div style="text-align:right;margin-top:20px;">
      <el-button type="primary" round @click="goBack()">返 回</el-button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { post, service } from "../../utils/request.js";
export default {
  name: "RollbackMes",
  data() {
    return {
      currentPage: 1,
      currentPage1: 1,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      pagesize: 10,
      currpage: 1,
      tableData: [],
      tableDatas: [{}]
    };
  },
  created() {
    this.initData();
  },
  methods: {
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.currpage = val;
    },
    indexMethod(index) {
      return index + 1 + (this.currentPage1 - 1) * 5;
    },
    tableList() {
      this.displayData = [];
      for (
        var j = this.total * (this.currentPage - 1);
        j < this.total * this.currentPage;
        j++
      ) {
        if (this.tableData[j]) {
          this.displayData.push(this.tableData[j]);
        }
      }
    },
    currentChange: function(page) {
      this.currentPage = page;
      this.tableList();
    },
    indexMethod(index) {
      return index + 1 + (this.currentPage1 - 1) * 10;
    },
    //返回
    goBack() {
      this.$router.go(-1);
    },
    //初始化信息
    initData() {
      post(service.queryLLCaseBack, {
        bodys: {
          clmno: JSON.parse(this.$route.params.dataOfTable).rgtno
        }
      }).then(res => {
        if (res.data.header.code === "200") {
          this.tableData = res.data.bodys;
          this.tableData.forEach(item => {
            if (/#CB#/.test(item.backdesc)) {
              item.backdesc = item.backdesc.replace("#CB#", "#");
              item.newbackdesc1 = item.backdesc.slice(
                0,
                item.backdesc.indexOf("#")
              );
              item.newbackdesc2 = item.backdesc.slice(
                item.backdesc.indexOf("#") + 1,
                item.backdesc.length
              );
            } else {
              item.newbackdesc1 = item.backdesc;
              item.newbackdesc2 = "";
            }
          });
        }
      });
    },
    dateFormat1: function(row, column) {
      var t = new Date(row.backdate);
      return t.getFullYear() + "-" + (t.getMonth() + 1) + "-" + t.getDate();
    }
  }
};
</script>
<style lang="less" scoped>
.rollbackMes {
  margin: 20px;
  .work_queue {
    position: relative;
    span {
      display: inline-block;
      background-color: #0673ff;
      color: #fff;
      padding: 0 15px;
      height: 33px;
      line-height: 33px;
      border-radius: 10px 10px 0 0;
    }
    .box {
      width: 0;
      height: 0;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-top: 10px solid #0673ff;
      position: absolute;
      top: 33px;
      left: 15px;
      z-index: 999;
    }
  }
  .block {
    background-color: #fff;
    height: 80px;
    padding-top: 27px;
    box-sizing: border-box;
  }
}
</style>

