<template>
  <div>
    <!-- <el-dialog :visible.sync="remarkFormVisible" width="74%"> -->
    <div class="lable">
      <el-row>
        <el-col :span="15" class="leftItem">
          <el-table
            :data="remarkTableData.slice((currpageRemark - 1) * pagesizeRemark, currpageRemark * pagesizeRemark)"
            border
            :default-sort="{prop: 'maketime', order: 'descending'}"
            :header-cell-style="{background:'#F7FAFF',color:'#333333'}"
          >
            <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
            <el-table-column
              prop="describecontes"
              label="备注内容"
              align="center"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column prop="operator" label="操作员" align="center"></el-table-column>
            <el-table-column prop="makedate" label="备注时间" align="center"></el-table-column>
          </el-table>
          <div class="paginations" style="margin-top:10px;text-align:left">
            <el-pagination
              background
              small
              @size-change="handleSizeChangeRemark"
              @current-change="handleCurrentChangeRemark"
              :page-size="pagesizeRemark"
              layout="prev, pager, next,jumper"
              :total="remarkTableData.length"
            ></el-pagination>
          </div>
          <el-button class="poBtn" icon="el-icon-d-arrow-left" @click="toShowRightDialog"></el-button>
        </el-col>

        <el-col :span="8" class="rightItem" v-show="toShow">
          <div>
            <div class="innerLable1">
              <div class="contentss">
                <div class="note" style="text-align:left">
                  <span style="font-size:18px;margin-left:10px;margin-top:15px;color:#409eff">备注内容</span>
                  <img
                    src="../assets/images/eapproval/downForNote.png"
                    style="float:right;margin-top:10px;margin-right:15px;"
                  />
                </div>
                <div class="blackLine"></div>
                <el-input
                  class="texContent"
                  type="textarea"
                  v-model="remarkDesc"
                  rows="8"
                  maxlength="700"
                  resize="none"
                  show-word-limit
                  placeholder="请输入备注信息"
                ></el-input>
              </div>
            </div>
            <div slot="footer" style="margin:10px 0;text-align: center;">
              <el-button
                style="background-color:#0673FF;"
                round
                type="primary"
                @click="addRemarks"
              >添加</el-button>
              <el-button style="background-color:#0673FF;" round type="primary" @click="gobacks">返回</el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- </el-dialog> -->
  </div>
</template>

<script>
import { post, service } from "../utils/request.js";
export default {
  props: {
    rgtno: {
      type: String
    },
    startphase: {
      type: Number
    },
    isshowremark: {
      type: Boolean
    }
  },
  data() {
    return {
      remarkFormVisible: false,
      remarkTableData: [],
      remarkDesc: "",
      pagesizeRemark: 5, // 备注分页
      currpageRemark: 1,
      toShow: true
    };
  },
  created() {
    this.remarks();
  },
  mounted(){
  },
  methods: {
    // 备注信息弹框
    remarks() {
      post(service.queryDesc, {
        bodys: {
          clmno: this.rgtno,
          customerno: "1"
        }
      }).then(res => {
        if (res.data.header.code === "200") {
          this.remarkTableData = res.data.bodys;
        }
      });
    },
    // 备注分页
    handleSizeChangeRemark(val) {
      this.pagesizeRemark = val;
    },
    handleCurrentChangeRemark(val) {
      this.currpageRemark = val;
    },
    toShowRightDialog() {
      this.toShow = !this.toShow;
    },
    gobacks() {
      this.isshowremark = false;
      this.$emit("changeisshow", false);
      this.remarkDesc = "";
    },
    // 添加备注信息
    addRemarks() {
      if (!this.remarkDesc) {
        this.$message.error("备注信息不能为空！");
      } else {
        post(service.insertDesc, {
          bodys: {
            clmno: this.rgtno,
            customerno: "1",
            startphase: this.startphase,
            describecontes: this.remarkDesc,
            usercode: localStorage.getItem("userCode")
          }
        }).then(res => {
          if (res.data.header.code === "200") {
            this.remarks();
            this.remarkDesc = "";
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
//  ----Start---- 备注样式
.lable {
  width: auto;
  margin-top: 0;
  display: block !important;
}
.rightItem {
  background: rgba(6, 155, 255, 0.6);
}
.leftItem {
  margin-right: 10px;
  position: relative;
}
.poBtn {
  position: absolute;
  right: -3%;
  top: 50px;
  padding: 5px;
  color: #0673ff;
  z-index: 999;
}

.innerLable1 {
  background: #fff;
  margin: 10px 15px 20px;
  height: auto;
  width: auto;
}
//  ----End---- 备注样式
</style>