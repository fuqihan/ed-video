<template>
  <div class="add-courser">
    <el-form :model="form" :rules="rules" ref="ruleForm" label-width="80px">
      <el-form-item label="课程名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
       <el-form-item label="课程价格" prop="price">
        <el-input v-model="form.price"></el-input>
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-select v-model="form.author" filterable placeholder="请选择">
          <el-option
            v-for="item in authorList"
            :key="item._id"
            :label="item.name"
            :value="item._id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="课程分类" prop="classification">
        <el-select v-model="form.classification" filterable placeholder="请选择">
          <el-option
            v-for="item in classificationList"
            :key="item._id"
            :label="item.name"
            :value="item._id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="课程列表" prop="courseLists">
        <todo-list :list.sync="form.courseLists"></todo-list>
      </el-form-item>
      <el-form-item label="图片" prop="upload">
        <input type="file" ref="imgFile" style="display: none" @change="beforeAvatarUpload">
        <img v-if="form.upload" @click="$refs.imgFile.click()" :src="form.upload" class="avatar">
        <i v-else @click="$refs.imgFile.click()" class="el-icon-plus avatar-uploader-icon"></i>
      </el-form-item>
      <el-form-item label="课程详情" prop="editorContent">
        <el-button @click="onDetail" type="primary" icon="edit"></el-button>
      </el-form-item>
      <el-form-item label="课程描述" prop="intro">
        <el-input type="textarea" v-model="form.intro"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="更新" :visible.sync="dialogFormVisible">
      <editor :editorContent.sync="form.editorContent" :visible.sync="dialogFormVisible"></editor>
    </el-dialog>
  </div>
</template>

<script>
  import editor from '../../components/editor.vue'
  import api from '../../api/index'
  import todoList from '../../components/todoList.vue'
  import lrz from 'lrz'
  import * as util from '../../config/util'

  export default {
    components: {
      editor,
      todoList
    },
    data() {
      return {
        form: {
          name: '',
          intro: '',
          courseLists: [],
          classification: '',
          imageUrl: '',
          upload: '',
          author: '',
          editorContent: '',
          price: 0
        },
        rules: {
          name: [
            {required: true, message: '请输入课程名', trigger: 'blur'},
            {min: 2, max: 100, message: '长度在 2 到 50 个字符', trigger: 'blur'}
          ],
          author: [
            {required: true, message: '请选择作者', trigger: 'blur'}
          ],
          classification: [
            {required: true, message: '请选择分类', trigger: 'blur'}
          ],
          courseLists: [
            {type: 'array', required: true, message: '请添加课程列表', trigger: 'blur'}
          ],
          upload: [
            {required: true, message: '请添加课程图片', trigger: 'blur'}
          ],
          editorContent: [
            {required: true, message: '请添加课程详情', trigger: 'blur'}
          ],
          intro: [
            {required: true, message: '请输入课程描述', trigger: 'blur'},
            {min: 6, message: '长度在 6 个字符之上', trigger: 'blur'}
          ]
        },
        upload: '',
        dialogFormVisible: false,
        classificationList: null,
        authorList: [],
        data2: [],
        dataItem: '',
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    mounted() {
      api.teacher.findTeachers().then(data => {
        this.authorList = data.data.data.data
      })
      api.classification.findClassifications().then(data => {
        this.classificationList = data.data.data
      })
    },
    methods: {
      onSubmit() {
        this.$refs["ruleForm"].validate((valid) => {
          if (valid) {
            let reg = this.form.upload.match(/(\S*)\/uploads/)[1]
            this.form.imageUrl = this.form.upload.replace(reg, '')
            api.courses.addCourses(this.form).then(data => {
              console.log(data)
              if (data.data.ret) {
                this.$message({
                  message: '恭喜你，创建成功',
                  type: 'success'
                })
              } else {
                this.$message.error('抱歉，你的创建失败')
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      },
      beforeAvatarUpload() {
        let _selt = this
        lrz(event.target.files[0])
          .then(function (rst) {
            // 处理成功会执行
            let blob = util.dataURItoBlob(rst.base64)
            let fd = new FormData()
            fd.append("file", blob, 'image.blob')
            api.upload.adminUpload(fd).then(data => {
              console.log(data)
              _selt.form.imageUrl = data.data.data.replace(/\\/g, "/")
              _selt.form.upload = util.localhostImgUrl + data.data.data.replace(/\\/g, "/")
            })
          })
          .catch(function (err) {
            // 处理失败会执行
          })
          .always(function () {
            // 不管是成功失败，都会执行
          });
      },
      onDetail() {
        this.dialogFormVisible = true
      }
    }
  }
</script>

<style lang="less">
  .add-courser {
    width: 92%;
    margin: 0 auto;
  }

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
