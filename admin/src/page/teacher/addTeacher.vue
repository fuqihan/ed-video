<template>
  <div class="add-person">
    <teacher-form :form="form" :onPerson="onSubmit" title="立即创建" :btnDisabled.sync="ret"></teacher-form>
  </div>
</template>

<script>
  import api from '../../api/index'
  import teacherForm from './child/teacherForm'

  export default {
    components: {
      teacherForm
    },
    data() {
      return {
        form: {
          name: '',
          username: '',
          password: '',
          sex: '',
          title: '',
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
        ret: false  // 用于告诉组件是否添加成功
      }
    },
    methods: {
      onSubmit(obj) {
        api.teacher.addTeacher(obj).then(data => {
          if (data.data.ret) {
            this.$notify({
              title: '提示',
              message: '恭喜你，创建成功！请手动刷新页面',
              duration: 0
            })
          } else {
            this.$notify({
              title: '提示',
              message: '抱歉，你的创建失败',
              duration: 0
            })
            this.ret = false
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
