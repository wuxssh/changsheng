<template>
  <div class="exemptionProcess">
    <div class="work_queue">
      <span>提取豁免信息</span>
      <div class="box"></div>
    </div>
    <div style="background-color:#fff;margin-bottom:20px;">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="序号" type="index" width="60" :index="indexMethod" align="center"></el-table-column>
        <el-table-column prop="clmno" label="理赔号" align="center" width="180"></el-table-column>
        <el-table-column prop="polno" label="保单号" align="center" width="180"></el-table-column>
        <el-table-column prop="riskcode" label="险种编码" align="center"></el-table-column>
        <el-table-column prop="dutycode" label="责任编码" align="center"></el-table-column>
        <el-table-column prop="appntname" label="投保人姓名" align="center"></el-table-column>
        <el-table-column prop="appntidtype" label="投保人证件类型" align="center"></el-table-column>
        <el-table-column prop="appntidno" label="投保人证件号码" align="center"></el-table-column>
        <el-table-column prop="insuredname" label="被保人姓名" align="center"></el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="pagesize"
          background
          layout="prev, pager, next, jumper"
          :total="tableData.length"
        ></el-pagination>
      </div>
      <div style="text-align:right;padding:0 20px 20px">
        <el-button type="primary" round>获取豁免信息</el-button>
      </div>
    </div>
    <!-- 立案申请信息 -->
    <el-collapse v-model="activeName">
      <el-collapse-item name="1">
        <template slot="title">
          立案申请信息
          <i
            class="header-icon el-icon-caret-bottom"
            style="margin: 0 8px 0 auto;font-size: 30px;"
          ></i>
        </template>
        <el-form
          class="formData"
          :label-position="labelPosition"
          label-width="120px"
          :model="formData"
          :rules="formDatarules"
          ref="formData"
        >
          <el-row class="twice">
            <el-col :span="8">
              <div class="colItem">
                <el-form-item label="起交日期" prop="getdutykind">
                  <el-input v-model="formData.calcode"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="colItem">
                <el-form-item label="缴费终止日" prop="inpflag">
                  <el-input v-model="formData.calcode"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="colItem">
                <el-form-item label="已缴费次数" prop="stattype">
                  <el-input v-model="formData.calcode"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row class="twice">
            <el-col :span="8">
              <div class="colItem">
                <el-form-item label="每期保费">
                  <el-input v-model="formData.calcode"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="colItem">
                <el-form-item label="累计保费">
                  <el-input v-model="formData.calcode"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="colItem">
                <el-form-item label="交至日期" prop="deadvaliflag">
                  <el-input v-model="formData.calcode"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row class="twice">
            <el-col :span="8">
              <div class="colItem">
                <el-form-item label="缴费间隔">
                  <el-input v-model="formData.calcode"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="colItem">
                <el-form-item label="险种状态" prop="deadvaliflag">
                  <el-input v-model="formData.calcode"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="colItem">
                <el-form-item label="豁免原因">
                   <el-select v-model="formData.calcode" placeholder="请选择" clearable>
                    <el-option
                      v-for="item in exemptreasonList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row class="twice">
            <el-col :span="8">
              <div class="colItem">
                <el-form-item label="免交起期">
                  <el-date-picker
                    v-model="formData.enddate"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                    type="date"
                  ></el-date-picker>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="colItem">
                <el-form-item label="免交止期" prop="deadvaliflag">
                  <el-date-picker
                    v-model="formData.enddate"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                    type="date"
                  >></el-date-picker>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <div>
              <div class="textareaTitle">豁免描述</div>
              <el-input
                class="textareaCenter"
                type="textarea"
                placeholder="请输入豁免描述"
                :rows="6"
                maxlength="700"
                resize="none"
                show-word-limit
              ></el-input>
            </div>
          </el-row>
          <div style="text-align:right;padding:20px;">
            <el-button type="primary" round>保存</el-button>
            <el-button type="primary" round>返回</el-button>
          </div>
        </el-form>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
