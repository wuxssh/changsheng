<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>
<script>
import echarts from "echarts";
require("echarts/theme/macarons");
const animationDuration = 6000;
export default {
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "200px"
    },
    autoResize: {
      type: Boolean,
      default: true
    }
    // chartData: {
    //   type: Object,
    //   required: true
    // }
  },
  data() {
    return {
      chart: null
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");
      this.chart.setOption({
        tooltip: {
            trigger: "axis",
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        // grid: {
        //   top: 10,
        //   left: '2%',
        //   right: '2%',
        //   bottom: '3%',
        //   containLabel: true
        // },
        title: {
          text: "医疗险各分公司渠道赔付件数及占比",
          textStyle: {
            fontWeight: "normal",
            color: "#000",
            fontSize: 16
          }
        },
        color: ["#1D046F", "#005BED", "#0D6DB2", "#02A9FF", "#63E0FF"],
        legend: {
          left: "10",
          bottom: "10",
          data: ["其他", "银保", "电商", "经代", "个险"]
        },
        xAxis: [
          {
            type: "category",
            data: ["四川", "浙江", "江苏", "山东", "北京", "上海", "河南"],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
              name:"数量",
            type: "value",
            axisTick: {
              show: false
            }
          },
            {
                name:"百分比",
            type: "value",
            axisTick: {
              show: false
            }
          },
        ],
        // dataset: {
        //   dimensions: ["company", "其他", "银保", "电商", "经代", "个险"],
        //   source: [
        //     {
        //       company: "四川",
        //       其他: 500,
        //       银保: 600,
        //       电商: 700,
        //       经代: 800,
        //       个险: 900
        //     },
        //     {
        //       company: "浙江",
        //       其他: 500,
        //       银保: 600,
        //       电商: 700,
        //       经代: 800,
        //       个险: 900
        //     },
        //     {
        //       company: "江苏",
        //       其他: 500,
        //       银保: 600,
        //       电商: 700,
        //       经代: 800,
        //       个险: 900
        //     },
        //     {
        //       company: "山东",
        //       其他: 500,
        //       银保: 600,
        //       电商: 700,
        //       经代: 800,
        //       个险: 900
        //     },
        //     {
        //       company: "北京",
        //       其他: 500,
        //       银保: 600,
        //       电商: 700,
        //       经代: 800,
        //       个险: 900
        //     },
        //     {
        //       company: "上海",
        //       其他: 500,
        //       银保: 600,
        //       电商: 700,
        //       经代: 800,
        //       个险: 1200
        //     },
        //     {
        //       company: "河南",
        //       其他: 500,
        //       银保: 600,
        //       电商: 700,
        //       经代: 800,
        //       个险: 900
        //     }
        //     // { product: "Milk Tea", "2015": 83.1, "2016": 73.4, "2017": 55.1 },
        //     // {
        //     //   product: "Cheese Cocoa",
        //     //   "2015": 86.4,
        //     //   "2016": 65.2,
        //     //   "2017": 82.5
        //     // },
        //     // {
        //     //   product: "Walnut Brownie",
        //     //   "2015": 72.4,
        //     //   "2016": 53.9,
        //     //   "2017": 39.1
        //     // }
        //   ]
        // },
        series: [
        {
            name:'其他',
            type:'bar',
            data:[100,200,300,400,500,600,700]
        },
        {
            name:'银保',
            type:'bar',
           
            data:[100,200,300,400,500,700,600]
        },
        {
            name:'电商',
            type:'bar',
            
           data:[100,200,300,400,500,400,500]
        },
        
        {
            name:'经代',
            type:'bar',
            data:[100,200,300,400,500,400,500]
        },
        {
            name:'个险',
            type:'bar',
          
           data:[100,200,300,400,500,400,500]
        }
            
    ]
   
        // series: [
        //   {
        //     name: "pageA",
        //     type: "bar",
        //     stack: "vistors",
        //     barWidth: "60%",
        //     data: [79, 52, 200, 334, 390, 330, 220],
        //     animationDuration
        //   },
        //   {
        //     name: "pageB",
        //     type: "bar",
        //     stack: "vistors",
        //     barWidth: "60%",
        //     data: [80, 52, 200, 334, 390, 330, 220],
        //     animationDuration
        //   },
        //   {
        //     name: "pageC",
        //     type: "bar",
        //     stack: "vistors",
        //     barWidth: "60%",
        //     data: [30, 52, 200, 334, 390, 330, 220],
        //     animationDuration
        //   },
        //     {
        //     name: "pageC",
        //     type: "bar",
        //     stack: "vistors",
        //     barWidth: "60%",
        //     data: [30, 52, 200, 334, 390, 330, 220],
        //     animationDuration
        //   },
        //     {
        //     name: "pageC",
        //     type: "bar",
        //     stack: "vistors",
        //     barWidth: "60%",
        //     data: [30, 52, 200, 334, 390, 330, 220],
        //     animationDuration
        //   }
        // ]
      });
    }
  }
};
</script>
<style scoped lang="less">
</style>