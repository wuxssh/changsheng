<template>
  <div class="taskList" @click="setCurrent($event)">
    <el-row :gutter="20">
      <el-col :span="7">
        <div class="grid-content">
          <img
            src="../../assets/images/home/year@1x.png"
            alt
            style="display:inline-block;vertical-align: middle;"
          />
          <span class="text">剩余未分配件数</span>
          <span class="year_text">{{restNum}}</span>
        </div>
      </el-col>
    </el-row>
    <div class="work_queue">
      <!-- <img src="../../assets/images/report/tab_btn@1x.png" alt=""> -->
      <span>个人工作队列</span>
      <div class="box"></div>
    </div>
    <div class="work_table">
      <el-table
        highlight-current-row
        ref="singleTable"
        :data="personalData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        style="width: 100%"
        @row-dblclick="toReviewInformation"
        @row-click="saveCaseInfo"
      >
        <el-table-column label="序号" type="index" align="center" width="65" :index="indexMethod"></el-table-column>
        <el-table-column prop="caseno" label="理赔号" align="center" min-width="150px" sortable></el-table-column>
        <el-table-column prop="customerno" label="客户编码" align="center" min-width="120px" sortable></el-table-column>
        <el-table-column prop="customername" label="客户姓名" align="center" sortable min-width="120px"></el-table-column>
        <el-table-column prop="idtypename" label="证件类型" align="center" sortable min-width="120px"></el-table-column>
        <el-table-column prop="idno" label="证件号码" align="center" min-width="180px" sortable></el-table-column>
        <el-table-column align="center" prop="vipflag" label="客户标识" sortable min-width="180px">
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
        <el-table-column prop="rgtdate" label="立案日期" align="center" min-width="100" sortable></el-table-column>
        <el-table-column prop="mngcomname" label="机构" align="center" min-width="180" sortable></el-table-column>
        <el-table-column prop="claimaging" label="理赔时效（天）" align="center" min-width="100" sortable></el-table-column>
      </el-table>
      <div style="margin-top:10px;">
        <el-pagination
          background
          @size-change="currentPage1"
          @current-change="currentChange(currentPage1)"
          :current-page.sync="currentPage1"
          :page-size="10"
          layout="prev, pager, next, jumper"
          :total="personalData.length"
        ></el-pagination>
      </div>
    </div>
    <div style="text-align:right;margin-top:20px;">
      <el-button type="primary" @click="copyCase" round :disabled="restNum == 0">申领任务</el-button>
      <el-button
        type="primary"
        @click.stop="copyCase1"
        round
        :disabled="!caseInfo.rgtno && !caseInfo.customerno"
      >案件复制</el-button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { post, service } from "../../utils/request.js";
