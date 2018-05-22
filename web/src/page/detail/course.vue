<template>
  <div class="detail-course" v-show="detailCourseLoading">
    <div class="detail-course-header">
      <div class="detail-course-back" @click="toBack"> < </div>
      <img :src="coursesItem.imageUrl" alt="">
    </div>
    <div class="detail-course-center">
      <div class="detail-course-center-title" ref="courseTitle">
        <span class="detail-course-center-title-name">
          {{coursesItem.name}}
        </span>
        <span class="detail-course-center-title-intro">
          {{coursesItem.intro}}
        </span>
      </div>
      <div class="detail-course-center-content">
        <div class="detail-course-center-content-nav" ref="courseNav"
             :style="courseNavStyle.off?courseNavStyle:0">
          <div class="item" @click="onScrollTop(1)" :style="courseNavItemStyle.item === 1 ? courseNavItemStyle: 0">
            课程介绍
          </div>
          <div class="item" @click="onScrollTop(2)" :style="courseNavItemStyle.item === 2 ? courseNavItemStyle: 0">
            课程列表
          </div>
          <div class="item" @click="onScrollTop(3)" :style="courseNavItemStyle.item === 3 ? courseNavItemStyle: 0">
            作者
          </div>
          <div class="item" @click="onScrollTop(4)" :style="courseNavItemStyle.item === 4 ? courseNavItemStyle: 0">
            评论
          </div>
        </div>
        <div class="detail-course-center-content-intro" ref="editorContent"></div>
        <div class="detail-course-center-content-table" ref="detailCourseTable">
          <div style="width: 100%;text-align: center;font-size: 20px">
            <span>课程列表</span>
          </div>
          <course-list :key="index" :courseLists="item" v-for="(item,index) in coursesItem.courseLists"></course-list>
        </div>
        <div class="detail-course-center-content-teacher" ref="detailCourseTeacher">
          <img :src="author.imageUrl" alt="">
          <span class="name">{{author.name}}</span>
          <span class="detail">{{author.intro}}</span>
        </div>
        <div class="detail-course-center-content-review" ref="detailCourseReview">
          <div class="detail-course-center-content-review-header">
            <span>点击量: </span><span>100</span>
            <span>综合评价: </span>
            <rater v-model="reviewStar" :font-size="18" disabled></rater>
          </div>
          <review-list :talk="item" :key="item" v-for="item in courseTalks"></review-list>
        </div>
      </div>
    </div>
    <div class="detail-course-footer">
      <span class="price">￥ 2400:00</span>
      <span class="people-number">已有20人学习</span>
      <div id="paypal-button" ref="paypalButton"></div>

    </div>
  </div>
</template>

<script>
import courseList from "../../components/courseItemList.vue";
import reviewList from "../../components/reviewList.vue";
import api from "../../api/index";
import { base64, Rater } from "vux";

