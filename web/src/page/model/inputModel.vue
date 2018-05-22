<template>
  <div class="text-model">
    <div style="height: 50px;">
   <div class="f-home-theme-header-icon" @click="toBack">
        <icon type='cancel'></icon>
      </div>
      <div class="text-model-right" @click="toSend">
        确定
      </div>
    </div>
      <group>
    <x-textarea autosize placeholder="内容" v-model="value"></x-textarea>
  </group>
    </div>
</template>

<script>
import { Icon, XTextarea, Group, base64 } from "vux";
import api from "../../api/index";
export default {
  components: {
    Icon,
    XTextarea,
    Group
  },
  data() {
    return {
      value: ""
    };
  },
  methods: {
    toSend() {
      let obj = {};
      obj.intro = this.value;
      obj.person = "5adadde467701e2b509e21fe";
      this.$route.params.type === "talk"
        ? (obj.talk = base64.decode(
            this.$route.path.split("/")[1].substring(10)
          ))
        : (obj.course = base64.decode(
            this.$route.path.split("/")[1].substring(10)
          ));
      api.courses.addCourseTalk(obj).then(data => {
        this.$router.push(
          `/detail/course/${this.$route.path.split("/")[1].substring(10)}`
        );
      });
    },
    toBack() {
      console.log(this.$route.params.data);
      this.$router.push({
        name: this.$route.params.url,
        params: this.$route.params.data
      });
    }
  }
};
</script>

<style lang="less">
.text-model {
  width: 100%;
  min-height: 100vh;
  font-size: 25px;
  .text {
    margin-top: 15px;
    margin-left: 10px;
  }
}
.text-model-right {
  float: right;
  padding: 10px;
  font-size: 20px;
}
.f-home-theme-header-icon {
  float: left;
  z-index: 99;
  margin-top: 5px;
  margin-left: 5px;
}
</style>
