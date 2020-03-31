<template>
  <div class="greenConfig">
    <el-collapse v-model="activeName">
      <el-collapse-item name="1">
        <template slot="title">
          查询
          <i
            class="header-icon el-icon-caret-bottom"
            style="margin: 0 8px 0 auto;font-size: 30px;"
          ></i>
        </template>
        <el-form ref="listForm" :model="listForm" v-model="labelPosition" label-width="135px">
          <el-row style="padding-right:40px;">
           <el-col :span="8">
                <div class="grid-content place">
                  <el-form-item
                    label="出险地点"
                    prop="accidentpro"
                  >
                    <el-select
                      v-model="listForm.accidentpro"
                      placeholder="所在省"
                      clearable
                      @change="changevince(listForm.accidentpro)"
                      @clear="clearMes()"
                      style="width:120px !important"
                    >
                      <el-option
                        v-for="item in provinceList"
                        :key="item.code"
                        :label="item.province"
                        :value="item.code"
                      ></el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item
                    label
                    prop="accidentcity"
                    class="risk_address"
                    style="margin-left:10px !important"
                    label-width="0 !important"
                  >
                    <el-select
                      v-model="listForm.accidentcity"
                      clearable
                      placeholder="所在市"
                      @change="changaccity(listForm.accidentcity)"
                      ref="accidentcity"
                      @clear="clearArea()"
                      style="width:120px !important;"
                    >
                      <el-option
                        v-for="item in cityList"
                        :key="item.code"
                        :label="item.city"
                        :value="item.code"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  
                </div>
            </el-col>
            
            <el-col :span="8">
              <div class="grid-content">
                <el-form-item label="状态">
                  <el-select v-model="listForm.state" clearable placeholder="请选择">
                    <el-option
                      v-for="item in stateList"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row style="padding-right:40px;">
            <el-col :span="11">
              <div class="grid-content">
                <el-form-item label="生效日期区间" class="date_style">
                  <el-date-picker v-model="listForm.effectivebegindate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>&nbsp;-
                  <el-date-picker v-model="listForm.effectiveenddate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row style="text-align:right;padding-right:40px;">
            <el-button type="primary" round @click="initList">查 询</el-button>
            <el-button type="primary" round @click="add">增 加</el-button>
          </el-row>
        </el-form>
      </el-collapse-item>
    </el-collapse>

    <div class="work_queue">
      <span>绿色通道列表</span>
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
        <el-table-column prop="proCity"  label="出险地点" align="center"></el-table-column>
        <el-table-column prop="effectivedate" label="生效时间" align="center">
          <template slot-scope="scope">
            <span>{{new Date(scope.row.effectivedate).getFullYear()+'-'+((new Date(scope.row.effectivedate).getMonth()+1)<10 ? '0'+(new Date(scope.row.effectivedate).getMonth()+1):(new Date(scope.row.effectivedate).getMonth()+1))+'-'+(new Date(scope.row.effectivedate).getDate()<10?'0'+new Date(scope.row.effectivedate).getDate():new Date(scope.row.effectivedate).getDate())}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="invaliddate" label="失效时间" align="center">
          <template slot-scope="scope">
            <span>{{(new Date(scope.row.invaliddate).getFullYear()+'-'+((new Date(scope.row.invaliddate).getMonth()+1)<10 ? '0'+(new Date(scope.row.invaliddate).getMonth()+1):(new Date(scope.row.invaliddate).getMonth()+1))+'-'+(new Date(scope.row.invaliddate).getDate()<10?'0'+new Date(scope.row.invaliddate).getDate():new Date(scope.row.invaliddate).getDate())) == '1970-01-01'?'':(new Date(scope.row.invaliddate).getFullYear()+'-'+((new Date(scope.row.invaliddate).getMonth()+1)<10 ? '0'+(new Date(scope.row.invaliddate).getMonth()+1):(new Date(scope.row.invaliddate).getMonth()+1))+'-'+(new Date(scope.row.invaliddate).getDate()<10?'0'+new Date(scope.row.invaliddate).getDate():new Date(scope.row.invaliddate).getDate()))}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="state" label="状态" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.state== 0">使用中</div>
            <div v-if="scope.row.state== 1">停用</div>
          </template>
        </el-table-column>
        <el-table-column prop="state" label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" v-if="scope.row.state== 0" @click="stop(scope.row,scope.$index)">停用</el-button>
            <el-button size="mini" v-if="scope.row.state== 1" disabled>停用</el-button>
          </template>
        </el-table-column>
       
      </el-table>
      <div class="block" >
        <el-pagination
          @size-change="currentPage1"
          @current-change="currentChange"
          :current-page.sync="currentPage1"
          :page-size="10"
          backgrounds
          layout="prev, pager, next, jumper"
          :total="tableData.length"
        ></el-pagination>
        <el-row style="text-align:right;padding-right:40px;margin-top:20px;">
          <el-button type="primary" round @click="delete2">删除</el-button>
        </el-row>
      </div>
      
    </div>
    <!-- 备注框 -->
  </div>
</template>
<script>
import axios from "axios";
import { post, service } from "../../utils/request.js";
// import { getCodeArr } from "../../utils/service";
export default {
  name: "greenConfig",
  data() {
    return {
      listForm: {
        accidentpro:'',
        accidentcity:'',
        effectivebegindate:'',
        effectiveenddate:'',
        state:'',
        operator:'',
        makedate:'',
        modifydate:'',
        channelid:''
      },
      stateList: [
        {
          value: '0',
          name: "使用中"
        },
        {
          value: '1',
          name: "停用"
        },
      ],
      // channelids:[],
      channelid:'',
      provinceList:[],
      cityList:[],
      activeName: "1",
      labelPosition: "right",
      currentPage: 1,
      currentPage1: 1,
      tableData: [],
      pagesize: 10,
      currpage: 1,
      total: 0,
      currentRow: "",
      DateTime:'',
    };
  },
  inject: ["reload"],
  created() {
    
  },
  mounted() {
    // this.getCodeList();
    // sessionStorage.removeItem("listForm");
    this.getSheng();
    this.getCityCode();
  },
  methods: {
    // name转code
    initList() {
      if(this.listForm.effectivebegindate&&this.listForm.effectiveenddate){
        if(this.listForm.effectivebegindate>this.listForm.effectiveenddate){
          this.$message.error('失效日期不能早于生效日期！')
          return false;
        } 
      }
      this.currentPage = 1;
      this.currentPage1 = 1;
      this.total = 0;
      this.tableData = [];
      this.$forceUpdate();
      post(service.queryGreenChannel, {
        bodys: {
          accidentpro:this.listForm.accidentpro,
          accidentcity:this.listForm.accidentcity,
          state:this.listForm.state,
          effectivebegindate:this.listForm.effectivebegindate,
          effectiveenddate:this.listForm.effectiveenddate,
        }
      })
      .then(result => {
        if (result.data.headers.code === "200") {
          this.tableData = result.data.bodys;
          this.total = result.data.bodys.total;
          this.channelid = ''
        }
      })
      .catch(error => {
      });
      
    },
    add(){
      if(this.listForm.accidentpro == ''||this.listForm.accidentcity == ''||this.listForm.accidentcity == null){
          this.$message.error('出险地点不能为空！')
            return false;
      }
      
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      if (month < 10) {
          month = "0" + month;
      }
      if (day < 10) {
          day = "0" + day;
      }
      this.DateTime = year + '-' + month + '-' + day;
      if((this.listForm.effectivebegindate == ''||this.listForm.effectivebegindate ==null)&&this.listForm.effectiveenddate){
        this.listForm.effectivebegindate ='';
        if(this.DateTime>this.listForm.effectiveenddate){
          this.$message.error('失效日期不能早于生效日期！')
          return false;
        }
      }else if(this.listForm.effectivebegindate&&this.listForm.effectiveenddate){
        if(this.listForm.effectivebegindate<this.DateTime){
          this.$message.error('生效日期起期不能早于当前系统时间！')
          return false;
        }else if(this.listForm.effectivebegindate>this.listForm.effectiveenddate){
          this.$message.error('失效日期不能早于生效日期！')
          return false;
        } 
      }else if(this.listForm.effectivebegindate&&(this.listForm.effectiveenddate == ''||this.listForm.effectiveenddate ==null)){
        this.listForm.effectiveenddate == ''
        if(this.listForm.effectivebegindate<this.DateTime){
          this.$message.error('生效日期起期不能早于当前系统时间！')
          return false;
        }
      }else if((this.listForm.effectivebegindate == ''||this.listForm.effectivebegindate ==null)&&(this.listForm.effectiveenddate == ''||this.listForm.effectiveenddate ==null)){
        this.listForm.effectivebegindate = '';
        this.listForm.effectiveenddate = ''
      }
    
      if(this.listForm.state == ''){
        this.listForm.state = '0'
      }
      if(this.listForm.effectivebegindate){
        post(service.saveGreenChannel,{
          bodys:{
            accidentpro:this.listForm.accidentpro,
            accidentcity:this.listForm.accidentcity,
            state:this.listForm.state,
            effectivedate:this.listForm.effectivebegindate,
            invaliddate:this.listForm.effectiveenddate,
          }
        })
        .then(result => {
          if(result.data.headers.code === "200"&&result.data.headers.success == true){
            this.listForm.accidentpro = ''
            this.listForm.accidentcity = ''
            this.listForm.state = ''
            this.listForm.effectivebegindate = ''
            this.listForm.effectiveenddate = ''
            this.$message({
              message: result.data.headers.message,
              type: "success"
            });
            // this.initList()
            post(service.queryGreenChannel, {
              bodys: {
                channelid:result.data.bodys.channelid,
              }
            })
            .then(result => {
              if (result.data.headers.code === "200") {
                this.tableData = result.data.bodys;
                this.total = result.data.bodys.total;
                this.channelid = ''
              }
            })
            .catch(error => {
            });
          }else if(result.data.headers.code === "200"&&result.data.headers.success == false){
            this.$message({
              message: result.data.headers.message,
              type: "error"
            });
          }
        })
        .catch(error => {
        })
      }else if(this.listForm.effectivebegindate == ''){
        post(service.saveGreenChannel,{
          bodys:{
            accidentpro:this.listForm.accidentpro,
            accidentcity:this.listForm.accidentcity,
            state:this.listForm.state,
            effectivedate:this.DateTime,
            invaliddate:this.listForm.effectiveenddate,
          }
        })
        .then(result => {
          if(result.data.headers.code === "200"&&result.data.headers.success == true){
            this.listForm.accidentpro = ''
            this.listForm.accidentcity = ''
            this.listForm.state = ''
            this.listForm.effectivebegindate = ''
            this.listForm.effectiveenddate = ''
            this.$message({
              message: result.data.headers.message,
              type: "success"
            });
            // this.initList()
            post(service.queryGreenChannel, {
              bodys: {
                channelid:result.data.bodys.channelid,
              }
            })
            .then(result => {
              if (result.data.headers.code === "200") {
                this.tableData = result.data.bodys;
                this.total = result.data.bodys.total;
                this.channelid = ''
              }
            })
            .catch(error => {
            });
          }else if(result.data.headers.code === "200"&&result.data.headers.success == false){
            this.$message({
              message: result.data.headers.message,
              type: "error"
            });
          }
        })
        .catch(error => {
        })
      }
      
    },
    stop(row,index){
      post(service.updateGreenChannel,{
        bodys:{
          channelid:row.channelid,
          state:'1',
        }
      })
      .then(result => {
        if(result.data.headers.code === "200"){
          row.state = '1'
        }
      })
      .catch(error => {
      })
    },
    delete2() {
      if (this.channelid == "") {
        this.$message.error("请先选择信息");
        return;
      }
      else{
        post(service.deleteGreenChannel,{
          bodys:{
            channelid:this.channelid
          }
        }).then(result => {
          if(result.data.headers.code === "200"&&result.data.headers.success == true){
            this.$message({
              message: result.data.headers.message,
              type: "success"
            });
            // this.initList()
            this.reload();
          }else{
            this.$message({
              message: result.data.headers.message,
              type: "error"
            });
          }
        }).catch(error =>{
        })
      }
    },
    toDetails(val) {
      this.currentRow = val;
      sessionStorage.setItem("rowA",JSON.stringify(val))
      if(this.currentRow.channelid){
        this.channelid = this.currentRow.channelid;
      }else{
        this.channelid = '';
      }
    },
    
    clearMes() {
      this.listForm.accidentcity = null;
      this.cityList = null;
    },
    clearArea() {
    },
    // 省--市
    changevince(key) {
      post(service.getCity, {
        bodys: {
          state: "city",
          code: key
        }
      }).then(res => {
        if (res.data.headers.code === "200") {
          this.cityList = res.data.bodys.rows;
          this.listForm.accidentcity = null;
        }
      });
    },
    // //通过市--县
    changaccity(key) {
      post(service.getCity, {
        bodys: {
          state: "country",
          code: key
        }
      }).then(res => {
        if (res.data.headers.code === "200") {
         
        }
      });
    },
    // 获取省
    getSheng() {
      post(service.getCity, {
        bodys: {
          state: "province",
          code: ""
        }
      }).then(res => {
        if (res.data.headers.code === "200") {
          this.provinceList = res.data.bodys.rows;
        }
      });
    },
    getCityCode() {
      if (this.listForm.accidentcity) {
        post(service.getCity, {
          bodys: {
            state: "city",
            code: this.listForm.accidentcity
          }
        }).then(res => {
          if (res.data.headers.code === "200") {
            this.cityList = res.data.bodys.rows;
          }
        });
        // this.changevince(this.dangerInfor.accidentcity)
      }
    },
    tableList() {
      this.displayData = [];
      for (
        var j = this.total * (this.currentPage - 1);
        j < this.total * this.currentPage;
        j++
      ) {
        if (this.tableData[j]) {
          this.displayData.push(this.tableData[j]);
        }
      }
    },
    currentChange: function(page) {
      this.currentPage = page;
      // this.tableList();
    },
    indexMethod(index) {
      return index + 1 + (this.currentPage - 1) * 10;
    },
   
  }
};
</script>
<style lang="less" scoped>
.greenConfig {
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
  .place {
    display: flex;
    .el-form-item__error {
      white-space: nowrap;
    }
    .el-select {
      width: 130px;
    }
    .risk_address {
      .el-form-item__content {
        margin-left: 8px !important;
      }
    }
    // .el-form-item {
    //   width: 100px;
    // }
    .place_des {
      .el-input__inner {
        width: 150px;
      }
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
  .block {
    background-color: #fff;
    height: 130px;
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
.greenConfig {
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
.greenConfig {
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
