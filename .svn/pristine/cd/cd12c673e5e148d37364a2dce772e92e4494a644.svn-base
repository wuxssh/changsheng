<template>
  <div class="publicAccount">
    <el-collapse v-model="activeName">
      <el-collapse-item name="1">
        <template slot="title">
          对公账户查询
          <i
            class="header-icon el-icon-caret-bottom"
            style="margin: 0 8px 0 auto;font-size: 30px;"
          ></i>
        </template>
        <el-form
          ref="listForm"
          :model="listForm"
          v-model="labelPosition"
          label-width="34%"
          class="demo-ruleForm"
        >
          <el-row>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="账户名称" prop="accountname">
                  <el-input v-model="listForm.accountname" maxlength="100" @keyup.enter.native="initList"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content" style="margin-left:30px;">
                <el-form-item label="账户所有人姓名" prop="accountpername">
                  <el-input v-model="listForm.accountpername" maxlength="100"  @keyup.enter.native="initList"></el-input>
                </el-form-item>
              </div>
            </el-col>
            
          </el-row>

          <el-row style="text-align:right;padding-right:30px;">
            <el-button type="primary" round @click="initList">查 询</el-button>
            <el-button type="primary" round @click="resetForm('listForm')">重 填</el-button>
          </el-row>
        </el-form>
      </el-collapse-item>
    </el-collapse>

    <!-- <img src="../../assets/images/report/inquire@1x.png" alt style="margin:30px 0;" /> -->

    <div class="work_queue">
      <!-- <img src="../../assets/images/report/tab_btn@1x.png" alt=""> -->
      <span>对公账户列表</span>
      <div class="box"></div>
    </div>
    <div class="work_table">
      <el-table
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        style="width: 100%"
        highlight-current-row
        @row-click="toDetails"
      >
        <el-table-column label="序号" type="index" :index="indexMethod" align="center"></el-table-column>
        <el-table-column prop="accname" label="账户名称" align="center"></el-table-column>
        <el-table-column prop="accpername" label="账户所有人姓名" align="center"></el-table-column>
        <el-table-column prop="bankaccno" label="授权账户号码" align="center"></el-table-column>
        <el-table-column prop="bankcodename" label="授权银行" align="center"></el-table-column>
        <el-table-column prop="bankprovincename" label="所在地区" align="center"></el-table-column>
        <el-table-column prop="bankbranchname" label="支行" align="center"></el-table-column>
        

      </el-table>
      <div class="block">
        <el-pagination
          @size-change="currentPage1"
          @current-change="currentChange"
          :current-page.sync="currentPage1"
          :page-size="10"
          background
          layout="prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
    <el-collapse v-model="activeName">
      <el-collapse-item name="2">
        <template slot="title">
          对公账户信息管理
          <i
            class="header-icon el-icon-caret-bottom"
            style="margin: 0 8px 0 auto;font-size: 30px;"
          ></i>
        </template>
        <el-form
          ref="listForm2"
          :model="listForm2"
          v-model="labelPosition"
          :rules="rules"
        >
          <el-row >
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="账户名称" prop="accname" label-width="130px">
                  <el-input v-model="listForm2.accname" maxlength="100" clearable></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="账户所有人姓名" prop="accpername" label-width="130px">
                  <el-input v-model="listForm2.accpername" maxlength="100" clearable></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="授权账户号码" prop="bankaccno" label-width="130px">
                  <el-input 
                    v-model="listForm2.bankaccno" 
                    maxlength="100"
                    ref="input"
                    @change="bankAccountBluer(listForm2.bankaccno)"
                    @paste.native.capture.prevent="handlePaste" 
                    clearable ></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <div class="grid-content bank">
                <el-form-item
                  label="授权银行"
                  prop="bankcode"
                  label-width="130px"
                >
                  <el-select
                    v-model="listForm2.bankcode"
                    filterable
                    placeholder="下拉模糊"
                    :filter-method="filtered3"
                    clearable
                    @change="getHeadBank()"
                    @clear="clearBank()"
                    v-el-select-loadmore="loadmore3"
                  >
                    <el-option
                      v-for="item in tBankList"
                      :key="item.bankid"
                      :label="item.bankname"
                      :value="item.bankid"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item
                  label
                  prop="bankprovince"
                  class="bank_style"
                  style="margin:0 10px"
                >
                  <el-select
                    v-model="listForm2.bankprovince"
                    filterable
                    placeholder="所在地区"
                    clearable
                    @change="getBanchBank(listForm2.bankcode,listForm2.bankprovince)"
                    v-el-select-loadmore="loadmore4"
                  >
                    <el-option
                      v-for="item in bankAddressList"
                      :key="item.standardareasid"
                      :label="item.standardareasname"
                      :value="item.standardareasid"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item
                  label
                  prop="bankbranch"
                  class="bank_style"
                >
                  <el-select v-model="listForm2.bankbranch" filterable placeholder="支行" clearable>
                    <el-option
                      v-for="item in branchBankList"
                      :key="item.banklocationsid"
                      :label="item.banklocationsname"
                      :value="item.banklocationsid"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          
          <el-row style="text-align:right;padding-right:30px;">
            <el-button type="primary" round @click="add('listForm2')">增 加</el-button>
            <el-button type="primary" round @click="update('listForm2')" :disabled="updata">修 改</el-button>
            <el-button type="primary" round @click="deleteOne" :disabled="updata">删除</el-button>
            <el-button type="primary" round @click="empty('listForm2')">重 置</el-button>
          </el-row>
        </el-form>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
