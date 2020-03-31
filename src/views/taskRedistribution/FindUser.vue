<template>
  <div class="findUser">
    <el-collapse v-model="activeName">
      <el-collapse-item name="1">
        <template slot="title">
          用户查询页面
          <i
            class="header-icon el-icon-caret-bottom"
            style="margin: 0 8px 0 auto;font-size: 30px;"
          ></i>
        </template>
        <el-form ref="form" :model="form" v-model="labelPosition" label-width="35%">
          <el-row>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="用户编码">
                  <el-input v-model="form.usercode" maxlength="100" @keyup.enter.native="initTable"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="用户姓名">
                  <el-input v-model="form.username" maxlength="20" @keyup.enter.native="initTable"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="机构代码">
                  <!-- <el-input v-model="form.operator" maxlength="100"></el-input> -->
                  <el-select v-model="form.comcode" clearable placeholder="请选择" filterable>
                    <el-option
                      v-for="item in mngcomList"
                      :key="item.comcode"
                      :label="item.name"
                      :value="item.comcode"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
          </el-row>

          <el-row style="text-align:right;padding-right:30px;">
            <el-button type="primary" @click="initTable" round>查 询</el-button>
          </el-row>
        </el-form>
      </el-collapse-item>
    </el-collapse>

    <div class="work_queue">
      <span>用户查询页面列表</span>
      <div class="box"></div>
    </div>
    <div class="work_table">
      <el-table
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        style="width: 100%"
        highlight-current-row
        @row-click="toAdd"
      >
        <el-table-column label="序号" type="index" :index="indexMethod" align="center"></el-table-column>
        <el-table-column prop="usercode" label="用户编码" align="center" sortable></el-table-column>
        <el-table-column prop="username" label="用户姓名" align="center" sortable></el-table-column>
        <el-table-column prop="comcode" label="机构代码" align="center" sortable></el-table-column>
        <!-- <el-table-column prop="reportflag" label="报案权限" align="center"></el-table-column> -->
        <el-table-column prop="registerflage" label="立案权限" align="center" sortable></el-table-column>
        <el-table-column prop="noteuwflag" label="照会审批权限" align="center" sortable></el-table-column>
        <el-table-column prop="surveyuwflag" label="调查审批权限" align="center" sortable></el-table-column>
        <el-table-column prop="checkflag" label="案件审核权限" align="center" sortable></el-table-column>
        <el-table-column prop="uwflag" label="案件审批权限" align="center" sortable></el-table-column>
        <el-table-column prop="rgtflag" label="在岗状态" align="center" sortable></el-table-column>
        <el-table-column prop="workingstatus" label="工作状态" align="center" sortable></el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="currentPage1"
          @current-change="currentChange"
          :current-page.sync="currentPage1"
          :page-size="10"
          background
          layout="prev, pager, next, jumper"
          :total="tableData.length"
        ></el-pagination>
      </div>
      <el-row style="text-align:right;padding-right:30px;">
        <el-button type="primary" @click="comfirm" round>确 认</el-button>
        <el-button type="primary" @click="goBack" round>返 回</el-button>
      </el-row>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { post, service } from "../../utils/request.js";
