<template>
  <div class="diplomatic">
    <el-tabs v-model="activeName" @tab-click="handleClick" style="margin-bottom:20px;">
      <div :style="style1" :class="isbox ? 'box' : ''"></div>
      <el-tab-pane name="first">
        <span slot="label">待审批({{audit.length}})</span>
        <el-table
          style="width: 100%"
          :data="audit.slice((currpage1 - 1) * pagesize1, currpage1 * pagesize1)"
          @row-dblclick="toDetail"
        >
          <el-table-column label="序号" align="center" type="index" width="50" :index="indexMethod1"></el-table-column>
          <el-table-column prop="clmno" align="center" label="理赔号"></el-table-column>
          <el-table-column prop="contno" align="center" label="保单号"></el-table-column>
          <el-table-column prop="insuredname" align="center" label="被保险人"></el-table-column>
          <el-table-column prop="acidenttype" align="center" label="出险类型"></el-table-column>
          <el-table-column prop="casemark" align="center" label="案件标识"></el-table-column>
          <el-table-column prop="inqdepth" align="center" label="调查深度"></el-table-column>
          <el-table-column prop="trustinq" align="center" label="是否委托调查"></el-table-column>
          <el-table-column prop="initinqdate" align="center" label="提调日期"></el-table-column>
        </el-table>
        <div style="margin-top:10px;">
          <el-pagination
            background
            @size-change="handleSizeChange1"
            @current-change="handleCurrentChange1"
            :page-size="pagesize1"
            layout="prev, pager, next,jumper"
            :total="audit.length"
          ></el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane name="second">
        <span slot="label">待回销({{sellback.length}})</span>
        <el-table
          style="width: 100%"
          :data="sellback.slice((currpage - 1) * pagesize, currpage * pagesize)"
          @row-dblclick="toDetails"
        >
          <el-table-column label="序号" align="center" type="index" width="50" :index="indexMethod"></el-table-column>
          <el-table-column prop="clmno" align="center" label="理赔号"></el-table-column>
          <el-table-column prop="contno" align="center" label="保单号"></el-table-column>
          <el-table-column prop="insuredname" align="center" label="被保险人"></el-table-column>
          <el-table-column prop="acidenttype" align="center" label="出险类型"></el-table-column>
          <el-table-column prop="casemark" align="center" label="案件标识"></el-table-column>
          <el-table-column prop="inqdepth" align="center" label="调查深度"></el-table-column>
          <el-table-column prop="trustinq" align="center" label="是否委托调查"></el-table-column>
          <el-table-column prop="initinqdate" align="center" label="提调日期"></el-table-column>
        </el-table>
        <div style="margin-top:10px;">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-size="pagesize"
            layout="prev, pager, next,jumper"
            :total="sellback.length"
          ></el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import axios from "axios";
import { post, service } from "../../utils/request.js";
export default {
  data() {
    return {
      activeName: "first",
      style1: {
        margin: "0 0 0 15px"
      },
      isbox: true,
      choseIndex: "01",
      pagesize: 10,
      currpage: 1,
      pagesize1: 10,
      currpage1: 1,
      audit: [], //待审批
      reply: [], // 待回复
      sellback: [], // 待回销
      dragData:{},
      isDrag:false
    };
  },
  mounted() {
    this.initData();
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
    },
    // 调查工作池
    initData() {
      let _this = this;
      post(service.inqInfoWorkQuery, {
        bodys: {
          clmno: "",
          querytype: "01"
        }
      })
        .then(result => {
          if (result.data.header.code == "200") {
            _this.audit = result.data.bodys.audit;
            _this.sellback = result.data.bodys.sellback;
          }
        })
        .catch();
    },
    indexMethod(index) {
      return index + 1 + (this.currpage - 1) * 10;
    },
    indexMethod1(index) {
      return index + 1 + (this.currpage1 - 1) * 10;
    },
    handleSizeChange1(val) {
      this.pagesize1 = val;
    },
    handleCurrentChange1(val) {
      this.currpage1 = val;
    },
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.currpage = val;
    },
    //  双击进入详情
    toDetail(row, event, column) {
      this.$router.push({
        name: "InvestigationReview",
        params: { dataOfTable: JSON.stringify(row) }
      });
    },
    toDetails(row, event, column) {
      this.$router.push({
        name: "InvestigationResale",
        params: { dataOfTable: JSON.stringify(row) }
      });
    },
    selectItem(key) {
      this.choseIndex = key;
      // if (key === "01") {
      // } else if (key === "02") {
      // } else if (key === "03") {
      // }
    },
    codeToname: function(obj, arr) {
      var a = null;
      arr.forEach(element => {
        if (element.code === obj) {
          a = element.name;
        }
      });
      return a;
    }
  }
};
</script>
<style lang="less" scoped>
.colorSet {
  border-bottom: 1.5px solid #0673ff;
  color: #0673ff;
}
.diplomatic {
  position: relative;
  .diplomatic-cla {
    display: flex;

    .diplomatic-cla-1 {
      display: flex;
      margin-left: 20px;
      div {
        height: 50px;
        width: 100px;
        align-items: center;
        display: flex;
        justify-content: center;
        box-shadow: 0 0 2px #999999;
      }
    }
  }

  padding: 20px;

  .el-row {
    margin-top: 20px;
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
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .text {
    font-size: 16px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    margin-left: 10px;
    color: rgba(102, 102, 102, 1);
    opacity: 1;
  }

  .year_text {
    font-size: 60px;
    font-family: DIN Alternate;
    font-weight: bold;
    color: rgba(246, 78, 111, 1);
    text-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    opacity: 1;
    float: right;
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
// ------tab选项卡--------
/deep/.el-tabs__active-bar {
  border: none;
  background: transparent;
}
/deep/ .el-tabs__item {
  background: #fff;
  font-size: 16px;
  padding: 0;
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
