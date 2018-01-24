<template>
  <el-form :model="form" :rules="rules" ref="ruleForm" label-width="20" class="demo-ruleForm">
    <el-form-item label="昵称" prop="name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="账号" prop="username">
      <el-input v-model="form.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="form.password" type="password"></el-input>
    </el-form-item>
    <el-form-item label="电话" prop="tel">
      <el-input v-model="form.tel"></el-input>
    </el-form-item>
    <el-form-item label="称号" prop="title">
      <el-input v-model="form.title" placeholder="例：资深小学英语教师"></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="sex">
      <el-select v-model="form.sex" placeholder="请选择性别">
        <el-option label="男" value="1"></el-option>
        <el-option label="女" value="2"></el-option>
        <el-option label="其他" value="3"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="地区" prop="areaRules">
      <v-distpicker :province="form.address.province.value" :area="form.address.area.value"
                    :city="form.address.city.value" @selected="changeArea"></v-distpicker>
      <el-input v-model="form.areaRules" style="display: none"></el-input>
    </el-form-item>
    <!--<el-form-item label="激活">-->
    <!--<el-switch on-text="" off-text="" v-model="form.active"></el-switch>-->
    <!--</el-form-item>-->
    <el-form-item label="头像" prop="imageUrl">
      <input type="file" ref="imgFile" style="display: none" @change="beforeAvatarUpload">
      <img v-if="upload" @click="$refs.imgFile.click()" :src="upload" class="avatar">
      <i v-else @click="$refs.imgFile.click()" class="el-icon-plus avatar-uploader-icon"></i>
    </el-form-item>
    <el-form-item label="个人简介">
      <el-input type="textarea" v-model="form.intro"></el-input>
    </el-form-item>
    <el-form-item align="center">
      <el-button type="primary" @click="onSubmit" :disabled="btnDisabled">{{$props.title}}</el-button>
      <el-button @click="onReset">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import VDistpicker from 'v-distpicker'
  import lrz from 'lrz'
  import * as util from '../../../config/util'
  import api from '../../../api/index'
  import sha1 from 'js-sha1'

  export default {
    components: {
      'v-distpicker': VDistpicker
    },
    props: ['onPerson', 'form', 'title', 'dialogFormVisible', 'btnDisabled'],
    data() {
      return {
        rules: {
          name: [
            {required: true, message: '请输入昵称', trigger: 'blur'},
            {min: 2, max: 12, message: '长度在 2 到 12 个字符', trigger: 'blur'}
          ],
          tel: [
            {required: true, message: '请输入电话', trigger: 'blur'},
            {min: 8, max: 13, message: '长度在 8 到 13 个字符', trigger: 'blur'}
          ],
          username: [
            {required: true, message: '请输入账号', trigger: 'blur'},
            {min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur'}
          ],
          sex: [
            {type: 'string', required: true, message: '请选择性别', trigger: 'change'}
          ],
          areaRules: [
            {required: true, message: '请选择地区', trigger: 'blur'}
          ],
          imageUrl: [
            {required: true, message: '请上传头像', trigger: 'blur'}
          ],
          title: [
            {required: true, message: '请输入称号', trigger: 'blur'}
          ]
        }
      }
    },
    computed: {
      upload() {
        if (!this.form.upload) {
          return this.form.imageUrl
        } else {
          return util.localhostImgUrl + this.form.imageUrl
        }
      }
    },
    methods: {
      onSubmit() {
        let id
        this.$refs["ruleForm"].validate((valid) => {
          this.$emit('update:btnDisabled', true)
          if (valid) {
            this.$props.onPerson({
              name: this.form.name,
              username: this.form.username,
              password: sha1(this.form.password),
              tel: this.form.tel,
              sex: this.form.sex,
              address: this.form.address,
              imageUrl: this.form.imageUrl,
              intro: this.form.intro,
              title: this.form.title
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      beforeAvatarUpload(event) {
        let _selt = this
        lrz(event.target.files[0])
          .then(function (rst) {
            // 处理成功会执行
            let blob = util.dataURItoBlob(rst.base64)
            let fd = new FormData()
            fd.append("file", blob, 'image.blob')
            api.upload.adminUpload(fd).then(data => {
              _selt.form.imageUrl = data.data.data.replace(/\\/g, "/")
              _selt.form.upload = util.localhostUrl + data.data.data.replace(/\\/g, "/")
            })
          })
          .catch(function (err) {
            // 处理失败会执行
          })
          .always(function () {
            // 不管是成功失败，都会执行
          });
      },
      changeArea() {
        this.form.address = {
          area: {
            code: arguments[0].area.code,
            value: arguments[0].area.value
          },
          city: {
            code: arguments[0].city.code,
            value: arguments[0].city.value
          },
          province: {
            code: arguments[0].province.code,
            value: arguments[0].province.value
          }
        }
        this.form.areaRules = '123'
      },
      onReset() {
        if (this.$props.dialogFormVisible !== undefined) {
          this.$emit('update:dialogFormVisible', !this.$props.dialogFormVisible)
        } else {
          this.$router.push('/index/teacher/findPerson')
        }
      }
    }
  }
</script>

<style lang="less">
  .avatar-uploader-icon:hover {
    border-color: #20a0ff;
  }

  .avatar-uploader-icon {
    border: 1px dashed #d9d9d9;
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
