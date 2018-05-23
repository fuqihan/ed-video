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
                'http://ed-video-1252875234.coscd.myqcloud.com/5fe3515cd0e9edc8d5b1dbee2b600152.jpg',
                'http://ed-video-1252875234.coscd.myqcloud.com/9e0fe5de536f24c2bead7e9e8a8585cc.jpg',
                'http://ed-video-1252875234.coscd.myqcloud.com/03fc3690fd988dd6c99828997caaedca.jpg',
                'http://ed-video-1252875234.coscd.myqcloud.com/7b68cc28cd8498a0776fa43d075704b2.jpg'
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
