<template>
  <div class="sameAccident">
    <div class="work_queue">
      <!-- <img src="../../assets/images/report/tab_btn@1x.png" alt=""> -->
      <span>事件信息</span>
      <div class="box"></div>
    </div>
    <div style="background-color:#fff;margin-bottom:20px;">
      <el-table
        style="width: 100%"
        highlight-current-row
        @row-click="affirm"
        :data="evenInforList.slice((currentPage - 1) * pagesize, currentPage * pagesize)"
      >
        <!-- <el-table-column width="65">
          <template slot-scope="scope">
            <el-radio
              :label="scope.row.name"
              v-model="templateRadio"
              @change.native="getTemplateRow(scope.$index,scope.row)"
            >&nbsp;</el-radio>
          </template>
        </el-table-column>-->
        <el-table-column
          prop="date"
          label="序号"
          type="index"
          align="center"
          width="50"
          :index="indexMethod"
        ></el-table-column>
        <el-table-column prop="accno" label="事件号" width="150" align="center"></el-table-column>
        <el-table-column prop="caseno" label="理赔号" width="150" align="center"></el-table-column>
        <el-table-column prop="customername" label="出险人" width="150" align="center"></el-table-column>
        <el-table-column prop="rgtantname" label="申请人" width="150" align="center"></el-table-column>
        <el-table-column prop="accdate" label="出险日期" width="150" align="center"></el-table-column>
        <el-table-column prop="acctype" label="出险类型" width="150" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.acctype|accidenttype}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="accreason" label="事故原因" width="150" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.accreason|accreasonfilt}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="isresearch" label="是否调查" width="150" align="center">
          <template slot-scope="scope">
            <span v-show="scope.row.isresearch==0">否</span>
            <span v-show="scope.row.isresearch==1">是</span>
          </template>
        </el-table-column>
        <el-table-column prop="accidentcourse" label="疾病诊断" width="150" align="center"></el-table-column>
        <el-table-column prop="applydate" label="申请日期" width="150" align="center"></el-table-column>
        <el-table-column prop="endcasedate" label="结案日期" width="150" align="center"></el-table-column>
        <el-table-column prop="clmstatename" label="案件状态" width="150" align="center"></el-table-column>
        <el-table-column prop="givetype" label="理赔结论" width="150" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.givetype|givetypefilt}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="realpay" label="赔付金额" width="150" align="center"></el-table-column>
      </el-table>
      <div style="margin-top:10px;">
        <el-pagination
          background
          @size-change="currentPage1"
          @current-change="currentChange(currentPage1)"
          :current-page.sync="currentPage1"
          :page-size="10"
          layout="prev, pager, next, jumper"
          :total="evenInforList.length"
        ></el-pagination>
      </div>
      <div style="text-align:right;padding:10px 10px 30px 0;">
        <el-button type="primary" @click="surepost()" round>认定保存</el-button>
        <el-button type="primary" round @click="goBack()">返 回</el-button>
      </div>
    </div>
    <div class="work_queue">
      <!-- <img src="../../assets/images/report/tab_btn@1x.png" alt=""> -->
      <span>相关赔案</span>
      <div class="box"></div>
    </div>
    <el-table
      style="width: 100%"
      :data="getLossCaseList.slice((currentPage2 - 1) * pagesize, currentPage2 * pagesize)"
    >
      <el-table-column
        prop="date"
        label="序号"
        type="index"
        align="center"
        width="50"
        :index="indexMethod2"
      ></el-table-column>
      <el-table-column prop="rgtno" label="理赔号" align="center"></el-table-column>
      <el-table-column prop="customername" label="出险人" align="center"></el-table-column>
      <el-table-column prop="rgtantname" label="申请人" align="center"></el-table-column>
      <el-table-column prop="accdate" label="出险日期" align="center"></el-table-column>
      <el-table-column prop="acctype" label="出险类型" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.accidenttype|accidenttype}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="accidentreason" label="事故原因" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.accidentreason|accreasonfilt}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="是否调查" width="150" align="center">
        <template slot-scope="scope">
          <span v-show="scope.row.isresearch==0">否</span>
          <span v-show="scope.row.isresearch==1">是</span>
        </template>
      </el-table-column>
      <el-table-column prop="clmstate" label="案件状态" align="center"></el-table-column>
    </el-table>
    <div style="margin-top:10px;">
      <el-pagination
        background
        @size-change="currentPage2"
        @current-change="currentChange2(currentPage2)"
        :current-page.sync="currentPage2"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="getLossCaseList.length"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { post, service } from "../../utils/request.js";
