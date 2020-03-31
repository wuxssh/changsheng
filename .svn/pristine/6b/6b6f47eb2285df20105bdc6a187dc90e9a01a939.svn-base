<template>
  <div class="reportInquiry">
    <!-- 报案查询 -->
    <!-- 工作队列 -->
    <div class="work_queue">
      <!-- <img src="../../assets/images/report/tab_btn@1x.png" alt=""> -->
      <span>工作队列</span>
      <div class="box"></div>
    </div>
    <el-table
      :data="aduitList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      class="tables"
      @row-dblclick="handle"
      highlight-current-row
      style="width: 100%;height:100%;"
    >
      <el-table-column type="index" width="65" label="序号" :index="indexMethod" align="center"></el-table-column>
      <el-table-column align="center" prop="rgtno" label="理赔号" min-width="150" sortable></el-table-column>
      <el-table-column align="center" prop="customerno" label="客户编码" min-width="150" sortable></el-table-column>
      <el-table-column align="center" prop="customername" label="客户姓名" min-width="100" sortable></el-table-column>
      <el-table-column align="center" prop="idtype" label="证件类型" min-width="100" sortable>
        <template slot-scope="scope">
          <span>{{scope.row.idtype|cardType}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="idno" label="证件号码" min-width="200" sortable></el-table-column>
      <el-table-column align="center" prop="vipflag" label="客户标识" sortable min-width="150">
        <template slot-scope="scope">
              <img
              v-for="(item,index) in scope.row.vipflag"
              :key="index"
              :src="item.url"
              :title="item.title"
              class="head_pic"
            />

        </template>
      </el-table-column>
      <el-table-column align="center" prop="rgtdate" label="立案日期" sortable min-width="200"></el-table-column>
      <el-table-column align="center" prop="mngcom" label="机构" sortable min-width="150"></el-table-column>
      <el-table-column align="center" prop="time" label="理赔时效（天）" sortable min-width="100"></el-table-column>
    </el-table>
    <div style="margin-top:10px;">
      <el-pagination
      background
      @size-change="currentPage1"
      @current-change="currentChange(currentPage1)"
      :current-page.sync="currentPage1"
      :page-size="10"
      layout="prev, pager, next, jumper"
      :total="aduitList.length"
    ></el-pagination>
    </div>
    <!-- <div class="elButton">
            <el-button type="primary" round>
                <router-link tag="span" to="/eAListDetails">申领任务</router-link>
            </el-button>
            <el-button type="primary" round>案件复制</el-button>
    </div>-->
  </div>
</template>
<script>
import axios from "axios";
import Banners from "@/components/Banners";
import { IDType } from "../../utils/service.js";
import { post, service } from "../../utils/request.js";
export default {
  name: "ReportInquiry",
  components: {
    Banners
  },
  data() {
    return {
      aduitList: [], // 审批列表
      pagesize: 10,
      currpage: 1,
      currentPage: 1,
      currentPage1: 1,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      className: "工作队列"
    };
  },
  mounted() {
    // this.find();
    this.searchAudit();
  },
  methods: {
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.currpage = val;
    },
    indexMethod(index) {
      return (index + 1)+ (this.currentPage1 - 1) * 5;
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

    typeToname(code) {
      var a = null;
      IDType().forEach(element => {
        if (element.value === code) {
          a = element.text;
        }
      });
      return a;
    },

    // 查询审批的列表
    searchAudit() {
      post(service.auditSearch, {
        bodys: {
          mngcom: localStorage.getItem("comCode"),
          operator: localStorage.getItem("userCode")
        }
      })
        .then(result => {
          if (result.data.headers.code === "200") {
            this.aduitList = result.data.bodys.rows;
            // this.caseData = result.data.bodys;
          this.aduitList.forEach(item => {
            if (item.vipflag) {
              item.vipflag = item.vipflag.split(",");
                 if (item.vipflag.indexOf("5") != -1) {
                item.vipflag.push({
                  url: require("../../assets/images/eapproval/vip.png"),
                  title:"vip"
                });
              }
                 if (item.vipflag.indexOf("1") != -1) {
                item.vipflag.push({
                  url: require("../../assets/images/eapproval/black.png"),
                  title:"黑名单"
                });
              }
              if (item.vipflag.indexOf("2") != -1) {
                item.vipflag.push({
                  url: require("../../assets/images/eapproval/grey.png"),
                  title:"灰名单"
                });
              }
           
              if (item.vipflag.indexOf("3") != -1) {
                item.vipflag.push({
                  url: require("../../assets/images/eapproval/money.png"),
                  title:"反洗钱"
                });
              }
              if (item.vipflag.indexOf("4") != -1) {
                item.vipflag.push({
                  url: require("../../assets/images/eapproval/fraud.png"),
                  title:"反欺诈"
                });
              }
           
            }
          });
          }
        })
        .catch();
    },
    handle(row, event, column) {
      this.$router.push({
        name: "EAListDetails1",
        params: { dataOfTable: JSON.stringify(row) }
      });
    },
 
    dateFormat: function(row, column) {
      var t = new Date(row.rptDate);
      return t.getFullYear() + "-" + (t.getMonth() + 1) + "-" + t.getDate();
    },
    dateFormat1: function(row, column) {
      var t = new Date(row.accdentDate);
      return t.getFullYear() + "-" + (t.getMonth() + 1) + "-" + t.getDate();
    },
    handleEdit(index, row) {
      this.$message("是否要重新编辑", "提示");
    },
  
    // 删除
    handleDelete(index, list) {
      list.splice(index, 1);
      this.total = list.length - 1;
    }
  }
};
</script>
<style scoped lang="less">
.simplesimple {
  height: 14px;
  background: #ffffff;
  box-shadow: 0px 13px 9px rgba(204, 204, 204, 0.15);
  opacity: 1;
}

.tables {
  width: 1541px;
  height: 364px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 13px 9px rgba(204, 204, 204, 0.15);
  opacity: 1;
  border-radius: 0px 0px 6px 6px;
}

.reportInquiry {
  margin: 10px;

  .work_queue {
    position: relative;

    //   img{
    //      position: relative;
    //   }
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

  .title {
    width: 82px;
    height: 20px;
    font-size: 20px;
    font-family: Source Han Sans CN;
    font-weight: bold;
    line-height: 25px;
    color: rgba(238, 238, 238, 1);
    position: absolute;
    top: 20px;
    left: 20px;
    opacity: 1;
  }
}

//rgba(238,238,238,1)
.el-row {
  text-align: center;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;

  span {
    display: inline-block;
    width: 20%;
  }
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
<style lang="less">
.reportInquiry {
  .el-input {
    width: 58%;
  }

  .el-select {
    width: 58%;

    .el-input {
      width: 100%;
    }
  }

  .elButton {
    margin-top: 10px;
    margin-left: 750px;
  }
}
</style>