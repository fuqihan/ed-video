<template>
  <div class="f-home-theme">
      <div class="f-home-theme-header-icon" @click="$router.go(-1)">
        <icon type='cancel'></icon>
      </div>
      <img class="img" width="100%" :src="themeData[$route.params.url - 1]" alt="">
  </div>
</template>

<script>
 import {Icon} from 'vux'
export default {
    data() {
        return {
            themeData: [
                'http://img.ui.cn/data/file/0/4/7/1188740.png?imageMogr2/auto-orient/format/jpg/strip/quality/90/',
                'http://img.ui.cn/data/file/2/4/8/1393842.png?imageMogr2/auto-orient/format/jpg/strip/thumbnail/!1800%3E/quality/90/',
                'http://img.ui.cn/data/file/2/8/2/401282.jpg?imageMogr2/auto-orient/format/jpg/strip/quality/90/',
                'http://img.ui.cn/data/file/4/0/5/245504.jpg?imageMogr2/auto-orient/format/jpg/strip/quality/90/'
              ]
        }
    },
    components: {
      Icon
    }
};
</script>

<style lang='less'>
.f-home-theme {
    position: relative;
    & > .f-home-theme-header-icon {
        z-index: 99;
        position: absolute;
        right: 20px;
        
      }
    & > * {
        display: block;
      }
    
    & > .img {
        position: absolute;
    }
}

</style>
