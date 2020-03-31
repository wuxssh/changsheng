<template>
  <div class="reportInquirys">
    <!-- 报案查询 -->
    <!-- 工作队列 -->
    <div class="work_queue">
      <!-- <img src="../../assets/images/report/tab_btn@1x.png" alt=""> -->
      <span>保单信息查询</span>
      <div class="box"></div>
    </div>
    <el-table
      :default-sort="{prop: 'initinqdate', order: 'descending'}"
      :data="continfo.slice((currpage1 - 1) * pagesize1, currpage1 * pagesize1)"
      class="tables"
      style="width: 100%;height:100%;"
    >
      <el-table-column type="index" width="50" label="序号" :index="indexMethod"></el-table-column>
      <el-table-column align="center" prop="contno" label="保单号"></el-table-column>
      <el-table-column prop="appntname" label="投保人姓名" align="center"></el-table-column>
      <el-table-column prop="insuredname" label="被保人姓名" align="center"></el-table-column>
      <!-- <el-table-column align="center" prop="dutyname" label="保单责任" width="170"></el-table-column> -->
      <!-- <el-table-column align="center" prop="riskname" label="保单险种"></el-table-column> -->
      <el-table-column align="center" prop="cvalidate" label="生效日期"></el-table-column>
      <el-table-column align="center" prop="enddate" label="保单到期日"></el-table-column>
      <!-- <el-table-column align="center" prop="amnt" label="保额"></el-table-column> -->
    </el-table>
    <div style="margin-top:10px;">
      <el-pagination
        background
        @size-change="handleSizeChange1"
        @current-change="handleCurrentChange1"
        :page-size="pagesize1"
        layout="prev, pager, next,jumper"
        :total="continfo.length"
      ></el-pagination>
    </div>
    <div class="work_queue">
      <!-- <img src="../../assets/images/report/tab_btn@1x.png" alt=""> -->
      <span>赔案信息</span>
      <div class="box"></div>
    </div>
    <el-table
      :default-sort="{prop: 'initinqdate', order: 'descending'}"
      :data="caseinfo"
      class="tables"
      style="width: 100%;height:100%;"
    >
      <el-table-column type="index" width="50" label="序号"></el-table-column>
      <el-table-column align="center" prop="rgtno" label="理赔号"></el-table-column>
      <el-table-column align="center" prop="customename" label="客户姓名"></el-table-column>
      <el-table-column align="center" prop="clmstate" label="状态"></el-table-column>
      <el-table-column align="center" prop="accidentdate" label="出险日期"></el-table-column>
      <el-table-column align="center" prop="accidenttype" label="出险类型"></el-table-column>
      <el-table-column align="center" prop="dieasetype" label="疾病诊断"></el-table-column>
      <!-- <el-table-column align="center" prop="inqdesc" label="调查描述"></el-table-column> -->
    </el-table>
    <div v-show="this.inqdoneinfo.length != 0">
      <div class="work_queue" style="margin-top: 15px;">
        <span>该赔案已完成的调查列表</span>
        <div class="box"></div>
      </div>
      <el-table
        :default-sort="{prop: 'initinqdate', order: 'descending'}"
        :data="inqdoneinfo.slice((currpage3 - 1) * pagesize3, currpage3 * pagesize3)"
        style="width: 100%"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <div class="grid-content">
              <el-form class="itemForm">
                <div v-for="(item,index) in props.row.inqdetail" :key="index">
                  <el-row class="firstItem">
                    <el-col :span="6">
                      <el-form-item label="调查地点">
                        <el-input v-model="item.inqplace" disabled></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="调查要点">
                        <el-select multiple collapse-tags v-model="item.pointlist">
                          <el-option
                            disabled
                            v-for="(val,index) in item.pointlist"
                            :key="index"
                            :label="val.inqpointname"
                            :value="val.inqpoint"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="调查描述" v-show="props.row.inqdesc">
                      <el-input
                        disabled
                        type="textarea"
                        resize="none"
                        v-model="props.row.inqdesc"
                        :rows="4"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </template>
        </el-table-column>
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column prop="rgtno" label="理赔号" align="center" width="200"></el-table-column>
        <el-table-column prop="contno" label="保单号" align="center" width="200"></el-table-column>
        <el-table-column prop="insurename" label="被保险人姓名" align="center" width="150"></el-table-column>
        <el-table-column prop="accidentname" label="出险类型" align="center" width="200"></el-table-column>
        <el-table-column prop="inqrname" label="调查原因" align="center" width="200"></el-table-column>
        <el-table-column prop="caseflag" label="案件标识" align="center" width="200"></el-table-column>
        <el-table-column prop="inqdepth" label="调查深度" align="center" width="200"></el-table-column>
        <el-table-column prop="trustInq" label="是否委托调查" align="center" width="200"></el-table-column>
        <el-table-column prop="initinqdate" label="提调日期" align="center" width="200"></el-table-column>
        <el-table-column prop="inqstate" label="调查状态" align="center" width="200"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="lookPDF(scope.row,scope.$index)">预览</el-button>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="noticestatus" label="" align="center" ></el-table-column> -->
      </el-table>
      <div style="margin-top:10px;">
        <el-pagination
          background
          @size-change="handleSizeChange3"
          @current-change="handleCurrentChange3"
          :page-size="pagesize3"
          layout="prev, pager, next,jumper"
          :total="inqdoneinfo.length"
        ></el-pagination>
      </div>
    </div>
    <div>
      <div class="work_queue" style="margin-top: 15px;">
        <span>该赔案待处理的调查列表</span>
        <div class="box"></div>
      </div>
      <el-table :data="inqloadinfo" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <div class="grid-content">
              <el-form class="itemForm">
                <div v-for="(item,index) in props.row.inqdetail" :key="index">
                  <el-row class="firstItem">
                    <el-col :span="6">
                      <el-form-item label="调查地点">
                        <el-input v-model="item.inqplace" disabled></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="调查要点">
                        <el-select multiple collapse-tags v-model="item.pointlist">
                          <el-option
                            disabled
                            v-for="(val,index) in item.pointlist"
                            :key="index"
                            :label="val.inqpointname"
                            :value="val.inqpoint"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="调查描述" v-show="props.row.inqdesc">
                      <el-input
                        disabled
                        type="textarea"
                        resize="none"
                        v-model="props.row.inqdesc"
                        :rows="4"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </template>
        </el-table-column>
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column prop="rgtno" label="理赔号" align="center" width="200"></el-table-column>
        <el-table-column prop="contno" label="保单号" align="center" width="200"></el-table-column>
        <el-table-column prop="insurename" label="被保险人姓名" align="center" width="150"></el-table-column>
        <el-table-column prop="accidentname" label="出险类型" align="center" width="200"></el-table-column>
        <el-table-column prop="inqrname" label="调查原因" align="center" width="200"></el-table-column>
        <el-table-column prop="caseflag" label="案件标识" align="center" width="200"></el-table-column>
        <el-table-column prop="inqdepth" label="调查深度" align="center" width="200"></el-table-column>
        <el-table-column prop="trustInq" label="是否委托调查" align="center" width="200"></el-table-column>
        <el-table-column prop="initinqdate" label="提调日期" align="center" width="200"></el-table-column>
        <el-table-column prop="inqstate" label="调查状态" align="center" width="200"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="lookPDF(scope.row,scope.$index)">预览</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="work_queue" style="margin-top: 15px;">
      <!-- <img src="../../assets/images/report/tab_btn@1x.png" alt=""> -->
      <span>提起调查意见</span>
      <div class="box"></div>
    </div>
    <el-form class="formContent">
      <div class="grid-content">
        <el-row class="survey_select">
          <el-col :span="8">
            <span class="redStar">&nbsp*&nbsp</span>
            <el-form-item label="意见">
              <el-select v-model="confirmArray.inqidea" placeholder="请选择">
                <el-option
                  v-for="item in opinion"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="survey_select">
          <el-col :span="24">
            <div class="grid-content" v-if="confirmArray.inqidea != '02'">
              <el-form-item label="意见说明">
                <el-input
                  type="textarea"
                  v-model="confirmArray.inqideadesc"
                  :rows="6"
                  resize="none"
                  maxlength="700"
                  show-word-limit
                ></el-input>
              </el-form-item>
            </div>
            <div class="grid-content" v-else>
              <span class="redStar">&nbsp*&nbsp</span>
              <el-form-item label="意见说明">
                <el-input
                  type="textarea"
                  v-model="confirmArray.inqideadesc"
                  :rows="6"
                  resize="none"
                  maxlength="700"
                  show-word-limit
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="footBtnAll">
        <el-button class="elButton" type="primary" size="small" round @click="confirmBtn()">确定</el-button>
        <el-button class="elButton" type="primary" size="small" round @click="toInitImg()">影像查询</el-button>
        <el-button class="elButton" type="primary" size="small" round @click="goBack()">返回</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