import axios from "axios";
import { post, service } from "../../utils/request.js";
export default {
  data() {
    return {
      labelPosition: "left",
      activeName: "1",
      // ------------------
      currpage: 1,
      pagesize: 10,
      exemptionForm: [],
      templateRadio: "",
      tableData: [],
      formData: {
        enddate: "",
        stattype: "",
        calcode: ""
      },
      formDatarules: {},
      exemptreasonList:[
        {
          id:"01",
          name:"投保人身故"
        },
        {
          id:"02",
          name:"投保人高残（全残）"
        },
        {
          id:"03",
          name:"被保险人高残（全残）"
        },
        {
          id:"04",
          name:"被保险人身故"
        },
        {
          id:"05",
          name:"被保险人失业"
        },

        {
          id:"06",
          name:"其他"
        }
      ]   
    };
  },
  created() {
    this.caseNo = this.$route.query.clmno;
  },
  mounted() {
    this.initExemption();
  },
  methods: {
    initExemption() {
      post(service.queryExemptInfo, {
        bodys: {
          clmno: this.caseNo
        }
      }).then(res => {
        if (res.data.headers.code === "200") {
          this.tableData = res.data.bodys;
        }
      });
    },
    // 分页
    handleSizeChange(val) {
      this.pagesize = val;
    },
    indexMethod(index) {
      return index + 1 + (this.currpage - 1) * 10;
    },
    handleCurrentChange(val) {
      this.currpage = val;
    }
  }
};
</script>
<style scoped lang="less">
/deep/ .el-input {
  width: 210px !important;
}
.formData {
  margin-top: 30px;
}
.twice {
  max-height: 90px;
  margin-left: 30px;
}
/deep/.el-form-item__label {
  text-align: left;
  // width: 180px !important;
}
/deep/ .el-form-item__content {
  // margin-left: 180px !important;
}
.textareaTitle {
  padding: 0px 30px 10px;
  font-size: 14px;
  margin: 0;
}
.textareaCenter {
  margin: 0 auto;
  text-align: center;
  width: 96%;
  display: block;
}
/deep/ .el-date-editor.el-input {
  width: 100%;
}
/deep/.el-collapse-item__arrow {
  display: none;
}
/deep/.el-collapse-item__header {
  background-color: #0673ff;
  height: 50px;
  line-height: 50px;
  border-radius: 10px 10px 0 0;
  padding: 0 15px;
  overflow: hidden;
  color: #fff;
  font-size: 18px;
  font-family: Source Han Sans CN;
}
/deep/.el-collapse-item__content {
  padding-bottom: 0;
}
.footBtnAll {
  background: #fff;
  //   margin-right: 30px;
  padding: 20px 30px 20px 0;
  text-align: right;
}
.exemptionProcess {
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
      font-size: 16px;
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
  /deep/ .block .el-input {
    width: auto !important;
  }
  .block {
    background-color: #fff;
    height: 60px;
    padding-top: 20px;
    box-sizing: border-box;
  }
  /deep/.el-collapse-item__header {
    font-size: 16px;
  }
}
</style>
<style lang="less">
.exemptionProcess .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
  background-color: #0673ff;
  border-bottom: none;
  border-radius: 8px 8px 0 0;
  color: #fff;
}
.exemptionProcess .el-tabs__header {
  margin: 0;
}

.exemptionProcess .el-tabs--card > .el-tabs__header .el-tabs__item {
  background-color: #fff;
  color: #999999;
}
.exemptionProcess {
  .el-select {
    width: 100%;
  }
  .el-collapse-item__arrow {
    display: none;
  }
  .el-collapse-item__header {
    background-color: #0673ff;
    height: 50px;
    line-height: 50px;
    border-radius: 10px 10px 0 0;
    padding: 0 15px;
    overflow: hidden;
    color: #fff;
    font-size: 16px;
    font-family: Source Han Sans CN;
  }
  .el-collapse-item__content {
    padding-bottom: 0px;
  }
  .el-textarea .el-input__count {
    top: 2px;
  }
}
</style>