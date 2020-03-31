<template>
  <div class="secondary">
    <div class="work_queue">
      <!-- <img src="../../assets/images/report/tab_btn@1x.png" alt=""> -->
      <span>保单信息查询</span>
      <div class="box"></div>
    </div>
    <el-table
      :data="tableData.slice((currpage2 - 1) * pagesize2, currpage2 * pagesize2)"
      tooltip-effect="dark"
      style="width: 100%"
      highlight-current-row
      @row-click="ToGetCotno"
      @selection-change="toChangeContno"
      @select-all="toGetAllContno"
      :row-key="getRowKeys"
    >
      <el-table-column label="序号" width="55" type="index" :index="indexMethod2" align="center"></el-table-column>
      <el-table-column prop="contno" label="保单号" align="center"></el-table-column>
      <el-table-column prop="appntname" label="投保人姓名" align="center"></el-table-column>
      <el-table-column prop="insuredname" label="被保人姓名" align="center"></el-table-column>
      <el-table-column prop="cvalidate" label="生效日期" align="center"></el-table-column>
      <el-table-column prop="enddate" label="保单到期日" align="center"></el-table-column>
      <el-table-column prop="newuwdecision" label="核保决定" align="center"></el-table-column>
    </el-table>
    <div style="margin:10px 0;">
      <el-pagination
        background
        @size-change="handleSizeChange2"
        @current-change="handleCurrentChange2"
        :page-size="pagesize2"
        layout="prev, pager, next,jumper"
        :total="tableData.length"
      ></el-pagination>
    </div>
    <el-form>
      <div style="background-color:#fff;padding:20px 28px 0 29px;">
        <div v-if="isuwidea">
          <p style="margin-bottom:5px;margin-top:0">核保决定说明</p>
          <el-input
            disabled
            type="textarea"
            v-model="uwidea"
            :autosize="{ minRows: 8}"
            maxlength="700"
            show-word-limit
            resize="none"
          ></el-input>
        </div>
        <p style="margin-bottom:5px;margin-top:15px;">事故经过</p>
        <el-input
          type="textarea"
          v-model="accident"
          :autosize="{ minRows: 8}"
          maxlength="700"
          show-word-limit
          resize="none"
          disabled
        ></el-input>
        <p style="margin-bottom:5px;">伤病诊断</p>
        <el-input
          type="textarea"
          v-model="diagnose"
          :autosize="{ minRows: 8}"
          maxlength="700"
          show-word-limit
          resize="none"
          disabled
        ></el-input>
        <div class="toshowContent">
          <p style="margin-bottom:5px;">投保前异常情况</p>
          <el-form-item prop="abnormals">
            <el-input
              disabled
              type="textarea"
              v-model="aor"
              :autosize="{ minRows: 8}"
              maxlength="700"
              resize="none"
              show-word-limit
            ></el-input>
          </el-form-item>
          <div v-if="secondinfoTrue == false" style="padding-bottom:10px"></div>
          <div v-if="secondinfoTrue == true" style="background-color:#fff;" prop="type">
            <el-checkbox-group v-model="secondinfo" disabled>
              <el-checkbox
                class="checkItem"
                v-for="(item) in checkItem"
                :key="item.id"
                :label="item.id"
              >{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </div>
          <p style="margin-bottom:5px;margin-top:5px;">补充意见</p>
          <el-input
            style="margin-bottom:20px;"
            type="textarea"
            v-model="ideaexplain"
            :autosize="{ minRows: 8}"
            maxlength="700"
            show-word-limit
            resize="none"
            disabled
          ></el-input>
        </div>
      </div>
    </el-form>
    <div v-if="isshowLiPei">
      <div class="work_queue work_queued">
        <span>历史核保意见</span>
        <div class="box"></div>
      </div>
      <el-table
        :data="heBaoData.slice((currpage1 - 1) * pagesize1, currpage1 * pagesize1)"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <div>
              <p style="padding:0 0 10px 0;margin:0;">核保意见</p>
              <el-input disabled type="textarea" resize="none" v-model="props.row.uwidea" :rows="9"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="序号" type="index" width="60" :index="indexMethod1" align="center"></el-table-column>
        <el-table-column prop="repliercode" label="回复人工号" align="center"></el-table-column>
        <el-table-column prop="repliername" label="回复人姓名" align="center"></el-table-column>
        <el-table-column prop="uwidea" label="核保意见" align="center" class-name="uwideaContent"></el-table-column>
        <el-table-column prop="repliertime" label="回复时间" align="center"></el-table-column>
      </el-table>
      <div style="margin-top:10px;">
        <el-pagination
          background
          @size-change="handleSizeChange1"
          @current-change="handleCurrentChange1"
          :page-size="pagesize1"
          layout="prev, pager, next,jumper"
          :total="heBaoData.length"
        ></el-pagination>
      </div>
    </div>
    <div>
      <div class="work_queue work_queued">
        <span>理赔回退意见</span>
        <div class="box"></div>
      </div>
      <el-table
        :data="liPeiData.slice((currpage - 1) * pagesize, currpage * pagesize)"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <div>
              <p style="padding:0 0 10px 0;margin:0;">理赔意见</p>
              <el-input
                disabled
                type="textarea"
                resize="none"
                v-model="props.row.claimopinion"
                :rows="9"
              ></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="序号" type="index" width="60" align="center" :index="indexMethod"></el-table-column>
        <el-table-column prop="operatorcode" label="处理人工号" align="center"></el-table-column>
        <el-table-column prop="operatorname" label="处理人姓名" align="center"></el-table-column>
        <el-table-column prop="claimopinion" label="理赔意见" align="center" class-name="uwideaContent"></el-table-column>
        <el-table-column prop="operatortime" label="处理时间" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="deleteLiPei(scope.row,scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="padding-top:10px;background:#fff">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="pagesize"
          layout="prev, pager, next,jumper"
          :total="liPeiData.length"
        ></el-pagination>
      </div>
      <div style="padding:20px 30px;; background:#fff">
        <p style="margin:0;padding-bottom:10px">意见说明</p>
        <el-input
          type="textarea"
          placeholder="请输入内容"
          v-model="claimopinion"
          :autosize="{ minRows: 8}"
          maxlength="700"
          resize="none"
          show-word-limit
        ></el-input>
        <div class="addLiPei">
          <el-button class="elButton" type="primary" @click="addLiPei">添加</el-button>
          <!-- <el-button class="elButton" type="primary" @click="deleteLiPei">删除</el-button> -->
        </div>
      </div>
    </div>
    <div class="footBtnAll">
      <el-button class="elButton" type="primary" @click="acceptconclusion">接受</el-button>
      <el-button class="elButton" type="primary" @click="verifyreturnunderwriting">返回核保</el-button>
      <el-button class="elButton" type="primary" @click="toInitImg()">影像查询</el-button>
      <el-button class="elButton" type="primary" @click="goBack()">返回</el-button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { post, service } from "../../utils/request.js";
import { getDate, getTime } from "../../utils/common.js";
export default {
  data() {
    return {
      uwidea: "",
      pagesize: 10,
      currpage: 1,
      pagesize2: 5,
      currpage2: 1,
      pagesize1: 10,
      currpage1: 1,
      isshowLiPei: false, // 是否显示理赔意见/核保意见
      isuwidea: false, // 核保决定说明
      caseNo: "",
      customerno: "",
      accident: "",
      diagnose: "",
      aor: "",
      ideaexplain: "",
      polnoa: [],
      polnoss: [],
      tableData: [],
      liPeiData: [],
      heBaoData: [],
      claimopinion: "", // 理赔意见
      addOpinion: "", // 补充意见
      checkItem: [
        {
          id: "01",
          name: "请重新评估合同风险"
        },
        {
          id: "02",
          name: "请重新评估附加合同风险"
        },
        {
          id: "03",
          name: "请重新评估被保人职业等级"
        },
        {
          id: "04",
          name: "请告知相应健告模块"
        }
      ],
      resolveList: [
        {
          id: "01",
          name: "维持原决定"
        },
        {
          id: "02",
          name: "异常"
        }
      ],
      standbyflag1: "",
      form: {
        inqidea: "",
        inqideadesc: ""
      },
      secondinfo: [],
      secondinfoTrue: true,
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
      resultCode: "",
      polno: ""
    };
  },
  created() {
    this.clmno = this.$route.query.clmno;
    this.rgtno = this.$route.query.rgtno;
    this.contno = this.$route.query.contno;
    this.accidenttype = this.$route.query.accidenttype;
    this.customerno = this.$route.query.customerno;
    this.getTwoNuclear(); // 保单信息
    this.getTwoAccident(); // 事故经过
    this.getTwoDiagnose(); // 伤病诊断
    this.getsecondabnormal(); // 二核内容
    this.getApprovalabnormal(); // 异常情况
    this.getClaimopinion(); // 理赔意见
  },
  methods: {
    ToGetCotno(row) {
      this.polno = row.contno;
      this.isshowLiPei = true;
      this.isuwidea = true;
      this.uwidea = row.uwidea;

      this.getUwopinion(); // 核保意见
    },
    toChangeContno(selection) {
      this.polnoss = selection;
      this.polnoa = [];
    },
    toGetAllContno(selection) {
      this.polnoss = selection;
    },
    getRowKeys(row) {
      return row.contno;
    },
    // 二核审批保单信息查询
    getTwoNuclear() {
      post(service.policypending, {
        bodys: {
          caseno: JSON.parse(this.$route.params.dataOfTable).rgtno,
          secondno: JSON.parse(this.$route.params.dataOfTable).secondno
        }
      }).then(res => {
        if (res.data.header.code === "200") {
          this.tableData = res.data.bodys;
          res.data.bodys.forEach(item => {
            if (item.uwdecision === "01") {
              item.newuwdecision = "维持原决定";
            } else if (item.uwdecision === "02") {
              item.newuwdecision = "异常";
            }
          });
          if (this.tableData == "") {
            this.$router.go(-1);
          }
        }
      });
    },
    // 待审批 事故经过
    getTwoAccident() {
      post(service.accidentaduit, {
        bodys: {
          rgtno: JSON.parse(this.$route.params.dataOfTable).rgtno,
          accidenttype: JSON.parse(this.$route.params.dataOfTable).accidenttype
        }
      }).then(res => {
        if (res.data.header.code === "200") {
          this.accident = res.data.bodys.accident;
        }
      });
    },
    // 待审批 伤病诊断
    getTwoDiagnose() {
      post(service.diagnose, {
        bodys: {
          clmno: JSON.parse(this.$route.params.dataOfTable).rgtno
        }
      }).then(res => {
        if (res.data.header.success === true) {
          if (res.data.bodys) {
            res.data.bodys.forEach(item => {
              this.diagnose += item.diagcode + "，";
            });
            this.diagnose = this.diagnose.substring(
              0,
              this.diagnose.length - 1
            );
          }
        }
      });
    },
    // 待审批 投保前异常情况
    getApprovalabnormal() {
      post(service.abnormaladuit, {
        bodys: {
          clmno: JSON.parse(this.$route.params.dataOfTable).rgtno,
          secondno: JSON.parse(this.$route.params.dataOfTable).secondno
        }
      }).then(res => {
        if (res.data.header.code === "200") {
          this.aor = res.data.bodys.aor;
          this.ideaexplain = res.data.bodys.ideaexplain;
        }
      });
    },
    // 待审批 二核内容
    getsecondabnormal() {
      post(service.secondaduit, {
        bodys: {
          clmno: JSON.parse(this.$route.params.dataOfTable).rgtno,
          secondno: JSON.parse(this.$route.params.dataOfTable).secondno
        }
      }).then(res => {
        if (res.data.header.code === "200") {
          this.secondinfo = res.data.bodys.secondinfos;
          console.log("AAA", this.secondinfo.length);
          if (!this.secondinfo) {
            this.secondinfoTrue = false;
          }
        }
      });
    },
    // 二核审批 + 校验
    // 校验
    confirmBtn() {
      if (!this.form.inqidea) {
        this.$message.error("请选择意见");
        return;
      }
      if (this.form.inqidea == "01") {
        if (!this.form.inqideadesc) {
          this.$message.error("请填写意见说明！");
          return;
        }
      }
      //  校验
      post(service.secondCheckoutaudit, {
        bodys: {
          polnos: [{ polno: this.polno }],
          clmno: JSON.parse(this.$route.params.dataOfTable).rgtno,
          idea: this.form.inqidea,
          ideaexplain: this.form.inqideadesc || "",
          operator: localStorage.getItem("userCode")
        }
      }).then(res => {
        this.resultCode = res.data.header.code;
        if (this.form.inqidea == "01") {
          if (this.resultCode === "500") {
            this.$confirm("该保单已存在未结束的二核，是否继续？", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
              .then(() => {
                post(service.confirm, {
                  bodys: {
                    polnos: [{ polno: this.polno }],
                    clmno: JSON.parse(this.$route.params.dataOfTable).rgtno,
                    idea: this.form.inqidea,
                    ideaexplain: this.form.inqideadesc || "",
                    operator: localStorage.getItem("userCode")
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
          } else {
            post(service.confirm, {
              bodys: {
                polnos: [{ polno: this.polno }],
                clmno: JSON.parse(this.$route.params.dataOfTable).rgtno,
                idea: this.form.inqidea,
                ideaexplain: this.form.inqideadesc || "",
                operator: localStorage.getItem("userCode")
              }
            }).then(res => {
              this.$message({
                type: "success",
                message: "操作成功!"
              });
              this.$router.go(-1);
            });
          }
        }
        if (this.form.inqidea == "02") {
          post(service.confirm, {
            bodys: {
              polnos: [{ polno: this.polno }],
              clmno: JSON.parse(this.$route.params.dataOfTable).rgtno,
              idea: this.form.inqidea,
              ideaexplain: this.form.inqideadesc || "",
              operator: localStorage.getItem("userCode")
            }
          }).then(res => {
            this.$message({
              type: "success",
              message: "操作成功!"
            });
            this.$router.go(-1);
          });
        }
      });
    },
    // 返回按钮
    goBack() {
      this.$router.go(-1);
    },
    // 历史核保意见
    getUwopinion() {
      post(service.uwopinion, {
        bodys: {
          clmno: JSON.parse(this.$route.params.dataOfTable).rgtno,
          polno: this.polno,
          secondno: JSON.parse(this.$route.params.dataOfTable).secondno
        }
      }).then(res => {
        this.heBaoData = res.data.bodys;
      });
    },
    // 理赔意见
    getClaimopinion() {
      post(service.claimopinion, {
        bodys: {
          clmno: JSON.parse(this.$route.params.dataOfTable).rgtno,
          polno: this.polno,
          secondno: JSON.parse(this.$route.params.dataOfTable).secondno
        }
      }).then(res => {
        console.log("理赔意见查询", res);
        this.liPeiData = res.data.bodys;
      });
    },
    // 二核处理添加理赔意见
    addLiPei() {
      if (!this.claimopinion) {
        this.$message.error("请填写理赔意见！");
        return;
      }
      post(service.createClaimSuggest, {
        bodys: {
          polno: this.polno,
          claimopinion: this.claimopinion,
          clmno: JSON.parse(this.$route.params.dataOfTable).rgtno,
          secondno: JSON.parse(this.$route.params.dataOfTable).secondno,
          operatorcode: localStorage.getItem("userCode"),
          operatorname: localStorage.getItem("userName"),
          operatortime: getDate() + " " + getTime()
        }
      }).then(res => {
        if (res.data.header.code === "200") {
          this.$message.success("添加成功！");
          this.getClaimopinion();
          this.claimopinion = "";
        }
      });
    },
    // 二核处理删除理赔意见
    deleteLiPei(row, index) {
      post(service.deleteClaimSuggest, {
        bodys: {
          clmno: JSON.parse(this.$route.params.dataOfTable).rgtno,
          secondno: JSON.parse(this.$route.params.dataOfTable).secondno,
          polno: this.polno,
          operatorno: row.operatorno
        }
      }).then(res => {
        this.$message({
          message: "删除成功",
          type: "success"
        });
        this.getClaimopinion();
      });
    },
    // 接受按钮
    acceptconclusion() {
      post(service.acceptConclusion, {
        bodys: {
          polnos: [{ polno: this.polno }],
          clmno: JSON.parse(this.$route.params.dataOfTable).rgtno,
          secondno: JSON.parse(this.$route.params.dataOfTable).secondno,
          operator: localStorage.getItem("userCode")
        }
      }).then(res => {
        if (res.data.header.code === "200") {
          this.$message.success("操作成功！");
          this.$router.go(-1);
        }
      });
    },
    // 返回核保校验
    verifyreturnunderwriting() {
      // if (!this.polno) {
      //   this.$message.error("请先选择保单行!");
      //   return;
      // }
      if (this.liPeiData.length < 1) {
        this.$message.error("请填写理赔意见！");
        return;
      }
      post(service.returnUnderwrite, {
        bodys: {
          polnos: [{ polno: this.polno }],
          clmno: JSON.parse(this.$route.params.dataOfTable).rgtno,
          secondno: JSON.parse(this.$route.params.dataOfTable).secondno,
          operator: localStorage.getItem("userCode")
        }
      }).then(res => {
        this.$message.success("操作成功！");
        // this.getTwoNuclear();
        this.$router.go(-1);
      });
      // post(service.verifyreturnunderwriting, {
      //   bodys: {
      //     clmno: JSON.parse(this.$route.params.dataOfTable).rgtno,
      //     secondno: JSON.parse(this.$route.params.dataOfTable).secondno,
      //     polnos: [{ polno: this.polno }],
      //     operator: localStorage.getItem("userCode")
      //   }
      // }).then(res => {
      //   if (
      //     res.data.bodys.noChecked == "" &&
      //     res.data.bodys.checkedPolnos != ""
      //   ) {
      //     post(service.returnUnderwrite, {
      //       bodys: {
      //         polnos: [{ polno: this.polno }],
      //         clmno: JSON.parse(this.$route.params.dataOfTable).rgtno,
      //         secondno: JSON.parse(this.$route.params.dataOfTable).secondno,
      //         operator: localStorage.getItem("userCode")
      //       }
      //     }).then(res => {
      //       this.$message.success("操作成功！");
      //       // this.getTwoNuclear();
      //       this.$router.go(-1);
      //     });
      //   } else {
      //     this.$message.error("请填写理赔意见！");
      //   }
      // });
    },
    // 影像查询
    toInitImg() {
      let routeUrl = this.$router.resolve({
        name: "initImg",
        query: {
          rgtno: JSON.parse(this.$route.params.dataOfTable).rgtno
        }
      });
      window.open(routeUrl.href, "_blank");
    },
    // 分页
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.currpage = val;
    },
    indexMethod(index) {
      return index + 1 + (this.currpage - 1) * 10;
    },
    handleSizeChange1(val) {
      this.pagesize1 = val;
    },
    handleCurrentChange1(val) {
      this.currpage1 = val;
    },
    indexMethod1(index) {
      return index + 1 + (this.currpage1 - 1) * 10;
    },
    handleSizeChange2(val) {
      this.pagesize2 = val;
    },
    handleCurrentChange2(val) {
      this.currpage2 = val;
    },
    indexMethod2(index) {
      return index + 1 + (this.currpage2 - 1) * 5;
    }
  }
};
</script>
<style scoped lang="less">
/deep/.el-input.is-disabled .el-input__inner:focus {
  border-color: transparent;
}
/deep/.el-input.is-disabled .el-input__inner {
  background: #ecf5ff;
  color: #000;
  border-color: transparent;
}
/deep/.el-table__expanded-cell[class*="cell"] {
  padding: 10px 20px;
}

/deep/.uwideaContent .cell {
  white-space: nowrap;
}
.survey_selects {
  // margin-top: 20px;
  padding: 20px 30px 0 30px;
  margin-bottom: 0 !important;
}
.work_queued {
  margin-top: 10px;
}
.formContent {
  background: #fff;
}
.addLiPei {
  padding: 20px 0px;
}
.footBtnAll {
  padding: 20px;
  background: #fff;
  margin-top: 20px;
}
.secondary {
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
}
.checkItem {
  display: block;
  padding-bottom: 20px;
}
</style>