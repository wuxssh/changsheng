<template>
  <div>
    <div id="container">
      <div class="col1">
        <div class="isFirsts" id="a_1" name="cell"></div>
      </div>
      <div class="col2">
        <div v-for="item in list2" :key="item.nodeId" :id="item.nodeId" name="cell">
          <i class="iconfont icon-wode-active"></i>
          {{ item.name }}
        </div>
      </div>
      <div class="col3 isMargin">
        <div id="a_4" name="cell">
          <i class="iconfont icon-wode-active"></i>理赔审核
        </div>
      </div>
      <!-- <div class="col3" id="isTwo">
        <div id="a_5" name="cell">
          X
        </div>
      </div>-->
      <div class="col3">
        <div class="isFirsts" id="a_5" name="cell">X</div>
      </div>
      <div class="col4">
        <div v-for="item in list1 " :key="item.nodeId" :id="item.nodeId" name="cell">
          <i class="iconfont icon-wode-active"></i>
          {{ item.name }}
        </div>
      </div>
      <div class="col5">
        <div id="a_8" name="cell">
          <i class="iconfont icon-wode-active"></i>理赔支付
        </div>
      </div>
      <div class="col6">
        <div class="isFirsts" id="a_9" name="cell"></div>
      </div>
    </div>
    <div class="clearfix"></div>
    <zhao></zhao>
    <div class="clearfix"></div>
    <diao></diao>
    <div class="clearfix"></div>
    <er></er>
  </div>
</template>

<script>
import zhao from "./zhao";
import diao from "./diao";
import er from "./er";
import { post, service } from "../utils/request.js";