let htmlBody = document.scrollingElement || document.documentElement;
export default {
  data() {
    return {
      coursesItem: {
        type: Object,
        default: function() {
          return {
            imageUrl: "",
            name: "",
            intro: "",
            editorContent: "",
            courseLists: [],
            courseTalks: [],
          };
        }
      },
      reviewStar: 4,
      author: {
        type: Object,
        default: function() {
          return {
            imageUrl: "",
            name: "",
            intro: ""
          };
        }
      },
      setTime: {},
      courseNavStyle: {
        position: "fixed",
        top: 0,
        off: false
      },
      courseNavItemStyle: {
        color: "red",
        item: 1
      },
      courseTop: {
        intro: 0,
        table: 0,
        teacher: 0,
        review: 0
      },
      detailCourseLoading: false
    };
  },
  components: {
    courseList,
    Rater,
    reviewList
  },
  methods: {
    toBack() {
      this.$router.push(this.$store.state.afterRouter)
    },
    onScrollTop(id) {
      switch (id) {
        case 1:
          htmlBody.scrollTop = this.courseTop.intro;
          break;
        case 2:
          htmlBody.scrollTop = this.courseTop.table + 1;
          break;
        case 3:
          htmlBody.scrollTop = this.courseTop.teacher + 1;
          break;
        case 4:
          htmlBody.scrollTop = this.courseTop.review + 1;
          break;
      }
    }
  },
  mounted() {
    htmlBody.scrollTop = 0;
    let _that = this;
    api.courses
      .findCoursesById(base64.decode(this.$route.params.id))
      .then(data => {
        htmlBody.scrollTop = 0;
        this.coursesItem = data.data.data;
        this.author = data.data.data.author;
        this.courseTalks = data.data.courseTalks;
        this.$refs.editorContent.innerHTML = this.coursesItem.editorContent;
        this.detailCourseLoading = true;
        setTimeout(() => {
          let courseNavHeight = this.$refs.courseNav.offsetHeight; // nav距离顶部距离
          let titleTop;
          let titleScrollTop;
          /* 课程列表距离顶部的距离 */
          let tableHeight =
            courseNavHeight +
            this.$refs.detailCourseTable.offsetHeight +
            this.$refs.detailCourseTeacher.offsetHeight +
            2;
          let teacherHeight =
            courseNavHeight + this.$refs.detailCourseTeacher.offsetHeight;
          this.courseTop.table =
            this.$refs.detailCourseTable.offsetTop - courseNavHeight * 2;
          this.courseTop.teacher =
            this.$refs.detailCourseTeacher.offsetTop - courseNavHeight * 2;
          this.courseTop.review =
            this.$refs.detailCourseReview.offsetTop - courseNavHeight * 2;
          /*  -----------  */
          this.setTime = () => {
            /*  使courseNav随着滑动能顶到最上面  */
            titleTop = this.$refs.courseTitle.getBoundingClientRect().top;
            titleScrollTop = -1;
            titleTop.toString().split("-").length === 2
              ? (titleScrollTop = titleTop.toString().split("-")[1])
              : 0;
            if (
              this.$refs.courseNav.getBoundingClientRect().top <= 0 &&
              titleScrollTop >= this.$refs.courseTitle.offsetHeight
            ) {
              this.courseNavStyle.off = true;
              tableHeight =
                courseNavHeight +
                this.$refs.detailCourseTable.offsetHeight +
                this.$refs.detailCourseTeacher.offsetHeight;
            } else {
              this.courseNavStyle.off = false;
              tableHeight =
                this.$refs.detailCourseTable.offsetHeight +
                this.$refs.detailCourseTeacher.offsetHeight;
            }
            if (
              teacherHeight <
                this.$refs.detailCourseReview.getBoundingClientRect().top &&
              this.$refs.detailCourseReview.getBoundingClientRect().top <=
                tableHeight &&
              this.courseNavItemStyle.item !== 2
            ) {
              this.courseNavItemStyle.item = 2;
            } else if (
              courseNavHeight <
                this.$refs.detailCourseReview.getBoundingClientRect().top &&
              this.$refs.detailCourseReview.getBoundingClientRect().top <=
                teacherHeight &&
              this.courseNavItemStyle.item !== 3
            ) {
              this.courseNavItemStyle.item = 3;
            } else if (
              this.$refs.detailCourseReview.getBoundingClientRect().top <=
                courseNavHeight &&
              this.courseNavItemStyle.item !== 4
            ) {
              this.courseNavItemStyle.item = 4;
            } else if (
              this.$refs.detailCourseReview.getBoundingClientRect().top >
                tableHeight &&
              this.courseNavItemStyle.item !== 1
            ) {
              this.courseNavItemStyle.item = 1;
            }
          };
          window.addEventListener("scroll", this.setTime, false);
          window.addEventListener("click", this.setTime, false);
        }, 500);
      });
    paypal.Button.render(
      {
        env: "sandbox", // Or 'sandbox'

        client: {
          sandbox:
            "Ab3wgsEfwHsnSomtzyijTLIBQUTaQEpmuXM0-7ImdUidycQoWeFzCwI8RJpprIt12NsppaHtywRvDFOD",
          production: "fuuqihan-facilitator@gmail.com"
        },

        commit: false, // Show a 'Pay Now' button

        style: {
          size: "responsive",
          color: "gold",
          shape: "rect",
          label: "checkout"
        },

        payment: function(data, actions) {
          if (_that.$store.state.loginInfo) {
            _that.$store.commit("LOGIN_BEFORE", _that.$route.path);
            return _that.$router.push({ name: "login" });
          } else {
            return actions.payment.create({
              payment: {
                transactions: [
                  {
                    amount: { total: "1.00", currency: "USD" }
                  }
                ]
              }
            });
          }
        },

        onCancel: function(data, actions) {
          _that.$router.push({ name: "video" });
        },

        onAuthorize: function(data, actions) {
          return actions.payment.execute().then(payment => {
            console.log(123);
            // The payment is complete!
            // You can now show a confirmation message to the customer
            console.log(payment);
          });
        }
      },
      "#paypal-button"
    );
  },
  beforeDestroy: function() {
    window.removeEventListener("scroll", this.setTime, false);
    window.removeEventListener("click", this.setTime, false);
  }
};
</script>

