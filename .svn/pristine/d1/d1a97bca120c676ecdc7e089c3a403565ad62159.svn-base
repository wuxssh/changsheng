<template>
  <div>
    <el-tabs v-if="customerno" v-model="active" type="card" @tab-click="handleClick" style="margin-bottom:20px;">
      <div :style="style1" :class="isbox ? 'box' : ''"></div>    
      <el-tab-pane label="保单信息查询" name="first">
        <el-table
          :data="policyArr1.slice((currentPage1-1)*pagesize,currentPage1*pagesize)"
          style="width: 100%"
          :row-key="getRowKeys"
          :expand-row-keys="expands"
          @expand-change="zydescription"
        >
          <el-table-column type="expand">
            <template>
              <el-table
                :data="policydetail"
                class="sonTable"
                border
                style="width: 100%"
                :header-cell-style="{background:'#F7FAFF'}"
                :row-style="{background:'#F7FAFF'}"
              >
                <el-table-column type="index" width="50" align="center" label="序号"></el-table-column>
                <el-table-column prop="riskname" label="险种名称" align="center" width="150"></el-table-column>
                <el-table-column prop="riskcode" label="险种代码" align="center" width="100"></el-table-column>
                <el-table-column prop="amnt" label="保险金额" align="center" width="100"></el-table-column>
                <el-table-column prop="uwstate" label="险种状态" align="center" width="100"></el-table-column>
                <el-table-column prop="cvalidate" label="生效日期" align="center" width="100"></el-table-column>
                <el-table-column prop="prem" label="应交保费" align="center" width="100"></el-table-column>
                <el-table-column prop="payenddate" label="实际缴费期满日" align="center" width="100"></el-table-column>
                <el-table-column prop="enddate" label="实际期满日" align="center" width="100"></el-table-column>
                <el-table-column prop="uwflag" label="核保决定" align="center" width="100"></el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column label="序号" type="index" align="center" width="50" :index="indexMethod1"></el-table-column>
          <el-table-column prop="contno" label="保单号" align="center" width="120"></el-table-column>
          <el-table-column prop="appntname" label="投保人" align="center" width="120"></el-table-column>
          <el-table-column prop="insuredname" label="被保险人" align="center" width="130"></el-table-column>
          <el-table-column prop="riskname" label="主险名称" align="center" width="130"></el-table-column>
          <el-table-column prop="polstate" label="保单状态" align="center" width="100"></el-table-column>
          <el-table-column prop="cvalidate" label="生效日期" align="center" width="100"></el-table-column>
          <el-table-column prop="payenddate" label="实际缴费期满日" align="center" width="150"></el-table-column>
          <el-table-column prop="enddate" label="实际期满日" align="center" width="100"></el-table-column>
          <el-table-column prop="claimflag" label="挂起标志" align="center" width="100"></el-table-column>
          <el-table-column prop="suspension" label="挂起原因" align="center" width="100"></el-table-column>
          <el-table-column prop="appflag" label="团个标志" align="center" width="100"></el-table-column>
          <el-table-column prop="salechnl" label="渠道" align="center" width="100"></el-table-column>
        </el-table>
        <el-pagination
          background
          @size-change="currentPage1"
          @current-change="currentChange1(currentPage1)"
          :current-page.sync="currentPage1"
          :page-size="10"
          layout="prev, pager, next, jumper"
          :total="policyArr1.length"
        ></el-pagination>
      </el-tab-pane>

      <el-tab-pane label="既往赔案查询" name="second">
        <el-table
          style="width: 100%"
          :data="policyArr2.slice((currentPage2-1)*pagesize,currentPage2*pagesize)"
        >
          <el-table-column type="index" width="50" label="序号" :index="indexMethod2"></el-table-column>
          <el-table-column prop="accno" label="事件号" align="center" width="140"></el-table-column>
          <el-table-column prop="rgtno" label="理赔号" align="center" width="140"></el-table-column>
          <el-table-column prop="customername" label="出险人" align="center" width="140"></el-table-column>
          <el-table-column prop="rgtantname" label="申请人" align="center" width="140"></el-table-column>
          <el-table-column prop="accstartdate" label="出险日期" align="center" width="120"></el-table-column>
          <el-table-column prop="outtype" label="出险类型" align="center" width="100"></el-table-column>
          <el-table-column prop="accidentreason" label="事故原因" align="center" width="140"></el-table-column>
          <el-table-column prop="inqconclusion" label="是否调查" align="center" width="80"></el-table-column>
          <el-table-column prop="disease" label="诊断" align="center" width="140"></el-table-column>
          <el-table-column prop="applydate" label="申请日期" align="center" width="120"></el-table-column>
          <el-table-column prop="endcasedate" label="结案日期" align="center" width="120"></el-table-column>
          <el-table-column prop="rgtstate" label="案件状态" align="center" width="100"></el-table-column>
          <el-table-column prop="claimconclusion" label="理赔结论" align="center" width="140"></el-table-column>
          <el-table-column prop="realpay" label="赔付金额" align="center" width="100"></el-table-column>
          <el-table-column label="理赔进展" align="center" width="80">
            <template slot-scope="scope" v-if="scope.row.remarks">
              <el-popover
                placement="top-start"
                popper-class="lipeiPopover"
                trigger="hover"
                width="600"
              >
                <el-timeline>
                  <el-timeline-item
                    v-for="(items,index) in scope.row.remarks"
                    :key="index"
                    placement="top"
                    :timestamp="items.transdate"
                    color="#0673ff"
                  >
                    <div style="font-weight:700">{{items.crtusr}}</div>
                    <div>{{items.remark}}</div>
                  </el-timeline-item>
                </el-timeline>
                <template slot="reference" style="border:none;">
                  <img src="../assets/images/filing/warn.png" alt style="width:20px;height:20px" />
                </template>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top:10px;">
          <el-pagination
            background
            @size-change="currentPage2"
            @current-change="currentChange2(currentPage2)"
            :current-page.sync="currentPage2"
            :page-size="10"
            layout="prev, pager, next, jumper"
            :total="policyArr2.length"
          ></el-pagination>
        </div>
      </el-tab-pane>

      <el-tab-pane label="保全记录" name="third">
        <el-table
          :data="policyArr3.slice((currentPage3-1)*pagesize,currentPage3*pagesize)"
          style="width: 100%"
        >
          <el-table-column type="index" width="50" label="序号" :index="indexMethod3"></el-table-column>
          <el-table-column prop="contno" label="保单号" align="center" width="120"></el-table-column>
          <el-table-column prop="posnumber" label="pos交易流水号" align="center" width="140"></el-table-column>
          <el-table-column prop="edorappdate" label="申请收到日" align="center" width="100"></el-table-column>
          <el-table-column prop="edortype" label="保全类型" align="center" width="150"></el-table-column>
          <el-table-column prop="edorstate" label="保全状态" align="center" width="120"></el-table-column>
          <el-table-column prop="edorvalidate" label="保全生效日期" align="center" width="120"></el-table-column>
          <el-table-column prop="operator" label="操作人" align="center" width="120"></el-table-column>
          <el-table-column prop="edorappdate" label="操作日" align="center" width="100"></el-table-column>
          <el-table-column prop="salechnl" label="渠道" align="center" width="120"></el-table-column>
          <el-table-column prop="edorappdate" label="提交时间" align="center" width="100"></el-table-column>
        </el-table>
        <div style="margin-top:10px;">
          <el-pagination
            background
            @size-change="currentPage3"
            @current-change="currentChange3(currentPage3)"
            :current-page.sync="currentPage3"
            :page-size="10"
            layout="prev, pager, next, jumper"
            :total="policyArr3.length"
          ></el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { post, service } from "../utils/request.js";
