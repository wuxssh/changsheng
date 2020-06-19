<template>
  <div id="warp">
    <div id="zhao">
      <div class="col1">
        <div class="isFirsts" id="z_1" name="cell"></div>
      </div>
      <div class="col12">
        <div id="z_2" name="cell"><i class="iconfont icon-wode-active"></i>照会下发</div>
      </div>
      <div class="col1">
        <div class="isFirsts isTrue" id="z_3" name="cell">X</div>
      </div>
      <div class="col2">
        <div v-for="item in list2" :key="item.nodeId" :id="item.nodeId" name="cell"><i class="iconfont icon-wode-active"></i>{{ item.name }}</div>
      </div>
      <div class="col3">
        <div id="z_6" name="cell"><i class="iconfont icon-wode-active"></i>照会回销</div>
      </div>
      <div class="col4">
        <div class="isFirsts" id="z_7" name="cell"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      jsPlumb: null, // 缓存实例化的jsplumb对象
      list2: [
        // { name: "照会下发", nodeId: "z_2" },
        { name: "照会回复", nodeId: "z_5" },
        { name: "照会审批", nodeId: "z_4" },
        // { name: "照会回销", nodeId: "z_5" }
      ], // 节点参数
      connlist: [
        {
          sourceNodeId: "z_1",
          targetNodeId: "z_2"
        },
        {
          sourceNodeId: "z_2",
          targetNodeId: "z_3"
        },
        {
          sourceNodeId: "z_3",
          targetNodeId: "z_4"
        },
        {
          sourceNodeId: "z_3",
          targetNodeId: "z_5"
        },
        {
          sourceNodeId: "z_4",
          targetNodeId: "z_5"
        },
        {
          sourceNodeId: "z_5",
          targetNodeId: "z_6"
        },
        {
          sourceNodeId: "z_6",
          targetNodeId: "z_7"
        }
      ], // 指定需要连接的两节点
    };
  },
  mounted() {
    //后台参考数据
    this.oncedata = [
      {
        proc_inst_task_code: "z_1",
        proc_inst_task_name: "开始"
      },
      {
        proc_inst_task_code: "z_2",
        proc_inst_task_name: "照会下发"
      },
      {
        proc_inst_task_code: "z_3",
        proc_inst_task_name: "照会审批"
      },
      {
        proc_inst_task_code: "z_4",
        proc_inst_task_name: "照会审批"
      }
      //   {
      //     proc_inst_task_code: "z_4",
      //     proc_inst_task_name: "照会回复"
      //   },
      //   {
      //     proc_inst_task_code: "z_5",
      //     proc_inst_task_name: "照会回销"
      //   },
      //   {
      //     proc_inst_task_code: "z_6",
      //     proc_inst_task_name: "结束"
      //   }
    ];
    this.oncedata.forEach((item, index) => {
      const ele = document.getElementById(item.proc_inst_task_code);
      // ele.style.border = "2px solid #d63447"; // 在流转数据中的节点都改为绿色背景
      ele.style.border = "2px solid #fcbf1e";
    //   if (index === this.oncedata.length - 1) {
    //     ele.style.backgroundColor = "#f11818"; // 最后一个节点是最终状态改为红色背景
    //   }
    });
    // 照会实例化
    this.jsPlumb = this.$jsPlumb.getInstance({
      Container: "zhao", // 选择器id
      EndpointStyle: "Blank", // 端点样式
      Connector: ["Straight", { gap: 1 }], // 要使用的默认连接器的类型：直线，折线，曲线等
      DrapOptions: { cursor: "crosshair", zIndex: 2000 }
    });
    // 绘制连线
    const ins = this.jsPlumb;
    ins.getAllConnections();
    ins.batch(() => {
      this.initAll();
      this.connectionAll();
    });
    // 照会
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
  },
  methods: {
    // 照会
    initAll() {
      // 初始化所有节点
      this.init("z_1");
      this.init("z_2");
      this.init("z_3");
      this.init("z_4");
      this.init("z_5");
      this.init("z_6");
      this.init("z_7");
      const rl2 = this.list2;
      for (let i = 0; i < rl2.length; i++) {
        this.init(rl2[i].nodeId);
      }
    },
    // 照会初始化规则使其可以s连线、拖拽
    init(id) {
      const ins = this.jsPlumb;
      const elem = document.getElementById(id);
      ins.makeSource(elem, {
        anchor: ["Perimeter", { anchorCount: 200, shape: "Rectangle" }],
        allowLoopback: false,
        maxConnections: 1
      });
      ins.makeTarget(elem, {
        anchor: ["Perimeter", { anchorCount: 200, shape: "Rectangle" }],
        allowLoopback: false,
        maxConnections: 1
      });
    },
    // 照会 //   创建连接线;
    connectionAll() {
      //   创建连接线;
      const ins = this.jsPlumb;
      ins.ready(() => {
        // 入口
        for (let i = 0; i < this.connlist.length; i++) {
          const conn = this.connlist[i];
          const connection = ins.connect({
            source: conn.sourceNodeId,
            target: conn.targetNodeId,
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
          connection.setPaintStyle({ stroke: "#999", strokeWidth: 2 });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
#warp {
    position: relative;
}
#zhao {
  position: absolute;
  width: 80%;
  padding: 0 50px;
  .col2,
  .col12,
  .col3,
  .col4,
  .col1 {
    float: left;
    text-align: center;
    font-size: 14px;
    width: 95px;
  }
  .col12,
  .col2,
  .col3,
  .col4 {
    margin: 0 0 0 80px;
  }
}
// .isFirsts {
//   margin: 60px 0 50px 0px !important;
// }
.isTrue{
  margin: 0 80px!important;
}
#zhao > div > div {
  line-height: 40px;
  background: #dee3e2;
  box-shadow: 0 0 3px #999;
  border-radius: 16%;
  margin: 0 0 50px 0;
}
</style>