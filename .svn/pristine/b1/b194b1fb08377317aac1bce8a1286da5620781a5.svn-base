<template>
  <div class="beijingBill">
    <!-- 医保门诊单证录入信息 -->
    <div class="work_queue">
      <span>医保门诊单证录入信息C</span>
      <div class="box"></div>
    </div>
    <div class="work_table">
      <el-table
        :data="medicalClinic"
        style="width: 100%"
        @row-dblclick="toReportDetails"
        :header-cell-style="{color:'#555',textAlign:'center'}"
        :cell-style="{textAlign:'center'}"
        :row-class-name="getRow"
      >
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column prop="billno" width="200">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>收据编号</span>
          </template>
          <template slot-scope="scope">
            <el-input v-model="scope.row.billno"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="hospitalname" width="280">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>医院名称</span>
          </template>
          <template slot-scope="scope">
            <el-select
              clearable
              v-model="scope.row.hospitalname"
              placeholder="请选择"
              v-el-select-loadmore="loadmores"
              filterable
              :filter-method="filtered"
              @focus="initHospital(scope.row,scope.$index)"
            >
              <!-- @change="changeHos(scope.$index)" -->

              <el-option
                v-for="item in newhospitalLists[scope.$index]"
                :key="item.hospitcode"
                :label="item.hospitalname"
                :value="item.hospitcode"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="clinicdate" width="250">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>门诊日期</span>
          </template>
          <template slot-scope="scope">
            <el-date-picker v-model="scope.row.clinicdate" type="date" placeholder="选择日期"></el-date-picker>
          </template>
        </el-table-column>
        <el-table-column prop="feemount" width="200">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>门诊金额</span>
          </template>
          <template slot-scope="scope">
            <!-- <el-input v-model="scope.row.feemount"></el-input> -->
            <div
              class="riskcodePDF"
              @click="entryDetails(scope.$index,scope.row,'C')"
            >{{ scope.row.feemount }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="selfcashpaymoney" label="个人现金支付金额" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.selfcashpaymoney" @blur="getAll(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="selfaccountpaymoney" label="个人账户支付金额" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.selfaccountpaymoney" @blur="getAll(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="medicallypayment" label="医疗保险范围内金额" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.medicallypayment" @blur="getAll(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="totalmedicallypayment" label="累计医保范围内金额" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.totalmedicallypayment" @blur="getAll(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="yearmutualitybigpay" label="年度门诊大额累计支付" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.yearmutualitybigpay" @blur="getAll(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="insurancepayment" label="医疗保险基本支付金额" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.insurancepayment" @blur="getAll(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="sociflag" width="250">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>社保标志</span>
          </template>
          <template slot-scope="scope">
            <el-select v-model="scope.row.sociflag" placeholder="请选择">
              <el-option label="有" value="1"></el-option>
              <el-option label="无" value="0"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="mutualitybigpay" label="门诊大额支付" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.mutualitybigpay" @blur="getAll(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="retirementpayment" label="退休保险支付" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.retirementpayment" @blur="getAll(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="disabilitysoldier" label="残疾军人支付" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.disabilitysoldier" @blur="getAll(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="civilservants" label="公务员医疗支付" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.civilservants" @blur="getAll(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="balancemutualitymoney" label="年度门诊大额余额" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.balancemutualitymoney" @blur="getAll(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="individualpayment" label="个人自付" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.individualpayment" @blur="getAll(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="individualpaya" label="自付一" width="200">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>自付一</span>
          </template>
          <template slot-scope="scope">
            <el-input v-model="scope.row.individualpaya" @blur="getAll(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="paymentfrom" label="起付金额" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.paymentfrom" @blur="getAll(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="paymentcap" label="超封顶金额" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.paymentcap" @blur="getAll(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="individualpayb" width="200">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>自付二</span>
          </template>
          <template slot-scope="scope">
            <el-input v-model="scope.row.individualpayb" @blur="getAll(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="ownepense" width="200">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>自费</span>
          </template>
          <template slot-scope="scope">
            <el-input v-model="scope.row.ownepense" @blur="getAll(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="deductfee" label="扣费明细" width="200">
          <template slot-scope="scope">
            <!-- <el-input v-model="scope.row.deductfee"></el-input> -->
            <p>{{scope.row.deductfee}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="indemnity" label="收据赔付金额" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.indemnity" @blur="getAll(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="operation" width="200">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
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
            <el-button size="mini" @click="deleteOne(scope.$index,scope.row,medicalClinic,'C')">删 除</el-button>
            <el-button size="mini" @click="entryDetails(scope.$index,scope.row,'C')">录入明细</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align:right;padding:10px 20px;">
        <el-button type="primary" round @click="addRow(medicalClinic,'C')">增 加</el-button>
      </div>
    </div>

    <!-- 医保审批单证录入信息 -->
    <div class="work_queue" style="margin-top:20px;">
      <span>医保审批单证录入信息D</span>
      <div class="box"></div>
    </div>
    <div class="work_table">
      <el-table
        :data="medicalApproval"
        style="width: 100%"
        @row-dblclick="toReportDetails"
        :header-cell-style="{color:'#555',textAlign:'center'}"
        :cell-style="{textAlign:'center'}"
      >
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column prop="billno" label="收据编号" width="200">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>收据编号</span>
          </template>
          <template slot-scope="scope">
            <el-input v-model="scope.row.billno"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="clinicdate" label="门诊日期" width="250">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>门诊日期</span>
          </template>
          <template slot-scope="scope">
            <el-date-picker v-model="scope.row.clinicdate" type="date" placeholder="选择日期"></el-date-picker>
          </template>
        </el-table-column>
        <el-table-column prop="feemount" label="门诊金额" width="250">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>门诊金额</span>
          </template>
          <template slot-scope="scope">
            <!-- <el-input v-model="scope.row.feemount"></el-input> -->
            <div
              class="riskcodePDF"
              @click="entryDetails(scope.$index,scope.row,'D')"
            >{{ scope.row.feemount }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="hospitalmutualitypayment" label="大额互助资金（住院）支付" width="250">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>大额互助资金（住院）支付</span>
          </template>
          <template slot-scope="scope">
            <el-input v-model="scope.row.hospitalmutualitypayment" @blur="getAll(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="totalmutualitypayment" label="大额互助资金累计支付" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.totalmutualitypayment" @blur="getAll(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="sociflag" label="社保标志" width="200">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>社保标志</span>
          </template>
          <template slot-scope="scope">
            <el-select v-model="scope.row.sociflag" placeholder="请选择">
              <el-option label="有" value="1"></el-option>
              <el-option label="无" value="0"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="selfliabilitiesa" label="自负一小计" width="200">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>自负一小计</span>
          </template>
          <template slot-scope="scope">
            <el-input v-model="scope.row.selfliabilitiesa" @blur="getAll(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="ordinaltionfund" label="统筹基金本次支付" width="200">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>统筹基金本次支付</span>
          </template>
          <template slot-scope="scope">
            <el-input v-model="scope.row.ordinaltionfund" @blur="getAll(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="totalordinaltionfund" label="统筹基金累计支付" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.totalordinaltionfund" @blur="getAll(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="selfliabilitiesb" label="自负二小计" width="200">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>自负二小计</span>
          </template>
          <template slot-scope="scope">
            <el-input v-model="scope.row.selfliabilitiesb" @blur="getAll(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="ownepense" label="自费" width="200">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>自费</span>
          </template>
          <template slot-scope="scope">
            <el-input v-model="scope.row.ownepense" @blur="getAll(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="deductfee" label="扣费明细" width="200">
          <template slot-scope="scope">
            <p>{{scope.row.deductfee}}</p>
            <!-- <el-input v-model="scope.row.indemnity"></el-input> -->
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="deleteOne(scope.$index,scope.row,medicalApproval,'D')"
            >删 除</el-button>
            <el-button size="mini" @click="entryDetails(scope.$index,scope.row,'D')">录入明细</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align:right;padding:10px 20px;">
        <el-button type="primary" round @click="addRow(medicalApproval,'D')">增 加</el-button>
      </div>
    </div>

    <!-- 医保住院单证录入信息 -->
    <div class="work_queue">
      <!-- <img src="../../assets/images/report/tab_btn@1x.png" alt=""> -->
      <span>医保住院单证录入信息E</span>
      <div class="box"></div>
    </div>
    <div class="work_table">
      <el-table
        :data="medicareHospital"
        style="width: 100%"
        @row-dblclick="toReportDetails"
        :header-cell-style="{color:'#555',textAlign:'center'}"
        :cell-style="{textAlign:'center'}"
      >
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column prop="billno" label="收据编号" width="200">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>收据编号</span>
          </template>
          <template slot-scope="scope">
            <el-input v-model="scope.row.billno"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="hospitalname" label="医院" width="200">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>医院</span>
          </template>
          <template slot-scope="scope">
            <el-select
              clearable
              v-model="scope.row.hospitalname"
              placeholder="请选择"
              v-el-select-loadmore="loadmoresE"
              filterable
              :filter-method="filteredE"
              @focus="initHospitalE(scope.row,scope.$index)"
            >
              <el-option
                v-for="item in newhospitalListsE[scope.$index]"
                :key="item.hospitcode"
                :label="item.hospitalname"
                :value="item.hospitcode"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="hospstartdate" label="入院日期" width="250">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>入院日期</span>
          </template>
          <template slot-scope="scope">
            <el-date-picker v-model="scope.row.hospstartdate" type="date" placeholder="选择日期"></el-date-picker>
          </template>
        </el-table-column>
        <el-table-column prop="hospenddate" label="出院日期" width="200">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>出院日期</span>
          </template>
          <template slot-scope="scope">
            <el-date-picker v-model="scope.row.hospenddate" type="date" placeholder="选择日期"></el-date-picker>
          </template>
        </el-table-column>
        <el-table-column prop="realhospdate" label="住院天数" width="200">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>住院天数</span>
          </template>
          <template slot-scope="scope">
            <el-input v-model="scope.row.realhospdate" @blur="checkUnumber1(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="imhospdate" label="重症病房天数" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.imhospdate" @blur="checkUnumber1(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="medicallypayment" label="医疗保险范围内金额" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.medicallypayment" @blur="getAll(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="insurancepayment" label="医疗保险基金支付金额" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.insurancepayment" @blur="getAll(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="ordinaltionfundpay" label="统筹基金支付金额" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.ordinaltionfundpay" @blur="getAll(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="sociflag" label="社保标志" width="200">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>社保标志</span>
          </template>
          <template slot-scope="scope">
            <el-select v-model="scope.row.sociflag" placeholder="请选择活动区域">
              <el-option label="有" value="1"></el-option>
              <el-option label="无" value="0"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="individualpaya" label="自付一" width="200">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>自付一</span>
          </template>
          <template slot-scope="scope">
            <el-input v-model="scope.row.individualpaya" @blur="getAll(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="paymentfrom" label="起付金额" width="250">
          <template slot-scope="scope">
            <el-input v-model="scope.row.paymentfrom" @blur="getAll(scope.row)"></el-input>
            <!-- <el-select v-model="scope.row.operation" placeholder="请选择活动区域">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>-->
          </template>
        </el-table-column>
        <el-table-column prop="assistantmutualitypayment" label="大额医疗互助金额" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.assistantmutualitypayment" @blur="getAll(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="civilservants" label="公务员医疗支付金额" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.civilservants" @blur="getAll(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="outmedicallypayment" label="医疗保险范围外金额" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.outmedicallypayment" @blur="getAll(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="selfpay" label="个人支付金额" width="200">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>个人支付金额</span>
          </template>
          <template slot-scope="scope">
            <el-input v-model="scope.row.selfpay" @blur="getAll(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="individualpayb" label="自付二" width="200">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>自付二</span>
          </template>
          <template slot-scope="scope">
            <el-input v-model="scope.row.individualpayb" @blur="getAll(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="selfpaytatol" label="个人负担合计" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.selfpaytatol" @blur="getAll(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="selfcashpaymoney" label="现金支付金额" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.selfcashpaymoney" @blur="getAll(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="selfaccountpaymoney" label="账户支付金额" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.selfaccountpaymoney" @blur="getAll(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="deductfee" label="扣费明细" width="200">
          <template slot-scope="scope">
            <!-- <el-input v-model="scope.row.otherfee"></el-input> -->
            <p>{{scope.row.deductfee}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="indemnity" label="收据赔付金额" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.indemnity" @blur="getAll(scope.row)"></el-input>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="deleteOne(scope.$index,scope.row,medicareHospital,'E')"
            >删 除</el-button>
            <el-button size="mini" @click="entryDetails(scope.$index,scope.row,'E')">录入明细</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align:right;padding:10px 20px;">
        <el-button type="primary" round @click="addRow(medicareHospital,'E')">增 加</el-button>
      </div>
    </div>

    <!-- 生育门诊单证录入信息 -->
    <div class="work_queue" style="margin-top:20px;">
      <!-- <img src="../../assets/images/report/tab_btn@1x.png" alt=""> -->
      <span>生育门诊单证录入信息F</span>
      <div class="box"></div>
    </div>
    <div class="work_table">
      <el-table
        :data="fertilityClinic"
        style="width: 100%"
        @row-dblclick="toReportDetails"
        :header-cell-style="{color:'#555',textAlign:'center'}"
        :cell-style="{textAlign:'center'}"
      >
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column prop="billno" label="收据编号" width="200">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>收据编号</span>
          </template>
          <template slot-scope="scope">
            <el-input v-model="scope.row.billno"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="hospitalname" label="医院" width="200">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>医院</span>
          </template>
          <template slot-scope="scope">
            <el-select
              clearable
              v-model="scope.row.hospitalname"
              placeholder="请选择"
              v-el-select-loadmore="loadmoresF"
              filterable
              :filter-method="filteredF"
              @focus="initHospitalF(scope.row,scope.$index)"
            >
              <el-option
                v-for="item in newhospitalListsF[scope.$index]"
                :key="item.hospitcode"
                :label="item.hospitalname"
                :value="item.hospitcode"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="clinicdate" label="门诊日期" width="250">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>门诊日期</span>
          </template>
          <template slot-scope="scope">
            <el-date-picker v-model="scope.row.clinicdate" type="date" placeholder="选择日期"></el-date-picker>
          </template>
        </el-table-column>
        <el-table-column prop="receiptfee" label="费用总金额" width="250">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>费用总金额</span>
          </template>
          <template slot-scope="scope">
            <!-- <el-input v-model="scope.row.receiptfee"></el-input> -->
            <div
              class="riskcodePDF"
              @click="entryDetails(scope.$index,scope.row,'F')"
            >{{ scope.row.receiptfee }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="deductionfeemount" label="费用扣减金额" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.deductionfeemount" @blur="getAll(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="sociflag" label="社保标志" width="200">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>社保标志</span>
          </template>
          <template slot-scope="scope">
            <el-select v-model="scope.row.sociflag" placeholder="请选择">
              <el-option label="有" value="1"></el-option>
              <el-option label="无" value="0"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="deductfee" label="扣费明细" width="200">
          <template slot-scope="scope">
            <!-- <el-input v-model="scope.row.realhospdate"></el-input> -->
            <p>{{scope.row.deductfee}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="operation" label="是否手术" width="200">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
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
            <el-button
              size="mini"
              @click="deleteOne(scope.$index,scope.row,fertilityClinic,'F')"
            >删 除</el-button>
            <el-button size="mini" @click="entryDetails(scope.$index,scope.row,'F')">录入明细</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align:right;padding:10px 20px;">
        <el-button type="primary" round @click="addRow(fertilityClinic,'F')">增 加</el-button>
      </div>
    </div>

    <!-- 生育住院单证录入信息 -->
    <div class="work_queue" style="margin-top:20px;">
      <!-- <img src="../../assets/images/report/tab_btn@1x.png" alt=""> -->
      <span>生育住院单证录入信息G</span>
      <div class="box"></div>
    </div>
    <div class="work_table">
      <el-table
        :data="fertilityHospital"
        style="width: 100%"
        @row-dblclick="toReportDetails"
        :header-cell-style="{color:'#555',textAlign:'center'}"
        :cell-style="{textAlign:'center'}"
      >
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column prop="billno" label="收据编号" width="200">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>收据编号</span>
          </template>
          <template slot-scope="scope">
            <el-input v-model="scope.row.billno"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="hospitalname" label="医院" width="200">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>医院</span>
          </template>
          <template slot-scope="scope">
            <el-select
              clearable
              v-model="scope.row.hospitalname"
              placeholder="请选择"
              v-el-select-loadmore="loadmoresG"
              filterable
              :filter-method="filteredG"
              @focus="initHospitalG(scope.row,scope.$index)"
            >
              <el-option
                v-for="item in newhospitalListsG[scope.$index]"
                :key="item.hospitcode"
                :label="item.hospitalname"
                :value="item.hospitcode"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="hospstartdate" label="入院日期" width="250">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>入院日期</span>
          </template>
          <template slot-scope="scope">
            <el-date-picker v-model="scope.row.hospstartdate" type="date" placeholder="选择日期"></el-date-picker>
          </template>
        </el-table-column>
        <el-table-column prop="hospenddate" label="出院日期" width="250">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>出院日期</span>
          </template>
          <template slot-scope="scope">
            <el-date-picker v-model="scope.row.hospenddate" type="date" placeholder="选择日期"></el-date-picker>
          </template>
        </el-table-column>
        <el-table-column prop="realhospdate" label="住院天数" width="200">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>住院天数</span>
          </template>
          <template slot-scope="scope">
            <el-input v-model="scope.row.realhospdate"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="billmoney" label="住院金额" width="200">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>住院金额</span>
          </template>
          <template slot-scope="scope">
            <div
              class="riskcodePDF"
              @click="entryDetails(scope.$index,scope.row,'G')"
            >{{ scope.row.billmoney }}</div>
            <!-- <el-input v-model="scope.row.billmoney"></el-input> -->
          </template>
        </el-table-column>
        <el-table-column prop="deductionfeemount" label="费用扣减金额" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.deductionfeemount" @blur="getAll(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="sociflag" label="社保标志" width="200">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>社保标志</span>
          </template>
          <template slot-scope="scope">
            <el-select v-model="scope.row.sociflag" placeholder="请选择">
              <el-option label="有" value="1"></el-option>
              <el-option label="无" value="0"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="deductfee" label="扣费明细" width="200">
          <template slot-scope="scope">
            <!-- <el-input v-model="scope.row.realhospdate"></el-input> -->
            <p>{{scope.row.deductfee}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="indemnity" label="收据赔付金额" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.indemnity" @blur="getAll(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="operation" label="是否手术" width="200">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
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
            <el-button
              size="mini"
              @click="deleteOne(scope.$index,scope.row,fertilityHospital,'G')"
            >删 除</el-button>
            <el-button size="mini" @click="entryDetails(scope.$index,scope.row,'G')">录入明细</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align:right;padding:10px 20px;">
        <el-button type="primary" round @click="addRow(fertilityHospital,'G')">增 加</el-button>
      </div>
    </div>

    <!-- 新农合-住院单证录入信息 -->
    <div class="work_queue" style="margin-top:20px;">
      <!-- <img src="../../assets/images/report/tab_btn@1x.png" alt=""> -->
      <span>新农合-住院单证录入信息H</span>
      <div class="box"></div>
    </div>
    <div class="work_table">
      <el-table
        :data="NCMSHospital"
        style="width: 100%"
        @row-dblclick="toReportDetails"
        :header-cell-style="{color:'#555',textAlign:'center'}"
        :cell-style="{textAlign:'center'}"
      >
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column prop="billno" label="收据编号" width="200">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>收据编号</span>
          </template>
          <template slot-scope="scope">
            <el-input v-model="scope.row.billno"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="hospitalname" label="医院" width="200">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>医院</span>
          </template>
          <template slot-scope="scope">
            <el-select
              clearable
              v-model="scope.row.hospitalname"
              placeholder="请选择"
              v-el-select-loadmore="loadmoresH"
              filterable
              :filter-method="filteredH"
              @focus="initHospitalH(scope.row,scope.$index)"
            >
              <el-option
                v-for="item in newhospitalListsH[scope.$index]"
                :key="item.hospitcode"
                :label="item.hospitalname"
                :value="item.hospitcode"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="hospstartdate" label="入院日期" width="250">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>入院日期</span>
          </template>
          <template slot-scope="scope">
            <el-date-picker v-model="scope.row.hospstartdate" type="date" placeholder="选择日期"></el-date-picker>
          </template>
        </el-table-column>
        <el-table-column prop="hospenddate" label="出院日期" width="250">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>出院日期</span>
          </template>
          <template slot-scope="scope">
            <el-date-picker v-model="scope.row.hospenddate" type="date" placeholder="选择日期"></el-date-picker>
          </template>
        </el-table-column>
        <el-table-column prop="realhospdate" label="住院天数" width="200">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>住院天数</span>
          </template>
          <template slot-scope="scope">
            <el-input v-model="scope.row.realhospdate"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="imhospdate" label="重症病房天数" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.imhospdate" @blur="checkUnumber1(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="billmoney" label="住院金额" width="200">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>住院金额</span>
          </template>
          <template slot-scope="scope">
            <div
              class="riskcodePDF"
              @click="entryDetails(scope.$index,scope.row,'H')"
            >{{ scope.row.billmoney }}</div>
            <!-- <el-input v-model="scope.row.billmoney"></el-input> -->
          </template>
        </el-table-column>
        <el-table-column prop="deductionfeemount" label="费用扣减金额" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.deductionfeemount" @blur="getAll(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="ruralmedicalinsurance" label="新农合报销金额" width="200">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>新农合报销金额</span>
          </template>
          <template slot-scope="scope">
            <el-input v-model="scope.row.ruralmedicalinsurance" @blur="getAll(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="sociflag" label="社保标志" width="200">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>社保标志</span>
          </template>
          <template slot-scope="scope">
            <el-select v-model="scope.row.sociflag" placeholder="请选择">
              <el-option label="有" value="1"></el-option>
              <el-option label="无" value="0"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="deductfee" label="扣费明细" width="200">
          <template slot-scope="scope">
            <!-- <el-input v-model="scope.row.realhospdate"></el-input> -->
            <p>{{scope.row.deductfee}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="indemnity" label="收据赔付金额" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.indemnity" @blur="getAll(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="operation" label="是否手术" width="200">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
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
            <el-button size="mini" @click="deleteOne(scope.$index,scope.row,NCMSHospital,'H')">删 除</el-button>
            <el-button size="mini" @click="entryDetails(scope.$index,scope.row,'H')">录入明细</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align:right;padding:10px 20px;">
        <el-button type="primary" round @click="addRow(NCMSHospital,'H')">增 加</el-button>
      </div>
    </div>

    <!-- 医保特殊病单证录入信息 -->
    <div class="work_queue" style="margin-top:20px;">
      <!-- <img src="../../assets/images/report/tab_btn@1x.png" alt=""> -->
      <span>医保特殊病单证录入信息I</span>
      <div class="box"></div>
    </div>
    <div class="work_table">
      <el-table
        :data="medicalSpecial"
        style="width: 100%"
        @row-dblclick="toReportDetails"
        :header-cell-style="{color:'#555',textAlign:'center'}"
        :cell-style="{textAlign:'center'}"
      >
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column prop="billno" label="收据编号" width="200">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>收据编号</span>
          </template>
          <template slot-scope="scope">
            <el-input v-model="scope.row.billno"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="hospitalname" label="医院名称" width="200">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>医院名称</span>
          </template>
          <template slot-scope="scope">
            <el-select
              clearable
              v-model="scope.row.hospitalname"
              placeholder="请选择"
              v-el-select-loadmore="loadmoresI"
              filterable
              :filter-method="filteredI"
              @focus="initHospitalI(scope.row,scope.$index)"
            >
              <el-option
                v-for="item in newhospitalListsI[scope.$index]"
                :key="item.hospitcode"
                :label="item.hospitalname"
                :value="item.hospitcode"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="clinicdate" label="门诊日期" width="250">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>门诊日期</span>
          </template>
          <template slot-scope="scope">
            <el-date-picker v-model="scope.row.clinicdate" type="date" placeholder="选择日期"></el-date-picker>
          </template>
        </el-table-column>
        <el-table-column prop="specialfeemount" label="门诊特殊病金额" width="250">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>门诊特殊病金额</span>
          </template>
          <template slot-scope="scope">
            <div
              class="riskcodePDF"
              @click="entryDetails(scope.$index,scope.row,'I')"
            >{{ scope.row.specialfeemount }}</div>
            <!-- <el-input v-model="scope.row.specialfeemount"></el-input> -->
          </template>
        </el-table-column>
        <el-table-column prop="deductfee" label="扣费明细" width="200">
          <template slot-scope="scope">
            <!-- <el-input v-model="scope.row.realhospdate"></el-input> -->
            <p>{{scope.row.deductfee}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="operation" label="是否手术" width="200">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>是否手术</span>
          </template>
          <template slot-scope="scope">
            <el-select v-model="scope.row.operation" placeholder="请选择">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="medicallypayment" label="医疗保险范围内金额" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.medicallypayment" @blur="getAll(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="insurancepayment" label="医疗保险基本支付金额" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.insurancepayment" @blur="getAll(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="sociflag" label="社保标志" width="200">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>社保标志</span>
          </template>
          <template slot-scope="scope">
            <el-select v-model="scope.row.sociflag" placeholder="请选择">
              <el-option label="有" value="1"></el-option>
              <el-option label="无" value="0"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="hospitalmutualitypayment" label="大额互助资金（住院）支付" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.hospitalmutualitypayment" @blur="getAll(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="retirementpayment" label="退休人员医疗保险支付" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.retirementpayment" @blur="getAll(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="civilservants" label="公务员医疗支付" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.civilservants" @blur="getAll(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="disabilitysoldier" label="残疾军人医疗支付" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.disabilitysoldier" @blur="getAll(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="selfcashpaymoney" label="个人现金支付金额" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.selfcashpaymoney" @blur="getAll(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="individualpayment" label="个人自付" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.individualpayment" @blur="getAll(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="individualpaya" label="个人自付一" width="200">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>个人自付一</span>
          </template>
          <template slot-scope="scope">
            <el-input v-model="scope.row.individualpaya" @blur="getAll(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="paymentfrom" label="起付金额" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.paymentfrom" @blur="getAll(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="paymentcap" label="超封顶金额" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.paymentcap" @blur="getAll(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="individualpayb" label="个人自付二" width="200">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>个人自付二</span>
          </template>
          <template slot-scope="scope">
            <el-input v-model="scope.row.individualpayb" @blur="getAll(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="ownepense" label="个人自费金额" width="200">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>个人自费金额</span>
          </template>
          <template slot-scope="scope">
            <el-input v-model="scope.row.ownepense" @blur="getAll(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="selfaccountpaymoney" label="个人账户金额" width="200">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>个人账户金额</span>
          </template>
          <template slot-scope="scope">
            <el-input v-model="scope.row.selfaccountpaymoney" @blur="getAll(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="totalordinaltionfund" label="本年统筹基金累计支付" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.totalordinaltionfund" @blur="getAll(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="totalmutualitypayment" label="本年大额互助资金（住院）累计支付" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.totalmutualitypayment" @blur="getAll(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="percount" label="个人账户" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.percount" @blur="getAll(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" @click="deleteOne(scope.$index,scope.row,medicalSpecial,'I')">删 除</el-button>
            <el-button size="mini" @click="entryDetails(scope.$index,scope.row,'I')">录入明细</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align:right;padding:10px 20px;">
        <el-button type="primary" round @click="addRow(medicalSpecial,'I')">增 加</el-button>
      </div>
    </div>
    <!-- 普通门诊 -->
    <div class="work_queue">
      <!-- <img src="../../assets/images/report/tab_btn@1x.png" alt=""> -->
      <span>普通门诊单证录入信息J</span>
      <div class="box"></div>
    </div>
    <div class="work_table">
      <el-table
        :data="commonOutpatient"
        style="width: 100%"
        @row-dblclick="toReportDetails"
        :header-cell-style="{color:'#555',textAlign:'center'}"
        :cell-style="{textAlign:'center'}"
      >
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column prop="billno" label="收据编号" width="200">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>收据编号</span>
          </template>
          <template slot-scope="scope">
            <el-input v-model="scope.row.billno"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="hospitalname" label="医院名称" width="200">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>医院名称</span>
          </template>
          <template slot-scope="scope">
            <el-select
              clearable
              v-model="scope.row.hospitalname"
              placeholder="请选择"
              v-el-select-loadmore="loadmoresJ"
              filterable
              :filter-method="filteredJ"
              @focus="initHospitalJ(scope.row,scope.$index)"
            >
              <el-option
                v-for="item in newhospitalListsJ[scope.$index]"
                :key="item.hospitcode"
                :label="item.hospitalname"
                :value="item.hospitcode"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="clinicdate" label="就诊时间" width="250">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>就诊时间</span>
          </template>
          <template slot-scope="scope">
            <el-date-picker v-model="scope.row.clinicdate" type="date" placeholder="选择日期"></el-date-picker>
          </template>
        </el-table-column>
        <el-table-column prop="receiptfee" label="费用总金额" width="200">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>费用总金额</span>
          </template>
          <template slot-scope="scope">
            <div
              class="riskcodePDF"
              @click="entryDetails(scope.$index,scope.row,'J')"
            >{{ scope.row.receiptfee }}</div>
            <!-- <el-input v-model="scope.row.receiptfee"></el-input> -->
          </template>
        </el-table-column>
        <el-table-column prop="deductionfeemount" label="费用扣减金额" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.deductionfeemount" @blur="getAll(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="sociflag" label="社保标志" width="200">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>社保标志</span>
          </template>
          <template slot-scope="scope">
            <el-select v-model="scope.row.sociflag" placeholder="请选择">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="deductfee" label="扣费明细" width="200">
          <template slot-scope="scope">
            <!-- <el-input v-model="scope.row.realhospdate"></el-input> -->
            <p>{{scope.row.deductfee}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="indemnity" label="收拒赔付金额" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.indemnity" @blur="getAll(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="operation" label="是否手术" width="250">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
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
            <el-button
              size="mini"
              @click="deleteOne(scope.$index,scope.row,commonOutpatient,'J')"
            >删 除</el-button>
            <el-button size="mini" @click="entryDetails(scope.$index, scope.row,'J')">录入明细</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align:right;padding:10px 20px;">
        <el-button type="primary" round @click="addRow(commonOutpatient,'J')">增 加</el-button>
      </div>
    </div>
    <!-- 普通住院 -->
    <div class="work_queue" style="margin-top:20px;">
      <!-- <img src="../../assets/images/report/tab_btn@1x.png" alt=""> -->
      <span>普通住院单证录入信息K</span>
      <div class="box"></div>
    </div>
    <div class="work_table">
      <el-table
        :data="commonHospital"
        style="width: 100%"
        @row-dblclick="toReportDetails"
        :header-cell-style="{color:'#555',textAlign:'center'}"
        :cell-style="{textAlign:'center'}"
      >
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column prop="billno" label="收据编号" width="200">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>收据编号</span>
          </template>
          <template slot-scope="scope">
            <el-input v-model="scope.row.billno"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="hospitalname" label="医院名称" width="200">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>医院名称</span>
          </template>
          <template slot-scope="scope">
            <el-select
              clearable
              v-model="scope.row.hospitalname"
              placeholder="请选择"
              v-el-select-loadmore="loadmoresK"
              filterable
              :filter-method="filteredK"
              @focus="initHospitalK(scope.row,scope.$index)"
            >
              <el-option
                v-for="item in newhospitalListsK[scope.$index]"
                :key="item.hospitcode"
                :label="item.hospitalname"
                :value="item.hospitcode"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="hospstartdate" label="入院日期" width="250">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>入院日期</span>
          </template>
          <template slot-scope="scope">
            <el-date-picker v-model="scope.row.hospstartdate" type="date" placeholder="选择日期"></el-date-picker>
          </template>
        </el-table-column>
        <el-table-column prop="hospenddate" label="出院日期" width="250">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>出院日期</span>
          </template>
          <template slot-scope="scope">
            <el-date-picker v-model="scope.row.hospenddate" type="date" placeholder="选择日期"></el-date-picker>
          </template>
        </el-table-column>
        <el-table-column prop="realhospdate" label="住院天数" width="200">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>住院天数</span>
          </template>
          <template slot-scope="scope">
            <el-input v-model="scope.row.realhospdate"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="imhospdate" label="重症病房天数" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.imhospdate"></el-input>
          </template>
        </el-table-column>

        <el-table-column prop="billmoney" label="住院发生金额" width="200">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>住院发生金额</span>
          </template>
          <template slot-scope="scope">
            <div
              class="riskcodePDF"
              @click="entryDetails(scope.$index,scope.row,'K')"
            >{{ scope.row.billmoney }}</div>
            <!-- <el-input v-model="scope.row.billmoney"></el-input> -->
          </template>
        </el-table-column>
        <el-table-column prop="deductionfeemount" label="费用扣减金额" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.deductionfeemount" @blur="getAll(scope.row)"></el-input>
          </template>
        </el-table-column>

        <el-table-column prop="sociflag" label="社保标志" width="200">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>社保标志</span>
          </template>
          <template slot-scope="scope">
            <el-select v-model="scope.row.sociflag" placeholder="请选择">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="deductfee" label="扣费明细" width="200">
          <template slot-scope="scope">
            <!-- <el-input v-model="scope.row.realhospdate"></el-input> -->
            <p>{{scope.row.deductfee}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="indemnity" label="收据赔付金额" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.indemnity" @blur="getAll(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="operation" label="是否手术" width="200">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
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
            <el-button size="mini" @click="deleteOne(scope.$index,scope.row,commonHospital,'K')">删 除</el-button>
            <el-button size="mini" @click="entryDetails(scope.$index, scope.row,'K')">录入明细</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align:right;padding:10px 20px;">
        <el-button type="primary" round @click="addRow(commonHospital,'K')">增 加</el-button>
      </div>
    </div>

    <div style="text-align:right;margin-top:20px;">
      <el-button type="primary" round @click="applyTask">保 存</el-button>
      <el-button type="primary" round @click="toAddFiling">返 回</el-button>
    </div>
    <!-- 提示框 -->
    <el-dialog title :visible.sync="dialogVisible" width="70%">
      <template>
        <p class="twoTitle">
          费用明细
          <el-button class="titleBtn" type="primary" @click="addRowItem1()">新增</el-button>
        </p>
      </template>
      <el-table :data="fyDetail" center="true">
        <el-table-column label="序号" type="index" width="60"></el-table-column>
        <el-table-column prop="feeitemname" label="费用项名称" width="200" align="center">
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
              @focus="getFeeItem"
              @change="changeFeeItem(scope.row.feeitemname,scope.row,'1')"
            >
              <el-option
                v-for="(item,index) in fyxLists"
                :label="item.codename"
                :value="item.code"
                :key="index"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="feeitemdetil" label="费用名称明细" width="200" align="center">
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
                :value="item.id"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="fee" label="单价" width="200" align="center">
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
        <el-table-column prop="number" label="数量" width="200" align="center">
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
        <el-table-column prop="price" label="费用金额" width="200" align="center">
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
        <el-table-column prop="specifications" label="规格与单位" width="200" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.specifications" maxlength="100" clearable></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="healthcaretype" label="医保类别" width="200" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.healthcaretype" clearable maxlength="100"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <!-- <span class="delete" @click.native.prevent="deleteRow(scope.$index, gridData)"></span> -->

            <el-button size="mini" @click.native.prevent="delete1(scope.$index,fyDetail,'01')">删除</el-button>
            <!-- <el-button size="mini" @click="dialogVisible = true">录入明细</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <!-- <div style="margin-top:10px;">
        <el-pagination
          background
          @size-change="handleSizeChange3"
          @current-change="handleCurrentChange3"
          :page-size="pagesize3"
          layout="prev, pager, next, jumper"
          :total="fyDetail.length"
        ></el-pagination>
      </div>-->
      <template>
        <p class="twoTitle">
          扣费明细
          <el-button class="titleBtn" type="primary" @click="addRowItem2()">新增</el-button>
        </p>
      </template>
      <el-table :data="kfDetail" center="true">
        <el-table-column label="序号" type="index" width="60"></el-table-column>
        <el-table-column prop="deducttype" label="扣费类型" align="center" width="200">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp*&nbsp</span>
            <span>扣费类型</span>
          </template>
          <template slot-scope="scope">
            <el-select
              placeholder="请选择"
              v-model="scope.row.deducttype"
              @focus="getFeeItem"
              @change="changeKoufeiItem(scope.row.deducttype,scope.row)"
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
        <el-table-column prop="deductname" label="扣费名称" align="center" width="200" clearable>
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>扣费名称</span>
          </template>
          <template slot-scope="scope">
            <!-- :filter-method="filtered(scope.row)" -->

            <el-select
              placeholder="请选择"
              v-model="scope.row.deductname"
              @change="changeKouFei(scope.row.deductname,scope.row,'1')"
              @focus="initKouFei"
              v-el-select-loadmore="loadmore1"
              filterable
              allow-create
              clearable
            >
              <el-option
                v-for="item in koufeiLists"
                :key="item.id"
                :label="item.itemname"
                :value="item.id"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="deductfee " label="扣费金额" align="center" width="200">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
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
        <el-table-column prop="deductreasontype" label="扣费原因类型" width="200">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>扣费原因类型</span>
          </template>
          <template slot-scope="scope">
            <!-- <el-input v-model="scope.row.deductreasontype" clearable></el-input> -->

            <el-select placeholder="请选择" v-model="scope.row.deductreasontype" @focus="initReason">
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
        <el-table-column prop="deductreason" label="扣费原因" align="center" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.deductreason" clearable maxlength="100"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="deductremark" label="备注" align="center" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.deductremark" maxlength="100" clearable></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click.native.prevent="delete1(scope.$index,kfDetail,'02')">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <div style="margin-top:10px;">
        <el-pagination
          background
          @size-change="handleSizeChange4"
          @current-change="handleCurrentChange4"
          :page-size="pagesize4"
          layout="prev, pager, next, jumper"
          :total="kfDetail.length"
        ></el-pagination>
      </div>-->
      <template>
        <p class="twoTitle">
          诊断代码
          <el-button class="titleBtn" type="primary" @click="addRowItem3()">新增</el-button>
        </p>
      </template>
      <el-table :data="zdDetail" center="true">
        <el-table-column prop="diagnosticcode" label="诊断代码" align="center">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp*&nbsp</span>
            <span>诊断代码</span>
          </template>
          <template slot-scope="scope">
            <el-select placeholder="请选择" v-model="scope.row.diagnosticcode" @focus="initDiagcode">
              <el-option
                v-for="(item,index) in diagcodeList"
                :label="item.codename"
                :value="item.code"
                :key="index"
                filterable
                clearable
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="diagnosticname" label="诊断类型" align="center" clearable>
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp*&nbsp</span>
            <span>诊断类型</span>
          </template>
          <template slot-scope="scope">
            <!-- :filter-method="filtered(scope.row)" -->

            <el-select
              placeholder="请选择"
              v-model="scope.row.diagnosticname"
              @change="changeKouFei(scope.row.deductnames,scope.row,'1')"
              v-el-select-loadmore="loadmore1"
              filterable
              allow-create
              clearable
            >
              <el-option
                v-for="item in diagnostList"
                :key="item.id"
                :label="item.id+'-'+item.itemname"
                :value="item.id"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click.native.prevent="delete1(scope.$index,zdDetail,'03')">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <div style="margin-top:10px;">
        <el-pagination
          background
          @size-change="handleSizeChange4"
          @current-change="handleCurrentChange4"
          :page-size="pagesize4"
          layout="prev, pager, next, jumper"
          :total="kfDetail.length"
        ></el-pagination>
      </div>-->
      <template>
        <p class="twoTitle">
          手术代码
          <el-button class="titleBtn" type="primary" @click="addRowItem4()">新增</el-button>
        </p>
      </template>
      <el-table :data="ssDetail" center="true">
        <el-table-column prop="operationcode" label="手术代码" align="center">
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>手术代码</span>
          </template>
          <template slot-scope="scope">
            <el-select placeholder="请选择" v-model="scope.row.operationcode" @focus="initOpera">
              <el-option
                style="width: 300px"
                v-for="item in operationList"
                :key="item.code"
                :label="item.codename"
                :value="item.codename"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="operationname" label="诊断类型" align="center" clearable>
          <template slot="header" slot-scope="scope">
            <span class="redStars">&nbsp;*&nbsp;</span>
            <span>诊断类型</span>
          </template>
          <template slot-scope="scope">
            <!-- :filter-method="filtered(scope.row)" -->
            <el-select
              placeholder="请选择"
              v-model="scope.row.operationname"
              filterable
              allow-create
              clearable
            >
              <el-option
                v-for="item in operationTypes"
                :key="item.id"
                :label="item.itemname"
                :value="item.id"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click.native.prevent="delete1(scope.$index,ssDetail,'04')">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <div style="margin-top:10px;">
        <el-pagination
          background
          @size-change="handleSizeChange4"
          @current-change="handleCurrentChange4"
          :page-size="pagesize4"
          layout="prev, pager, next, jumper"
          :total="kfDetail.length"
        ></el-pagination>
      </div>-->
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
import {
  checkdeff,
  checkLfor3,
  checkMfor,
  sumDays,
  checkBj,
  checkLfor1,
  checkLfor22,
  checkLfor4,
  checkLfor5,
  accMul,
  numTwo,
  getCodeType
} from "../../utils/service.js";
export default {
  name: "BeijingBill",
  directives: {
    "el-select-loadmore": {
      bind(el, binding) {
        const elss = el.querySelector(
          ".el-select-dropdown .el-select-dropdown__wrap"
        );
        elss.addEventListener("scroll", function() {
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
      hospitalLists: [], //医院
      newhospitalLists: [], //医院
      newhospitalListsE: [],
      newhospitalListsF: [],
      newhospitalListsG: [],
      newhospitalListsH: [],
      newhospitalListsI: [],
      newhospitalListsJ: [],
      newhospitalListsK: [],
      rowIndex: "",
      fyxLists: [], //费用项名称
      koufeiTypes: [], //扣费类型
      fyDetailList1: [], //费用名称明细
      koufeiLists: [], //扣费名称
      diagcodeList: [], //诊断代码
      koufeiReason: [], //扣费原因
      diagnostList: [
        {
          id: "01",
          itemname: "临床诊断"
        },
        {
          id: "02",
          itemname: "病理诊断"
        },
        {
          id: "03",
          itemname: "影像诊断"
        },
        {
          id: "04",
          itemname: "合并症或并发症诊断"
        },
        {
          id: "05",
          itemname: "其他诊断"
        }
      ], //诊断类型
      operationList: [], //手术代码
      operationTypes: [
        {
          id: "00",
          itemname: "主要手术诊断"
        },
        {
          id: "01",
          itemname: "其他手术诊断"
        } //手术诊断类型
      ],
      koufeiReason: [], // 扣费原因类型
      vipFlag: false,
      entry: [],
      entryTable: [],
      fyDetail: [],
      kfDetail: [],
      zdDetail: [],
      ssDetail: [],
      medicalClinic: [], //医保门诊
      medicalApproval: [], //医保审批
      medicareHospital: [], //医保住院
      fertilityClinic: [], //生育门诊
      fertilityHospital: [], //生育住院
      NCMSHospital: [], //新农合-住院
      medicalSpecial: [], //医保特殊病单
      commonOutpatient: [], //普通门诊单证
      commonHospital: [], //普通住院单证
      lastTask: "",

      dialogVisible: false,

      pageData1: {
        pagestart: 0,
        pageend: 100,
        likename: ""
      }, // 医院
      pageData2: {
        pagestart: 0,
        pageend: 100,
        likename: "",
        code: ""
      }, //费用名称明细
      pageData3: {
        pagestart: 0,
        pageend: 100,
        likename: "",
        code: ""
      }, //扣费名称
      formData1: {
        pagestart: 0,
        pageend: 100,
        likename: "",
        code: ""
      }, //诊断代码
      filterVal: "",
      fyListCode: "",
      kyListCode: "",
      mainData1: null,
      requestData: null,
      index1: "",
      hosDay: ""
    };
  },
  created() {
    if (
      JSON.parse(this.$route.params.dataOfTable).rgtno &&
      JSON.parse(this.$route.params.dataOfTable).customerno
    ) {
      this.getBjFee();
      // this.initH();
    }
    if (
      JSON.parse(this.$route.params.dataOfTable).hospitalcode &&
      JSON.parse(this.$route.params.dataOfTable).rgtno
    ) {
      this.medicalClinic.hospitalcode = JSON.parse(
        this.$route.params.dataOfTable
      ).hospitalcode;
    }
    if (
      JSON.parse(this.$route.params.dataOfTable).hospstartdate &&
      JSON.parse(this.$route.params.dataOfTable).hospenddate
    ) {
      this.hosDay =
        sumDays(
          JSON.parse(this.$route.params.dataOfTable).hospstartdate,
          JSON.parse(this.$route.params.dataOfTable).hospenddate
        ) + 1;
    }
  },
  mounted() {
    // this.operationList = getCodeType("operationcode"); //手术代码
    // console.log(this.operationList)
    // this.getMC1();
    this.getFeeItem()
    this.initReason()
    this.initKouFei()
    this.changeFeeitemdetil()
  },
  methods: {
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
    //  收据赔付金额 = 费用总金额-统筹/附加金额-其他补偿-扣费明细；
    getAll(res) {
      if (res.selfcashpaymoney > 0) {
        res.selfcashpaymoney = this.toFixeds(
          parseFloat(res.selfcashpaymoney),
          2
        );
      } else if (res.selfcashpaymoney == 0) {
        res.selfcashpaymoney = "0.00";
      } else {
        res.selfcashpaymoney = null;
      }

      if (res.selfaccountpaymoney > 0) {
        res.selfaccountpaymoney = this.toFixeds(
          parseFloat(res.selfaccountpaymoney),
          2
        );
      } else if (res.selfaccountpaymoney == 0) {
        res.selfaccountpaymoney = "0.00";
      } else {
        res.selfaccountpaymoney = null;
      }

      if (res.medicallypayment > 0) {
        res.medicallypayment = this.toFixeds(
          parseFloat(res.medicallypayment),
          2
        );
      } else if (res.medicallypayment == 0) {
        res.medicallypayment = "0.00";
      } else {
        res.medicallypayment = null;
      }
      if (res.totalmedicallypayment > 0) {
        res.totalmedicallypayment = this.toFixeds(
          parseFloat(res.totalmedicallypayment),
          2
        );
      } else if (res.totalmedicallypayment == 0) {
        res.totalmedicallypayment = "0.00";
      } else {
        res.totalmedicallypayment = null;
      }
      if (res.yearmutualitybigpay > 0) {
        res.yearmutualitybigpay = this.toFixeds(
          parseFloat(res.yearmutualitybigpay),
          2
        );
      } else if (res.yearmutualitybigpay == 0) {
        res.yearmutualitybigpay = "0.00";
      } else {
        res.yearmutualitybigpay = null;
      }

      if (res.insurancepayment > 0) {
        res.insurancepayment = this.toFixeds(
          parseFloat(res.insurancepayment),
          2
        );
      } else if (res.insurancepayment == 0) {
        res.insurancepayment = "0.00";
      } else {
        res.insurancepayment = null;
      }

      if (res.mutualitybigpay > 0) {
        res.mutualitybigpay = this.toFixeds(parseFloat(res.mutualitybigpay), 2);
      } else if (res.mutualitybigpay == 0) {
        res.mutualitybigpay = "0.00";
      } else {
        res.mutualitybigpay = null;
      }

      if (res.retirementpayment > 0) {
        res.retirementpayment = this.toFixeds(
          parseFloat(res.retirementpayment),
          2
        );
      } else if (res.retirementpayment == 0) {
        res.retirementpayment = "0.00";
      } else {
        res.retirementpayment = null;
      }

      if (res.disabilitysoldier > 0) {
        res.disabilitysoldier = this.toFixeds(
          parseFloat(res.disabilitysoldier),
          2
        );
      } else if (res.disabilitysoldier == 0) {
        res.disabilitysoldier = "0.00";
      } else {
        res.disabilitysoldier = null;
      }

      if (res.civilservants > 0) {
        res.civilservants = this.toFixeds(parseFloat(res.civilservants), 2);
      } else if (res.civilservants == 0) {
        res.civilservants = "0.00";
      } else {
        res.civilservants = null;
      }

      if (res.balancemutualitymoney > 0) {
        res.balancemutualitymoney = this.toFixeds(
          parseFloat(res.balancemutualitymoney),
          2
        );
      } else if (res.balancemutualitymoney == 0) {
        res.balancemutualitymoney = "0.00";
      } else {
        res.balancemutualitymoney = null;
      }

      if (res.individualpayment > 0) {
        res.individualpayment = this.toFixeds(
          parseFloat(res.individualpayment),
          2
        );
      } else if (res.individualpayment == 0) {
        res.individualpayment = "0.00";
      } else {
        res.individualpayment = null;
      }

      if (res.individualpaya > 0) {
        res.individualpaya = this.toFixeds(parseFloat(res.individualpaya), 2);
      } else if (res.individualpaya == 0) {
        res.individualpaya = "0.00";
      } else {
        res.individualpaya = null;
      }

      if (res.paymentfrom > 0) {
        res.paymentfrom = this.toFixeds(parseFloat(res.paymentfrom), 2);
      } else if (res.paymentfrom == 0) {
        res.paymentfrom = "0.00";
      } else {
        res.paymentfrom = null;
      }

      if (res.paymentcap > 0) {
        res.paymentcap = this.toFixeds(parseFloat(res.paymentcap), 2);
      } else if (res.paymentcap == 0) {
        res.paymentcap = "0.00";
      } else {
        res.paymentcap = null;
      }

      if (res.individualpayb > 0) {
        res.individualpayb = this.toFixeds(parseFloat(res.individualpayb), 2);
      } else if (res.individualpayb == 0) {
        res.individualpayb = "0.00";
      } else {
        res.individualpayb = null;
      }

      if (res.ownepense > 0) {
        res.ownepense = this.toFixeds(parseFloat(res.ownepense), 2);
      } else if (res.ownepense == 0) {
        res.ownepense = "0.00";
      } else {
        res.ownepense = null;
      }

      if (res.indemnity > 0) {
        res.indemnity = this.toFixeds(parseFloat(res.indemnity), 2);
      } else if (res.indemnity == 0) {
        res.indemnity = "0.00";
      } else {
        res.indemnity = null;
      }

      if (res.hospitalmutualitypayment > 0) {
        res.hospitalmutualitypayment = this.toFixeds(
          parseFloat(res.hospitalmutualitypayment),
          2
        );
      } else if (res.hospitalmutualitypayment == 0) {
        res.hospitalmutualitypayment = "0.00";
      } else {
        res.hospitalmutualitypayment = null;
      }

      if (res.totalmutualitypayment > 0) {
        res.totalmutualitypayment = this.toFixeds(
          parseFloat(res.totalmutualitypayment),
          2
        );
      } else if (res.totalmutualitypayment == 0) {
        res.totalmutualitypayment = "0.00";
      } else {
        res.totalmutualitypayment = null;
      }

      if (res.selfliabilitiesa > 0) {
        res.selfliabilitiesa = this.toFixeds(
          parseFloat(res.selfliabilitiesa),
          2
        );
      } else if (res.selfliabilitiesa == 0) {
        res.selfliabilitiesa = "0.00";
      } else {
        res.selfliabilitiesa = null;
      }

      if (res.ordinaltionfund > 0) {
        res.ordinaltionfund = this.toFixeds(parseFloat(res.ordinaltionfund), 2);
      } else if (res.ordinaltionfund == 0) {
        res.ordinaltionfund = "0.00";
      } else {
        res.ordinaltionfund = null;
      }

      if (res.totalordinaltionfund > 0) {
        res.totalordinaltionfund = this.toFixeds(
          parseFloat(res.totalordinaltionfund),
          2
        );
      } else if (res.totalordinaltionfund == 0) {
        res.totalordinaltionfund = "0.00";
      } else {
        res.totalordinaltionfund = null;
      }

      if (res.selfliabilitiesb > 0) {
        res.selfliabilitiesb = this.toFixeds(
          parseFloat(res.selfliabilitiesb),
          2
        );
      } else if (res.selfliabilitiesb == 0) {
        res.selfliabilitiesb = "0.00";
      } else {
        res.selfliabilitiesb = null;
      }

      if (res.ordinaltionfundpay > 0) {
        res.ordinaltionfundpay = this.toFixeds(
          parseFloat(res.ordinaltionfundpay),
          2
        );
      } else if (res.ordinaltionfundpay == 0) {
        res.ordinaltionfundpay = "0.00";
      } else {
        res.ordinaltionfundpay = null;
      }

      if (res.assistantmutualitypayment > 0) {
        res.assistantmutualitypayment = this.toFixeds(
          parseFloat(res.assistantmutualitypayment),
          2
        );
      } else if (res.assistantmutualitypayment == 0) {
        res.assistantmutualitypayment = "0.00";
      } else {
        res.assistantmutualitypayment = null;
      }

      if (res.civilservants > 0) {
        res.civilservants = this.toFixeds(parseFloat(res.civilservants), 2);
      } else if (res.civilservants == 0) {
        res.civilservants = "0.00";
      } else {
        res.civilservants = null;
      }

      if (res.outmedicallypayment > 0) {
        res.outmedicallypayment = this.toFixeds(
          parseFloat(res.outmedicallypayment),
          2
        );
      } else if (res.outmedicallypayment == 0) {
        res.outmedicallypayment = "0.00";
      } else {
        res.outmedicallypayment = null;
      }

      if (res.selfpay > 0) {
        res.selfpay = this.toFixeds(parseFloat(res.selfpay), 2);
      } else if (res.selfpay == 0) {
        res.selfpay = "0.00";
      } else {
        res.selfpay = null;
      }
      if (res.selfpaytatol > 0) {
        res.selfpaytatol = this.toFixeds(parseFloat(res.selfpaytatol), 2);
      } else if (res.selfpaytatol == 0) {
        res.selfpaytatol = "0.00";
      } else {
        res.selfpaytatol = null;
      }

      if (res.deductionfeemount > 0) {
        res.deductionfeemount = this.toFixeds(
          parseFloat(res.deductionfeemount),
          2
        );
      } else if (res.deductionfeemount == 0) {
        res.deductionfeemount = "0.00";
      } else {
        res.deductionfeemount = null;
      }

      if (res.ruralmedicalinsurance > 0) {
        res.ruralmedicalinsurance = this.toFixeds(
          parseFloat(res.ruralmedicalinsurance),
          2
        );
      } else if (res.ruralmedicalinsurance == 0) {
        res.ruralmedicalinsurance = "0.00";
      } else {
        res.ruralmedicalinsurance = null;
      }

      if (res.percount > 0) {
        res.percount = this.toFixeds(parseFloat(res.percount), 2);
      } else if (res.percount == 0) {
        res.percount = "0.00";
      } else {
        res.percount = null;
      }
    },
    // 住院天数
    checkUnumber1(data) {
      // let aa = /(^[1-9]([0-9]*)$|^[0-9]$)/;
      let aa = /^[0-9]+([.]{1}[5]){0,1}$/;
      if (data.realhospdate) {
        if (!aa.test(data.realhospdate)) {
          this.$message.error("住院天数只能填写一位小数，且小数必须是0.5");
          data.realhospdate = null;
        }
      }
      if (data.imhospdate) {
        if (!aa.test(data.imhospdate)) {
          this.$message.error("重症病房天数只能填写一位小数，且小数必须是0.5");
          data.imhospdate = null;
        }
      }
    },
    // 医疗保险基金支付金额
    totalHos(res) {},
    getBjFee() {
      post(service.querybeiingmedicine, {
        bodys: {
          clmno: JSON.parse(this.$route.params.dataOfTable).rgtno
        }
      }).then(res => {
        if (res.data.headers.code === "200" && res.data.headers.success) {
          this.medicalClinic = res.data.bodys.menzhen;
          this.getMC();
          // for (let key in this.medicalClinic) {
          //   debugger;
          //   post(service.getHospital, {
          //     pagestart: this.pageData1.pagestart,
          //     pageend: this.pageData1.pageend,
          //     likename: this.medicalClinic[key].hospitalname
          //   }).then(res => {
          //     this.hospitalLists = res.data.bodys;
          //     this.newhospitalLists.push(this.hospitalLists);
          //     this.newhospitalLists[key] = res.data.bodys;
          //   });
          // }
          this.medicalApproval = res.data.bodys.shenpi;
          // for (let key in this.medicalApproval) {
          //   debugger;
          //   post(service.getHospital, {
          //     pagestart: this.pageData1.pagestart,
          //     pageend: this.pageData1.pageend,
          //     likename: this.medicalApproval[key].hospitalname
          //   }).then(res => {
          //     this.hospitalLists = res.data.bodys;
          //     this.newhospitalLists.push(this.hospitalLists);
          //     this.newhospitalLists[key] = res.data.bodys;
          //   });
          // }
          this.medicareHospital = res.data.bodys.zhuyaun;
          this.getMH();
          // for (let key in this.medicareHospital) {
          //   debugger;
          //   post(service.getHospital, {
          //     pagestart: this.pageData1.pagestart,
          //     pageend: this.pageData1.pageend,
          //     likename: this.medicareHospital[key].hospitalname
          //   }).then(res => {
          //     this.hospitalLists = res.data.bodys;
          //     this.newhospitalLists.push(this.hospitalLists);
          //     this.newhospitalLists[key] = res.data.bodys;
          //   });
          // }
          this.fertilityClinic = res.data.bodys.shengyumenzhen;
          this.getFC()
          // for (let key in this.fertilityClinic) {
          //   debugger;
          //   post(service.getHospital, {
          //     pagestart: this.pageData1.pagestart,
          //     pageend: this.pageData1.pageend,
          //     likename: this.fertilityClinic[key].hospitalname
          //   }).then(res => {
          //     this.hospitalLists = res.data.bodys;
          //     this.newhospitalLists.push(this.hospitalLists);
          //     this.newhospitalLists[key] = res.data.bodys;
          //   });
          // }
          this.fertilityHospital = res.data.bodys.shengyuzhuyuan;
          this.getFH()
          // for (let key in this.fertilityHospital) {
          //   debugger;
          //   post(service.getHospital, {
          //     pagestart: this.pageData1.pagestart,
          //     pageend: this.pageData1.pageend,
          //     likename: this.fertilityHospital[key].hospitalname
          //   }).then(res => {
          //     this.hospitalLists = res.data.bodys;
          //     this.newhospitalLists.push(this.hospitalLists);
          //     this.newhospitalLists[key] = res.data.bodys;
          //   });
          // }
          this.NCMSHospital = res.data.bodys.xinnonghe;
          this.getNCMS()
          // for (let key in this.NCMSHospital) {
          //   debugger;
          //   post(service.getHospital, {
          //     pagestart: this.pageData1.pagestart,
          //     pageend: this.pageData1.pageend,
          //     likename: this.NCMSHospital[key].hospitalname
          //   }).then(res => {
          //     this.hospitalLists = res.data.bodys;
          //     this.newhospitalLists.push(this.hospitalLists);
          //     this.newhospitalLists[key] = res.data.bodys;
          //   });
          // }
          this.medicalSpecial = res.data.bodys.teshu;
          this.getMS()
          // for (let key in this.medicalSpecial) {
          //   debugger;
          //   post(service.getHospital, {
          //     pagestart: this.pageData1.pagestart,
          //     pageend: this.pageData1.pageend,
          //     likename: this.medicalSpecial[key].hospitalname
          //   }).then(res => {
          //     this.hospitalLists = res.data.bodys;
          //     this.newhospitalLists.push(this.hospitalLists);
          //     this.newhospitalLists[key] = res.data.bodys;
          //   });
          // }
          this.commonOutpatient = res.data.bodys.putongmenzhen;
          this.getCO()
          // for (let key in this.commonOutpatient) {
          //   debugger;
          //   post(service.getHospital, {
          //     pagestart: this.pageData1.pagestart,
          //     pageend: this.pageData1.pageend,
          //     likename: this.commonOutpatient[key].hospitalname
          //   }).then(res => {
          //     this.hospitalLists = res.data.bodys;
          //     this.newhospitalLists.push(this.hospitalLists);
          //     this.newhospitalLists[key] = res.data.bodys;
          //   });
          // }
          this.commonHospital = res.data.bodys.putongzhuyaun;
          this.getCH()
          // for (let key in this.commonHospital) {
          //   debugger;
          //   post(service.getHospital, {
          //     pagestart: this.pageData1.pagestart,
          //     pageend: this.pageData1.pageend,
          //     likename: this.commonHospital[key].hospitalname
          //   }).then(res => {
          //     this.hospitalLists = res.data.bodys;
          //     this.newhospitalLists.push(this.hospitalLists);
          //     this.newhospitalLists[key] = res.data.bodys;
          //   });
          // }
        }
      });
    },
    getRow({ row, rowIndex }) {
      // row.index = rowIndex;
      // this.index1=rowIndex;
    },
    filtered(val) {
      console.log(val);
      this.pageData1.pagestart = 0;
      this.pageData1.pageend = 100;
      // console.log(value);
      // this.filterVal = value;
      // if (value) {
      //   let formdata = {
      //     pagestart: 0,
      //     pageend: 100,
      //     likename: value,
      //     code: ''
      //   };
      //   post(service.getHospital, formdata).then(res => {
      //     this.hospitalLists = res.data.bodys;
      //   });
      // }
      if (val != "") {
        // setTimeout(() => {
        for (let key in this.medicalClinic) {
          if (this.rowIndex == key) {
            this.medicalClinic[key].hospitalcode = val;
            // console.log(this.medicalClinic[key])
            this.filterVal = val;
            console.log(this.filterVal);
            // this.getHospitals(this.rowIndex);
            post(service.getHospital, {
              pagestart: this.pageData1.pagestart,
              pageend: this.pageData1.pageend,
              likename: this.filterVal
            }).then(res => {
              console.log(res);
              this.hospitalLists = res.data.bodys;
              this.newhospitalLists.push(this.hospitalLists);
              this.newhospitalLists[key] = res.data.bodys;
              // this.newhospitalLists = res.data.bodys;
            });
          }
        }
        // }, 200);
      }
    },
    filteredE(val) {
      this.pageData1.pagestart = 0;
      this.pageData1.pageend = 100;
      if (val != "") {
        // setTimeout(() => {
        for (let key in this.medicareHospital) {
          if (this.rowIndex == key) {
            this.medicareHospital[key].hospitalcode = val;
            this.filterVal = val;
            post(service.getHospital, {
              pagestart: this.pageData1.pagestart,
              pageend: this.pageData1.pageend,
              likename: this.filterVal
            }).then(res => {
              this.hospitalLists = res.data.bodys;
              this.newhospitalListsE.push(this.hospitalLists);
              this.newhospitalListsE[key] = res.data.bodys;
            });
          }
        }
        // }, 200);
      }
    },
    filteredF(val) {
      this.pageData1.pagestart = 0;
      this.pageData1.pageend = 100;
      if (val != "") {
        // setTimeout(() => {
        for (let key in this.fertilityClinic) {
          if (this.rowIndex == key) {
            this.fertilityClinic[key].hospitalcode = val;
            this.filterVal = val;
            post(service.getHospital, {
              pagestart: this.pageData1.pagestart,
              pageend: this.pageData1.pageend,
              likename: this.filterVal
            }).then(res => {
              this.hospitalLists = res.data.bodys;
              this.newhospitalListsF.push(this.hospitalLists);
              this.newhospitalListsF[key] = res.data.bodys;
            });
          }
        }
        // }, 200);
      }
    },
    filteredG(val) {
      this.pageData1.pagestart = 0;
      this.pageData1.pageend = 100;
      if (val != "") {
        // setTimeout(() => {
        for (let key in this.fertilityHospital) {
          if (this.rowIndex == key) {
            this.fertilityHospital[key].hospitalcode = val;
            this.filterVal = val;
            post(service.getHospital, {
              pagestart: this.pageData1.pagestart,
              pageend: this.pageData1.pageend,
              likename: this.filterVal
            }).then(res => {
              this.hospitalLists = res.data.bodys;
              this.newhospitalListsG.push(this.hospitalLists);
              this.newhospitalListsG[key] = res.data.bodys;
            });
          }
        }
        // }, 200);
      }
    },
    filteredH(val) {
      this.pageData1.pagestart = 0;
      this.pageData1.pageend = 100;
      if (val != "") {
        // setTimeout(() => {
        for (let key in this.NCMSHospital) {
          if (this.rowIndex == key) {
            this.NCMSHospital[key].hospitalcode = val;
            this.filterVal = val;
            post(service.getHospital, {
              pagestart: this.pageData1.pagestart,
              pageend: this.pageData1.pageend,
              likename: this.filterVal
            }).then(res => {
              this.hospitalLists = res.data.bodys;
              this.newhospitalListsH.push(this.hospitalLists);
              this.newhospitalListsH[key] = res.data.bodys;
            });
          }
        }
        // }, 200);
      }
    },
    filteredI(val) {
      this.pageData1.pagestart = 0;
      this.pageData1.pageend = 100;
      if (val != "") {
        // setTimeout(() => {
        for (let key in this.medicalSpecial) {
          if (this.rowIndex == key) {
            this.medicalSpecial[key].hospitalcode = val;
            this.filterVal = val;
            post(service.getHospital, {
              pagestart: this.pageData1.pagestart,
              pageend: this.pageData1.pageend,
              likename: this.filterVal
            }).then(res => {
              this.hospitalLists = res.data.bodys;
              this.newhospitalListsI.push(this.hospitalLists);
              this.newhospitalListsI[key] = res.data.bodys;
            });
          }
        }
        // }, 200);
      }
    },
    filteredJ(val) {
      this.pageData1.pagestart = 0;
      this.pageData1.pageend = 100;
      if (val != "") {
        // setTimeout(() => {
        for (let key in this.commonOutpatient) {
          if (this.rowIndex == key) {
            this.commonOutpatient[key].hospitalcode = val;
            this.filterVal = val;
            post(service.getHospital, {
              pagestart: this.pageData1.pagestart,
              pageend: this.pageData1.pageend,
              likename: this.filterVal
            }).then(res => {
              this.hospitalLists = res.data.bodys;
              this.newhospitalListsJ.push(this.hospitalLists);
              this.newhospitalListsJ[key] = res.data.bodys;
            });
          }
        }
        // }, 200);
      }
    },
    filteredK(val) {
      this.pageData1.pagestart = 0;
      this.pageData1.pageend = 100;
      if (val != "") {
        // setTimeout(() => {
        for (let key in this.commonHospital) {
          if (this.rowIndex == key) {
            this.commonHospital[key].hospitalcode = val;
            this.filterVal = val;
            post(service.getHospital, {
              pagestart: this.pageData1.pagestart,
              pageend: this.pageData1.pageend,
              likename: this.filterVal
            }).then(res => {
              this.hospitalLists = res.data.bodys;
              this.newhospitalListsK.push(this.hospitalLists);
              this.newhospitalListsK[key] = res.data.bodys;
            });
          }
        }
        // }, 200);
      }
    },
    getHospitals() {
      // setTimeout(() => {
      for (let key in this.medicalClinic) {
        post(service.getHospital, {
          pagestart: this.pageData1.pagestart,
          pageend: this.pageData1.pageend,
          likename: this.medicalClinic[key].hospitalcode || ""
        }).then(res => {
          this.hospitalLists = res.data.bodys;
          this.newhospitalLists.push(this.hospitalLists);
          this.newhospitalLists[key] = res.data.bodys;
        });
      }
      // }, 800);
    },
    initHospitalE(row, index) {
      row.hospitalcode = "";
      this.rowIndex = index;
      this.pageData1.likename = "";
      this.pageData1.pagestart = 0;
      this.filterVal = "";
      post(service.getHospital, {
        pagestart: this.pageData1.pagestart,
        pageend: this.pageData1.pageend,
        likename: row.hospitalcode || ""
      }).then(res => {
        this.hospitalLists = res.data.bodys;
        this.newhospitalListsE.push(this.hospitalLists);
        this.newhospitalListsE[index] = res.data.bodys;
      });
    },
    initHospitalF(row, index) {
      row.hospitalcode = "";
      this.rowIndex = index;
      this.pageData1.likename = "";
      this.pageData1.pagestart = 0;
      this.filterVal = "";
      post(service.getHospital, {
        pagestart: this.pageData1.pagestart,
        pageend: this.pageData1.pageend,
        likename: row.hospitalcode || ""
      }).then(res => {
        this.hospitalLists = res.data.bodys;
        this.newhospitalListsF.push(this.hospitalLists);
        this.newhospitalListsF[index] = res.data.bodys;
      });
    },
    initHospitalG(row, index) {
      row.hospitalcode = "";
      this.rowIndex = index;
      this.pageData1.likename = "";
      this.pageData1.pagestart = 0;
      this.filterVal = "";
      post(service.getHospital, {
        pagestart: this.pageData1.pagestart,
        pageend: this.pageData1.pageend,
        likename: row.hospitalcode || ""
      }).then(res => {
        this.hospitalLists = res.data.bodys;
        this.newhospitalListsG.push(this.hospitalLists);
        this.newhospitalListsG[index] = res.data.bodys;
      });
    },
    initHospitalH(row, index) {
      row.hospitalcode = "";
      this.rowIndex = index;
      this.pageData1.likename = "";
      this.pageData1.pagestart = 0;
      this.filterVal = "";
      post(service.getHospital, {
        pagestart: this.pageData1.pagestart,
        pageend: this.pageData1.pageend,
        likename: row.hospitalcode || ""
      }).then(res => {
        this.hospitalLists = res.data.bodys;
        this.newhospitalListsH.push(this.hospitalLists);
        this.newhospitalListsH[index] = res.data.bodys;
      });
    },
    initHospitalI(row, index) {
      row.hospitalcode = "";
      this.rowIndex = index;
      this.pageData1.likename = "";
      this.pageData1.pagestart = 0;
      this.filterVal = "";
      post(service.getHospital, {
        pagestart: this.pageData1.pagestart,
        pageend: this.pageData1.pageend,
        likename: row.hospitalcode || ""
      }).then(res => {
        this.hospitalLists = res.data.bodys;
        this.newhospitalListsI.push(this.hospitalLists);
        this.newhospitalListsI[index] = res.data.bodys;
      });
    },
    initHospitalJ(row, index) {
      row.hospitalcode = "";
      this.rowIndex = index;
      this.pageData1.likename = "";
      this.pageData1.pagestart = 0;
      this.filterVal = "";
      post(service.getHospital, {
        pagestart: this.pageData1.pagestart,
        pageend: this.pageData1.pageend,
        likename: row.hospitalcode || ""
      }).then(res => {
        this.hospitalLists = res.data.bodys;
        this.newhospitalListsJ.push(this.hospitalLists);
        this.newhospitalListsJ[index] = res.data.bodys;
      });
    },
    initHospitalK(row, index) {
      row.hospitalcode = "";
      this.rowIndex = index;
      this.pageData1.likename = "";
      this.pageData1.pagestart = 0;
      this.filterVal = "";
      post(service.getHospital, {
        pagestart: this.pageData1.pagestart,
        pageend: this.pageData1.pageend,
        likename: row.hospitalcode || ""
      }).then(res => {
        this.hospitalLists = res.data.bodys;
        this.newhospitalListsK.push(this.hospitalLists);
        this.newhospitalListsK[index] = res.data.bodys;
      });
    },
    getMC() {
      for (let key in this.medicalClinic) {
        post(service.getHospital, {
          pagestart: this.pageData1.pagestart,
          pageend: this.pageData1.pageend,
          likename: this.medicalClinic[key].hospitalname || "" || this.filterVal
        }).then(res => {
          console.log(res);
          this.hospitalLists = res.data.bodys;
          this.newhospitalLists.push(this.hospitalLists);
          this.newhospitalLists[key] = res.data.bodys;
        });
      }
    },
    getMH() {
      for (let key in this.medicareHospital) {
        post(service.getHospital, {
          pagestart: this.pageData1.pagestart,
          pageend: this.pageData1.pageend,
          likename:
            this.medicareHospital[key].hospitalname || "" || this.filterVal
        }).then(res => {
          console.log(res);
          this.hospitalLists = res.data.bodys;
          this.newhospitalListsE.push(this.hospitalLists);
          this.newhospitalListsE[key] = res.data.bodys;
        });
      }
    },
    getFC(){
            for (let key in this.fertilityClinic) {
        post(service.getHospital, {
          pagestart: this.pageData1.pagestart,
          pageend: this.pageData1.pageend,
          likename:
            this.fertilityClinic[key].hospitalname || "" || this.filterVal
        }).then(res => {
          console.log(res);
          this.hospitalLists = res.data.bodys;
          this.newhospitalListsF.push(this.hospitalLists);
          this.newhospitalListsF[key] = res.data.bodys;
        });
      }
    },
    getFH(){
            for (let key in this.fertilityHospital) {
        post(service.getHospital, {
          pagestart: this.pageData1.pagestart,
          pageend: this.pageData1.pageend,
          likename:
            this.fertilityHospital[key].hospitalname || "" || this.filterVal
        }).then(res => {
          console.log(res);
          this.hospitalLists = res.data.bodys;
          this.newhospitalListsG.push(this.hospitalLists);
          this.newhospitalListsG[key] = res.data.bodys;
        });
      }
    },
    getNCMS(){
        for (let key in this.NCMSHospital) {
        post(service.getHospital, {
          pagestart: this.pageData1.pagestart,
          pageend: this.pageData1.pageend,
          likename:
            this.NCMSHospital[key].hospitalname || "" || this.filterVal
        }).then(res => {
          console.log(res);
          this.hospitalLists = res.data.bodys;
          this.newhospitalListsH.push(this.hospitalLists);
          this.newhospitalListsH[key] = res.data.bodys;
        });
      }
    },
    getMS(){
         for (let key in this.medicalSpecial) {
        post(service.getHospital, {
          pagestart: this.pageData1.pagestart,
          pageend: this.pageData1.pageend,
          likename:
            this.medicalSpecial[key].hospitalname || "" || this.filterVal
        }).then(res => {
          console.log(res);
          this.hospitalLists = res.data.bodys;
          this.newhospitalListsI.push(this.hospitalLists);
          this.newhospitalListsI[key] = res.data.bodys;
        });
      }
    },
        getCO(){
         for (let key in this.commonOutpatient) {
        post(service.getHospital, {
          pagestart: this.pageData1.pagestart,
          pageend: this.pageData1.pageend,
          likename:
            this.commonOutpatient[key].hospitalname || "" || this.filterVal
        }).then(res => {
          console.log(res);
          this.hospitalLists = res.data.bodys;
          this.newhospitalListsJ.push(this.hospitalLists);
          this.newhospitalListsJ[key] = res.data.bodys;
        });
      }
    },
        getCH(){
         for (let key in this.commonHospital) {
        post(service.getHospital, {
          pagestart: this.pageData1.pagestart,
          pageend: this.pageData1.pageend,
          likename:
            this.commonHospital[key].hospitalname || "" || this.filterVal
        }).then(res => {
          console.log(res);
          this.hospitalLists = res.data.bodys;
          this.newhospitalListsK.push(this.hospitalLists);
          this.newhospitalListsK[key] = res.data.bodys;
        });
      }
    },
    // initH(data) {
    //   debugger
    //   post(service.getHospital, {
    //     pagestart: this.pageData1.pagestart,
    //     pageend: this.pageData1.pageend,
    //     // likename: name.hospitalcode
    //     likename: data
    //   }).then(res => {
    //     this.hospitalLists = res.data.bodys;
    //     this.newhospitalLists.push(this.hospitalLists);
    //     this.newhospitalLists[index] = res.data.bodys;
    //   });
    // },
    initHospital(row, index) {
      row.hospitalcode = "";
      this.rowIndex = index;
      this.pageData1.likename = "";
      this.pageData1.pagestart = 0;
      this.filterVal = "";
      post(service.getHospital, {
        pagestart: this.pageData1.pagestart,
        pageend: this.pageData1.pageend,
        likename: row.hospitalcode || ""
      }).then(res => {
        this.hospitalLists = res.data.bodys;
        this.newhospitalLists.push(this.hospitalLists);
        this.newhospitalLists[index] = res.data.bodys;
      });
    },
    getHospital(pageData1) {
      post(service.getHospital, pageData1).then(res => {
        this.hospitalLists = [...this.hospitalLists, ...res.data.bodys];
      });
    },
    loadmores() {
      this.pageData1.pagestart += 100;
      this.pageData1.endPage = 100;
      // if (this.filterVal) {
      //   this.pageData1.likename = this.filterVal;
      // }
      // this.getHospital(this.pageData1);
      post(service.getHospital, {
        pagestart: this.pageData1.pagestart,
        pageend: this.pageData1.pageend,
        likename: this.filterVal || ""
      }).then(res => {
        this.hospitalLists = [...this.hospitalLists, ...res.data.bodys];
        this.newhospitalLists.push(this.hospitalLists);
        this.newhospitalLists[this.rowIndex] = [
          ...this.newhospitalLists[this.rowIndex],
          ...res.data.bodys
        ];
      });
    },
    loadmoresE() {
      this.pageData1.pagestart += 100;
      this.pageData1.endPage = 100;
      post(service.getHospital, {
        pagestart: this.pageData1.pagestart,
        pageend: this.pageData1.pageend,
        likename: this.filterVal || ""
      }).then(res => {
        this.hospitalLists = [...this.hospitalLists, ...res.data.bodys];
        this.newhospitalListsE.push(this.hospitalLists);
        this.newhospitalListsE[this.rowIndex] = [
          ...this.newhospitalListsE[this.rowIndex],
          ...res.data.bodys
        ];
      });
    },
    loadmoresF() {
      this.pageData1.pagestart += 100;
      this.pageData1.endPage = 100;
      post(service.getHospital, {
        pagestart: this.pageData1.pagestart,
        pageend: this.pageData1.pageend,
        likename: this.filterVal || ""
      }).then(res => {
        this.hospitalLists = [...this.hospitalLists, ...res.data.bodys];
        this.newhospitalListsF.push(this.hospitalLists);
        this.newhospitalListsF[this.rowIndex] = [
          ...this.newhospitalListsF[this.rowIndex],
          ...res.data.bodys
        ];
      });
    },
    loadmoresG() {
      this.pageData1.pagestart += 100;
      this.pageData1.endPage = 100;
      post(service.getHospital, {
        pagestart: this.pageData1.pagestart,
        pageend: this.pageData1.pageend,
        likename: this.filterVal || ""
      }).then(res => {
        this.hospitalLists = [...this.hospitalLists, ...res.data.bodys];
        this.newhospitalListsG.push(this.hospitalLists);
        this.newhospitalListsG[this.rowIndex] = [
          ...this.newhospitalListsG[this.rowIndex],
          ...res.data.bodys
        ];
      });
    },
    loadmoresH() {
      this.pageData1.pagestart += 100;
      this.pageData1.endPage = 100;
      post(service.getHospital, {
        pagestart: this.pageData1.pagestart,
        pageend: this.pageData1.pageend,
        likename: this.filterVal || ""
      }).then(res => {
        this.hospitalLists = [...this.hospitalLists, ...res.data.bodys];
        this.newhospitalListsH.push(this.hospitalLists);
        this.newhospitalListsH[this.rowIndex] = [
          ...this.newhospitalListsH[this.rowIndex],
          ...res.data.bodys
        ];
      });
    },
    loadmoresI() {
      this.pageData1.pagestart += 100;
      this.pageData1.endPage = 100;
      post(service.getHospital, {
        pagestart: this.pageData1.pagestart,
        pageend: this.pageData1.pageend,
        likename: this.filterVal || ""
      }).then(res => {
        this.hospitalLists = [...this.hospitalLists, ...res.data.bodys];
        this.newhospitalListsI.push(this.hospitalLists);
        this.newhospitalListsI[this.rowIndex] = [
          ...this.newhospitalListsI[this.rowIndex],
          ...res.data.bodys
        ];
      });
    },
    loadmoresJ() {
      this.pageData1.pagestart += 100;
      this.pageData1.endPage = 100;
      post(service.getHospital, {
        pagestart: this.pageData1.pagestart,
        pageend: this.pageData1.pageend,
        likename: this.filterVal || ""
      }).then(res => {
        this.hospitalLists = [...this.hospitalLists, ...res.data.bodys];
        this.newhospitalListsJ.push(this.hospitalLists);
        this.newhospitalListsJ[this.rowIndex] = [
          ...this.newhospitalListsJ[this.rowIndex],
          ...res.data.bodys
        ];
      });
    },
    loadmoresK() {
      this.pageData1.pagestart += 100;
      this.pageData1.endPage = 100;
      post(service.getHospital, {
        pagestart: this.pageData1.pagestart,
        pageend: this.pageData1.pageend,
        likename: this.filterVal || ""
      }).then(res => {
        this.hospitalLists = [...this.hospitalLists, ...res.data.bodys];
        this.newhospitalListsK.push(this.hospitalLists);
        this.newhospitalListsK[this.rowIndex] = [
          ...this.newhospitalListsK[this.rowIndex],
          ...res.data.bodys
        ];
      });
    },
    // changeHos(data) {
    //   console.log("11111111xu", data);
    //   this.initHospital();
    //   for (var i = 0; i < this.medicalClinic.length; i++) {
    //     for (var key in this.medicalClinic) {
    //       console.log(key);
    //       if (key == i) {
    //         this.medicalClinic[key].hospitalLists = this.filtered();
    //       }
    //     }
    //   }
    // },

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
        deductname: "", // //扣费名称
        deductreasontype: "", // 扣费原因类型
        deductremark: "", //备注
        deductreason: "", // 扣费原因
        deductfee: "", //扣费金额
        deducttype: "" // 扣费类型
      });
    },
    addRowItem3() {
      // 诊断
      this.zdDetail.push({
        diagnosticcode: "", // 诊断代码
        diagnosticname: "" // 诊断名称
      });
    },
    addRowItem4() {
      this.ssDetail.push({
        operationcode: "", // 手术代码
        operationname: "" // 手术名称
      });
    },
    getFeeItem() {
      post(service.getCodeList, {
        codetype: ["llfeeitem", "deductiontype"]
      }).then(res => {
        this.fyxLists = res.data.bodys.llfeeitem; //费用项
        this.koufeiTypes = res.data.bodys.deductiontype; //扣费类型
      });
    },
    changeFeeItem(type, obj) {
      for (var key in this.fyxLists) {
        if (type == this.fyxLists[key].code) {
          this.fyListCode = this.fyxLists[key].code;
        }
      }
    },
    changeKoufeiItem(type, obj) {
      // obj.deductnames = "";
      // this.koufeiLists = [];
      // this.pageData.startPage = 0;
      // this.pageData.endPage = 100;
      for (var key in this.koufeiTypes) {
        if (type == this.koufeiTypes[key].code) {
          this.kyListCode = this.koufeiTypes[key].code;
        }
      }
    },
    initReason() {
      this.koufeiReason = getCodeType("deductionReason");
    },
    changeKouFei() {},
    //费用名称明细
    changeFeeitemdetil() {
      post(service.llfeeitem, {
        pagestart: this.pageData2.pagestart,
        pageend: this.pageData2.pageend,
        code: this.fyListCode,
        likename: ""
      }).then(res => {
        this.fyDetailList1 = res.data.bodys;
      });
    },

    //费用名称明细-loadmore
    loadmore() {
      this.pageData2.pagestart += 100;
      this.pageData2.pageend = 100;
      post(service.llfeeitem, {
        pagestart: this.pageData2.pagestart,
        pageend: this.pageData2.pageend,
        code: this.fyListCode,
        likename: ""
      }).then(res => {
        this.fyDetailList1 = [...this.fyDetailList1, ...res.data.bodys];
      });
    },

    //扣费名称
    loadmore1() {},

    initDiagcode() {
      this.formData1.likename = "";
      this.formData1.pagestart = 0;
      // this.filterVal = "";
      // this.getDiagnosis(this.formData1)
      post(service.lldiagcode, this.formData1).then(res => {
        const _res1 = res.data.bodys;
        this.diagcodeList = _res1;
      });
    },
    initOpera() {
      this.operationList = getCodeType("operationcode"); //手术代码
    },
    initKouFei() {
      post(service.llfeeitem, {
        pagestart: this.pageData3.pagestart,
        pageend: this.pageData3.pageend,
        code: this.kyListCode,
        likename: this.pageData3.likename
      }).then(res => {
        this.koufeiLists = res.data.bodys;
      });
    },

    pDetail(data) {
      //费用
      post(service.querybpay, {
        bodys: {
          clmno: JSON.parse(this.$route.params.dataOfTable).rgtno,
          mainfeeno: data
        }
      }).then(result => {
        if (result.data.headers.code === "200" && result.data.headers.success) {
          this.kfDetail = result.data.bodys.deduct;
          this.fyDetail = result.data.bodys.receipt;
        } else {
          this.kfDetail = [];
          this.fyDetail = [];
        }
      });
      // 诊断
      post(service.queryDiag, {
        bodys: {
          clmno: JSON.parse(this.$route.params.dataOfTable).rgtno,
          mainfeeno: data
        }
      }).then(result => {
        if (result.data.headers.code === "200" && result.data.headers.success) {
          this.zdDetail = result.data.bodys.diag;
          this.ssDetail = result.data.bodys.operation;
        } else {
          this.zdDetail = [];
          this.ssDetail = [];
        }
      });
    },

    entryDetails(data1, data2, data3) {
      // console.log(data1, data2, data3);
      if (data3 == "C") {
        if (!data2.billno) {
          this.$message.error("请先录入收据编号");
        } else {
          this.dialogVisible = true;
          this.mainData1 = data2;
          this.requestData = {
            operator: localStorage.getItem("userCode"),
            rgtno: JSON.parse(this.$route.params.dataOfTable).rgtno,
            billno: data2.billno,
            feetype: "C"
          };

          this.pDetail(data2.billno);
        }
      } else if (data3 == "D") {
        if (!data2.billno) {
          this.$message.error("请先录入收据编号");
        } else {
          this.dialogVisible = true;
          this.mainData1 = data2;
          this.requestData = {
            operator: localStorage.getItem("userCode"),
            rgtno: JSON.parse(this.$route.params.dataOfTable).rgtno,
            billno: data2.billno,
            feetype: "D"
          };
          this.pDetail(data2.billno);
        }
      } else if (data3 == "E") {
        if (!data2.billno) {
          this.$message.error("请先录入收据编号");
        } else {
          this.dialogVisible = true;
          this.mainData1 = data2;
          this.requestData = {
            operator: localStorage.getItem("userCode"),
            rgtno: JSON.parse(this.$route.params.dataOfTable).rgtno,
            billno: data2.billno,
            feetype: "E"
          };
          this.pDetail(data2.billno);
        }
      } else if (data3 == "F") {
        if (!data2.billno) {
          this.$message.error("请先录入收据编号");
        } else {
          this.dialogVisible = true;
          this.mainData1 = data2;
          this.requestData = {
            operator: localStorage.getItem("userCode"),
            rgtno: JSON.parse(this.$route.params.dataOfTable).rgtno,
            billno: data2.billno,
            feetype: "F"
          };
          this.pDetail(data2.billno);
        }
      } else if (data3 == "G") {
        if (!data2.billno) {
          this.$message.error("请先录入收据编号");
        } else {
          this.dialogVisible = true;
          this.mainData1 = data2;
          this.requestData = {
            operator: localStorage.getItem("userCode"),
            rgtno: JSON.parse(this.$route.params.dataOfTable).rgtno,
            billno: data2.billno,
            feetype: "G"
          };
          this.pDetail(data2.billno);
        }
      } else if (data3 == "H") {
        if (!data2.billno) {
          this.$message.error("请先录入收据编号");
        } else {
          this.dialogVisible = true;
          this.mainData1 = data2;
          this.requestData = {
            operator: localStorage.getItem("userCode"),
            rgtno: JSON.parse(this.$route.params.dataOfTable).rgtno,
            billno: data2.billno,
            feetype: "H"
          };
          this.pDetail(data2.billno);
        }
      } else if (data3 == "I") {
        if (!data2.billno) {
          this.$message.error("请先录入收据编号");
        } else {
          this.dialogVisible = true;
          this.mainData1 = data2;
          this.requestData = {
            operator: localStorage.getItem("userCode"),
            rgtno: JSON.parse(this.$route.params.dataOfTable).rgtno,
            billno: data2.billno,
            feetype: "I"
          };
          this.pDetail(data2.billno);
        }
      } else if (data3 == "J") {
        if (!data2.billno) {
          this.$message.error("请先录入收据编号");
        } else {
          this.dialogVisible = true;
          this.mainData1 = data2;
          this.requestData = {
            operator: localStorage.getItem("userCode"),
            rgtno: JSON.parse(this.$route.params.dataOfTable).rgtno,
            billno: data2.billno,
            feetype: "J"
          };
          this.pDetail(data2.billno);
        }
      } else if (data3 == "K") {
        if (!data2.billno) {
          this.$message.error("请先录入收据编号");
        } else {
          this.dialogVisible = true;
          this.mainData1 = data2;
          this.requestData = {
            operator: localStorage.getItem("userCode"),
            rgtno: JSON.parse(this.$route.params.dataOfTable).rgtno,
            billno: data2.billno,
            feetype: "K"
          };
          this.pDetail(data2.billno);
        }
      }
    },
    //确定请求
    postDetail() {
      let _this = this;
      post(service.savebmpay, {
        bodys: {
          customerno: JSON.parse(_this.$route.params.dataOfTable).customerno,
          operator: localStorage.getItem("userCode"),
          mngcom: localStorage.getItem("comCode"),
          beijingMedicineRequest: _this.requestData,
          medicinerequestdeductlist: _this.kfDetail, //扣费明细
          medicinerequestreceiptlist: _this.fyDetail, // 费用明细
          diaglist: _this.zdDetail, //诊断明细
          operationlist: _this.ssDetail //手术明细
        }
      }).then(result => {
        if (result.data.headers.success && result.data.headers.code === "200") {
          // _this.mainData1.refusemoney = result.data.bodys.rows[0].deductfee; // 扣费明细
          // _this.mainData1.billmoney = result.data.bodys.rows[0].receiptfee; // 费用总
          _this.mainData1.deductfee = result.data.bodys.deduct; // 扣费明细
          _this.mainData1.feemount = result.data.bodys.receipt; // 门诊金额
          _this.mainData1.receiptfee = result.data.bodys.receipt; // 费用总金额
          _this.mainData1.billmoney = result.data.bodys.receipt; // 住院金额
          _this.mainData1.specialfeemount = result.data.bodys.receipt; // 门诊特殊病金额

          // var tbillmoney = parseFloat(_this.mainData1.billmoney);
          // var tsocifee = isNaN(this.mainData1.socifee)
          //   ? 0
          //   : this.mainData1.socifee;
          // console.log(isNaN(tsocifee));
          // var totherfee = isNaN(this.mainData1.otherfee)
          //   ? 0
          //   : this.mainData1.otherfee;
          // var trefusemoney = isNaN(this.mainData1.refusemoney)
          //   ? 0
          //   : this.mainData1.refusemoney;
          // _this.mainData1.indemnity = this.toFixeds(
          //   tbillmoney - tsocifee - trefusemoney - totherfee,
          //   2
          // );
          _this.$message.success(result.data.headers.message);
          _this.dialogVisible = false;
        } else _this.$message.error(result.data.headers.message);
      });
    },
    // 录入明细-确定按钮
    beSure() {
      let _this = this;
      if (_this.kfDetail.length == 0 && _this.fyDetail == 0) {
        _this.$message.error("请录入信息！");
      } else if (
        checkLfor1(_this.fyDetail) ||
        checkLfor22(_this.kfDetail) ||
        checkLfor4(_this.zdDetail) ||
        checkLfor5(_this.ssDetail)
      ) {
        if (checkLfor1(_this.fyDetail)) {
          _this.$message.error(checkLfor1(_this.fyDetail));
        } else if (checkLfor22(_this.kfDetail)) {
          _this.$message.error(checkLfor22(_this.kfDetail));
        } else if (checkLfor4(_this.zdDetail)) {
          _this.$message.error(checkLfor4(_this.zdDetail));
        } else if (checkLfor5(_this.ssDetail)) {
          _this.$message.error(checkLfor5(_this.ssDetail));
        }
      } else {
        // 医保门诊
        if (_this.mainData1.feetype == "C") {
          post(service.savebmpay, {
            bodys: {
              customerno: JSON.parse(_this.$route.params.dataOfTable)
                .customerno,
              operator: localStorage.getItem("userCode"),
              mngcom: localStorage.getItem("comCode"),
              beijingMedicineRequest: _this.requestData,
              medicinerequestdeductlist: _this.kfDetail, //扣费明细
              medicinerequestreceiptlist: _this.fyDetail, // 费用明细
              diaglist: _this.zdDetail, //诊断明细
              operationlist: _this.ssDetail //手术明细
            }
          }).then(result => {
            if (
              result.data.headers.success &&
              result.data.headers.code === "200"
            ) {
              _this.mainData1.deductfee = result.data.bodys.deduct; // 扣费明细
              _this.mainData1.feemount = result.data.bodys.receipt; // 门诊金额

              // var tbillmoney = parseFloat(_this.mainData1.billmoney);
              // var tsocifee = isNaN(this.mainData1.socifee)
              //   ? 0
              //   : this.mainData1.socifee;
              // console.log(isNaN(tsocifee));
              // var totherfee = isNaN(this.mainData1.otherfee)
              //   ? 0
              //   : this.mainData1.otherfee;
              // var trefusemoney = isNaN(this.mainData1.refusemoney)
              //   ? 0
              //   : this.mainData1.refusemoney;
              // _this.mainData1.indemnity = this.toFixeds(
              //   tbillmoney - tsocifee - trefusemoney - totherfee,
              //   2
              // );
              _this.$message.success(result.data.headers.message);
              _this.dialogVisible = false;
            } else _this.$message.error(result.data.headers.message);
          });
        } else if (_this.mainData1.feetype == "D") {
          _this.postDetail();
        } else if (_this.mainData1.feetype == "E") {
          _this.postDetail();
        } else if (_this.mainData1.feetype == "F") {
          _this.postDetail();
        } else if (_this.mainData1.feetype == "G") {
          _this.postDetail();
        } else if (_this.mainData1.feetype == "H") {
          _this.postDetail();
        } else if (_this.mainData1.feetype == "I") {
          _this.postDetail();
        } else if (_this.mainData1.feetype == "J") {
          _this.postDetail();
        } else if (_this.mainData1.feetype == "K") {
          _this.postDetail();
        }
      }
    },

    //单价/数量
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
    // 费用=保留两位
    twoNum(obj) {
      // if (obj.selfamnt > 0) {
      //   obj.selfamnt = this.toFixeds(parseFloat(obj.selfamnt), 2);
      //   // obj.selfamnt = parseFloat(obj.selfamnt).toFixed(2)
      // } else if (obj.selfamnt == 0) {
      //   obj.selfamnt = 0;
      // } else {
      //   obj.selfamnt = null;
      // }
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

    applyTask() {
      if (
        this.medicalClinic.length == 0 &&
        this.medicalApproval.length == 0 &&
        this.medicareHospital.length == 0 &&
        this.fertilityClinic.length == 0 &&
        this.fertilityHospital.length == 0 &&
        this.NCMSHospital.length == 0 &&
        this.medicalSpecial.length == 0 &&
        this.commonOutpatient.length == 0 &&
        this.commonHospital.length == 0
      ) {
        this.$message.error("请录入信息!");
      } else if (
        checkBj(this.medicalClinic, "C") ||
        checkBj(this.medicalApproval, "D") ||
        checkBj(this.medicareHospital, "E") ||
        checkBj(this.fertilityClinic, "F") ||
        checkBj(this.fertilityHospital, "G") ||
        checkBj(this.NCMSHospital, "H") ||
        checkBj(this.medicalSpecial, "I") ||
        checkBj(this.commonOutpatient, "J") ||
        checkBj(this.commonHospital, "K")
      ) {
        if (checkBj(this.medicalClinic, "C")) {
          this.$message.error(
            "医保门诊单证" + checkBj(this.medicalClinic, "C")
          );
        } else if (checkBj(this.medicalApproval, "D")) {
          this.$message.error(
            "医保审批单证" + checkBj(this.medicalApproval, "D")
          );
        } else if (checkBj(this.medicareHospital, "E")) {
          this.$message.error(
            "医保住院单证" + checkBj(this.medicareHospital, "E")
          );
        } else if (checkBj(this.fertilityClinic, "F")) {
          this.$message.error(
            "生育门诊单证" + checkBj(this.fertilityClinic, "F")
          );
        } else if (checkBj(this.fertilityHospital, "G")) {
          this.$message.error(
            "生育住院单证" + checkBj(this.fertilityHospital, "G")
          );
        } else if (checkBj(this.NCMSHospital, "H")) {
          this.$message.error(
            "新农合-住院单证" + checkBj(this.NCMSHospital, "H")
          );
        } else if (checkBj(this.medicalSpecial, "I")) {
          this.$message.error(
            "医保特殊病单证" + checkBj(this.medicalSpecial, "I")
          );
        } else if (checkBj(this.commonOutpatient, "J")) {
          this.$message.error(
            "普通门诊单证" + checkBj(this.commonOutpatient, "J")
          );
        } else if (checkBj(this.commonHospital, "K")) {
          this.$message.error(
            "普通住院单证" + checkBj(this.commonHospital, "K")
          );
        }
      } else {
        var allArr = this.medicalClinic.concat(
          this.medicalApproval,
          this.medicareHospital,
          this.fertilityClinic,
          this.fertilityHospital,
          this.NCMSHospital,
          this.medicalSpecial,
          this.commonOutpatient,
          this.commonHospital
        );
        post(service.beijngmedicine, {
          bodys: {
            customerno: JSON.parse(this.$route.params.dataOfTable).customerno,
            rgtno: JSON.parse(this.$route.params.dataOfTable).rgtno,
            operator: localStorage.getItem("userCode"),
            mngcom: localStorage.getItem("comCode"),
            beijinglist: allArr
            // remark: "1"
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
    // 主表 删 除
    deleteOne(index, row, rows, data) {
      if (data == "C") {
        post(service.deletebm, {
          bodys: {
            clmno: JSON.parse(this.$route.params.dataOfTable).rgtno,
            mainfeeno: row.billno
          }
        }).then(res => {
          if (res.data.headers.code === "200" && res.data.headers.success) {
            console.log(res.data.headers.message);
          }
        });
        rows.splice(index, 1);
      } else if (data == "D") {
        post(service.deletebm, {
          bodys: {
            clmno: JSON.parse(this.$route.params.dataOfTable).rgtno,
            mainfeeno: row.billno
          }
        }).then(res => {
          if (res.data.headers.code === "200" && res.data.headers.success) {
            console.log(res.data.headers.message);
          }
        });
        rows.splice(index, 1);
      } else if (data == "E") {
        post(service.deletebm, {
          bodys: {
            clmno: JSON.parse(this.$route.params.dataOfTable).rgtno,
            mainfeeno: row.billno
          }
        }).then(res => {
          if (res.data.headers.code === "200" && res.data.headers.success) {
            console.log(res.data.headers.message);
          }
        });
        rows.splice(index, 1);
      } else if (data == "F") {
        post(service.deletebm, {
          bodys: {
            clmno: JSON.parse(this.$route.params.dataOfTable).rgtno,
            mainfeeno: row.billno
          }
        }).then(res => {
          if (res.data.headers.code === "200" && res.data.headers.success) {
            console.log(res.data.headers.message);
          }
        });
        rows.splice(index, 1);
      } else if (data == "G") {
        post(service.deletebm, {
          bodys: {
            clmno: JSON.parse(this.$route.params.dataOfTable).rgtno,
            mainfeeno: row.billno
          }
        }).then(res => {
          if (res.data.headers.code === "200" && res.data.headers.success) {
            console.log(res.data.headers.message);
          }
        });
        rows.splice(index, 1);
      } else if (data == "H") {
        post(service.deletebm, {
          bodys: {
            clmno: JSON.parse(this.$route.params.dataOfTable).rgtno,
            mainfeeno: row.billno
          }
        }).then(res => {
          if (res.data.headers.code === "200" && res.data.headers.success) {
            console.log(res.data.headers.message);
          }
        });
        rows.splice(index, 1);
      } else if (data == "I") {
        post(service.deletebm, {
          bodys: {
            clmno: JSON.parse(this.$route.params.dataOfTable).rgtno,
            mainfeeno: row.billno
          }
        }).then(res => {
          if (res.data.headers.code === "200" && res.data.headers.success) {
            console.log(res.data.headers.message);
          }
        });
        rows.splice(index, 1);
      } else if (data == "J") {
        post(service.deletebm, {
          bodys: {
            clmno: JSON.parse(this.$route.params.dataOfTable).rgtno,
            mainfeeno: row.billno
          }
        }).then(res => {
          if (res.data.headers.code === "200" && res.data.headers.success) {
            console.log(res.data.headers.message);
          }
        });
        rows.splice(index, 1);
      } else if (data == "K") {
        post(service.deletebm, {
          bodys: {
            clmno: JSON.parse(this.$route.params.dataOfTable).rgtno,
            mainfeeno: row.billno
          }
        }).then(res => {
          if (res.data.headers.code === "200" && res.data.headers.success) {
            console.log(res.data.headers.message);
          }
        });
        rows.splice(index, 1);
      }
    },
    // 明细 删 除
    delete1(index, rows, data) {
      if (data == "01") {
        rows.splice(index, 1);
      } else if (data == "02") {
        rows.splice(index, 1);
      } else if (data == "03") {
        rows.splice(index, 1);
      } else if (data == "04") {
        rows.splice(index, 1);
      }
    },
    addRow(tableData, event) {
      if (event == "C") {
        tableData.push({
          rgtno: JSON.parse(this.$route.params.dataOfTable).rgtno,
          operator: localStorage.getItem("userCode"),
          mngcom: localStorage.getItem("comCode"),
          feetype: "C",
          billno: null,
          hospitalname: JSON.parse(this.$route.params.dataOfTable).hospitalcode,
          clinicdate: null,
          feemount: "0",
          selfaccountpaymoney: null,
          selfcashpaymoney: null,
          medicallypayment: null,
          totalmedicallypayment: null,
          yearmutualitybigpay: null,
          insurancepayment: null,
          sociflag: "1",
          mutualitybigpay: null,
          retirementpayment: null,
          disabilitysoldier: null,
          civilservants: null,
          balancemutualitymoney: null,
          individualpayment: null,
          individualpaya: null,
          paymentfrom: null,
          paymentcap: null,
          individualpayb: null,
          ownepense: null,
          deductfee: null,
          indemnity: null,
          operation: "0"
        });
        this.filterVal = "";
        this.pageData1.pagestart = 0;
        this.pageData1.pageend = 100;
        this.getMC();
        // this.getHospitals();
      } else if (event == "D") {
        tableData.push({
          feetype: "D",
          rgtno: JSON.parse(this.$route.params.dataOfTable).rgtno,
          operator: localStorage.getItem("userCode"),
          mngcom: localStorage.getItem("comCode"),
          billno: null,
          clinicdate: null,
          feemount: "0",
          hospitalmutualitypayment: null,
          totalmutualitypayment: null,
          sociflag: "1",
          selfliabilitiesa: null,
          ordinaltionfund: null,
          totalordinaltionfund: null,
          selfliabilitiesb: null,
          ownepense: null,
          deductfee: null
        });
      } else if (event == "E") {
        tableData.push({
          feetype: "E",
          rgtno: JSON.parse(this.$route.params.dataOfTable).rgtno,
          operator: localStorage.getItem("userCode"),
          mngcom: localStorage.getItem("comCode"),
          billno: null,
          hospitalname: JSON.parse(this.$route.params.dataOfTable).hospitalcode,
          hospstartdate:
            null || JSON.parse(this.$route.params.dataOfTable).hospstartdate,
          hospenddate:
            null || JSON.parse(this.$route.params.dataOfTable).hospenddate,
          realhospdate: this.hosDay,
          imhospdate: null,
          medicallypayment: null,
          insurancepayment: null,
          ordinaltionfundpay: null,
          sociflag: "1",
          individualpaya: null,
          paymentfrom: null,
          assistantmutualitypayment: null,
          civilservants: null,
          outmedicallypayment: null,
          selfpay: null,
          individualpayb: null,
          selfpaytatol: null,
          selfcashpaymoney: null,
          selfaccountpaymoney: null,
          deductfee: null,
          indemnity: null
        });
        this.filterVal = "";
        this.pageData1.pagestart = 0;
        this.pageData1.pageend = 100;
        this.getMH();
      } else if (event == "F") {
        tableData.push({
          feetype: "F",
          rgtno: JSON.parse(this.$route.params.dataOfTable).rgtno,
          operator: localStorage.getItem("userCode"),
          mngcom: localStorage.getItem("comCode"),
          billno: null,
          hospitalname: JSON.parse(this.$route.params.dataOfTable).hospitalcode,
          clinicdate: null,
          receiptfee: "0",
          deductionfeemount: null,
          sociflag: "1",
          deductfee: null,
          operation: "0"
        });
        this.filterVal = "";
        this.pageData1.pagestart = 0;
        this.pageData1.pageend = 100;
        // this.getHospitals();
        this.getFC()
      } else if (event == "G") {
        tableData.push({
          feetype: "G",
          rgtno: JSON.parse(this.$route.params.dataOfTable).rgtno,
          operator: localStorage.getItem("userCode"),
          mngcom: localStorage.getItem("comCode"),
          billno: null,
          hospitalname: JSON.parse(this.$route.params.dataOfTable).hospitalcode,
          hospstartdate:
            null || JSON.parse(this.$route.params.dataOfTable).hospstartdate,
          hospenddate:
            null || JSON.parse(this.$route.params.dataOfTable).hospenddate,
          realhospdate: this.hosDay,
          billmoney: "0",
          deductionfeemount: null,
          sociflag: "1",
          deductfee: null,
          indemnity: null,
          operation: "0"
        });
        this.filterVal = "";
        this.pageData1.pagestart = 0;
        this.pageData1.pageend = 100;
        this.getFH();
      } else if (event == "H") {
        tableData.push({
          feetype: "H",
          rgtno: JSON.parse(this.$route.params.dataOfTable).rgtno,
          operator: localStorage.getItem("userCode"),
          mngcom: localStorage.getItem("comCode"),
          billno: null,
          hospitalname: JSON.parse(this.$route.params.dataOfTable).hospitalcode,
          hospstartdate:
            null || JSON.parse(this.$route.params.dataOfTable).hospstartdate,
          hospenddate:
            null || JSON.parse(this.$route.params.dataOfTable).hospenddate,
          realhospdate: this.hosDay,
          imhospdate: null,
          billmoney: "0",
          deductionfeemount: null,
          ruralmedicalinsurance: null,
          sociflag: "1",
          deductfee: null,
          indemnity: null,
          operation: "0"
        });
        this.filterVal = "";
        this.pageData1.pagestart = 0;
        this.pageData1.pageend = 100;
        this.getNCMS();
      } else if (event == "I") {
        tableData.push({
          feetype: "I",
          rgtno: JSON.parse(this.$route.params.dataOfTable).rgtno,
          operator: localStorage.getItem("userCode"),
          mngcom: localStorage.getItem("comCode"),
          billno: null,
          sociflag: "1",
          operation: "0",
          hospitalname: JSON.parse(this.$route.params.dataOfTable).hospitalcode,
          clinicdate: null,
          specialfeemount: "0",
          deductfee: null,
          medicallypayment: null,
          insurancepayment: null,
          hospitalmutualitypayment: null,
          retirementpayment: null,
          civilservants: null,
          disabilitysoldier: null,
          selfcashpaymoney: null,
          individualpayment: null,
          individualpaya: null,
          paymentfrom: null,
          paymentcap: null,
          individualpayb: null,
          ownepense: null,
          selfaccountpaymoney: null,
          totalordinaltionfund: null,
          totalmutualitypayment: null,
          percount: null
        });
        this.filterVal = "";
        this.pageData1.pagestart = 0;
        this.pageData1.pageend = 100;
        this.getMS();
      } else if (event == "J") {
        tableData.push({
          feetype: "J",
          rgtno: JSON.parse(this.$route.params.dataOfTable).rgtno,
          operator: localStorage.getItem("userCode"),
          mngcom: localStorage.getItem("comCode"),
          billno: null,
          sociflag: "1",
          operation: "0",
          hospitalname: JSON.parse(this.$route.params.dataOfTable).hospitalcode,
          clinicdate: null,
          receiptfee: "0",
          deductionfeemount: null,
          deductfee: null,
          indemnity: null
        });
        this.filterVal = "";
        this.pageData1.pagestart = 0;
        this.pageData1.pageend = 100;
        this.getCO();
      } else if (event == "K") {
        tableData.push({
          feetype: "K",
          rgtno: JSON.parse(this.$route.params.dataOfTable).rgtno,
          operator: localStorage.getItem("userCode"),
          mngcom: localStorage.getItem("comCode"),
          billno: null,
          sociflag: "1",
          operation: "0",
          hospitalname: JSON.parse(this.$route.params.dataOfTable).hospitalcode,
          hospstartdate:
            null || JSON.parse(this.$route.params.dataOfTable).hospstartdate,
          hospenddate:
            null || JSON.parse(this.$route.params.dataOfTable).hospenddate,
          realhospdate: this.hosDay,
          imhospdate: null,
          billmoney: "0",
          deductionfeemount: null,
          deductfee: null,
          indemnity: null
        });
        this.filterVal = "";
        this.pageData1.pagestart = 0;
        this.pageData1.pageend = 100;
        this.getCH();
      }
    },
    toReportDetails(row) {
      var rgtNo = row.rgtno;
      var customerNo = row.customerno;
      this.$router.push({
        name: "AddFiling",
        query: { rgtno: rgtNo, customerno: customerNo }
      });
    },
    toAddFiling() {
      this.$router.push({
        name: "AddFiling"
      });
    }
  }
};
</script>
<style lang="less" scoped>
.beijingBill {
  padding: 10px;
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
</style>
<style lang="less">
.beijingBill {
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
.el-button.is-round {
  padding: 7px 13px;
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