import axios from "axios";
// import Banners from "@/components/Banners";
import { IDType } from "../../utils/service.js";
import { post, service } from "../../utils/request.js";
export default {
  name: "diplomaticnoteDetail",
  // components: {
  //   Banners
  // },
  data() {
    return {
      claimQueryList: [], // 审批列表
      pagesize1: 10,
      pagesize3: 10,
      currpage1: 1,
      currpage3: 1,
      labelPosition: "right",
      className: "工作队列",
      head_pic: require("../../assets/images/eapproval/gold.png"),
      examineArray: [], // 调查对列
      peiDiaoList: [],
      typeStatus: null,
      anJianList: [],
      opinion: [
        {
          value: "01",
          label: "同意"
        },
        {
          value: "02",
          label: "回退"
        }
      ],

      caseinfo: [],
      continfo: [],
      inqdoneinfo: [],
      inqloadinfo: [],
      inqdetail: [],
      confirmArray: {
        inqidea: "",
        inqideadesc: "",
        // inqinfo: [{ inqno: "" }],
        inqinfo: [],
        rgtno: "",
        comcode: "",
        agentcode: ""
      },
      applyDesc: "",
      resultcode: ""
    };
  },
  created() {
    this.clmno = this.$route.query.clmno;
    this.rgtno = this.$route.query.rgtno;
    this.claimQuery();
  },
  methods: {
    //  照会预览
    lookPDF(row, index) {
      console.log("AAA",row)
      post(service.noticepdfprint, {
        rgtno: row.contno,
        noticeno: row.inqno,
        printtype:"02"
      }).then(res => {
        this.pdfList = res.data.pdflist;
        console.log("ddddddddd", this.pdfList);
        if (this.pdfList) {
          window.open(this.pdfList[0].pdfurl, "_blank");
        } else {
          this.$message.error("未查询到调查预览pdf路径！");
        }
      });
    },
    // 影像查询
    toInitImg() {
      let routeUrl = this.$router.resolve({
        name: "initImg",
        query: {
          rgtno: JSON.parse(this.$route.params.dataOfTable).clmno
        }
      });
      window.open(routeUrl.href, "_blank");
    },
    goBack() {
      this.$router.go(-1);
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
    // 保单信息查询
    claimQuery() {
      post(service.inqauditquery, {
        bodys: {
          rgtno: JSON.parse(this.$route.params.dataOfTable).clmno,
          inqno: JSON.parse(this.$route.params.dataOfTable).inqno
        }
      }).then(result => {
        this.caseinfo = result.data.bodys.caseinfo; // 赔案信息
        this.continfo = result.data.bodys.continfo; // 保单信息
        this.inqdoneinfo = result.data.bodys.inqdoneinfo; // 赔案已完成的调查信息
        this.inqloadinfo = result.data.bodys.inqloadinfo; // 赔案未完成  待审批的调查信息
        result.data.bodys.inqloadinfo.forEach(item => {
          this.confirmArray.inqinfo.push(
            Object.assign({}, item, { inqno: item.inqno })
          );
        });
      });
    },
    // expand(row, expandedRows) {
    //   console.log("展开", row);
    //   this.confirmArray.rgtno = row.rgtno;
    //   this.confirmArray.inqno = row.inqno;
    // },
    // 单击选中一条未完成的信息
    // toChooseItem(row) {
    //   this.inqnoss = row.inqno;
    //   console.log("1111111", row.inqno);
    // },
    // 审核校验   WorkQueryInqAuditCheck
    confirmBtn() {
      //  校验
      if (!this.confirmArray.inqidea) {
        this.$message.error("请选择意见");
        return;
      }
      if (this.confirmArray.inqidea == "02") {
        if (!this.confirmArray.inqideadesc) {
          this.$message.error("请填写意见说明！");
          return;
        }
      }
      post(service.WorkQueryInqAuditCheck, {
        bodys: {
          rgtno: this.inqloadinfo[0].rgtno,
          inqinfo: this.confirmArray.inqinfo,
          // { inqno: this.inqloadinfo[1].inqno }
          inqidea: this.confirmArray.inqidea,
          inqideadesc: this.confirmArray.inqideadesc || "",
          comcode: localStorage.getItem("comCode"),
          agentcode: localStorage.getItem("userCode")
        }
      }).then(res => {
        this.applyDesc = res.data.bodys.resultdesc;
        this.resultcode = res.data.bodys.resultcode;

        if (this.confirmArray.inqidea == "02") {
          post(service.inqAuditInput, {
            bodys: {
              rgtno: this.inqloadinfo[0].rgtno,
              inqinfo: this.confirmArray.inqinfo,
              inqidea: this.confirmArray.inqidea,
              inqideadesc: this.confirmArray.inqideadesc || "",
              comcode: localStorage.getItem("comCode"),
              agentcode: localStorage.getItem("userCode")
            }
          }).then(res => {
            this.$message({
              type: "success",
              message: "操作成功!"
            });
            this.$router.go(-1);
          });
        }
        if (this.confirmArray.inqidea == "01") {
          if (this.resultcode == "200") {
            post(service.inqAuditInput, {
              bodys: {
                rgtno: this.inqloadinfo[0].rgtno,
                inqinfo: this.confirmArray.inqinfo,
                // { inqno: this.inqloadinfo[1].inqno }
                inqidea: this.confirmArray.inqidea,
                inqideadesc: this.confirmArray.inqideadesc || "",
                comcode: localStorage.getItem("comCode"),
                agentcode: localStorage.getItem("userCode")
              }
            }).then(res => {
              this.$message({
                type: "success",
                message: "操作成功!"
              });
              this.$router.go(-1);
            });
          } else {
            this.$confirm("该客户已存在未结束的调查，是否继续？", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
              .then(() => {
                post(service.inqAuditInput, {
                  bodys: {
                    rgtno: this.inqloadinfo[0].rgtno,
                    inqinfo: this.confirmArray.inqinfo,
                    inqidea: this.confirmArray.inqidea,
                    inqideadesc: this.confirmArray.inqideadesc || "",
                    comcode: localStorage.getItem("comCode"),
                    agentcode: localStorage.getItem("userCode")
                  }
                }).then(res => {
                  this.$message({
                    type: "success",
                    message: "操作成功!"
                  });
                  this.$router.go(-1);
                });
              })
              .catch(() => {
                this.$message({
                  type: "info",
                  message: "已取消该操作"
                });
              });
          }
        }
      });
    },
    // 确定按钮
    confirmBtns() {
      //   this.confirmArray.comcode = localStorage.getItem("comCode");
      //   this.confirmArray.agentcode = localStorage.getItem("userCode");
      if (!this.confirmArray.inqidea) {
        this.$message.error("请选择意见");
        return;
      }
      if (this.confirmArray.inqidea == "02") {
        if (!this.confirmArray.inqideadesc) {
          this.$message.error("请填写意见说明！");
          return;
        }
      }
      post(service.inqAuditInput, {
        bodys: {
          rgtno: this.inqloadinfo[0].rgtno,
          inqinfo: this.confirmArray.inqinfo,
          // { inqno: this.inqloadinfo[1].inqno }
          // inqidea: this.confirmArray.inqidea,
          // inqideadesc: this.confirmArray.inqideadesc || "",
          comcode: localStorage.getItem("comCode"),
          agentcode: localStorage.getItem("userCode")
        }
      }).then(res => {
        this.$message({
          message: "操作成功！",
          type: "success"
        });
        // this.claimQuery()
        this.$router.push({ name: "InvestigationIndex" });
      });
    },
    // ToGetCotnos(rows) {
    //   this.checkList = rows;
    // },

    handleSizeChange1(val) {
      this.pagesize1 = val;
    },
    handleSizeChange3(val) {
      this.pagesize3 = val;
    },
    handleCurrentChange1(val) {
      this.currpage1 = val;
    },
    handleCurrentChange3(val) {
      this.currpage3 = val;
    },
    dateFormat: function(row, column) {
      var t = new Date(row.rptDate);
      return t.getFullYear() + "-" + (t.getMonth() + 1) + "-" + t.getDate();
    },
    dateFormat1: function(row, column) {
      var t = new Date(row.accdentDate);
      return t.getFullYear() + "-" + (t.getMonth() + 1) + "-" + t.getDate();
    },
    tableList() {
      this.displayData = [];
      for (
        var j = this.total * (this.currentPage - 1);
        j < this.total * this.currentPage;
        j++
      ) {
        if (this.list[j]) {
          this.displayData.push(this.list[j]);
        }
      }
    },
    currentChange: function(page) {
      this.currentPage = page;
      this.tableList();
    },
    indexMethod(index) {
      return index + 1 + (this.currpage1 - 1) * 10;
    }
  }
};
</script>
<style scoped lang="less">
.itemForm {
  /deep/.el-form-item__label {
    float: none;
  }
  /deep/.el-select{
    width: 100%;
  }
}
.formContent {
  background: #fff;
}
.footBtnAll {
  padding-top: 10px;
  padding-bottom: 20px;
  margin-left: 30px;
}
.surveyForm {
  margin-top: 30px;
  .el-row {
    margin-bottom: 0;
  }
  .el-form-item {
    margin-bottom: 0;
  }
}
/deep/.el-table__expanded-cell {
  padding: 10px 0 0 40px !important;
}
.firstItem {
  margin-bottom: 0 !important;
  padding-top: 0 !important;
}
.itemForm {
  .el-form-item {
    margin-bottom: 10px;
    margin-left: 20px;
  }
  /deep/.el-row {
    text-align: left !important;
  }
}
.survey_select {
  // margin-top: 20px;
  padding: 20px 30px 0 30px;
  margin-bottom: 0 !important;
}
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

.reportInquirys {
  margin: 20px;
  .elButton {
    margin: 0 !important;
    padding: 13px 30px;
  }
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
}
</style>