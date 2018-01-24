<template>
  <div class="add-person">
    <person-form :form="form" :onPerson="onSubmit" title="立即创建"></person-form>
  </div>
</template>

<script>
  import api from '../../api/index'
  import personForm from './child/personForm.vue'

  export default {
    components: {
      personForm
    },
    data() {
      return {
        form: {
          name: '',
          username: '',
          password: '',
          sex: '',
          address: {
            area: {
              code: '',
              value: ''
            },
            city: {
              code: '',
              value: ''
            },
            province: {
              code: '',
              value: ''
            }
          },
          tel: '',
          areaRules: '',  // 为了判断省市区是否添了
          imageUrl: '',
          upload: '', // 为了判断是否上传
          active: false,
          intro: '江湖走马，风也好，雨也罢'
        },
      }
    },
    methods: {
      onSubmit(obj) {
        api.person.addPerson(obj).then(data => {
          if(data.data.ret) {
            this.$message({
              message: '恭喜你，创建成功',
              type: 'success'
            })
          }else {
            this.$message.error('抱歉，你的创建失败')
          }
        })
      }
    }
  }
</script>

<style lang="less">
  .add-person {
    width: 92%;
    margin: 0 auto;
  }

</style>
