<template>
  <div>
    <div class="list-view" @scroll="handleScoll">
      <div :style="{height:contentHeight}"></div>
      <div ref="content" class>
        <div
          class="list-view-item"
          :style="{height:itemHeight+'px'}"
          v-for="(item,index) in isVadata"
          :key="index"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
      data:{
          type:Array,
          required:true
      },
      itemHeight:{
          type:Number,
          default:30
      }
  },
  data() {
    return {
      isVadata: []
    };
  },
  mounted() {
    this.isVadata();
  },
  methods: {
    handleScoll() {
      const scollTop = this.el.scollTop;
      this.isVadata(scollTop);
    },
    isVadata(scollTop = 0) {

    }
  },
  computed: {
    contentHeight() {
      return this.data.length * this.itemHeight + "px";
    }
  }
};
</script>

<style lang="less" scoped>
</style>