<style lang="less">
.detail-course {
  .detail-course-header {
    height: 3.5rem;
    position: relative;
    .detail-course-back {
      width: 0.5rem;
      height: 0.5rem;
      background-color: #1b1b1b;
      color: white;
      font-size: 16px;
      text-align: center;
      border-radius: 50%;
      line-height: 0.5rem;
      position: absolute;
      top: 0.2rem;
      left: 0.2rem;
      z-index: 99;
    }
    img {
      display: inline;
      width: 100%;
      height: 3.5rem;
    }
  }
  .detail-course-center {
    margin-bottom: 1rem;
    background-color: white;
    .detail-course-center-title {
      padding: 0.2rem 0;
      width: 100%;
      .detail-course-center-title-name {
        width: 80%;
        margin: 0 auto;
        text-align: center;
        display: block;
        font-size: 16px;
      }
      .detail-course-center-title-intro {
        font-size: 14px;
        margin: 0.3rem auto;
        display: block;
        width: 90%;
      }
    }
    .detail-course-center-content {
      .detail-course-center-content-nav {
        z-index: 99;
        width: 100%;
        height: 0.8rem;
        background-color: white;
        display: flex;
        justify-content: flex-start;
        font-size: 12px;
        border-top: 1px solid #e2e2e2;
        border-bottom: 1px solid #e2e2e2;
        .item {
          flex: 1;
          text-align: center;
          line-height: 0.8rem;
        }
      }
      .detail-course-center-content-intro {
        width: 100%;
        text-align: center;
        padding-bottom: 0.12rem;
        * {
          font-size: 16px;
          display: block;
          margin: 0;
          padding: 0;
        }
        img {
          width: 100%;
        }
      }
      .detail-course-center-content-teacher {
        padding: 0.2rem 0;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        img {
          display: inline-block;
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
        }
        .name {
          padding: 0.1rem 0;
          font-size: 16px;
        }
        .detail {
          display: block;
          width: 70%;
          text-align: center;
          font-size: 14px;
        }
      }
      .detail-course-center-content-review {
        min-height: 10rem;
        .detail-course-center-content-review-header {
          width: 70%;
          margin: 0 auto;
          padding: 20px 0;
          font-size: 12px;
        }
      }
    }
  }
  .detail-course-footer {
    width: 100%;
    background-color: white;
    height: 1rem;
    border-top: 1px solid #e5e5e5;
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .price {
      width: 30%;
      text-align: center;
      line-height: 1rem;
      margin-left: 0.2rem;
      display: block;
      font-size: 18px;
      color: #ff1a1f;
    }
    .people-number {
      padding-right: 0.4rem;
      width: 36%;
      line-height: 1rem;
      text-align: right;
      display: block;
      font-size: 12px;
    }
    .button {
      display: block;
      border: 1px solid #0a3c59;
      background: #3e779d;
      background: -webkit-gradient(
        linear,
        left top,
        left bottom,
        from(#6637cc),
        to(#3e779d)
      );
      background: -webkit-linear-gradient(top, #6637cc, #3e779d);
      background: -moz-linear-gradient(top, #6637cc, #3e779d);
      background: -ms-linear-gradient(top, #6637cc, #3e779d);
      background: -o-linear-gradient(top, #6637cc, #3e779d);
      background-image: -ms-linear-gradient(top, #6637cc 0%, #3e779d 100%);
      padding: 10.5px 21px;
      -webkit-border-radius: 6px;
      -moz-border-radius: 6px;
      border-radius: 6px;
      -webkit-box-shadow: rgba(255, 255, 255, 0.4) 0 1px 0,
        inset rgba(255, 255, 255, 0.4) 0 1px 0;
      -moz-box-shadow: rgba(255, 255, 255, 0.4) 0 1px 0,
        inset rgba(255, 255, 255, 0.4) 0 1px 0;
      box-shadow: rgba(255, 255, 255, 0.4) 0 1px 0,
        inset rgba(255, 255, 255, 0.4) 0 1px 0;
      text-shadow: #7ea4bd 0 1px 0;
      color: #e6edf2;
      font-size: 14px;
      font-family: helvetica, serif;
      text-decoration: none;
      vertical-align: middle;
    }
    .button:hover {
      border: 1px solid #0a3c59;
      text-shadow: #1e4158 0 1px 0;
      background: #3e779d;
      background: -webkit-gradient(
        linear,
        left top,
        left bottom,
        from(#4e338a),
        to(#3e779d)
      );
      background: -webkit-linear-gradient(top, #4e338a, #3e779d);
      background: -moz-linear-gradient(top, #4e338a, #3e779d);
      background: -ms-linear-gradient(top, #4e338a, #3e779d);
      background: -o-linear-gradient(top, #4e338a, #3e779d);
      background-image: -ms-linear-gradient(top, #4e338a 0%, #3e779d 100%);
      color: #d694d6;
    }
    .button:active {
      text-shadow: #1e4158 0 1px 0;
      border: 1px solid #0a3c59;
      background: #65a9d7;
      background: -webkit-gradient(
        linear,
        left top,
        left bottom,
        from(#3e779d),
        to(#3e779d)
      );
      background: -webkit-linear-gradient(top, #3e779d, #65a9d7);
      background: -moz-linear-gradient(top, #3e779d, #65a9d7);
      background: -ms-linear-gradient(top, #3e779d, #65a9d7);
      background: -o-linear-gradient(top, #3e779d, #65a9d7);
      background-image: -ms-linear-gradient(top, #3e779d 0%, #65a9d7 100%);
      color: #fff;
    }
    button {
      flex: 1;
      height: 76%;
      margin-right: 0.1rem;
      border-radius: 10%;
      color: white;
      background-color: #06756f;
      border: none;
      outline: none;
    }
  }
}
</style>
