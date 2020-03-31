<template>
  <div class="secondary">
    <div class="work_queue">
      <span>保单信息查询</span>
      <div class="box"></div>
    </div>
    <el-table
      :data="tableData.slice((currpage - 1) * pagesize, currpage * pagesize)"
      tooltip-effect="dark"
      style="width: 100%"
      highlight-current-row
      @selection-change="toChangeContno"
      @select-all="toGetAllContno"
      :row-key="getRowKeys"
    >
      <el-table-column
        type="selection"
        width="55"
        :reserve-selection="true"
        prop="contno"
        align="center"
      ></el-table-column>
      <el-table-column label="序号" type="index" width="60" align="center" :index="indexMethod"></el-table-column>
      <el-table-column prop="contno" label="保单号" align="center"></el-table-column>
      <el-table-column prop="appntname" label="投保人姓名" align="center"></el-table-column>
      <el-table-column prop="insuredname" label="出险人姓名" align="center"></el-table-column>
      <el-table-column prop="cvalidate" label="生效日期" align="center"></el-table-column>
      <el-table-column prop="enddate" label="保单到期日" align="center"></el-table-column>
    </el-table>
    <div style="margin:10px 0;">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="pagesize"
        layout="prev, pager, next,jumper"
        :total="tableData.length"
      ></el-pagination>
    </div>
    <el-form>
      <div style="background-color:#fff;padding:20px 28px 0 29px;">
        <p style="margin-bottom:5px;margin-top:0">事故经过</p>
        <el-input
          type="textarea"
          v-model="accident"
          :autosize="{ minRows: 8}"
          maxlength="700"
          resize="none"
          show-word-limit
          disabled
        ></el-input>
        <p style="margin-bottom:5px;">伤病诊断</p>
        <el-input
          type="textarea"
          v-model="diagnose"
          :autosize="{ minRows: 8}"
          maxlength="700"
          resize="none"
          show-word-limit
          disabled
        ></el-input>
        <div>
          <p style="margin-bottom:5px;">
            <span class="redStars">&nbsp*&nbsp</span>投保前异常情况
          </p>
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="abnormal"
            :autosize="{ minRows: 8}"
            maxlength="700"
            resize="none"
            show-word-limit
          ></el-input>
        </div>
      </div>
      <div style="background-color:#fff;padding:31px 28px 0 29px;" prop="type">
        <el-checkbox-group v-model="checkList">
          <el-checkbox
            class="checkItem"
            v-for="(item) in checkItem"
            :key="item.id"
            :label="item.id"
          >{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <div style="text-align:left;padding:10px 10px 30px 30px;background-color:#fff;">
        <div>
          <el-button type="primary" round @click="launchedcheckout">申 请</el-button>
          <el-button type="primary" round @click="goBack()">返 回</el-button>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script>
import axios from "axios";
import { post, service } from "../../utils/request.js";
export default {
  data() {
    return {
      pagesize: 5,
      currpage: 1,
      caseNo: "",
      customerno: "",
      accident: "",
      diagnose: "",
      abnormal: "",
      tableData: [],
      checkList: [],
      polnos: [],
      polnoss: [],
      secondinfos: [],
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
      standbyflag1: "",
      contnoss: "",
      beSureState: "", // 确认标识，
      standbyflag3: "" // 保单保存校验字段
    };
  },
  created() {
    this.clmno = this.$route.query.clmno;
    this.rgtno = this.$route.query.rgtno;
    this.accidenttype = this.$route.query.accidenttype;
    this.customerno = this.$route.query.customerno;
    this.caseno = this.$route.query.caseno;
    this.getTwoNuclear();
    this.getTwoAccident();
    this.getTwoDiagnose();
  },
  methods: {
    // aaaaaaaaaaaaa
    // ToGetCotno(selection, row) {
    //   this.polnos = row.contno;
    //   console.log("yyyyy", row.contno);
    // },
    // ToGetCotno(selection) {
    //   for (var i = 0; i < selection.length; i++) {
    //     this.polnos.push({ polno: selection[i].contno });
    //   }
    //   console.log("www", this.polnos);
    // },
    queryinfo() {
      post(service.queryinfo, {
        bodys: {
          polno: this.contnoss,
          clmno: this.clmno
        }
      }).then(res => {
        if (res.data.bodys) {
          this.abnormal = res.data.bodys.aor;
          this.checkList = res.data.bodys.secondinfos;
        } else {
          this.abnormal = "";
          this.checkList = [];
        }
        console.log("xxxxxxxx", res);
      });
    },
    toChangeContno(selection) {
      this.polnoss = selection;
      // for (var key in this.polnoss) {
      //   this.polnos.push({
      //     polno: this.polnoss[key].contno
      //   });
      // }

      this.polnos = [];
      console.log("aaa", this.polnoss);
      console.log("getAll", this.polnos);
    },
    toGetAllContno(selection) {
      this.polnoss = selection;
      // for (var key in this.polnoss) {
      //   this.polnos.push({
      //     polno: this.polnoss[key].contno
      //   });
      // }
      console.log("aaa", this.polnoss);
      console.log("getAll", this.polnos);
    },
    getRowKeys(row) {
      return row.contno;
    },
    //二核 保单信息查询
    getTwoNuclear() {
      post(service.two, {
        bodys: {
          customerno: this.customerno,
          caseno: this.clmno
        }
      }).then(res => {
        if (res.data.header.code === "200") {
          console.log("保单信息查询", res);
          this.tableData = res.data.bodys;
          this.tableData[1].selected = true;
        }
      });
    },
    //发起二核事故经过
    getTwoAccident() {
      post(service.accident, {
        bodys: {
          rgtno: this.clmno,
          accidenttype: this.accidenttype
        }
      }).then(res => {
        if (res.data.header.code === "200") {
          this.accident = res.data.bodys.accident;
          console.log("事故经过", res);
        }
      });
    },
    //发起二核伤病诊断
    getTwoDiagnose() {
      post(service.diagnose, {
        bodys: {
          clmno: this.clmno
        }
      }).then(res => {
        if (res.data.header.code === "200") {
          console.log("伤病诊断", res);
          // var diagss = res.data.bodys
          // this.diagnose = res.data.bodys.diagcode

          if (res.data.bodys) {
            res.data.bodys.forEach(item => {
              this.diagnose += item.diagcode + "，";
            });
            this.diagnose = this.diagnose.substring(
              0,
              this.diagnose.length - 1
            );
            // var str = str.substring(0, str.length - 1);
          }
        }
      });
    },
    // 二核申请+校验
    launchedcheckout() {
      // if (this.polnoss == "") {
      //   this.$message.error("请选择发起二核的保单！");
      //   return;
      // }
      if (!this.abnormal) {
        this.$message.error("请填写投保前异常情况！");
        return;
      }
      for (var key in this.polnoss) {
        this.polnos.push({
          polno: this.polnoss[key].contno
        });
      }
      var obj = {};
      this.polnos = this.polnos.reduce(function(item, next) {
        obj[next.polno] ? "" : (obj[next.polno] = true && item.push(next));
        return item;
      }, []);
      post(service.launchedcheckout, {
        bodys: {
          customerno: this.customerno
        }
      }).then(res => {
        console.log("保单校验", res);
        if (res.data.header.success === true) {
          post(service.launchedTwoNuclear, {
            bodys: {
              clmno: this.clmno,
              polnos: this.polnos,
              uwstate: "01",
              aor: this.abnormal,
              secondinfos: this.checkList,
              operator: localStorage.getItem("userCode")
            }
          }).then(res => {
            if (res.data.header.code === "200") {
              this.$message({
                type: "success",
                message: "操作成功！"
              });
              this.$router.go(-1);
            }
          });
        } else {
          this.$confirm("该客户已存在未结束的二核，是否继续？", "提示", {
            confirmButtonText: "是",
            cancelButtonText: "否",
            type: "warning"
          })
            .then(res => {
              post(service.launchedTwoNuclear, {
                bodys: {
                  clmno: this.clmno,
                  polnos: this.polnos,
                  uwstate: "01",
                  aor: this.abnormal,
                  secondinfos: this.checkList,
                  operator: localStorage.getItem("userCode")
                }
              }).then(res => {
                this.$message({
                  type: "success",
                  message: "操作成功！"
                });
                if (res.data.header.code === "200") {
                  this.$message({
                    type: "success",
                    message: "操作成功！"
                  });
                  this.$router.go(-1);
                }
              });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消"
              });
            });
        }
      });
    },
    // 返回按钮
    goBack() {
      this.$router.go(-1);
    },
    // 分页
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.currpage = val;
    },
    indexMethod(index) {
      return index + 1 + (this.currpage - 1) * 5;
    }
  }
};
</script>
<style scoped lang="less">
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