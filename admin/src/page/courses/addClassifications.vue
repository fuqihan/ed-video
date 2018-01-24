<template>
  <div class="add-classification">
    <el-form ref="ruleForm" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="分类名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import api from '../../api/index'

  export default {
    data() {
      return {
        form: {
          name: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入分类名字', trigger: 'blur'},
            {min: 2, max: 12, message: '长度在 2 到 12 个字符', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      onSubmit() {
        this.$refs["ruleForm"].validate((valid) => {
          if (valid) {
            api.classification.addClassification({name: this.form.name}).then(data => {
              if(data.data.ret) {
                this.$message({
                  message: '恭喜你，创建成功',
                  type: 'success'
                })
              }else {
                this.$message.error('抱歉，你的创建失败')
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>

<style lang="less">
  .add-classification {
    width: 30%;
    margin-left: 50px;
  }
</style>
