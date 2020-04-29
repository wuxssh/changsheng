<template>
  <div>
      <klist ></klist>
  </div>
</template>

<script>
import klist from "./list";
export default {
  components: {
    klist
  },
  data(){
      let data = []
      for(let i = 0 ;i <10000;i++){
          data.push({value:i})
      }
      return{

      }
  },
  methods:{

  }
};
</script>

<style lang="less" scoped>
</style>