import { generateUUID, getDate, getTime } from "../../utils/common.js";
export default {
  data() {
    return {
      restNum: null,
      pagesize: 10,
      currpage: 1,
      personalData: [
        {
          rgtno: "",
          customerno: "",
          customername: "",
          idtype: "",
          idno: "",
          vipflag: "",
          accidenttype: "",
          accidentdate: "",
          countnum: ""
        }
      ],
      currentPage: 1,
      currentPage1: 1,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      caseInfo: {
        customerno: "",
        rgtno: ""
      }
    };
  },
  mounted() {
    this.initData();
    this.initCount();
  },
  methods: {
    setCurrent(e) {
      this.caseInfo.rgtno = "";
      this.caseInfo.customerno = "";
      this.$refs.singleTable.setCurrentRow();
    },
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
    toReviewInformation(row) {
      var clmNo = row.rgtno;
      var contNo = row.contno;
      var customerno = row.customerno;
      sessionStorage.setItem("caseno", clmNo);
      sessionStorage.setItem("contno", contNo);
      sessionStorage.setItem("customerno", customerno);
      this.$router.push({
        name: "ReviewInformation",
        params: { dataOfTable: JSON.stringify(row) }
      });
      // this.$router.push({
      //   name: "ReviewInformation",

      // });
    },
    initData() {
      post(service.querySelfWorkPool, {
        bodys: {
          mngcom: localStorage.getItem("comCode"),
          defaultoperator: localStorage.getItem("userCode"),
          auditer: localStorage.getItem("userCode")
        }
      }).then(res => {
        if (res.data.headers.code === "200") {
          this.personalData = res.data.bodys;
          this.personalData.forEach(item => {
            if (item.vipflag) {
              item.vipflag = item.vipflag.split(",");
              if (item.vipflag.indexOf("5") != -1) {
                item.vipflag.push({
                  url: require("../../assets/images/eapproval/vip.png"),
                  title: "vip"
                });
              }
              if (item.vipflag.indexOf("1") != -1) {
                item.vipflag.push({
                  url: require("../../assets/images/eapproval/black.png"),
                  title: "黑名单"
                });
              }
              if (item.vipflag.indexOf("2") != -1) {
                item.vipflag.push({
                  url: require("../../assets/images/eapproval/grey.png"),
                  title: "灰名单"
                });
              }

              if (item.vipflag.indexOf("3") != -1) {
                item.vipflag.push({
                  url: require("../../assets/images/eapproval/money.png"),
                  title: "反洗钱"
                });
              }
              if (item.vipflag.indexOf("4") != -1) {
                item.vipflag.push({
                  url: require("../../assets/images/eapproval/fraud.png"),
                  title: "反欺诈"
                });
              }
            }
          });
        }
      });
    },
    initCount() {
      let _this = this;
      post(service.querypoolcount, {
        bodys: {
          activityid: "0000005035",
          usercode: localStorage.getItem("userCode")
        }
      }).then(result => {
        if (result.data.headers.code === "200") {
          _this.restNum = result.data.bodys.rows[0];
        }
      });
    },
    //案件信息存储
    saveCaseInfo(row, event, column) {
      console.log(row);
      if (event && event.stopPropagation) {
        event.stopPropagation();
      } else {
        window.event.cancelBubble = true;
      }
      this.caseInfo.rgtno = row.caseno;
      this.caseInfo.customerno = row.customerno;
    },
    // 案件复制
    copyCase1() {
      this.$confirm("确定复制该案件？", "提示", {
        center: true,
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "warning"
      })
        .then(() => {
          if (this.caseInfo.rgtno && this.caseInfo.customerno) {
            post(service.caseCopy, {
              bodys: {
                mngcom: localStorage.getItem("comCode"),
                operator: localStorage.getItem("userCode"),
                rgtno: this.caseInfo.rgtno,
                customerno: this.caseInfo.customerno
              }
            }).then(res => {
              if (res.data.headers.code === "200") {
                this.caseInfo.rgtno = "";
                this.caseInfo.customerno = "";
                this.$message({
                  message: res.data.headers.message,
                  type: "success"
                });
                this.initData();
                this.initCount();
              } else {
                this.$message({
                  message: res.data.headers.message,
                  type: "warning"
                });
              }
            });
          }
        })
        .catch(() => {});
    },
    copyCase() {
      post(service.forTheTask, {
        bodys: {
          mngcom: localStorage.getItem("comCode"),
          operator: localStorage.getItem("userCode")
        }
      }).then(result => {
        if (
          result.data.headers.code === "200" &&
          result.data.headers.success === true
        ) {
          this.$message({
            message: result.data.headers.message,
            type: "success"
          });
          this.initData();
          this.initCount();
        } else if (
          result.data.headers.code === "200" &&
          result.data.headers.success === false
        ) {
          this.$message({
            message: result.data.headers.message,
            type: "warning"
          });
        } else {
          this.$message.error("请求失败，请重试");
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.taskList {
  padding: 10px;
  .el-row {
    // margin-top: 20px;
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .el-col {
    border-radius: 4px;
  }

  .grid-content {
    padding: 0 20px;
    box-sizing: border-box;
    border-radius: 4px;
    height: 100px;
    background-color: #fff;
    line-height: 100px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .text {
    font-size: 1rem;
    font-family: Source Han Sans CN;
    font-weight: 400;
    margin-left: 10px;
    color: rgba(102, 102, 102, 1);
    opacity: 1;
    flex-basis: 60%;
  }

  .year_text {
    font-size: 55px;
    font-family: DIN Alternate;
    font-weight: bold;
    color: rgba(246, 78, 111, 1);
    text-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    opacity: 1;
    /* float: right; */
  }

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

  .block {
    background-color: #fff;
    height: 80px;
    padding-top: 27px;
    box-sizing: border-box;
  }
}
</style>
