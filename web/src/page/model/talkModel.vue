<template>
  <div class="text-model">
    <div style="height: 50px;">
   <div class="f-home-theme-header-icon" @click="$router.go(-1)">
     
        <icon type='cancel'></icon>
      </div>
      <div class="text-model-right" @click="toSend">
        确定
      </div>
    </div>
     <group>
    <selector title="分类" :options="sort" v-model="classification"></selector>
  </group>
       <group>
    <x-textarea  placeholder="标题" v-model="title"></x-textarea>
  </group>
      <group>
    <x-textarea autosize placeholder="内容" v-model="value"></x-textarea>
  </group>
    </div>
</template>

<script>
import { Icon, XTextarea, Group, base64, Selector } from "vux";
import api from "../../api/index";
export default {
  components: {
    Icon,
    XTextarea,
    Group,
    Selector
  },
  data() {
    return {
      value: "",
      title: "",
      sort: [],
      classification: ""
    };
  },
  methods: {
    toSend() {
      let obj = {};
      obj.title = this.title;
      obj.intro = this.value;
      obj.classification = this.classification;
      obj.person = "5adadde467701e2b509e21fe";
      api.talk.addTalk(obj).then(data => {
        this.$router.push("/index/community");
      });
    },
    toBack() {
      this.$router.push({
        name: this.$route.params.url,
        params: this.$route.params.data
      });
    }
  },
  created() {
    api.classifications.findClassifications().then(data => {
      console.log(data.data.data);
      data.data.data.forEach(item => {
        this.sort.push({
          key: item._id,
          value: item.name
        });
      });
    });
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