export default {
  components: {
    zhao,
    diao,
    er
  },
  data() {
    //
    return {
      oncedata: [],
      jsPlumb: null, // 缓存实例化的jsplumb对象
      list2: [
        { name: "理赔立案", nodeId: "a_3" },
        { name: "理赔报案", nodeId: "a_2" }
      ], // 节点参数
      list1: [
        { name: "理赔结案", nodeId: "a_7" },
        { name: "理赔审批", nodeId: "a_6" }
      ], // 节点参数
      connlist: [
        {
          sourceNodeId: "a_1",
          targetNodeId: "a_2"
        },
        {
          sourceNodeId: "a_1",
          targetNodeId: "a_3"
        },
        {
          sourceNodeId: "a_2",
          targetNodeId: "a_3"
        },
        {
          sourceNodeId: "a_3",
          targetNodeId: "a_4"
        },
        {
          sourceNodeId: "a_4",
          targetNodeId: "a_5"
        },
        {
          sourceNodeId: "a_5",
          targetNodeId: "a_6"
        },
        {
          sourceNodeId: "a_5",
          targetNodeId: "a_7"
        },
        {
          sourceNodeId: "a_6",
          targetNodeId: "a_7"
        },
        {
          sourceNodeId: "a_7",
          targetNodeId: "a_8"
        },
        {
          sourceNodeId: "a_8",
          targetNodeId: "a_9"
        }
      ]
    };
  },
  created() {
    this.getData()
  },
  mounted() {
    //后台参考数据
    // this.oncedata = [
    //   {
    //     proc_inst_task_code: "a_1"
    //   },
    //   {
    //     proc_inst_task_code: "a_3"
    //   },
    //   {
    //     proc_inst_task_code: "a_4"
    //   },
    //   {
    //     proc_inst_task_code: "a_5"
    //   },
    //   {
    //     proc_inst_task_code: "a_6"
    //   }
    // ];
   setTimeout(()=>{
      this.oncedata.forEach((item, index) => {
      const ele = document.getElementById(item.proc_inst_task_code);
      ele.style.border = "2px solid #fcbf1e";
    });
    //
    this.jsPlumb = this.$jsPlumb.getInstance({
      Container: "container", // 选择器id
      EndpointStyle: "Blank", // 端点样式
      Connector: ["StateMachine", { gap: 1 }], // 要使用的默认连接类型
      DrapOptions: { cursor: "crosshair", zIndex: 2000 },
      isTarget: false
    });
    const ins = this.jsPlumb;
    ins.getAllConnections();
    ins.batch(() => {
      this.initAll();
      this.connectionAll();
    });

    this.switchContainer(true, true, false);
    this.oncedata.forEach((item, index) => {
      if (index < this.oncedata.length - 1) {
        const connection = this.jsPlumb.connect({
          // 对流程数据中对应的节点连接线重新绘制
          source: item.proc_inst_task_code,
          target: this.oncedata[++index].proc_inst_task_code,
          overlays: [
            [
              "Arrow",
              {
                width: 12,
                length: 10,
                location: 1,
                paintStyle: {
                  stroke: "#fcbf1e",
                  fill: "#fcbf1e"
                }
              }
            ]
          ]
        });
        connection.setPaintStyle({ stroke: "#fcbf1e", strokeWidth: 2 });
      }
    });
   },500)
  },
  methods: {
    initAll() {
      // 初始化所有节点
      this.init("a_1");
      this.init("a_4");
      this.init("a_5");
      this.init("a_7");
      this.init("a_8");
      this.init("a_9");
      const rl1 = [...this.list2, ...this.list1];
      for (let i = 0; i < rl1.length; i++) {
        this.init(rl1[i].nodeId);
      }
    },
    // 初始化规则使其可以连线、拖拽
    init(id) {
      const ins = this.jsPlumb;
      const elem = document.getElementById(id);
      ins.makeSource(elem, {
        anchor: ["Perimeter", { anchorCount: 100, shape: "Rectangle" }],
        allowLoopback: false,
        maxConnections: 1
        //  isTarget:false
      });
      ins.makeTarget(elem, {
        anchor: ["Perimeter", { anchorCount: 100, shape: "Rectangle" }],
        allowLoopback: false, // 自己连自己
        maxConnections: 1, // 连线数目
        deleteEndpointsOnDetach: true
        //  isTarget:false
      });
    },
    connectionAll() {
      // 创建连接线;
      const ins = this.jsPlumb;
      ins.ready(() => {
        // 入口
        for (let i = 0; i < this.connlist.length; i++) {
          const conn = this.connlist[i];
          const connection = ins.connect({
            source: conn.sourceNodeId,
            target: conn.targetNodeId,
            endpoint: 'Dot',
            // endpoint: 'Rectangle',
            overlays: [
              [
                "Arrow",
                {
                  width: 12,
                  length: 10,
                  location: 1,
                  paintStyle: {
                    stroke: "#999",
                    fill: "#999"
                  }
                }
              ]
            ]
          });
          connection.setPaintStyle({ stroke: "#999", strokeWidth: 1 });
        }
      });
    },
    switchContainer(target, source, draggable) {
      const elem = document.getElementsByName("cell");
      const ins = this.jsPlumb;
      ins.setSourceEnabled(elem, source);
      ins.setTargetEnabled(elem, target);
      ins.setDraggable(elem, draggable); // 是否支持拖拽
    },
    getData() {
      post(service.queryClmProcess, {
        bodys: {
          clmno: "2003300000301"
        }
      }).then(res => {
        this.oncedata = res.data.bodys.clmList
        console.log('AAA',this.oncedata)
      });
    }
  }
};
</script>

<style lang="less" scoped>
#container {
  position: relative;
  width: 80%;
  padding: 0 50px;
}
.clearfix:after {
  display: table;
  content: " ";
  clear: both;
}

.col1,
.col2,
.col3,
.col4,
.col5,
.col6 {
  float: left;
  text-align: center;
  font-size: 14px;
  width: 95px;
}
.col2,
.col3,
.col4,
.col5,
.col6 {
  margin: 0 0 0 80px;
}
.isFirsts {
  margin: 100px 0 50px 0px !important;
}
// .isFirstsS {
//   width: 40px;
//   height: 40px;

//   border-radius: 100% !important;
//   margin-left: 30px;
//   // background-color: #fff!important;
//   border: 2px solid #444;
// }
// .isMargin {
//   margin: 50px !important;
// }
// #a_5 {
//   width: 40px !important;
//   height: 40px !important;
//   transform: rotate(-45deg);
//   -ms-transform: rotate(45deg);
//   -moz-transform: rotate(45deg);
//   -webkit-transform: rotate(45deg);
//   -o-transform: rotate(45deg);
//   margin: 100px 0 !important;
//   border-radius: 0!important;
//   // background-image: url(../assets/aside);
// }
#container > div > div {
  line-height: 40px;
  background: #dee3e2;
  box-shadow: 0 0 3px #999;
  border-radius: 16%;
  margin: 50px 0;
}
</style>