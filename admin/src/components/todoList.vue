<template>
  <div class="todo-list">
    <div class="todo-list-enter">
      <input type="text" v-model="todoText" class="textInput">
      <el-button class="todo-list-enter-btn" @click="addTodo">添加</el-button>
      <br>
      <div style="margin: 10px 0">
        <input type="text" v-model="todoUrl" class="textInput">
        <br>
        <el-button class="todo-list-enter-btn" @click="addTodoUrl">添加视频地址</el-button>
      </div>
    </div>
    <div style="display: flex;justify-content: flex-start">
      <div class="todo-list-width">
        <div class="todo-list-child" :style="item.active?activeStyle:null" @click="activeMaster(index)"
             v-for="item,index in todoList">
          {{item.name}}
        </div>
      </div>
      <div class="todo-list-width">
        <div class="todo-list-child" :style="item.active?activeStyle:null" @click="activeChild(index)"
             v-for="item,index in todoChildList">
          {{item.name}}
        </div>
      </div>
    </div>

    <div class="todo-list-enter">
      <el-button type="danger" @click="delTodo" style="margin-left: 20px">删除</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['list'],
    data() {
      return {
        todoText: '',
        todoUrl: 'http://edvideo-1252875234.cosbj.myqcloud.com/7993821.mp4',
        todoList: [],
        todoChildList: [],
        activeStyle: {
          'backgroundColor': '#0082e6',
          'color': 'white'
        }
      }
    },
    watch: {
      todoList() {
        this.$emit('update:list', this.todoList)
      }
    },
    methods: {
      addTodo() {
        if (this.todoText.trim() === '')
          return
        let info = true
        this.todoList.forEach((item, index) => {
          if (item.active === true) {
            item.child.push({
              name: this.todoText,
              url: 'http://edvideo-1252875234.cosbj.myqcloud.com/7993821.mp4',
              active: false
            })
            info = false
          }
        })
        this.todoChildList.map((item, index) => {
          if (item.active === true) {
            info = false
          }
        })
        info === true ? this.todoList.push({
          name: this.todoText,
          active: false,
          child: []
        }) : 0
      },
      addTodoUrl() {
        this.todoChildList.map((item, index) => {
          if (item.active === true) {
            item.url = this.todoUrl
          }
        })
      },
      delTodo() {
        this.todoList.map((item, index) => {
          if (item.active === true) {
            this.todoList.splice(index, 1,)
            this.todoChildList = []
          }
        })
        this.todoChildList.map((item, index) => {
          if (item.active === true) {
            this.todoChildList.splice(index, 1,)
          }
        })
      },
      activeMaster(i) {
        this.todoChildList.map(item => item.active = false)
        this.todoList.map((item, index) => {
          if (index === i) {
            if (item.active === true) {
              item.active = false
              this.todoChildList = []
            } else {
              item.active = true
              this.todoChildList = item.child
            }
          } else {
            item.active = false
          }
        })
      },
      activeChild(i) {
        this.todoList.map(item => item.active = false)
        this.todoChildList.map((item, index) => {
          if (index === i) {
            if (item.active === true) {
              item.active = false
            } else {
              item.active = true
            }
          } else {
            item.active = false
          }
        })
      }
    }
  }
</script>

<style lang="less">
  .todo-list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .todo-list-enter {
      margin: 10px;;
      .textInput {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background-color: #fff;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #bfcbd9;
        box-sizing: border-box;
        color: #1f2d3d;
        font-size: inherit;
        height: 36px;
        line-height: 1;
        outline: 0;
        padding: 3px 10px;
        transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
      }
    }
    .todo-list-width {
      min-width: 150px;
      min-height: 200px;
      border: 1px solid #20a0ff;
      margin-left: 20px;
      .todo-list-child {
        width: 100%;
        height: 35px;
        text-align: center;
        border: 1px solid #e9e9e9;
      }
    }
  }
</style>