export default {
  data() {
    return {
      newClmno: "",
      bigRow: {},
      pagesize: 10,
      currentPage: 1,
      currentPage1: 1,
      currentPage2: 1,
      templateRadio: "",
      currentClmNo: null, // 事件号
      getLossCaseList: [],
      evenInforList: []
    };
  },
  created() {
    this.getLossCase();
    this.getEventList();
  },
  mounted() {},
  methods: {
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },

    currentChange: function(page) {
      this.currentPage = page;
      // this.tableList();
    },
    currentChange2: function(page) {
      this.currentPage2 = page;
      // this.tableList();
    },
    indexMethod(index) {
      return index + 1 + (this.currentPage1 - 1) * 10;
    },
    indexMethod2(index) {
      return index + 1 + (this.currentPage2 - 1) * 10;
    },
    surepost() {
      if (this.currentClmNo) {
        post(service.affirm, {
          bodys: {
            // customerno:JSON.parse(this.$route.params.dataOfTable).customerno,
            rgtno: this.bigRow.caseno,
            currentClmNo: JSON.parse(this.$route.params.dataOfTable).caseno,
            accno: this.bigRow.accno
          }
        }).then(res => {
          if (res.data.headers.code === "200" && res.data.headers.success) {
            // this.getLossCaseList = res.data.bodys
            this.$message.success(res.data.headers.message);
            this.newClmno = res.data.bodys.clmno;
          } else {
            this.$message.error(res.data.headers.message);
          }
        });
      } else {
        this.$message({
          message: "请先选择案件",
          type: "error"
        });
      }
    },
    goBack() {
      if (this.newClmno) {
        var obj = {};
        obj = JSON.parse(this.$route.params.dataOfTable);
        obj["rgtno"] = this.newClmno;
        obj["caseno"] = this.newClmno;
        this.$router.push({
          name: "ReviewInformation",
          params: { dataOfTable: JSON.stringify(obj) }
        });
      } else {
        this.$router.go(-1);
      }
    },
    getEventList() {
      // 获取事件信息
      post(service.evenInfor, {
        bodys: {
          customerno: JSON.parse(this.$route.params.dataOfTable).customerno
        }
      }).then(res => {
        if (res.data.headers.code === "200") {
          // this.$message({
          //     message: res.data.headers.message,
          //     type: "success"
          //   });
          this.evenInforList = res.data.bodys;
        } else if (res.data.headers.code === "500") {
          this.$message({
            message: res.data.headers.message,
            type: "error"
          });
        }
      });
    },
    getLossCase() {
      // 获取事件信息
      debugger;
      post(service.lossCase, {
        bodys: {
          customerno: JSON.parse(this.$route.params.dataOfTable).customerno,
          accno: JSON.parse(this.$route.params.dataOfTable).rgtno.substring(
            0,
            JSON.parse(this.$route.params.dataOfTable).rgtno.length - 2
          )
        }
      }).then(res => {
        if (res.data.headers.code === "200") {
          this.getLossCaseList = res.data.bodys;
        } else if (res.data.headers.code === "500") {
          this.$message({
            message: res.data.headers.message,
            type: "error"
          });
        }
      });
    },
    affirm(row) {
      this.bigRow = row;
      this.currentClmNo = row.accno;
      // post(service.affirm, {
      //   bodys: {
      //   // customerno:JSON.parse(this.$route.params.dataOfTable).customerno,
      //   rgtno:JSON.parse(this.$route.params.dataOfTable).caseno,

      //   }
      // }).then(res => {
      //   if (res.data.headers.code === "200") {
      //     // this.getLossCaseList = res.data.bodys
      //   }
      // });
    }
  }
};
</script>
<style scoped lang="less">
.sameAccident {
  margin: 20px;

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
    height: 80px;
    padding-top: 27px;
    box-sizing: border-box;
  }
}
</style>