export default {
  props: {
    customerno: {
      type: String
    }
  },
  data() {
    return {
      getRowKeys(row) {
        // alert(row.contno)
        return row.contno;
      },
      active: "first",
      isbox: true,
      style1: {
        margin: "0 0 0 15px"
      },
      policyArr1: [],
      policyArr2: [],
      policyArr3: [],
      policydetail: [],
      expands: [],
      currentPage1: 1,
      currentPage2: 1,
      currentPage3: 1,
      pagesize: 10
    };
  },
  created() {
    this.getPolicy1();
    this.getPolicy2();
    this.getPolicy3();
  },
  methods: {
    handleClick(tab, event) {
      this.isbox = true;
      if (tab.index === "0") {
        this.style1 = "margin: 0 0 0 15px";
      }
      if (tab.index === "1") {
        this.style1 = "margin: 0 0 0 141px";
      }
      if (tab.index === "2") {
        this.style1 = "margin: 0 0 0 270px";
      }
    },
    // 获取立案的保单信息
    getPolicy1() {
      post(service.lianPolicy, {
        bodys: {
          customerno: this.customerno
        }
      }).then(res => {
        if (res.data.header.code === "200") {
          this.policyArr1 = res.data.bodys;
        }
      });
    },
    // 获取立案的既往赔案信息
    getPolicy2() {
      post(service.lianJiwang, {
        bodys: {
          customerno: this.customerno
        }
      }).then(res => {
        if (res.data.header.code === "200") {
          this.policyArr2 = res.data.bodys;
        }
      });
    },
    // 获取保全记录
    getPolicy3() {
      post(service.lianBaoquan, {
        bodys: {
          customerno: this.customerno
        }
      }).then(res => {
        if (res.data.header.code === "200") {
          this.policyArr3 = res.data.bodys;
        }
      });
    },
    zydescription(row, expandedRows) {
      this.expands = [];
      if (expandedRows.length > 0) {
        row ? this.expands.push(row.contno) : "";
      }
      let bodys = {
        contno: row.contno
      };
      post(service.getPolicyDetail, {
        bodys: {
          contno: row.contno
        }
      })
        .then(res => {
          this.policydetail = res.data.bodys;
        })
        .catch();
    },
    currentChange1(page) {
      this.currentPage1 = page;
    },
    currentChange2(page) {
      this.currentPage2 = page;
    },
    currentChange3(page) {
      this.currentPage3 = page;
    },
    indexMethod1(index) {
      return index + 1 + (this.currentPage1 - 1) * 10;
    },
    indexMethod2(index) {
      return index + 1 + (this.currentPage2 - 1) * 10;
    },
    indexMethod3(index) {
      return index + 1 + (this.currentPage3 - 1) * 10;
    }
  }
};
</script>

<style lang="scss" scoped>
// ------tab选项卡--------
/deep/.el-tabs__active-bar {
  border: none;
  background: transparent;
}
/deep/ .el-tabs__item {
  background: #fff;
  font-size: 14px;
  padding: 0 20px;
  text-align: center;
  width: 120px;
  border-right: 1px solid #f1f1f1;
}
/deep/ .el-tabs__item:hover {
  color: #000;
}
/deep/ .el-tabs__item.is-active {
  background-color: #0673ff;
  border-bottom: none;
  border-radius: 8px 8px 0 0;
  color: #fff;
}
.box {
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid #0673ff;
  position: absolute;
  z-index: 999;
}
/deep/ .el-tabs__header {
  margin: 0;
}
// ------tab选项卡End--------
</style>