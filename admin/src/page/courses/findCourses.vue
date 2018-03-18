<template>
  <div class="find-person">
    <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="标题"
              v-model="listQuery.title">
    </el-input>


    <el-select @change='handleFilter' style="width: 120px" class="filter-item" v-model="listQuery.sort"
               placeholder="排序">
      <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
      </el-option>
    </el-select>

    <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>
    <el-button class="filter-item" type="primary" icon="document" @click="handleDownload">导出</el-button>
    <div class="filter-container">
      <!--  table  -->
      <el-table :key='tableKey' ref="personRef" :data="list" v-loading="listLoading" element-loading-text="给我一点时间"
                border @selection-change="handleSelectionChange"
                highlight-current-row style="width: 100%;margin-top: 20px;position: absolute;right: 0">

        <el-table-column
          type="selection"
          width="55">
        </el-table-column>

        <el-table-column width="180px" align="center" label="时间">
          <template slot-scope="scope">
            <span>{{scope.row.createDate | parseTime }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" min-width="250px" label="个人简介">
          <template slot-scope="scope">
            <span style="height: 20px;display: block">{{scope.row.intro}}</span>
          </template>
        </el-table-column>

        <el-table-column width="150px" align="center" label="账号">
          <template slot-scope="scope">
            <span class="link-type" @click="handleUpdate(scope.row)">{{scope.row.name}}</span>
          </template>
        </el-table-column>


        <el-table-column width="180px" align="center" label="关注数">
          <template slot-scope="scope">
            <el-rate
              v-model="scope.row.rmb"
              disabled
              show-text
              text-color="#ff9900"
              text-template="{value}">
            </el-rate>
          </template>
        </el-table-column>

        <el-table-column align="center" label="课程数" width="95">
          <template slot-scope="scope">
            <span>{{scope.row.pageviews}}</span>
          </template>
        </el-table-column>

        <el-table-column class-name="status-col" align="center" label="状态" width="100">
          <template slot-scope="scope">
            <el-tag>{{scope.row.active ? "可使用" : "不可使用"}}</el-tag>
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" width="100">
          <template slot-scope="scope">
            <el-button v-if="scope.row.active!=true" size="small" @click="handleModifyStatus(scope.row)">激活
            </el-button>
            <el-button v-if="scope.row.active!=false" size="small" type="danger"
                       @click="handleModifyStatus(scope.row)">禁用
            </el-button>
          </template>
        </el-table-column>
        <div>
        </div>
      </el-table>
    </div>
    <div v-show="!listLoading" class="pagination-container"
         :style="{marginTop: listLoadingTop}">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page.sync="listQuery.page"
                     :page-sizes="[10,20,30,50]" :page-size="listQuery.limit"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <el-dialog title="更新" :visible.sync="dialogFormVisible">
      <form-courses :form="form" ></form-courses>
    </el-dialog>
  </div>
</template>

<script>
  import api from '../../api/index'
  import waves from '../../directive/waves.js'// 水波纹指令
  import formCourses from './child/formCourses.vue'

  export default {
    directives: {
      waves
    },
    components: {
      formCourses
    },
    data() {
      return {
        list: null,   //  数据
        total: null,   // 总数
        listLoading: true,   // 加载
        listQuery: {       //  访问参数
          page: 1,
          limit: 10,
          importance: undefined,
          title: undefined,
          type: undefined,
          sort: '+id'
        },
        form: {},     // model的参数
        sortOptions: [{label: '按ID升序列', key: '+id'}, {label: '按ID降序', key: '-id'}],  // 排序
        dialogFormVisible: false,  // medel是否显示
        textMap: {
          update: '编辑',
          create: '创建'
        },
        dialogPvVisible: false,
        tableKey: 0,
        listLoadingTop: '150px',   //  分页距离table多高，
        multipleSelection: {}   // 多选框选中的列
      }
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'gray',
          deleted: 'danger'
        }
        return statusMap[status]
      },
      parseTime(time) {
        return time.split('T')[0] + ' ' + time.split('T')[1].split('.')[0]
      }
    },
    watch: {
      list() {
        setTimeout(() => {
          this.listLoadingTop = (this.$refs.personRef.$el.offsetHeight + 45) + 'px'
        }, 0)
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        api.courses.findCourses(this.listQuery).then(data => {
          if (data.data.ret === true) {
            this.list = data.data.data.data
            this.total = data.data.data.total
          } else {
            this.list = null
            this.total = null
          }
          this.listLoading = false
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },
      handleModifyStatus(row) {
        api.courses.updateActive({
          id: row._id,
          active: !row.active
        }).then(data => {
          console.log(data)
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          row.active = !row.active
        })
      },
      handleUpdate(row) {
        this.form = Object.assign({}, row)
        this.form.areaRules = '已输入'
        this.dialogFormVisible = true
      },
      onSubmit(obj) {
        obj.id = this.form._id
        api.teacher.updateTeacher(obj).then(data => {
          console.log(data)
          this.getList()
          this.dialogFormVisible = false
          this.$notify({
            title: '成功',
            message: '更新成功',
            type: 'success',
            duration: 2000
          })
        })
      },
      /* 导出 */
      handleDownload() {
        require.ensure([], () => {
          const {export_json_to_excel} = require('../../config/ExportExcel')
          const tHeader = ['时间', '个人简介', '账号', '名字', '关注数']
          const filterVal = ['createDate', 'intro', 'username', 'name', 'star']
          const data = this.formatJson(filterVal, this.list)
          export_json_to_excel(tHeader, data, Date.parse(new Date()))
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          if (j === 'createDate') {
            return v[j].split('T')[0] + ' ' + v[j].split('T')[1].split('.')[0]
          } else {
            return v[j]
          }
        }))
      }
    }
  }
</script>

<style lang="less">
  .find-person {
    padding-left: 30px;
    *::-webkit-scrollbar {
      display: none;
    }
  }

  .filter-container {
    position: relative;
    padding: 2px;
  }

  .pagination-container {
    margin-left: 50px;
  }

  .link-type {
    color: #337ab7;
    cursor: pointer;
  }

  .person-form {
    width: 80%;
    margin: 0 auto;
  }
</style>
