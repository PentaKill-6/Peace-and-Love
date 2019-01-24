<template>
  <header>
      <svg
        data-v-cec0c0c0
        width="14px"
        height="23px"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        @click="goback"
      >
        <polyline
          data-v-cec0c0c0
          points="12,18 4,9 12,0"
          style="fill: none; stroke: rgb(255, 255, 255); stroke-width: 2;"
        ></polyline>
      </svg>
      <slot name="myheader"></slot>
    </header>
</template>

<script>
export default {
  methods:{
    goback(){
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
header {
  padding: 0 10px;
  background-color: #3190e8;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
}
header p {
  width: 90%;
  flex-shrink: 0;
  color: #fff;
  text-align:center;
  font-size: 20px;
  font-weight: bold;
}
</style>