<template>
  <div class="my-editor">
    <quill-editor ref="editor" v-model="content"
                  :options="editorOption"
                  @blur="onEditorBlur($event)"
                  @focus="onEditorFocus($event)"
                  @ready="onEditorReady($event)">
      <div id="toolbar" slot="toolbar">
        <!-- Add a bold button -->
        <button class="ql-bold">Bold</button>
        <button class="ql-italic">Italic</button>
        <!-- Add font size dropdown -->
        <select class="ql-size">
          <option value="small"></option>
          <!-- Note a missing, thus falsy value, is used to reset to default -->
          <option selected></option>
          <option value="large"></option>
          <option value="huge"></option>
        </select>
        <!-- Add subscript and superscript buttons -->
        <button class="ql-script" value="sub"></button>
        <button class="ql-script" value="super"></button>
        <button @click="customButtonClick">
          <i class="el-icon-upload2"></i>
          <input type="file" style="display: none" ref="editorFile" @change="uploadImg">
        </button>
      </div>
    </quill-editor>
    <el-button type="info" @click="editorSub" class="my-editor-btn">确定</el-button>
    <el-button @click="pcLook">查看电脑端效果</el-button>
    <el-button @click="webLook">查看手机端效果</el-button>
  </div>
</template>

<script>
import lrz from "lrz";
import * as util from "../config/util";
import api from "../api/index";

export default {
  props: ["editorContent", "editorContent", "visible"],
  data() {
    return {
      name: "custom-toolbar-example",
      content: "<h2>请为你的课程添加详细介绍吧</h2>",
      someData: "",
      editorOption: {
        modules: {
          toolbar: "#toolbar"
        }
      }
    };
  },
  methods: {
    onEditorBlur() {},
    onEditorFocus() {},
    onEditorReady() {},
    editorSub() {
      this.$emit("update:editorContent", this.content);
      this.$emit("update:visible", !this.$props.visible);
    },
    pcLook() {
      let p =
        '<html><head><title>电脑端效果</title><style>img {width: 100%;display: block}</style></head><body><div style="width: 640px;margin: 0 auto;border: 1px solid #000">' +
        this.content +
        "</div></body></html>";
      let w = window.open("about:blank");
      w.document.write(p);
    },
    webLook() {
      let p =
        '<html><head><title>手机端效果</title><style>img {width: 100%;display: block}</style></head><body><div style="width: 320px;margin: 0 auto;border: 1px solid #000;min-height: 600px">' +
        this.content +
        "</div></body></html>";
      let w = window.open("about:blank");
      w.document.write(p);
    },
    customButtonClick() {
      this.$refs.editorFile.click();
    },
    uploadImg(event) {
      let _selt = this;
      let index =
        this.$refs.editor.quill.getSelection() !== null
          ? this.$refs.editor.quill.getSelection().index
          : 0;
      lrz(event.target.files[0])
        .then(function(rst) {
          // 处理成功会执行
          let blob = util.dataURItoBlob(rst.base64);
          let fd = new FormData();
          fd.append("file", blob, "image.blob");
          api.upload.adminUpload(fd).then(data => {
            _selt.$refs.editor.quill.insertEmbed(
              index,
              "image",
              util.localhostImgUrl + data.data.data.replace(/\\/g, "/")
            );
          });
        })
        .catch(function(err) {
          // 处理失败会执行
        })
        .always(function() {
          // 不管是成功失败，都会执行
        });
    }
  }
};
</script>

<style lang="less">
.my-editor {
}

.my-editor-btn {
  margin-top: 20px;
}
</style>
