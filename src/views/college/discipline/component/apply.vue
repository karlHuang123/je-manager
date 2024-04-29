<template>
  <div class="courseStructure-container">
    <div>
      <div
        class="card-ele"
        v-for="(item, index) in contents"
        v-bind:key="index"
      >
        <row-card-apply
          :applyDetail="item"
          :cardIndex="index"
          @callSave="handleCallSave"
        ></row-card-apply>
      </div>
    </div>
    <div class="add-btn">
      <a-button type="primary" @click="addApply">
        <PlusOutlined />
        添加申请项
      </a-button>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import RowCardApply from './row-card-apply.vue'
  import { PlusOutlined } from '@ant-design/icons-vue'
  export default {
    name: 'Apply',
    components: { RowCardApply, PlusOutlined },
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
        contents: [
          {
            title: '',
            context: '',
          },
        ],
      }
    },
    methods: {
      ...mapActions({
        getCourseContent: 'college/getCourseContent',
        saveCourseContent: 'college/saveCourseContent',
      }),
      addApply() {
        const element = {
          title: '',
          context: '',
        }
        this.contents.push(element)
      },
      handleCallSave(value) {
        if (value.applyItem) {
          this.contents[value.cardIndex] = value.applyItem
          this.saveCourseContentFun()
        } else {
          this.contents.splice(value.cardIndex, 1)
          this.saveCourseContentFun()
        }
      },
      saveCourseContentFun() {
        const data = {
          department: this.department,
          discipline: this.discipline,
          subject: '各类申请',
          contents: this.contents,
        }
        this.saveCourseContent({
          data: data,
          callback: (res) => {
            if (res && res.code === 0) {
              this.$message.success('修改成功。')
              this.getCourseContentFun()
            } else {
              this.$message.error('修改失败，请稍后再试。')
            }
          },
        })
      },
      getCourseContentFun() {
        const query = {
          department: this.department,
          discipline: this.discipline,
          subject: '各类申请',
        }
        this.getCourseContent({
          query: query,
          callback: (res) => {
            if (
              res &&
              res.code === 0 &&
              res.data &&
              typeof res.data.length === 'number' &&
              res.data.length !== 0
            ) {
              this.contents = res.data
            }
          },
        })
      },
    },
    mounted() {
      this.getCourseContentFun()
    },
  }
</script>
<style lang="less" scoped>
  .courseStructure-container {
    margin-top: 20px;
    .comment-header {
      margin-top: 10px;
    }
    .card-list-container {
      padding: 20px;
    }
    .card-ele {
      margin-bottom: 20px;
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
  .add-btn {
    text-align: center;
    margin-top: 20px;
  }
</style>
