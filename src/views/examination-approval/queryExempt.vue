<template>
  <div class="accumulator">
    <div>
      <div class="work_queue">
        <span>待回销的应收信息</span>
        <div class="box"></div>
      </div>
      <div class="work_table">
        <el-table
          :data="tableData.slice((currpage - 1) * pagesize, currpage * pagesize)"
          style="width: 100%"
          highlight-current-row
        >
          <el-table-column label="序号" type="index" width="60" :index="indexMethod" align="center"></el-table-column>
          <el-table-column prop="getdutycode" label="理赔号" align="center"></el-table-column>
          <el-table-column prop="getdutyname" label="保单号" align="center"></el-table-column>
          <el-table-column prop="inpflagname" label="险种编码" align="center"></el-table-column>
          <el-table-column prop="stattypename" label="责任编码" align="center"></el-table-column>
          <el-table-column prop="calcode" label="投保人姓名" align="center"></el-table-column>
          <el-table-column prop="calcode" label="投保人证件类型" align="center"></el-table-column>
          <el-table-column prop="calcode" label="投保人证件号码" align="center"></el-table-column>
          <el-table-column prop="calcode" label="被保人姓名" align="center"></el-table-column>
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
          <div class="footBtnAll">
            <el-button round type="primary">获取豁免信息</el-button>
          </div>
      </div>
    </div>
    <el-collapse v-model="activeName">
      <el-collapse-item name="1">
        <template slot="title">
          豁免记录详细信息
          <i
            class="header-icon el-icon-caret-bottom"
            style="margin: 0 8px 0 auto;font-size: 30px;"
          ></i>
        </template>
        <el-form class="formData" :label-position="labelPosition" label-width="120px" :model="form">
          <el-row class="twice">
            <el-col :span="8">
              <div class="colItem">
                <el-form-item label="起交日期">
                  <el-input v-model="form.rgtno"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="colItem">
                <el-form-item label="缴费终止日">
                  <el-input v-model="form.rgtno"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="colItem">
                <el-form-item label="已交费次数">
                  <el-input v-model="form.rgtno"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row class="twice">
            <el-col :span="8">
              <div class="colItem">
                <el-form-item label="每期保费">
                  <el-input v-model="form.rgtno"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="colItem">
                <el-form-item label="累计保费">
                  <el-input v-model="form.calcode"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="colItem">
                <el-form-item label="缴费间隔">
                  <el-input v-model="form.rgtno"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row class="twice">
            <el-col :span="8">
              <div class="colItem">
                <el-form-item label="险种状态">
                  <el-input v-model="form.rgtno"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="colItem">
                <el-form-item label="豁免原因">
                  <el-input v-model="form.calcode"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="colItem">
                <el-form-item label="免交起期">
                  <el-input v-model="form.rgtno"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>

          <el-row class="twice">
            <el-col :span="8">
              <div class="colItem">
                <el-form-item label="免交止期">
                  <el-input v-model="form.rgtno"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <div>
              <div class="textareaTitle" style="padding-top:0">
                <span class="redStar" style="margin-top:4px;">&nbsp&nbsp</span>豁免描述
              </div>
              <el-input
                class="textareaCenter"
                type="textarea"
                placeholder="请填写回退原因详细说明"
                :rows="6"
                maxlength="700"
                resize="none"
                show-word-limit
                v-model="form.reasondetail"
              ></el-input>
            </div>
          </el-row>
        </el-form>
        <div style="padding:20px 30px">
          <el-button class="elButton" round type="primary">返回</el-button>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
import axios from "axios";
import { post, service } from "../../utils/request.js";
export default {
  name: "accumulator",
  data() {
    return {
      labelPosition: "left",
      activeName: "1",
      // -----------------------
      form: {
        rgtno: "",
        calcode: "",
        rgtnoend: "",
        gobackdate: "",
        backreason: "", // 回退原因
        backend: "", // 拟申请回退后的理赔结论
        reasondetail: "", // 回退详细说明
        remark: ""
      },
      //------------------------
      tableData: [],
      pagesize: 10,
      currpage: 1
    };
  },
  inject: ["reload"],
  created() {
    this.productAttributenQuery();
  },
  methods: {
    productAttributenQuery() {
      post(service.productAttributenQuery, {
        bodys: {
          // riskcode: this.forms.riskCode
          // riskcode: "AH5101"
        }
      }).then(res => {
        this.tableData = res.data.bodys.rows;
      });
    },
    // 保存
    toSubmit() {
      if (!this.form.backreason) {
        this.$message.error("请选择回退原因");
        return;
      }
      if (!this.form.backend) {
        this.$message.error("请选择拟申请回退后的理赔结论");
        return;
      }
      if (!this.form.reasondetail) {
        this.$message.error("请填写回退原因详细说明");
        return;
      }
      post(service.insertProductAttribute, {
        bodys: {
          rgtno: this.form.rgtno
        }
      }).then(res => {});
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
<style lang="less" scoped>
/deep/ .el-input,
.el-select {
  width: 210px;
}
.formData {
  margin-top: 30px;
}
.twice {
  margin-left: 30px;
}
/deep/.el-form-item__label {
  text-align: left;
  width: 100px !important;
}
/deep/ .el-form-item__content {
  margin-left: 100px !important;
}
.textareaTitle {
  padding: 10px 16px 10px;
  font-size: 14px;
  margin: 0;
}
.textareaCenter {
  margin: 0 auto;
  text-align: center;
  width: 96%;
  display: block;
}
/deep/.el-collapse-item__arrow {
  display: none;
}
/deep/.el-collapse-item__header {
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
/deep/.el-collapse-item__content {
  padding-bottom: 0;
}
.footBtnAll {
  background: #fff;
  padding: 0px 0px 20px 30px;
  text-align: left;
  margin: 0px 0 30px;
}
.accumulator {
  margin: 10px;

  .header {
    background-color: #0673ff;
    height: 50px;
    line-height: 50px;
    border-radius: 25px 25px 0 0;
    padding: 0 30px;
    overflow: hidden;
    color: #fff;
    font-size: 16px;
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
    width: auto;
  }
  .block {
    background-color: #fff;
    height: 80px;
    padding-top: 20px;
    box-sizing: border-box;
    // margin-bottom: 30px;
  }
  .img_style {
    width: 27px;
    height: 22px;
  }
}
</style>
