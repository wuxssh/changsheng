<template>
  <div>
    <div class="container">
      <div class="rightBox">
        <el-select id="selects" class="selects" draggable="true" v-model="selectName">
          <el-option
            v-for="item in calbaseList"
            :key="item.code"
            :label="item.codename"
            :value="item.code"
          ></el-option>
        </el-select>
        <div style="margin-top:10px"></div>
        <el-select id="selects2" class="selects2 selects" draggable="true" v-model="selectName2">
          <el-option
            v-for="item in gzparamList"
            :key="item.code"
            :label="item.codename"
            :value="item.code"
          ></el-option>
        </el-select>
        <div style="margin-top:10px"></div>
        <el-input id="content" class="input" placeholder="文本框" draggable="true"></el-input>
        <br />

        <span id="ifContent" class="file ifContent" draggable="true">如果</span>
        <span id="elseContent" class="file elseContent" draggable="true">那么</span>
        <span id="ifNotContent" class="file ifNotContent" draggable="true">否则</span>
        <br />
        <span id="isBr" class="file isBr" draggable="true">换行</span>
        <span id="space" class="file space" draggable="true">空格</span>
        <br />

        <!-- </span> -->
        <span id="add" class="addBtn add" draggable="true">
          <i class="iconfont icon-jia-"></i>
        </span>
        <span id="del" class="addBtn del" draggable="true">
          <i class="iconfont icon-jian1"></i>
        </span>
        <span id="multiply" class="addBtn multiply" draggable="true">
          <i class="iconfont icon-cheng"></i>
        </span>
        <span id="addition" class="addBtn addition" draggable="true">
          <i class="iconfont icon-chengbeifen"></i>
        </span>
        <br />
        <span id="more" class="addBtn more" draggable="true">
          <i class="iconfont icon-dayufuhao"></i>
        </span>
        <span id="less" class="addBtn less" draggable="true">
          <i class="iconfont icon-xiaoyufuhao"></i>
        </span>
        <span id="left" class="addBtn left" draggable="true">
          <i class="iconfont icon-zuokuohao"></i>
        </span>
        <span id="right" class="addBtn right" draggable="true">
          <i class="iconfont icon-youkuohao"></i>
        </span>
      </div>
      <div class="leftBox"></div>
      <span id="delBtn">删除</span>
      <div class="summitWarp">
        <el-button type="danger" class="summitBtn" @click="clear">清空</el-button>
        <el-button type="danger" class="summitBtn" @click="summit">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Alert } from "element-ui";
