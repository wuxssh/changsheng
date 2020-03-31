<template>
  <div class="generalMedical">
    <!-- 门诊 -->
    <div class="work_queue">
      <!-- <img src="../../assets/images/report/tab_btn@1x.png" alt=""> -->
      <span>普通门诊单证录入信息</span>
      <div class="box"></div>
    </div>
    <div class="work_table">
      <el-table
        ref="ruleForm"
        style="width: 100%"
        :data="commonOutpatient.slice((currentPage1-1)*pagesize1,currentPage1*pagesize1)"
        :header-cell-style="{color:'#555',textAlign:'center'}"
        :cell-style="{textAlign:'center'}"
      >
        <el-table-column label="序号" type="index" width="60" :index="indexMethod1"></el-table-column>
        <el-table-column prop="mainfeeno" label="收据编号" width="150">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp*&nbsp</span>
            <span>收据编号</span>
          </template>
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.mainfeeno"
              @blur="inputMainfeeno(scope.row)"
              maxlength="100"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="hospitalcode" label="医院名称" width="330">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp*&nbsp</span>
            <span>医院名称</span>
          </template>
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.hospitalcode"
              placeholder="请选择"
              v-el-select-loadmore="loadmores"
              filterable
              :filter-method="filtered"
              @focus="getRow(scope.row,scope.$index)"
            >
              <el-option
                v-for="item in newhospitalLists[scope.$index]"
                :key="item.hospitalcode"
                :label="item.hospitalname"
                :value="item.hospitcode"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="feedate" label="就诊时间" width="160" sortable>
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp*&nbsp</span>
            <span>就诊时间</span>
          </template>
          <template slot-scope="scope">
            <el-date-picker
              v-model="scope.row.feedate"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              @blur="changeFeeDate(scope.row)"
            ></el-date-picker>
          </template>
        </el-table-column>
        <el-table-column prop="billmoney" label="费用总金额" width="140">
          <template slot-scope="scope">
            <div
              v-if="scope.row.billmoney"
              class="riskcodePDF"
              @click="getDetail1(scope.row)"
            >{{ scope.row.billmoney }}</div>
            <el-button v-else size="mini" @click="getDetail1(scope.row)">录入明细</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="selfamnt" label="自费金额" width="140">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp*&nbsp</span>
            <span>自费金额</span>
          </template>
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.selfamnt"
              type="text"
              @blur="getAll(scope.row)"
              maxlength="13"
              min="0"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="socifee" label="统筹/附加金额" width="140">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.socifee"
              type="text"
              @blur="getAll(scope.row)"
              maxlength="13"
              min="0"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="sociflag" label="社保标志" width="120">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp*&nbsp</span>
            <span>社保标志</span>
          </template>
          <template slot-scope="scope">
            <el-select v-model="scope.row.sociflag">
              <el-option label="有" value="1"></el-option>
              <el-option label="无" value="0"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="otherfee" label="其他补偿" width="140">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.otherfee"
              type="text"
              @blur="getAll(scope.row)"
              maxlength="13"
              min="0"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="refusemoney" label="扣费明细" width="140">
          <template slot-scope="scope">
            <p>{{scope.row.refusemoney}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="indemnity" label="收据赔付金额" width="140">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp*&nbsp</span>
            <span>收据赔付金额</span>
          </template>
          <template slot-scope="scope">
            <p>{{scope.row.indemnity}}</p>
            <!-- <el-input v-model="scope.row.indemnity"  type="number" @blur="twoNum(scope.row)" min="0"></el-input> -->
          </template>
        </el-table-column>
        <el-table-column prop="operation" label="是否手术" width="120">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp*&nbsp</span>
            <span>是否手术</span>
          </template>
          <template slot-scope="scope">
            <el-select v-model="scope.row.operation" placeholder="请选择">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" @click="delete1(scope.row,scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top:10px;">
        <el-pagination
          style="display:inline-block;"
          background
          @size-change="handleSizeChange1"
          @current-change="handleCurrentChange1"
          :page-size="pagesize1"
          layout="prev, pager, next, jumper"
          :total="commonOutpatient.length"
        ></el-pagination>
        <el-button
          style="float: right;margin-right:30px;"
          type="primary"
          round
          @click="addRow1()"
        >增 加</el-button>
      </div>
      <div style="padding:10px 0;"></div>
    </div>
    <!-- 住院 -->
    <div class="work_queue" style="margin-top:20px;">
      <!-- <img src="../../assets/images/report/tab_btn@1x.png" alt=""> -->
      <span>普通住院单证录入信息</span>
      <div class="box"></div>
    </div>
    <div class="work_table">
      <el-table
        :data="commonHospital.slice((currentPage2-1)*pagesize2,currentPage2*pagesize2)"
        style="width: 100%"
        :header-cell-style="{color:'#555',textAlign:'center'}"
        :cell-style="{textAlign:'center'}"
      >
        <el-table-column label="序号" type="index" width="60" :index="indexMethod2"></el-table-column>
        <el-table-column prop="mainfeeno" label="收据编号" width="150">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp*&nbsp</span>
            <span>收据编号</span>
          </template>
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.mainfeeno"
              @blur="inputMainfeeno1(scope.row)"
              maxlength="100"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="hospitalcode" label="医院名称" width="330">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp*&nbsp</span>
            <span>医院名称</span>
          </template>
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.hospitalcode"
              placeholder="请选择"
              v-el-select-loadmore="loadmores1"
              filterable
              :filter-method="filtered1"
              @focus="getRow1(scope.row,scope.$index)"
            >
              <el-option
                v-for="item in newhospitalLists1[scope.$index]"
                :key="item.hospitalcode"
                :label="item.hospitalname"
                :value="item.hospitcode"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="hospstartdate" label="入院日期" width="160">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp*&nbsp</span>
            <span>入院日期</span>
          </template>
          <template slot-scope="scope">
            <el-date-picker
              v-model="scope.row.hospstartdate"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              @blur="changeHospstartdate(scope.row)"
            ></el-date-picker>
          </template>
        </el-table-column>
        <el-table-column prop="hospenddate" label="出院日期" width="160">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp*&nbsp</span>
            <span>出院日期</span>
          </template>
          <template slot-scope="scope">
            <el-date-picker
              v-model="scope.row.hospenddate"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              @blur="changeHospenddate(scope.row,scope.$index)"
            ></el-date-picker>
          </template>
        </el-table-column>
        <el-table-column prop="realhospdate" label="普通病房天数" width="140">
          <template slot-scope="scope">
            <!-- <el-input v-model="scope.row.realhospdate" @blur="checkUnumber1(scope.row)" min="1"></el-input> -->
            <el-input-number
              v-model="scope.row.realhospdate"
              @blur="checkUnumber1(scope.row,scope.$index)"
              controls-position="right"
              size="medium"
              :step="0.5"
              :max="realDate[scope.$index]+0.5"
              :min="realDate[scope.$index]-0.5"
            ></el-input-number>
          </template>
        </el-table-column>
        <el-table-column prop="imhospdate" label="重症病房天数" width="120">
          <template slot-scope="scope">
            <el-input-number
              v-model="scope.row.imhospdate"
              @blur="checkUnumber2(scope.row)"
              controls-position="right"
              size="medium"
              :step="0.5"
              :min="0"
            ></el-input-number>
            <!-- <el-input v-model="scope.row.imhospdate" @blur="checkUnumber2(scope.row)" min="1"></el-input> -->
          </template>
        </el-table-column>
        <el-table-column prop="billmoney" label="费用总金额" width="140">
          <template slot-scope="scope">
            <div
              v-if="scope.row.billmoney"
              class="riskcodePDF"
              @click="getDetail2(scope.row)"
            >{{ scope.row.billmoney }}</div>
            <el-button v-else size="mini" @click="getDetail2(scope.row,scope.$index)">录入明细</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="selfamnt" label="自费金额" width="140">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp*&nbsp</span>
            <span>自费金额</span>
          </template>
          <template slot-scope="scope">
            <!-- <p>{{scope.row.selfamnt}}</p> -->
            <el-input
              v-model="scope.row.selfamnt"
              type="text"
              @blur="getAll(scope.row)"
              maxlength="13"
              min="0"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="socifee" label="统筹/附加金额" width="140">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.socifee"
              type="text"
              @blur="getAll(scope.row)"
              maxlength="13"
              min="0"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="sociflag" label="社保标志" width="120">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp*&nbsp</span>
            <span>社保标志</span>
          </template>
          <template slot-scope="scope">
            <el-select v-model="scope.row.sociflag" placeholder="请选择">
              <el-option label="有" value="1"></el-option>
              <el-option label="无" value="0"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="otherfee" label="其他补偿" width="140">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.otherfee"
              type="text"
              @blur="getAll(scope.row)"
              maxlength="13"
              min="0"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="refusemoney" label="扣费明细" width="140">
          <template slot-scope="scope">
            <p>{{scope.row.refusemoney}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="indemnity" label="收据赔付金额" width="140">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp*&nbsp</span>
            <span>收据赔付金额</span>
          </template>
          <template slot-scope="scope">
            <p>{{scope.row.indemnity}}</p>
            <!-- <el-input v-model="scope.row.indemnity"  type="number" @blur="twoNum(scope.row)" min="0"></el-input> -->
          </template>
        </el-table-column>
        <el-table-column prop="operation" label="是否手术" width="120">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp*&nbsp</span>
            <span>是否手术</span>
          </template>
          <template slot-scope="scope">
            <el-select v-model="scope.row.operation" placeholder="请选择活动区域">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" @click="delete2(scope.row,scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top:10px;">
        <el-pagination
          style="display:inline-block;"
          background
          @size-change="handleSizeChange2"
          @current-change="handleCurrentChange2"
          :page-size="pagesize2"
          layout="prev, pager, next, jumper"
          :total="commonHospital.length"
        ></el-pagination>
        <el-button
          style="float: right;margin-right:30px;"
          type="primary"
          round
          @click="addRow2()"
        >增 加</el-button>
      </div>
    </div>
    <div style="text-align:right;margin:50px 28px 0 0;">
      <el-button type="primary" round @click="applyTask">保 存</el-button>
      <el-button type="primary" round @click="toAddFiling">返 回</el-button>
    </div>
    <!-- 提示框 -->
    <el-dialog title :visible.sync="dialogVisible" class="isshow" width="80%">
      <template>
        <p class="twoTitle">
          费用明细
          <el-button class="titleBtn" type="primary" @click="addRowItem1()">新增</el-button>
        </p>
      </template>
      <el-table
        :data="fyDetail.slice((currentPage3-1)*pagesize3,currentPage3*pagesize3)"
        center="true"
      >
        <el-table-column label="序号" type="index" width="50" :index="indexMethod3"></el-table-column>
        <el-table-column prop="feeitemname" label="费用项名称" width="160" align="center">
          <template slot="header" slot-scope="scope">
            <!-- <span class="redStars">&nbsp*&nbsp</span> -->
            <span>费用项名称</span>
          </template>
          <template slot-scope="scope">
            <el-select
              placeholder="请选择"
              v-model="scope.row.feeitemname"
              filterable
              clearable
              @change="changeFeeItem(scope.row.feeitemname,scope.row,'1')"
            >
              <!-- @focus="getFeeItem(scope.row.feeitemname,scope.row,'1')" -->
              <el-option
                v-for="(item,index) in fyxLists"
                :label="item.codename"
                :value="item.code"
                :key="index"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="feeitemdetil" label="费用名称明细" width="240" align="center">
          <template slot="header" slot-scope="scope">
            <!-- <span class="redStars">&nbsp*&nbsp</span> -->
            <span>费用名称明细</span>
          </template>
          <template slot-scope="scope">
            <el-select
              placeholder="请选择"
              v-model="scope.row.feeitemdetil"
              @change="changeFeeitemdetil(scope.row.feeitemdetil,scope.row,'1')"
              @focus="changeFeeitemdetil(scope.row.feeitemdetil,scope.row,'1')"
              v-el-select-loadmore="loadmore"
              filterable
              allow-create
              clearable
            >
              <el-option
                v-for="(item,index) in fyDetailList1"
                :key="index"
                :label="item.itemname"
                :value="item.id+'|@|'+item.itemname"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="fee" label="单价" width="130" align="center">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.fee"
              type="text"
              @blur="getSum(scope.row)"
              clearable
              maxlength="13"
              min="0"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="number" label="数量" width="100" align="center">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.number"
              type="text"
              @blur="getSum(scope.row)"
              clearable
              maxlength="13"
              min="0"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="费用金额" width="130" align="center">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp*&nbsp</span>
            <span>费用金额</span>
          </template>
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.price"
              type="text"
              clearable
              @blur="twoNum(scope.row)"
              maxlength="13"
              min="0"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="specifications" label="规格与单位" width="160" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.specifications" maxlength="100" clearable></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="healthcaretype" label="医保类别" width="160" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.healthcaretype" clearable maxlength="100"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="80" align="center">
          <template slot-scope="scope">
            <!-- <span class="delete" @click.native.prevent="deleteRow(scope.$index, gridData)"></span> -->

            <el-button size="mini" @click="delete3(scope.$index)">删除</el-button>
            <!-- <el-button size="mini" @click="dialogVisible = true">录入明细</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top:10px;">
        <el-pagination
          background
          @size-change="handleSizeChange3"
          @current-change="handleCurrentChange3"
          :page-size="pagesize3"
          layout="prev, pager, next, jumper"
          :total="fyDetail.length"
        ></el-pagination>
      </div>
      <template>
        <p class="twoTitle">
          扣费明细
          <el-button class="titleBtn" type="primary" @click="addRowItem2()">新增</el-button>
        </p>
      </template>
      <el-table
        :data="kfDetail.slice((currentPage4-1)*pagesize4,currentPage4*pagesize4)"
        center="true"
      >
        <el-table-column label="序号" type="index" width="50" :index="indexMethod4"></el-table-column>
        <el-table-column prop="deducttypes" label="扣费类型" align="center" width="160">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp*&nbsp</span>
            <span>扣费类型</span>
          </template>
          <template slot-scope="scope">
            <el-select
              placeholder="请选择"
              v-model="scope.row.deducttypes"
              @change="changeKoufeiItem(scope.row.deducttypes,scope.row,'1')"
            >
              <el-option
                v-for="(item,index) in koufeiTypes"
                :label="item.codename"
                :value="item.code"
                :key="index"
                filterable
                clearable
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="deductnames" label="扣费名称" align="center" width="240" clearable>
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp*&nbsp</span>
            <span>扣费名称</span>
          </template>
          <template slot-scope="scope">
            <!-- :filter-method="filtered(scope.row)" -->

            <el-select
              placeholder="请选择"
              v-model="scope.row.deductnames"
              @change="changeKouFei(scope.row.deductnames,scope.row,'1')"
              @focus="changeKouFei(scope.row.deductnames,scope.row,'1')"
              v-el-select-loadmore="loadmore1"
              filterable
              allow-create
              clearable
            >
              <el-option
                v-for="item in koufeiLists"
                :key="item.id"
                :label="item.itemname"
                :value="item.id+'|@|'+item.itemname"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="deductfee " label="扣费金额" align="center" width="130">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp*&nbsp</span>
            <span>扣费金额</span>
          </template>
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.deductfee"
              type="text"
              @blur="twoNum(scope.row)"
              maxlength="13"
              clearable
              min="0"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="deductreasontypes" label="扣费原因类型" width="200">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp*&nbsp</span>
            <span>扣费原因类型</span>
          </template>
          <template slot-scope="scope">
            <!-- <el-input v-model="scope.row.deductreasontypes" clearable></el-input> -->

            <el-select placeholder="请选择" v-model="scope.row.deductreasontypes">
              <el-option
                v-for="(item,index) in koufeiReason"
                :key="index"
                :label="item.codename"
                :value="item.code"
                filterable
                clearable
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="deductreasons" label="扣费原因" align="center" width="160">
          <template slot-scope="scope">
            <el-input v-model="scope.row.deductreasons" clearable maxlength="100"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="deductemark" label="备注" align="center" width="160">
          <template slot-scope="scope">
            <el-input v-model="scope.row.deductemark" maxlength="80" clearable></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="delete4(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top:10px;">
        <el-pagination
          background
          @size-change="handleSizeChange4"
          @current-change="handleCurrentChange4"
          :page-size="pagesize4"
          layout="prev, pager, next, jumper"
          :total="kfDetail.length"
        ></el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="beSure">确定</el-button>
        <el-button type="primary" @click="dialogVisible = false">返回</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
import { post, service } from "../../utils/request.js";
import { generateUUID, getDate, getTime } from "../../utils/common.js";
import {
  checkdeff,
  checkLfor3,
  checkMfor,
  sumDays,
  checkLfor1,
  checkLfor2,
  accMul,
  numTwo,
  getCodeType
} from "../../utils/service.js";
export default {
  name: "GeneralMedical",
  directives: {
    "el-select-loadmore": {
      bind(el, binding) {
        //  console.log(arg)
        const elsss = el.querySelector(
          ".el-select-dropdown .el-select-dropdown__wrap"
        );
        elsss.addEventListener("scroll", function() {
          const condition =
            this.scrollHeight - this.scrollTop - 1 <= this.clientHeight;
          if (condition) {
            binding.value();
          }
        });
      }
    }
  },
  data() {
    return {
      hosState: "",
      pageData: {
        startPage: 0,
        endPage: 100
      },
      pageData1: {
        startPage: 0,
        endPage: 100
      },
      pageData2: {
        startPage: 0,
        endPage: 100
      },
      pageData3: {
        startPage: 0,
        endPage: 100
      },
      hospitalLists: [],
      hospitalListsname: "",
      newhospitalLists: [],

      hosState1: "",
      hospitalLists1: "",
      hospitalListsname1: "",
      newhospitalLists1: [],
      pagesize1: 10,
      currentPage1: 1,
      pagesize2: 10,
      currentPage2: 1,
      pagesize3: 10,
      currentPage3: 1,
      pagesize4: 10,
      currentPage4: 1,
      mainData1: null,
      mainData2: null,
      dialogVisible: false,
      medicalList: [],
      getNumList: [],
      fyxLists: [],
      fyDetailList1: [],
      fyListCode: "",
      kyListCode: "",
      lastTask: "",

      koufeiTypes: [], // 扣费类型
      // 显示代码+名称
      koufeiReason: [], // 扣费原因类型
      commonOutpatient: [], //普通门诊
      kfDetail: [], // 扣费明细
      commonHospital: [], // 普通住院
      fyDetail: [], // 费用明细
      inhospital: null, // 入院日期
      hospitalName: null, // 医院名称
      outhospital: null, //出院日期
      death: null, //身故日期
      accent: null, //出险日期
      ordTime: null, //普通病房天数
      koufeiLists: [],
      realDate: []
    };
  },
  mounted() {
    this.koufeiReason = getCodeType("deductionReason");
  },

  created() {
    if (
      JSON.parse(this.$route.params.dataOfTable).rgtno &&
      JSON.parse(this.$route.params.dataOfTable).customerno
    ) {
      this.getCfee();
    }
    this.rgtno = this.$route.query.rgtno;
    this.getFeeItem();
    this.changeKouFei(this.pageData);
    this.changeFeeitemdetil(this.pageData);

    // this.getHospitalss();
    this.getHospitals();
    this.getHospitals1();
  },
  methods: {
    // 门诊医院
    filtered(val) {
      this.pageData1.startPage = 0;
      this.pageData1.endPage = 100;
      if (val != "") {
        setTimeout(() => {
          for (let key in this.commonOutpatient) {
            if (this.hosState == key) {
              this.commonOutpatient[key].hospitalcode = val;
              this.hospitalListsname = val;
              this.getHospitals(val);
            }
          }
        }, 200);
      }
    },
    getRow(row, index) {
      row.hospitalcode = "";
      this.hosState = index;
      this.hospitalListsname = "";
      this.pageData1.startPage = 0;
      this.pageData1.endPage = 100;
      post(service.getHospital, {
        pagestart: this.pageData1.startPage,
        pageend: this.pageData1.endPage,
        likename: row.hospitalcode || ""
      }).then(res => {
        this.hospitalLists = res.data.bodys;
        this.newhospitalLists.push(this.hospitalLists);
        this.newhospitalLists[index] = res.data.bodys;
      });
    },
    // 医院
    getHospitals() {
      setTimeout(() => {
        for (let key in this.commonOutpatient) {
          post(service.getHospital, {
            pagestart: this.pageData1.startPage,
            pageend: this.pageData1.endPage,
            likename: this.commonOutpatient[key].hospitalcode || ""
          }).then(res => {
            this.hospitalLists = res.data.bodys;
            this.newhospitalLists.push(this.hospitalLists);
            this.newhospitalLists[key] = res.data.bodys;
          });
        }
      }, 800);
    },
    loadmores() {
      this.pageData1.startPage += 100;
      this.pageData1.endPage += 100;
      post(service.getHospital, {
        pagestart: this.pageData1.startPage,
        pageend: this.pageData1.endPage,
        likename: this.hospitalListsname || ""
      }).then(res => {
        this.hospitalLists = [...this.hospitalLists, ...res.data.bodys];
        this.newhospitalLists.push(this.hospitalLists);
        this.newhospitalLists[this.hosState] = [
          ...this.hospitalLists,
          ...res.data.bodys
        ];
      });
    },
    // ---------------------------------------------------------------
    // 住院医院
    filtered1(val) {
      // row.hospitalcode = val;
      this.pageData2.startPage = 0;
      this.pageData2.endPage = 100;
      if (val != "") {
        setTimeout(() => {
          for (let key in this.commonHospital) {
            if (this.hosState1 == key) {
              this.commonHospital[key].hospitalcode = val;
              this.hospitalListsname1 = val;
              this.getHospitals1(val);
            }
          }
        }, 200);
      }
    },
    getRow1(row, index) {
      row.hospitalcode = "";
      this.hosState1 = index;
      this.hospitalListsname1 = "";
      this.pageData2.startPage = 0;
      this.pageData2.endPage = 100;
      post(service.getHospital, {
        pagestart: this.pageData2.startPage,
        pageend: this.pageData2.endPage,
        likename: row.hospitalcode || ""
      }).then(res => {
        this.hospitalLists1 = res.data.bodys;
        this.newhospitalLists1.push(this.hospitalLists1);
        this.newhospitalLists1[index] = res.data.bodys;
      });
    },
    // 医院
    getHospitals1() {
      setTimeout(() => {
        for (let key in this.commonHospital) {
          post(service.getHospital, {
            pagestart: this.pageData2.startPage,
            pageend: this.pageData2.endPage,
            likename: this.commonHospital[key].hospitalcode || ""
          }).then(res => {
            this.hospitalLists1 = res.data.bodys;
            this.newhospitalLists1.push(this.hospitalLists1);
            this.newhospitalLists1[key] = res.data.bodys;
          });
        }
      }, 800);
    },
    loadmores1() {
      this.pageData2.startPage += 100;
      this.pageData2.endPage += 100;
      post(service.getHospital, {
        pagestart: this.pageData2.startPage,
        pageend: this.pageData2.endPage,
        likename: this.hospitalListsname1 || ""
      }).then(res => {
        this.hospitalLists1 = [...this.hospitalLists1, ...res.data.bodys];
        this.newhospitalLists1.push(this.hospitalLists1);
        this.newhospitalLists1[this.hosState1] = [
          ...this.hospitalLists1,
          ...res.data.bodys
        ];
      });
    },
    // ------<toFixed重写>-----
    round(num, decimal) {
      if (isNaN(num)) {
        return 0;
      }
      const p1 = Math.pow(10, decimal + 1);
      const p2 = Math.pow(10, decimal);
      return Math.round((num * p1) / 10) / p2;
    },
    toFixeds(num, decimal) {
      return this.round(num, decimal).toFixed(decimal);
    },
    // --------<End>----------
    handleSizeChange(val) {
      // debugger;
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      // debugger;
      this.currpage = val;
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
      console.log(this.displayData);
    },
    currentChange: function(page) {
      // 选择第几页
      this.currentPage = page;
      this.tableList();
    },

    // 保留两位
    twoNum(obj) {
      if (obj.selfamnt > 0) {
        obj.selfamnt = this.toFixeds(parseFloat(obj.selfamnt), 2);
        // obj.selfamnt = parseFloat(obj.selfamnt).toFixed(2)
      } else if (obj.selfamnt == 0) {
        obj.selfamnt = 0;
      } else {
        obj.selfamnt = null;
      }
      //  if(obj.indemnity>=0) {
      //   obj.indemnity = parseFloat(obj.indemnity).toFixed(2)

      //  }else{
      //    obj.indemnity = null
      //  }
      if (obj.price >= 0) {
        obj.price = this.toFixeds(parseFloat(obj.price), 2);
      } else {
        obj.price = null;
      }

      if (obj.deductfee >= 0) {
        obj.deductfee = this.toFixeds(parseFloat(obj.deductfee), 2);
      } else {
        obj.deductfee = null;
      }
    },
    checkUnumber1(row,index) {
      // let aa = /(^[1-9]([0-9]*)$|^[0-9]$)/;
      // this.realDate
      let aa = /^[0-9]+([.]{1}[5]){0,1}$/;
      if (!aa.test(row.realhospdate)) {
        // this.$message({
        //   message: "普通病房天数要大于0",
        //   type: "error"
        // });
        row.realhospdate = realDate[index];
      }
    },
    checkUnumber2(data) {
      // let aa = /(^[1-9]([0-9]*)$|^[0-9]$)/;
      let aa = /^[0-9]+([.]{1}[5]){0,1}$/;
      if (!aa.test(data.imhospdate)) {
        // this.$message({
        //   message: "重症病房天数要大于0",
        //   type: "error"
        // });
        data.imhospdate = 0;
      }
    },
    // 获取所有存在的编号
    // 获取普通门诊单证跟普通单证明细
    // 就诊时间不能大于当前时间
    changeFeeDate(key) {
      if ((new Date() - new Date(key.feedate).getTime()) / 1000 < 0) {
        this.$message({
          message: "就诊时间不能大于当前日期",
          type: "error"
        });
        key.feedate = null;
      }
    },
    //  收据赔付金额 = 费用总金额-统筹/附加金额-其他补偿-扣费明细；
    getAll(res) {
      if (res.selfamnt > 0) {
        res.selfamnt = this.toFixeds(parseFloat(res.selfamnt), 2);
      } else if (res.selfamnt == 0) {
        res.selfamnt = 0;
      } else {
        res.selfamnt = null;
      }

      if (res.socifee >= 0) {
        res.socifee = this.toFixeds(parseFloat(res.socifee), 2);
      } else if (res.socifee == "") {
        res.socifee = 0.0;
      } else {
        res.socifee = null;
      }
      if (res.otherfee >= 0) {
        res.otherfee = this.toFixeds(parseFloat(res.otherfee), 2);
      } else if (res.otherfee == "") {
        this.otherfee == 0.0;
      } else {
        res.otherfee = null;
      }
      // {
      //   res.otherfee = null;
      //   res.indemnity = null;
      // }
      if (
        res.billmoney != null &&
        res.socifee != null &&
        res.otherfee != null &&
        res.refusemoney != null
      ) {
        // if(res.billmoney.toString()&&res.socifee&&res.otherfee&&res.refusemoney.toString()) {
        // debugger;
        var tbillmoney = parseFloat(res.billmoney);
        var tsocifee = parseFloat(res.socifee);
        var totherfee = parseFloat(res.otherfee);
        var trefusemoney = parseFloat(res.refusemoney);
        var tselfamnt = parseFloat(res.selfamnt);
        // res.indemnity = parseFloat(res.billmoney)- parseFloat(res.socifee)- parseFloat(res.otherfee) - parseFloat(res.refusemoney)

        res.indemnity = this.toFixeds(
          tbillmoney - tsocifee - trefusemoney - totherfee - tselfamnt,
          2
        );
        return;
        // }else{
        //   res.indemnity = null
        // }
      } else {
        res.indemnity = null;
      }
    },
    changeHospstartdate(key) {
      // if (key.hospstartdate) {
      //   if (this.commonHospital.length > 1) {
      //     if (
      //       (new Date(
      //         this.commonHospital[this.commonHospital.length - 2].hospenddate
      //       ).getTime() -
      //         new Date(key.hospstartdate).getTime()) /
      //         1000 >
      //       0
      //     ) {
      //       this.$message({
      //         message: "住院日期不能重叠",
      //         type: "error"
      //       });
      //       key.hospstartdate = null;
      //       return;
      //     }
      //   }
      // }
      if (key.hospstartdate && key.hospenddate) {
        if (
          (new Date(key.hospstartdate).getTime() -
            new Date(key.hospenddate).getTime()) /
            1000 >
          0
        ) {
          this.$message({
            message: "入院日期不能大于出院日期",
            type: "error"
          });
          key.hospstartdate = null;
          return;
        }
      }
      // if (this.accent) {
      // if (
      //   (new Date(this.accent).getTime() -
      //     new Date(key.hospstartdate).getTime()) /
      //     1000 <
      //   0
      // ) {
      //   // this.$message({
      //   //   message: "入院日期不能大于出险日期",
      //   //   type: "error"
      //   // });
      //   key.hospstartdate = null;
      // }
      if (key.hospenddate && key.hospstartdate) {
        if (key.hospenddate == key.hospstartdate) {
          key.realhospdate = sumDays(key.hospstartdate, key.hospenddate) + 1;
        } else {
          key.realhospdate = sumDays(key.hospstartdate, key.hospenddate);
        }
      }
      // }
    },
    changeHospenddate(key, index) {
      if (key.hospstartdate && key.hospenddate) {
        if (
          (new Date(key.hospstartdate).getTime() -
            new Date(key.hospenddate).getTime()) /
            1000 >
          0
        ) {
          this.$message({
            message: "出院日期不能小于入院日期",
            type: "error"
          });
          key.hospenddate = null;
          return;
        }
      }

      //  if(key.hospenddate) {
      // if ((new Date() - new Date(key.hospenddate).getTime()) / 1000 < 0) {
      //   this.$message({
      //     message: "出院日期不能大于当前日期",
      //     type: "error"
      //   });
      //   key.hospenddate = null;
      // }
      if (key.hospenddate && key.hospstartdate) {
        if (key.hospenddate == key.hospstartdate) {
          key.realhospdate = sumDays(key.hospstartdate, key.hospenddate) + 1;
        } else {
          key.realhospdate = sumDays(key.hospstartdate, key.hospenddate);
        }
        this.realDate[index] = key.realhospdate;
        console.log("SSS2", this.realDate);
      }

      // if (key.hospenddate && this.death) {
      //   if (this.death) {
      //     if (
      //       (new Date(this.death).getTime() -
      //         new Date(key.hospenddate).getTime()) /
      //         1000 <
      //       0
      //     ) {
      //       // this.$message({
      //       //   message: "出院日期不能大于身故日期",
      //       //   type: "error"
      //       // });
      //       key.hospenddate = null;
      //     }
      //   }
      // }
    },
    inputMainfeeno(obj) {
      var newArr = [];
      newArr = this.commonOutpatient.map(e => {
        return e.mainfeeno;
      });
      if (obj.mainfeeno) {
        if (
          !checkdeff(newArr, obj.mainfeeno, "1") ||
          !checkdeff(this.getNumList, obj.mainfeeno, "2")
        ) {
          this.$message({
            message: "医疗收据编号重复录入",
            type: "error"
          });
          obj.mainfeeno = null;
        }
      }
    },
    inputMainfeeno1(obj) {
      var newArr = [];
      newArr = this.commonHospital.map(e => {
        return e.mainfeeno;
      });
      if (obj.mainfeeno) {
        if (
          !checkdeff(newArr, obj.mainfeeno, "1") ||
          !checkdeff(this.getNumList, obj.mainfeeno, "2")
        ) {
          this.$message({
            message: "医疗收据编号重复录入",
            type: "error"
          });
          obj.mainfeeno = null;
        }
      }
    },
    searchNum() {
      post(service.getDeffNum, {
        bodys: {
          // 1909120081801
          clmno: JSON.parse(this.$route.params.dataOfTable).rgtno,
          // JSON.parse(this.$route.params.dataOfTable).rgtno
          customerno: JSON.parse(this.$route.params.dataOfTable).customerno
        }
      }).then(result => {
        if (result.data.headers.code == "200") {
          this.getNumList = result.data.bodys.rows;
        }
      });
    },
    getSum(obj) {
      if (obj.number >= 0) {
        obj.number = this.toFixeds(parseFloat(obj.number), 2);
      } else {
        obj.number = null;
      }
      if (obj.fee >= 0) {
        obj.fee = this.toFixeds(parseFloat(obj.fee), 2);
      } else {
        obj.fee = null;
      }

      if (obj.fee && obj.number) {
        obj.price = this.toFixeds(accMul(obj.fee, obj.number), 2);
        if (obj.price.length > 16) {
          this.$message.error("费用金额超出限制，请重新调整单价或数量！");
          obj.price = null;
        }
      }
    },
    getFeeItem() {
      post(service.getCodeList, {
        codetype: ["llfeeitem", "deductiontype"]
      }).then(res => {
        console.log("333", res);
        this.fyxLists = res.data.bodys.llfeeitem;
        this.koufeiTypes = res.data.bodys.deductiontype;
      });
    },
    changeFeeItem(type, obj, status) {
      // 选择费用项带出费用项详情
      obj.feeitemdetil = "";
      this.fyDetailList1 = [];
      this.pageData.startPage = 0;
      this.pageData.endPage = 100;
      for (var key in this.fyxLists) {
        if (type == this.fyxLists[key].code) {
          this.fyListCode = this.fyxLists[key].code;
        }
      }
      console.log("code111", this.fyListCode);
    },
    changeKoufeiItem(type, obj, status) {
      obj.deductnames = "";
      this.koufeiLists = [];
      this.pageData.startPage = 0;
      this.pageData.endPage = 100;
      for (var key in this.koufeiTypes) {
        if (type == this.koufeiTypes[key].code) {
          this.kyListCode = this.koufeiTypes[key].code;
        }
      }
      console.log("code222", this.kyListCode);
      console.log(this.kyListCode);
    },
    //     getHospitals() {
    //   post(service.getHospital, {
    //     pagestart: this.pageData.startPage,
    //     pageend: this.pageData.endPage,
    //     likename: this.objForm.hospitalname
    //   }).then(res => {
    //     console.log("xx111xxx", res);
    //     this.hospitalLists = res.data.bodys;
    //   });
    // },
    // changeHospital() {
    //   this.pageData.startPage = 0;
    //   this.pageData.endPage = 100;
    // },

    // loadmore() {
    //   this.pageData2.startPage += 100;
    //   this.pageData2.endPage += 100;
    //   this.changeFeeitemdetil(this.pageData);
    // },
    loadmore() {
      this.pageData2.startPage += 100;
      this.pageData2.endPage += 100;
      // this.getHospitals(this.pageData);
      post(service.llfeeitem, {
        pagestart: this.pageData2.startPage,
        pageend: this.pageData2.endPage,
        code: this.fyListCode,
        likename: ""
      }).then(res => {
        this.fyDetailList1 = [...this.hospitalLists, ...res.data.bodys];
      });
    },
    changeFeeitemdetil() {
      post(service.llfeeitem, {
        pagestart: this.pageData2.startPage,
        pageend: this.pageData2.endPage,
        code: this.fyListCode,
        likename: ""
      }).then(res => {
        console.log("xx111xxx", res);
        this.fyDetailList1 = res.data.bodys;
      });
    },

    // filtered(row) {
    //   if (row.deductnames != "") {
    //     this.changeKouFei(row.deductnames);
    //   }
    // },
    // filtered(obj) {
    //   console.log("sssssssssssssssssssss", obj.deductnames);
    //   if (obj.deductnames != "") {
    //     this.changeKouFei(obj.deductnames);
    //   }
    // },

    // 扣费明细
    loadmore1(row) {
      this.pageData3.startPage += 100;
      this.pageData3.endPage += 100;
      // this.changeKouFei(this.pageData)
      post(service.llfeeitem, {
        pagestart: this.pageData3.startPage,
        pageend: this.pageData3.endPage,
        code: this.kyListCode,
        likename: row.deductnames
      }).then(res => {
        this.koufeiLists = [...this.koufeiLists, ...res.data.bodys];
      });
    },
    changeKouFei(row) {
      post(service.llfeeitem, {
        pagestart: this.pageData3.startPage,
        pageend: this.pageData3.endPage,
        code: this.kyListCode,
        likename: row.deductnames
      }).then(res => {
        this.koufeiLists = res.data.bodys;
        // this.koufeiLists = [...this.koufeiLists, ...res.data.bodys];
      });
    },
    // 获取医疗账单信息
    getCfee() {
      post(service.getcfee, {
        bodys: {
          // 1909120081801
          rgtno: JSON.parse(this.$route.params.dataOfTable).rgtno
          // JSON.parse(this.$route.params.dataOfTable).rgtno
        }
      }).then(result => {
        if (result.data.headers.code == "200") {
          this.searchNum();
          this.commonOutpatient = result.data.bodys.rows[0].MenZhen;
          this.commonHospital = result.data.bodys.rows[0].ZhuYuan;
          this.hospitalName = result.data.bodys.rows[0].hospitalcode; // 医院名称
          this.outhospital = result.data.bodys.rows[0].outhospitaldate; // 出院日期
          this.inhospital = result.data.bodys.rows[0].inhospitaldate; // 入院日期
          this.death = result.data.bodys.rows[0].deathdate; // 入院日期
          this.accent = result.data.bodys.rows[0].accdate; // 出险日期
          this.ordTime =
            sumDays(
              result.data.bodys.rows[0].inhospitaldate,
              result.data.bodys.rows[0].outhospitaldate
            ) + 1; //普通病房天数
          // 普通病房天数修改时上下浮动0.5
          for (let key = 0; key < this.commonHospital.length; key++) {
            if (
              this.commonHospital[key].hospenddate &&
              this.commonHospital[key].hospstartdate
            ) {
              if (
                this.commonHospital[key].hospenddate ==
                this.commonHospital[key].hospstartdate
              ) {
                this.realDate[key] =
                  sumDays(
                    this.commonHospital[key].hospstartdate,
                    this.commonHospital[key].hospenddate
                  ) + 1;
              } else {
                this.realDate[key] = sumDays(
                  this.commonHospital[key].hospstartdate,
                  this.commonHospital[key].hospenddate
                );
              }
              // this.realDate[key] = this.commonHospital[key].realhospdate;
            }
          }
        } else {
          this.searchNum();
        }
      });
    },
    delete1(row, index) {
      // 删除普通门诊
      post(service.deletefeemain, {
        bodys: {
          clmno: JSON.parse(this.$route.params.dataOfTable).rgtno,
          mainfeeno: row.mainfeeno
        }
      }).then(res => {
        this.$message({
          message: "删除成功",
          type: "success"
        });
        this.commonOutpatient.splice(index, 1);
      });
    },
    // commonHospital
    delete2(row, index) {
      // 删除普通住院
      post(service.deletefeemain, {
        bodys: {
          clmno: JSON.parse(this.$route.params.dataOfTable).rgtno,
          mainfeeno: row.mainfeeno
        }
      }).then(res => {
        this.$message({
          message: "删除成功",
          type: "success"
        });
        this.commonHospital.splice(index, 1);
      });
    },
    delete3(index) {
      // 删除普通门诊
      this.fyDetail.splice(index, 1);
    },
    delete4(index) {
      // 删除住院
      this.kfDetail.splice(index, 1);
    },
    addRow1() {
      // 普通门诊
      // console.log("AA", this.commonOutpatient.length + 1);
      this.commonOutpatient.push({
        feetype: "A",
        clmno: JSON.parse(this.$route.params.dataOfTable).rgtno,
        // clmno: this.$route.params.rgtno,
        mainfeeno: null, //收据编号
        hospitalcode: JSON.parse(this.$route.params.dataOfTable).hospitalcode, // 医院名称
        // hospitalcode: this.$route.params.hospitalcode, // 医院名称
        feedate: null, // 就诊时间
        billmoney: null, // 费用总金额
        selfamnt: null, // 自费金额
        socifee: null, // 统筹附加金额
        sociflag: "1", // 社保标志
        otherfee: null, // 其他补偿
        refusemoney: null, // 扣费明细
        indemnity: null, // 收据赔付金额
        operation: "0", // 是否手术
        ecmno: this.commonOutpatient.length + 1
      });
      this.hospitalListsname = "";
      this.pageData1.startPage = 0;
      this.pageData1.endPage = 100;
      this.getHospitals();
    },
    addRow2() {
      // 住院
      // console.log("BB", this.commonHospital.length + 1);
      this.commonHospital.push({
        feetype: "B",
        clmno: JSON.parse(this.$route.params.dataOfTable).rgtno,
        mainfeeno: null, //收据编号
        hospitalcode: JSON.parse(this.$route.params.dataOfTable).hospitalcode, // 医院名称
        hospstartdate: this.inhospital, // 入院日期
        hospenddate: this.outhospital, // 出院日期
        billmoney: null, // 费用总金额
        realhospdate: this.ordTime || "", // 普通病房天数
        imhospdate: null, // 重症病房天数
        selfamnt: null, // 自费金额
        socifee: null, // 统筹附加金额
        sociflag: "1", // 社保标志
        otherfee: null, // 其他补偿
        refusemoney: null, // 扣费明细
        indemnity: null, // 收据赔付金额
        operation: "0", // 是否手术
        ecmno: this.commonHospital.length + 1
      });
      this.hospitalListsname1 = "";
      (this.pageData2.startPage = 0),
        (this.pageData2.endPage = 100),
        this.getHospitals1();
    },
    addRowItem1() {
      // 普通门诊的费用明细
      this.fyDetail.push({
        feeitemname: "", // 费用项名称
        feeitemdetil: "", // 费用名称明细
        fee: "", //单价
        number: "", //数量
        price: "", //费用金额
        specifications: "", //规格与单价
        healthcaretype: "" //医保类别
      });
    },
    addRowItem2() {
      this.kfDetail.push({
        deductnames: "", // //扣费名称
        deductreasontypes: "", // 扣费原因类型
        deductemark: "", //备注
        deductreasons: "", // 扣费原因
        deductfee: "", //扣费金额
        deducttypes: "" // 扣费类型MenZhen
      });
    },
    // 获取门诊详细
    getDetail1(data) {
      if (!data.mainfeeno) {
        this.$message({
          message: "请先录入收据编号",
          type: "error"
        });
      } else {
        this.dialogVisible = true;
        this.mainData1 = data;
        post(service.getcfeeDetail, {
          bodys: {
            // rgtno:JSON.parse(this.$route.params.dataOfTable).rgtno,
            rgtno: JSON.parse(this.$route.params.dataOfTable).rgtno,
            mainfeeno: data.mainfeeno
          }
        }).then(result => {
          if (result.data.headers.code === "200") {
            //  this.commonOutDetail =  res.data.headers
            this.kfDetail = result.data.bodys.rows[0].deduct;
            this.fyDetail = result.data.bodys.rows[0].receipt;
            if (this.fyDetail.length == 0) {
              this.addRowItem1();
            }
          } else if (result.data.headers.code === "500") {
            this.kfDetail = [];
            this.fyDetail = [];
          }
        });
      }
    },
    // 获取住院详细
    getDetail2(data) {
      if (!data.mainfeeno) {
        this.$message({
          message: "请先录入收据编号",
          type: "error"
        });
      } else {
        this.dialogVisible = true;
        this.mainData1 = data; // 住院
        post(service.getcfeeDetail, {
          bodys: {
            // rgtno:JSON.parse(this.$route.params.dataOfTable).rgtno,
            rgtno: JSON.parse(this.$route.params.dataOfTable).rgtno,
            mainfeeno: data.mainfeeno
          }
        }).then(result => {
          if (result.data.headers.code === "200") {
            //  this.commonOutDetail =  res.data.headers
            this.kfDetail = result.data.bodys.rows[0].deduct;
            this.fyDetail = result.data.bodys.rows[0].receipt;
            console.log("ggggg", this.kfDetail);

            if (this.fyDetail.length == 0) {
              this.addRowItem1();
            }
          } else if (result.data.headers.code === "500") {
            this.kfDetail = [];
            this.fyDetail = [];
          }
        });
      }
    },
    //医疗单证录入 // 门诊
    beSure() {
      // 通过明细获取费用总金额跟扣费明细
      let _this = this;
      if (_this.kfDetail.length == 0 && _this.fyDetail.length == 0) {
        this.$message({
          message: "请添加一条明细记录",
          type: "error"
        });
      } else if (checkLfor1(_this.fyDetail) || checkLfor2(_this.kfDetail)) {
        this.$message({
          message: checkLfor1(_this.fyDetail)
            ? checkLfor1(_this.fyDetail)
            : checkLfor2(_this.kfDetail),
          type: "error"
        });
      } else {
        if (this.mainData1.feetype == "A") {
          post(service.savecpay, {
            bodys: {
              remark: "1",
              customerno: JSON.parse(_this.$route.params.dataOfTable)
                .customerno,
              operator: localStorage.getItem("userCode"),
              mngcom: localStorage.getItem("comCode"),
              commonMedicineRequest: _this.mainData1,
              medicinerequestdeductlist: _this.kfDetail, //扣费明细
              medicinerequestreceiptlist: _this.fyDetail // 费用明细
            }
          }).then(result => {
            if (result.data.headers && result.data.headers.code === "200") {
              _this.mainData1.refusemoney = result.data.bodys.rows[0].deductfee; // 扣费明细
              _this.mainData1.billmoney = result.data.bodys.rows[0].receiptfee; // 费用总
              console.log(result.data.bodys.rows[0].receiptfee);
              var tbillmoney = parseFloat(_this.mainData1.billmoney);
              var tsocifee = isNaN(this.mainData1.socifee)
                ? 0
                : this.mainData1.socifee;
              console.log(isNaN(tsocifee));
              var totherfee = isNaN(this.mainData1.otherfee)
                ? 0
                : this.mainData1.otherfee;
              //
              var tselfamnt = isNaN(this.mainData1.selfamnt)
                ? 0
                : this.mainData1.selfamnt;
              var trefusemoney = isNaN(this.mainData1.refusemoney)
                ? 0
                : this.mainData1.refusemoney;
              _this.mainData1.indemnity = this.toFixeds(
                tbillmoney - tsocifee - trefusemoney - totherfee - tselfamnt,
                2
              );
              // tselfamnt
              _this.dialogVisible = false;
              this.$message({
                message: "普通门诊明细费用提交成功",
                type: "success"
              });
            } else if (
              result.data.headers &&
              result.data.headers.code === "500"
            ) {
              this.$message({
                message: "普通门诊明细费用提交失败",
                type: "error"
              });
            } else {
              this.$message({
                message: "普通门诊明细费用提交失败",
                type: "error"
              });
            }
          });
        } else if (_this.mainData1.feetype == "B") {
          post(service.savecpay, {
            bodys: {
              customerno: JSON.parse(_this.$route.params.dataOfTable)
                .customerno,
              operator: localStorage.getItem("userCode"),
              mngcom: localStorage.getItem("comCode"),
              commonMedicineRequest: _this.mainData1,
              medicinerequestdeductlist: _this.kfDetail, //扣费明细
              medicinerequestreceiptlist: _this.fyDetail // 费用明细
            }
          }).then(result => {
            if (result.data.headers && result.data.headers.code === "200") {
              _this.mainData1.refusemoney = result.data.bodys.rows[0].deductfee; // 扣费明细
              _this.mainData1.billmoney = result.data.bodys.rows[0].receiptfee; // 费用总

              var tbillmoney = parseFloat(_this.mainData1.billmoney);
              var tsocifee = isNaN(_this.mainData1.socifee)
                ? 0
                : _this.mainData1.socifee;
              var totherfee = isNaN(_this.mainData1.otherfee)
                ? 0
                : _this.mainData1.otherfee;
              var trefusemoney = isNaN(_this.mainData1.refusemoney)
                ? 0
                : _this.mainData1.refusemoney;
              var tselfamnt = isNaN(_this.mainData1.selfamnt)
                ? 0
                : _this.mainData1.selfamnt;
              _this.mainData1.indemnity = this.toFixeds(
                tbillmoney - tsocifee - trefusemoney - totherfee - tselfamnt,
                2
              );
              _this.dialogVisible = false;
              this.$message({
                message: "普通住院明细费用提交成功",
                type: "success"
              });
            } else if (
              result.data.headers &&
              result.data.headers.code === "500"
            ) {
              this.$message({
                message: "普通住院明细费用提交失败",
                type: "error"
              });
            } else {
              this.$message({
                message: "普通住院明细费用提交失败",
                type: "error"
              });
            }
          });
        }
      }
    },
    handleClose() {},
    toAddFiling() {
      this.$router.go(-1);
    },
    codeToname: function(obj, arr) {
      var a = null;
      arr.forEach(element => {
        if (element.code === obj) {
          a = element.name;
        }
      });
      return a;
    },
    //  获取医疗单证列表

    // 录入医疗单证
    applyTask() {
      // debugger;
      if (
        this.commonOutpatient.length == 0 &&
        this.commonHospital.length == 0
      ) {
        this.$message({
          message: "请添加一条数据",
          type: "error"
        });
      } else if (
        checkMfor(this.commonOutpatient, "1") ||
        checkMfor(this.commonHospital, "2")
      ) {
        this.$message({
          message: checkMfor(this.commonOutpatient, "1")
            ? checkMfor(this.commonOutpatient, "1")
            : checkMfor(this.commonHospital, "2"),
          type: "error"
        });
      } else {
        var allArr = this.commonOutpatient.concat(this.commonHospital);
        post(service.submitcfee, {
          bodys: {
            customerno: JSON.parse(this.$route.params.dataOfTable).customerno,
            operator: localStorage.getItem("userCode"),
            mngcom: localStorage.getItem("comCode"),
            commonlist: allArr,
            remark: "1"
          }
        }).then(result => {
          if (result.data.headers.code === "200") {
            this.$message({
              message: result.data.headers.message,
              type: "success"
            });
          } else {
            this.$message({
              message: result.data.headers.message,
              type: "error"
            });
          }
        });
      }
    },
    indexMethod1(index) {
      return index + 1 + (this.currentPage1 - 1) * 10;
    },
    indexMethod2(index) {
      return index + 1 + (this.currentPage2 - 1) * 10;
    },
    indexMethod3(index) {
      return index + 1 + (this.currentPage3 - 1) * 10;
    },
    indexMethod4(index) {
      return index + 1 + (this.currentPage4 - 1) * 10;
    },
    handleSizeChange1(val) {
      this.pagesize1 = val;
    },
    handleCurrentChange1(val) {
      this.currentPage1 = val;
    },
    handleSizeChange2(val) {
      this.pagesize2 = val;
    },
    handleCurrentChange2(val) {
      this.currentPage2 = val;
    },
    handleSizeChange3(val) {
      this.pagesize3 = val;
    },
    handleCurrentChange3(val) {
      this.currentPage3 = val;
    },
    handleSizeChange4(val) {
      this.pagesize4 = val;
    },
    handleCurrentChange4(val) {
      this.currentPage4 = val;
    }
  }
};
</script>
<style lang="less" scoped>
.isshow {
  z-index: 3000;
}
/deep/.el-date-editor.el-input {
  width: auto !important;
}
.generalMedical {
  padding: 10px;
  /deep/.el-input-number.is-controls-right .el-input__inner {
    width: 100% !important;
  }
  /deep/ .el-input-number .el-input {
    width: auto !important;
  }
  /deep/ .el-input-number--medium {
    width: auto !important;
  }
  /deep/.el-select {
    width: 100%;
  }
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
  /deep/.el-input-number.is-controls-right .el-input__inner {
    width: 300px;
  }
  /deep/.el-input-number .el-input {
    width: 300px;
  }
}
</style>
<style lang="less">
.generalMedical {
  .delete {
    display: inline-block;
    width: 21px;
    height: 4px;
    background: linear-gradient(
      180deg,
      rgba(71, 157, 255, 1) 0%,
      rgba(0, 62, 255, 1) 100%
    );
    opacity: 1;
    border-radius: 2px;
    margin-right: 12px;
  }
}
.el-dialog__footer {
  text-align: left;
}
.el-dialog__body {
  padding: 0px 20px 10px;
}
.twoTitle {
  border-left: 2px solid #409eff;
  padding-left: 10px;
  font-size: 16px;
}
.titleBtn {
  float: right;
  padding: 5px 15px;
}
</style>