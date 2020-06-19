<template>
  <div>
    <div id="containerss">
      <div class="col1">
        <div class="isFirsts" id="e_1" name="cell"></div>
      </div>
      <div class="col2">
        <div id="e_2" name="cell">
          <i class="iconfont icon-wode-active"></i>发起二核
        </div>
      </div>
      <div class="col3">
        <div id="e_3" name="cell">
          <i class="iconfont icon-wode-active"></i>二核审批
        </div>
      </div>
      <div class="col4">
        <div id="e_4" name="cell">
          <i class="iconfont icon-wode-active"></i>二核回复
        </div>
      </div>
      <div class="col4">
        <div id="e_5" name="cell">
          <i class="iconfont icon-wode-active"></i>二核处理
        </div>
      </div>
      <div class="col4">
        <div class="isFirsts" id="e_6" name="cell"></div>
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
          sourceNodeId: "e_1",
          targetNodeId: "e_2"
        },
        {
          sourceNodeId: "e_2",
          targetNodeId: "e_3"
        },
        {
          sourceNodeId: "e_3",
          targetNodeId: "e_4"
        },
        {
          sourceNodeId: "e_4",
          targetNodeId: "e_5"
        },
        {
          sourceNodeId: "e_5",
          targetNodeId: "e_6"
        }
      ] // 指定需要连接的两节点
    };
  },
  mounted() {
    this.oncedata = [
      {
        proc_inst_task_code: "e_1",
        proc_inst_task_name: "开始"
      },
      {
        proc_inst_task_code: "e_2",
        proc_inst_task_name: "发起二核"
      },
      {
        proc_inst_task_code: "e_3",
        proc_inst_task_name: "二核审批"
      }
      //    {
      //     proc_inst_task_code: "e_4",
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
      Container: "containerss", // 选择器id
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
      this.init("e_1");
      this.init("e_2");
      this.init("e_3");
      this.init("e_4");
      this.init("e_5");
      this.init("e_6");
    },
    // 初始化规则使其可以连线、拖拽
    init(id) {
      const ins = this.jsPlumb;
      const elem = document.getElementById(id);
      ins.makeSource(elem, {
        anchor: ["Perimeter", { anchorCount: 200, shape: "Rectangle" }],
        allowLoopback: true,
        maxConnections: 1,
        isTarget: true
      });
      ins.makeTarget(elem, {
        anchor: ["Perimeter", { anchorCount: 200, shape: "Rectangle" }],
        allowLoopback: true,
        maxConnections: 1,
        isTarget: true
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
#containerss {
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
  //   /deep/ .jtk-connector{
  //       left: 148px!important;
  //       top:295px!important
  //   }
}

#containerss > div > div {
  line-height: 40px;
  background: #dee3e2;
  box-shadow: 0 0 3px #999;
  border-radius: 16%;
  margin: 260px 0 0 0;
}
</style>