import { post, service } from "../../utils/request.js";
export default {
  data() {
    return {
      timer: 0,
      selectName: "",
      selectName2: "",
      calbaseList: [],
      gzparamList: []
    };
  },
  mounted() {
    this.$watermark.set(
      localStorage.getItem("userCode"),
      localStorage.getItem("userName")
    );
    this.getCodeType();
    let leftBox = document.querySelector(".leftBox");
    let ifContent = document.querySelector(".ifContent");
    let elseContent = document.querySelector(".elseContent");
    let ifNotContent = document.querySelector(".ifNotContent");
    let isBr = document.querySelector(".isBr");
    let space = document.querySelector(".space");
    let input = document.querySelector(".input");
    let add = document.querySelector(".add");
    let del = document.querySelector(".del");
    let multiply = document.querySelector(".multiply");
    let addition = document.querySelector(".addition");
    let more = document.querySelector(".more");
    let less = document.querySelector(".less");
    let left = document.querySelector(".left");
    let right = document.querySelector(".right");
    let selects = document.querySelector(".selects");
    let selects2 = document.querySelector(".selects2");

    this.move(ifContent, leftBox);
    this.move(elseContent, leftBox);
    this.move(ifNotContent, leftBox);
    this.move(isBr, leftBox);
    this.move(space, leftBox);
    this.move(input, leftBox);
    this.move(add, leftBox);
    this.move(del, leftBox);
    this.move(multiply, leftBox);
    this.move(addition, leftBox);
    this.move(more, leftBox);
    this.move(less, leftBox);
    this.move(left, leftBox);
    this.move(right, leftBox);
    this.move(selects, leftBox);
    this.move(selects2, leftBox);
  },
  methods: {
    clear() {
      let leftBox = document.getElementsByClassName("leftBox");
      var leftBoxItem = leftBox[0].childNodes;
      for (var i = leftBoxItem.length - 1; i >= 0; i--) {
        // 一定要倒序删除
        leftBox[0].removeChild(leftBoxItem[i]);
      }
      this.timer = 0;
    },
    getCodeType() {
      post(service.getCodeList, {
        codetype: ["calbase", "gzparam"] // 理算要素枚举值
      }).then(res => {
        if (res.data.header.code === "200") {
          this.calbaseList = res.data.bodys["calbase"];
          this.gzparamList = res.data.bodys["gzparam"];
          this.selectName = this.calbaseList[0];
          this.selectName2 = this.gzparamList[0];
        }
      });
    },
    summit() {
      let leftBox = document.getElementsByClassName("leftBox");
      var leftContentList = [];
      var leftBoxItem = leftBox[0].childNodes;
      // console.log("Sss", leftBox);
      // console.log("S", leftBoxItem);

      for (let key = 0; key < leftBoxItem.length; key++) {
        var typeItem = "";
        var values = "";
        if (leftBoxItem[key].className == "input el-input") {
          typeItem = leftBoxItem[key].children[0].id;
          values = leftBoxItem[key].children[0].value;
        } else if (leftBoxItem[key].className == "el-select selects") {
          typeItem = leftBoxItem[key].children[0].children[0].id;
          values = leftBoxItem[key].children[0].children[0].value;
        } else {
          typeItem = leftBoxItem[key].id;
          values = "";
        }
        leftContentList.push({
          type: typeItem,
          value: values
        });
      }
      console.log("d", leftContentList);
    },
    move(ele, box) {
      // 阻止默认事件
      box.ondragover = function(target) {
        target.preventDefault();
      };
      var flag = true; // 只能复制一次 本需求需要复制多次
      let _this = this;
      var leftBox = document.getElementsByClassName("leftBox"); // 获取到左边盒子
      var leftBoxItem = leftBox[0].childNodes; // 获取到左边盒子的子元素
      var oM = document.getElementById("delBtn"); // 获取到右键删除按钮
      ele.onmousedown = function() {
        var $clone = this.cloneNode(true);
        box.ondrop = function() {
          if (flag == true) {
            $clone.index = _this.timer; // 为复制的元素添加index属性
            $clone.oncontextmenu = function(ev) {
              // 当右击时显示删除按钮，并设置删除按钮的样式
              var oEvt = ev || event;
              oM.style.display = "block";
              oM.style.left = oEvt.clientX + "px";
              oM.style.top = oEvt.clientY + "px";
              // 为删除按钮添加点击事件
              oM.onclick = function() {
                for (let i = leftBoxItem.length - 1; i >= 0; i--) {
                  if (leftBoxItem[i].index === $clone.index) {
                    // 移除$clone元素
                    leftBox[0].removeChild(leftBoxItem[i]);
                  }
                }
              };
              return false;
            };
            // 设置不点击$clone时，删除按钮不显示
            document.onclick = function() {
              oM.style.display = "none";
            };

            this.appendChild($clone); // 添加一个$clone
            _this.timer++; // 再次添加$clone时，index属性值自增改变
            // flag = false
          }
        };
      };
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  height: 100%;
}

.summitWarp {
  text-align: center;
  margin-top: 30px;
}
.rightBox {
  float: right;
  width: 220px;
  height: 100%;
  padding: 10px;
  background: rgba(#409eff, 0.6);
  box-shadow: 0 0 5px 0px;
  .addBtn {
    display: inline-block;
    margin: 10px;
    border-radius: 20%;
  }
  .iconfont {
    font-weight: 700;
    font-size: 30px;
  }
  .selects {
    width: 100%;
  }
  .input {
    width: 100%;
  }
}

.leftBox {
  width: auto;
  padding-top: 20px;
  min-height: 300px;
  text-align: left;
  line-height: 100%;
  .file {
    width: 4%;
    height: 2%;
    display: inline-block;
    text-align: center;
    line-height: 38px;
    font-size: 16px;
    box-shadow: 0 0 3px 0;
    margin: 5px 10px;
  }
  .addBtn {
    display: inline-block;
    margin: 10px;
    border-radius: 20%;
    position: relative;
    top: 5px;
  }
  .isBr {
    display: block;
    opacity: 0.5;
    height: 4px;
    font-size: 0px;
  }
  .space {
    width: 4%;
    height: 4%;
    display: inline-block;
    text-align: center;
    line-height: 38px;
    font-size: 12px;
    color: rgba(#333, 0.3);
    // box-shadow: 0 0 3px 0;
    margin: 10px;
  }

  .input {
    width: 15%;
    margin: 10px;
  }
  .selects {
    width: 15%;
    margin: 10px;
  }
  i {
    font-size: 30px;
    font-weight: 700;
  }
}

.file {
  width: 50px;
  height: 50px;
  display: inline-block;
  text-align: center;
  line-height: 50px;
  font-size: 20px;
  font-weight: 700;
}
#delBtn {
  width: 80px;
  border-radius: 4%;
  padding: 5px 0;
  position: absolute;
  left: 0;
  top: 0;
  display: none;
  background: #f5f5f5;
  box-shadow: 0 0 3px 0;
  text-align: center;
  z-index: 999;
}
</style>