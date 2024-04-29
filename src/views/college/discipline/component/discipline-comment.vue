<template>
  <div class="courseStructure-container">
    <div class="main-title">授课内容</div>
    <div class="comment-header">
      <a-radio-group name="radioGroup" :default-value="'各类申请'">
        <a-radio
          v-for="(item, index) in commentHeaderList"
          v-bind:key="index"
          :value="item.label"
          @change="handleCommentChanged"
        >
          {{ item.label }}
        </a-radio>
      </a-radio-group>
    </div>
    <div class="group">
      <apply
        :department="department"
        :discipline="discipline"
        v-if="subject === '各类申请'"
      ></apply>
      <plan
        :department="department"
        :discipline="discipline"
        v-if="subject === '研究计划书'"
      ></plan>
      <interview
        :department="department"
        :discipline="discipline"
        v-if="subject === '面试辅导'"
      ></interview>
      <subject-support
        :department="department"
        :discipline="discipline"
        v-if="subject === '专项辅导'"
      ></subject-support>
      <skills
        :department="department"
        :discipline="discipline"
        v-if="subject === '实技'"
      ></skills>
      <article-component
        :department="department"
        :discipline="discipline"
        v-if="subject === '小论文'"
      ></article-component>
      <exam
        :department="department"
        :discipline="discipline"
        v-if="subject === '笔试课程'"
      ></exam>
      <essay
        :department="department"
        :discipline="discipline"
        v-if="subject === '作品集'"
      ></essay>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { listData } from '../../../../utils/gereral-list'
  import Apply from './apply.vue'
  import Plan from './plan.vue'
  import Interview from './interview.vue'
  import SubjectSupport from './subject-support.vue'
  import Skills from './skills.vue'
  import ArticleComponent from './article.vue'
  import Exam from './exam.vue'
  import Essay from './essay.vue'
  export default {
    name: 'DisciplineComment',
    components: {
      Apply,
      Plan,
      Interview,
      SubjectSupport,
      Skills,
      ArticleComponent,
      Exam,
      Essay,
    },
    props: {
      department: {
        type: String,
      },
      discipline: {
        type: String,
      },
    },
    data() {
      return {
        courseStructure: [],
        commentHeaderList: [],
        subject: '各类申请',
      }
    },
    watch: {
      department: {
        handler(newVal) {
          if (newVal === 'art') {
            this.commentHeaderList = listData.commentHeaderListArt
          } else {
            this.commentHeaderList = listData.commentHeaderList
          }
        },
        deep: true,
        immediate: true,
      },
    },
    methods: {
      ...mapActions({
        // getCourseStructure: 'college/getCourseStructure',
        // saveCourseStructure: 'college/saveCourseStructure',
      }),
      handleCommentChanged(e) {
        this.subject = e.target.value
      },
    },
    mounted() {
      if (this.department === 'art') {
        this.commentHeaderList = listData.commentHeaderListArt
      } else {
        this.commentHeaderList = listData.commentHeaderList
      }
    },
  }
</script>
<style lang="less" scoped>
  .courseStructure-container {
    .comment-header {
      margin-top: 10px;
      margin-bottom: 10px;
    }
    .card-list-container {
      padding: 20px;
    }
  }
  .add-new {
    text-align: center;
  }
  .example {
    text-align: center;
    border-radius: 4px;
    margin-bottom: 20px;
    padding: 30px 50px;
    margin: 20px 0;
  }
</style>
