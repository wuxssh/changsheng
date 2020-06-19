<template>
  <div>
    <div id="containers">
      <div class="col1">
        <div class="isFirsts" id="d_1" name="cell"></div>
      </div>
       <div class="col2">
        <div id="d_2" name="cell"><i class="iconfont icon-wode-active"></i>提起调查</div>
      </div>
      <div class="col3">
        <div id="d_3" name="cell"><i class="iconfont icon-wode-active"></i>调查审批</div>
      </div>
      <div class="col4">
        <div id="d_4" name="cell"><i class="iconfont icon-wode-active"></i>调查回销</div>
      </div>
      <div class="col4">
        <div class="isFirsts" id="d_5" name="cell"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      jsPlumb: null, // 缓存实例化的jsplumb对象
      connlist: [
        {
          sourceNodeId: "d_1",
          targetNodeId: "d_2"
        },
        {
          sourceNodeId: "d_2",
          targetNodeId: "d_3"
        },
        {
          sourceNodeId: "d_3",
          targetNodeId: "d_4"
        },
        {
          sourceNodeId: "d_4",
          targetNodeId: "d_5"
        }
      ] // 指定需要连接的两节点
    };
  },
  mounted() {
    this.oncedata = [
      {
        proc_inst_task_code: "d_1",
        proc_inst_task_name: "开始"
      },
      {
        proc_inst_task_code: "d_2",
        proc_inst_task_name: "调查审批"
      },
      {
        proc_inst_task_code: "d_3",
        proc_inst_task_name: "调查回销"
      },
    //    {
    //     proc_inst_task_code: "d_4",
    //     proc_inst_task_name: "结束"
    //   }
    ];
    this.oncedata.forEach((item, index) => {
      const ele = document.getElementById(item.proc_inst_task_code);
      // eles.style.backgroundColor = "#10af10"; // 在流转数据中的节点都改为绿色背景
      ele.style.border = "2px solid #fcbf1e";
    //   if (index === this.oncedata.length - 1) {
    //     eles.style.backgroundColor = "#f11818"; // 最后一个节点是最终状态改为红色背景
    //   }
    });
    this.jsPlumb = this.$jsPlumb.getInstance({
      Container: "containers", // 选择器id
      EndpointStyle: "Blank", // 端点样式
      Connector: ["Straight", { gap: 1 }], // 要使用的默认连接器的类型：直线，折线，曲线等
      DrapOptions: { cursor: "crosshair", zIndex: 2000 }
    });

    //
    const ins = this.jsPlumb;
    ins.getAllConnections();
    ins.batch(() => {
      this.initAll();
      this.connectionAll();
    });
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
    initAll() {
      // 初始化所有节点
      this.init("d_1");
      this.init("d_2");
      this.init("d_3");
      this.init("d_4");
      this.init("d_5");
    },
    // 初始化规则使其可以连线、拖拽
    init(id) {
      const ins = this.jsPlumb;
      const elem = document.getElementById(id);
      ins.makeSource(elem, {
        anchor: ["Perimeter", { anchorCount: 200, shape: "Rectangle" }],
        allowLoopback: true,
        maxConnections: 1,
        isTarget:true
      });
      ins.makeTarget(elem, {
        anchor: ["Perimeter", { anchorCount: 200, shape: "Rectangle" }],
        allowLoopback: true,
        maxConnections: 1,
        isTarget:true
      });
    },
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
#containers {
  position: relative;
  width: 80%;
  padding: 0 50px;
  .col1,
  .col2,
  .col3,
  .col4 {  
    width: 95px;
    height: 40px;
    font-size: 14px;
    text-align: center;
    float: left;
  }
  .col2,
  .col3,
  .col4 {
    margin: 0 0 0 80px;
  }
}

#containers > div > div {
  line-height: 40px;
  background: #dee3e2;
  box-shadow: 0 0 3px #999;
  border-radius: 16%;
  margin: 180px 0 0px 0;
}
</style>