import axios from "axios";
import { post, service } from "../../utils/request.js";
// import { getCodeArr } from "../../utils/service";
export default {
  name: "publicAccount",
  directives: {
    "el-select-loadmore": {
      bind(el, binding) {
        const elss = el.querySelector(
          ".el-select-dropdown .el-select-dropdown__wrap"
        );
        elss.addEventListener("scroll", function() {
          const condition =
            this.scrollHeight - this.scrollTop <= this.clientHeight;
          if (condition) {
            binding.value();
          }
        });
      }
    }
  },
  data() {
    return {
      updata: true,
      listForm: {
        accountname: "",
        accountpername: "",
      },
      upusercodeList: [],
      listForm2: {
        accname: "",
        accpername: "",
        bankaccno: "",
        bankprovince: "",
        bankprovincename: "",
        bankcode: "",
        bankcodename: "",
        bankbranch: "",
        bankbranchname: "",
        groupaccountid:""
      },
      rules:{
        accname: [
          {
            required: true,
            message: "请输入账户名称",
            trigger: ["blur", "change"]
          }
        ],
        accpername: [
          {
            required: true,
            message: "请输入账户所有人姓名",
            trigger: ["blur", "change"]
          }
        ],
        bankaccno: [
          {
            required: true,
            message: "请输入授权账户号码",
            trigger: ["blur", "change"]
          }
        ],
        bankcode: [
          {
            required: true,
            message: "请选择总行",
            trigger: ["blur", "change"]
          }
        ],
        bankprovince: [
          {
            required: true,
            message: "请选择所在地区",
            trigger: ["blur", "change"]
          }
        ],
      },
      activeName: ["1", "2"],
      labelPosition: "right",
      currentPage: 1,
      currentPage1: 1,
      tableData: [],
      pagesize: 10,
      currpage: 1,
      total: 0,
      currentRow: "",
      resetModStr: "",
      resetPer:"",
      tBankList: [], //银行总行
      bankAddressList: [], //银行地区
      branchBankList: [], //银行分行
      bankAccountNumBlur: 1,
      bankFirst: "",
      bankFormData:{
        pagestart:0,
        pageend: 100,
        likename:''
      },
      bankFormAddress:{
        pagestart:0,
        pageend: 100,
        likename:''
      }
    };
  },
  inject: ["reload"],
  created() {
    
  },
  mounted() {
    this.getHeadBank();
    this.getBankAddress();
    this.getBanchBank();
    this.getBranchBank();
  },
  methods: {
    handlePaste() {},
    // 授权账户号码失焦
    bankAccountBluer(val) {
      if (this.bankAccountNumBlur === 1) {
        this.rules.bankaccno[0].message = "请再输入一次授权账号！";
        this.bankFirst = val;
        this.listForm2.bankaccno = "";
        if (!this.listForm2.bankaccno) {
          this.$message.warning("请再输入一次授权账号！");
        }
        this.$refs.input.focus();
        this.bankAccountNumBlur += 1;
      } else {
        if (val != this.bankFirst) {
          this.rules.bankaccno[0].message = "银行账号两次输入不一致 ！";
          this.bankAccountNumBlur -= 1;
          this.listForm2.bankaccno = "";
          this.$refs.input.focus();
          if (!this.listForm2.bankaccno) {
            this.$message.error("银行账号两次输入不一致 ！");
          }
        } else {
          this.rules.bankaccno[0].message = "授权账户号码不能为空！";
          this.bankAccountNumBlur -= 1;
        }
      }
    },
    // 对公账户列表
    initList() {
      this.currentPage = 1;
      this.currentPage1 = 1;
      this.$forceUpdate();
      post(service.compAccountQuery, {
        bodys: this.listForm
      })
      .then(result => {
        if (result.data.headers.code === "200") {
          this.tableData = result.data.bodys.rows;
          this.total = result.data.bodys.total;
        }
      })
      .catch(error => {
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    toDetails(row) {
      this.updata = false;
      this.resetModStr = row.accname;
      this.resetPer = row.accpername;
      sessionStorage.setItem("row", JSON.stringify(row));
      // this.listForm2 = JSON.parse("row");
      post(service.compAccountInfo, {
        bodys: {
          accountname: this.resetModStr,
          accountpername: this.resetPer
        }
      }).then(res => {
        if (res.data.header.code === "200") {
          this.listForm2 = res.data.bodys;
          this.getBranchBank();
        }
      });
    },

    add(formName) {
      if (this.listForm2.accname == '') {
        this.$message.error("账户名称不能为空！");
        return;
      }
      if (this.listForm2.accpername == '') {
        this.$message.error("账户所有人姓名不能为空！");
        return;
      }
      if (this.listForm2.bankaccno == '') {
        this.$message.error("授权账户号码不能为空！");
        return;
      }
      if (this.listForm2.bankcode == '' || this.listForm2.bankprovince == '') {
        this.$message.error("授权银行不能为空！");
        return;
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          post(service.compAccountInsert, {
            bodys: {
              accname:this.listForm2.accname,
              accpername:this.listForm2.accpername,
              bankaccno:this.listForm2.bankaccno,
              bankcode:this.listForm2.bankcode,
              bankcodename:"",
              bankprovince:this.listForm2.bankprovince,
              bankbranch:this.listForm2.bankbranch
            }
          }).then(res => {
            if (res.data.header.code === "200" && res.data.header.success) {
              this.$message.success(res.data.header.message);
              this.reload();
            } else {
              this.$message.error(res.data.header.message);
            }
          });
        } else {
          return false;
        }
      });
    },
    update(formName) {
      if (this.listForm2.accname == '') {
        this.$message.error("账户名称不能为空！");
        return;
      }
      if (this.listForm2.accpername == '') {
        this.$message.error("账户所有人姓名不能为空！");
        return;
      }
      if (this.listForm2.bankaccno == '') {
        this.$message.error("授权账户号码不能为空！");
        return;
      }
      if (this.listForm2.bankcode == '' || this.listForm2.bankprovince == '') {
        this.$message.error("授权银行不能为空！");
        return;
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          post(service.compAccountUpdate, {
            bodys: {
              accname:this.listForm2.accname,
              accpername:this.listForm2.accpername,
              bankaccno:this.listForm2.bankaccno,
              bankcode:this.listForm2.bankcode,
              bankcodename:"",
              bankprovince:this.listForm2.bankprovince,
              bankbranch:this.listForm2.bankbranch,
              groupaccountid:this.listForm2.groupaccountid,
              oldaccname:this.resetModStr,
            }
          }).then(res => {
            if (res.data.header.code === "200" && res.data.header.success) {
              this.$message.success(res.data.header.message);
               this.reload();
            } else {
              this.$message.error(res.data.header.message);
            }
          });
        } else {
          return false;
        }
      });
    },
    empty(formName) {
      if (!this.updata) {
        this.listForm2 = JSON.parse(sessionStorage.getItem("row"));
        this.getBranchBank();
      } else {
        this.$refs[formName].resetFields();
      }
    },
    deleteOne() {
      post(service.compAccountDelete, {
        bodys: {
          groupaccountid:this.listForm2.groupaccountid
        }
      }).then(res => {
        if (res.data.header.code === "200" && res.data.header.success) {
          this.$message.success(res.data.header.message);
          this.reload();
        } else {
          this.$message.error(res.data.header.message);
        }
      });
    },
    filtered3(val) {
      this.listForm.bankcode = val;
      if (val != "") {
        this.getHeadBank(val);
      }
    },
    loadmore3() {
      this.bankFormData.pagestart += 100;
      post(service.queryBank, {
        pagestart: this.bankFormData.pagestart,
        pageend: this.bankFormData.pageend,
        likename: this.listForm2.bankcode
      }).then(res => {
        // this.hospitalLists = res.data.bodys;
        this.tBankList = [...this.tBankList, ...res.data.bodys];
      });
    },
    loadmore4() {
      this.bankFormAddress.pagestart += 100;
      post(service.queryBankLocation, {
        pagestart: this.bankFormAddress.pagestart,
        pageend: this.bankFormAddress.pageend,
        likename: this.listForm2.bankprovince
      }).then(res => {
        // this.hospitalLists = res.data.bodys;
        this.bankAddressList = [...this.bankAddressList, ...res.data.bodys];
      });
    },
    getBranchBank() {
      // if (this.listForm2.bankbranch) {
        post(service.queryTbanklocations, {
          bodys: {
            bankid: this.listForm2.bankcode,
            standardareasid: this.listForm2.bankprovince
          }
        }).then(res => {
          if (res.data.header.code === "200") {
            this.branchBankList = res.data.bodys;
            // this.listForm2.bankname = "";
          }
        });
      // }
    },
    // 获取总行
    getHeadBank() {
      post(service.queryBank, {
        pagestart: this.bankFormData.pagestart,
        pageend: this.bankFormData.pageend,
        likename: this.listForm2.bankcode
      }).then(res => {
        if (res.data.header.code === "200") {
          this.tBankList = res.data.bodys;
          this.listForm2.bankprovince = "";
          this.listForm2.bankbranch = "";
        }
      });
    },
    // 银行所在地区
    getBankAddress() {
      post(service.queryBankLocation, {
        pagestart: this.bankFormAddress.pagestart,
        pageend: this.bankFormAddress.pageend,
        likename: this.listForm2.bankprovince
      }).then(res => {
        if (res.data.header.code === "200") {
          this.bankAddressList = res.data.bodys;
        }
      });
    },
    // 银行分行
    getBanchBank(key1, key2) {
      post(service.queryTbanklocations, {
        bodys: {
          bankid: this.listForm2.bankcode,
          standardareasid: this.listForm2.bankprovince
        }
      }).then(res => {
        if (res.data.header.code === "200") {
          this.branchBankList = res.data.bodys;
          this.listForm2.bankbranch = "";
        }
      });
    },
    clearBank() {
      this.listForm2.bankbranch = null;
      this.branchBankList = null;
      
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
.publicAccount {
  margin: 20px;
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
  .bank {
    display: flex;
    .bank_style {
      .el-form-item__content {
        margin-left: 8px !important;
      }
    }
    .el-select {
      width: 180px !important;
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
.publicAccount {
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
.publicAccount {
  .el-input {
    width: 85% !important;
  }
  .date_style {
    .el-input {
      width: 46% !important;
    }
  }

  .el-select {
    width: 85% !important;
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