// import { getCodeArr } from "../../utils/service";
export default {
  name: "ListQuery",
  data() {
    return {
      bigRow: {},
      form: {
        usercode:'',
        username:'',
        comcode:'',
      },
      mngcomList: [],
      listForm: {
        clmNo: "",
        clmState: "",
        accDateStart: "",
        accDateEnd: "",
        filingAgency: "",
        idCardNo: "",
        endCaseDateStart: "",
        endCaseDateEnd: "",
        rgtDateStart: "",
        rgtDateEnd: "",
        policyNo: ""
      },
      userStatusList: [
        {
          value: "120",
          name: "有效"
        },
        {
          value: "20",
          name: "无效"
        }
      ],
      operatorList: [],
      activeName: ["1", "2"],
      labelPosition: "right",
      currentPage: 1,
      currentPage1: 1,
      tableData: [
      ],
      pagesize: 10,
      currpage: 1,
      total: 0,
      currentRow: "",
      menugrpcode: ""
    };
  },
  inject: ["reload"],
  created() {
    // 放开注释
    this.getOperator();
  },
  mounted() {},
  methods: {
    getOperator() {
      post(service.comGradeQuery, {
        bodys: {}
      }).then(res => {
        if (res.data.header.code === "200") {
          this.mngcomList = res.data.bodys;
        }
      });
    },
    toAdd(row) {
      this.bigRow = row;
    },
    comfirm() {
      if(this.bigRow.usercode === undefined || null || ""){
        this.$message.error("请选择指定分配用户！")
      }else{
         this.$router.push({
        name: "Task",
        query: { usercode: this.bigRow.usercode,B:this.$route.query.B }
      });
      }
     
    },
    goBack() {
      // this.$router.go(-1);
      this.$router.push({
        name: "Task",
        query: { A: "1" ,B:this.$route.query.B}
      });
    },
    initTable: function() {
      this.currentPage=1;
      this.currentPage1=1;
      // 放开注释
      post(service.userlist, {
        bodys: this.form
      }).then(res => {
        if (res.data.header.code === "200") {
          this.tableData = res.data.bodys;
          this.total = res.data.bodys.length;
        }
      });
    },

 

   
    currentChange: function(page) {
      this.currentPage = page;
      // this.tableList();
    },
    indexMethod(index) {
      return index + 1 + (this.currentPage - 1) * 10;
    }
  }
};
</script>
<style lang="less" scoped>
.findUser {
  margin: 10px;
  .header {
    background-color: #0673ff;
    height: 50px;
    line-height: 50px;
    border-radius: 25px 25px 0 0;
    padding: 0 30px;
    overflow: hidden;
    color: #fff;
    font-size: 20px;
    font-family: Source Han Sans CN;
    i {
      font-size: 30px;
      float: right;
      margin-top: 19px;
    }
  }
  .el-form {
    background-color: #fff;
  }
  .work_queue {
    position: relative;
    margin-top: 21px;
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
  .work_table {
    margin-bottom: 21px;
    background-color: #fff;
    padding: 20px 8px;
    .el-form-item__content {
      margin-left: 0 !important;
    }
  }
  .block {
    background-color: #fff;
    height: 80px;
    padding-top: 20px;
    box-sizing: border-box;
  }
  .img_style {
    width: 27px;
    height: 22px;
  }
}
</style>
<style lang="less">
.findUser {
  .el-row {
    // padding-top: 20px;
    &:first-child {
      padding-top: 20px;
    }
    &:last-child {
      padding-top: 0;
      margin-bottom: 0;
    }
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
}
.findUser {
  //   .el-input {
  //     width: 80% !important;
  //   }
  .date_style {
    .el-input {
      width: 46% !important;
    }
  }

  .el-select {
    width: 100% !important;
    .el-input {
      width: 100% !important;
    }
  }
  .el-collapse-item__arrow {
    display: none;
  }
  .el-collapse-item__header {
    background-color: #0673ff;
    height: 30px;
    line-height: 30px;
    border-radius: 10px 10px 0 0;
    padding: 0 15px;
    overflow: hidden;
    color: #fff;
    font-size: 16px;
    font-family: Source Han Sans CN;
  }
  .el-collapse-item__content {
    padding-bottom: 17px;
  }
  .el-table--striped .el-table__body tr.el-table__row--striped.current-row td,
  .el-table__body tr.current-row > td,
  .el-table__body tr.hover-row.current-row > td,
  .el-table__body tr.hover-row.el-table__row--striped.current-row > td,
  .el-table__body tr.hover-row.el-table__row--striped > td,
  .el-table__body tr.hover-row > td {
    background-color: #409eff;
  }
}
</style>
