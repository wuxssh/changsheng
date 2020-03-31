<template>
  <div class="menuManage">
    <el-collapse v-model="activeName">
      <el-collapse-item name="1">
        <template slot="title">
          菜单配置
          <i
            class="header-icon el-icon-caret-bottom"
            style="margin: 0 8px 0 auto;font-size: 30px;"
          ></i>
        </template>
        <el-form ref="form" :model="form" v-model="labelPosition" label-width="35%">
          <el-row>
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="菜单组编码">
                  <el-input v-model="form.menugrpcode" maxlength="100" disabled></el-input>
                </el-form-item>
              </div>
            </el-col>

            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="菜单组名称">
                  <el-input v-model="form.menugrpname" maxlength="100" disabled></el-input>
                </el-form-item>
              </div>
            </el-col>

            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="菜单组描述">
                  <el-input v-model="form.menugrpdescription" maxlength="100" disabled></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
    </el-collapse>
    <div class="memu">
      <el-row style="text-align:right;padding-right:30px;">
        <el-button type="primary" @click="getComfirm" round>确 定</el-button>
        <el-button type="primary" round @click="outTable">退 出</el-button>
      </el-row>

      <!-- 当前已拥有的菜单 -->
      <div class="left">
        <div class="size">当前菜单组已拥有菜单</div>
        <el-tree
          :data="dataArr1"
          show-checkbox
          node-key="childcode"
          default-expand-all
          ref="tree2"
          :default-checked-keys="checkedArr"
          :props="defaultProps"
        ></el-tree>
      </div>
      <!-- 当前未拥有的菜单 -->
      <div class="right">
        <div class="size">当前菜单组未拥有菜单</div>
        <el-tree
          :data="dataArr2"
          show-checkbox
          node-key="childcode"
          default-expand-all
          :default-checked-keys="checkedArr2"
          ref="tree"
          :props="defaultProps"
        ></el-tree>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { post, service } from "../../utils/request.js";
// import { getCodeArr } from "../../utils/service";
export default {
  name: "ListQuery",
  data() {
    return {
      menuList: [],
      unMenuList: [],
      menuListModel: [],
      unMenuListModel: [],
      dataArr1: [],
      dataArr2: [],
      defaultProps: {
        children: "childlist",
        label: "childname"
      },
      form: {
        menugrpcode: "",
        menugrpname: "",
        menugrpdescription: "",
        menusign: "",
        operator: ""
      },
      activeName: ["1", "2"],
      labelPosition: "right",
      menugrpcodeandnodecode: [],
      checkedArr: [],
      checkedArr2: [],
      menuSaveArr: []
    };
  },
  inject: ["reload"],
  created() {
    this.init();
  },
  mounted() {
    // this.initTable();
  },
  methods: {
    init() {
      post(service.menuInit, {
        bodys: {
          menugrpcode: this.$route.query.menugrpcode
        }
      }).then(res => {
        if (res.data.header.code === "200") {
          this.form = res.data.bodys.C[0];
          this.dataArr1 = res.data.bodys.A.menucontrollist;
          for (var i = 0; i < this.dataArr1.length; i++) {
            var obj = this.dataArr1[i];
            for (var key in obj) {
              if (key == "childcode") {
                this.checkedArr.push(obj[key]);
              }
            }
          }
          this.dataArr2 = res.data.bodys.B.menucontrollist;
       
        }
      });
    },

    getComfirm() {
      this.menuSaveArr = this.$refs.tree.getCheckedKeys();
      this.menuSaveArr = this.menuSaveArr.concat(
        this.$refs.tree2.getCheckedKeys()
      );
      this.menuSaveArr.unshift(this.$route.query.menugrpcode);
      post(service.menuSave, {
        bodys: {
          menugrpcodeandnodecode: this.menuSaveArr
        }
      }).then(res => {
        if (res.data.header.code === "200" && res.data.header.success) {
          this.$message.success(res.data.header.message);
          this.$router.go(-1);
        }
      });
    },
    outTable() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="less" scoped>
.menuManage {
  margin: 10px;
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
  .el-form {
    background-color: #fff;
  }

  .memu {
    background-color: #fff;
    margin-top: 21px;
    padding: 10px;
    overflow: hidden;
    .left {
      float: left;
      width: 50%;
    }
    .right {
      float: right;
      width: 50%;
    }
    .size {
      color: #0673ff;
      font-size: 20px;
      text-decoration: underline;
    }
  }
}
</style>
<style lang="less">
.menuManage {
  .el-row {
    // padding-top: 20px;
    &:first-child {
      padding-top: 20px;
      box-sizing: border-box;
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
.menuManage {
  //   .el-input {
  //     width: 80% !important;
  //   }
  .date_style {
    .el-input {
      width: 46% !important;
    }
  }

  .el-select {
    width: 100% !important;
    .el-input {
      width: 100% !important;
    }
  }
  .el-checkbox {
    display: block;
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
    padding: 17px 8px;
  }
  .el-table--striped .el-table__body tr.el-table__row--striped.current-row td,
  .el-table__body tr.current-row > td,
  .el-table__body tr.hover-row.current-row > td,
  .el-table__body tr.hover-row.el-table__row--striped.current-row > td,
  .el-table__body tr.hover-row.el-table__row--striped > td,
  .el-table__body tr.hover-row > td {
    background-color: #409eff;
  }
  .el-tree-node__content:hover {
    background-color: none !important;
  }
  .el-tree-node:focus > .el-tree-node__content {
    background-color: none !important;
  }
}
</style>
