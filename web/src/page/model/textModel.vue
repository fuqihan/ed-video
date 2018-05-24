<template>
  <div class="text-model">
     <div class="f-home-theme-header-icon" @click="$router.go(-1)">
        <icon type='cancel'></icon>
      </div>
      <div class="text"> {{$route.params.text}}</div>
    </div>
</template>

<script>
import { Icon } from "vux";
export default {
  components: {
    Icon
  }
};
</script>

<style lang="less">
.text-model {
  width: 100%;
  min-height: 100vh;
  font-size: 25px;
  .text {
    margin-top: .4rem;
    margin-left: .6rem;
  }
}
.f-home-theme-header-icon {
  z-index: 99;
  margin-top: 5px;
  margin-left: 5px;
}
</style>
