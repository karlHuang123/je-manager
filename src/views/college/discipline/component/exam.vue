<template>
  <div class="courseStructure-container">
    <div class="add-btn">
      <a-button @click="openEdit(-1)" type="primary">
        <PlusOutlined />
        添加课程
      </a-button>
    </div>
    <a-table
      :columns="listColumns"
      :pagination="false"
      :row-key="
        (r) => {
          return r.courseName
        }
      "
      :data-source="contents"
    >
      <template #operation="{ index }">
        <div class="editable-row-operations">
          <span class="edit" style="margin-right: 10px">
            <a-button type="primary" @click="() => openEdit(index)">
              编辑
            </a-button>
          </span>
          <span>
            <a-popconfirm
              title="确定删除该课程吗？"
              @confirm="() => deleteCourse(index)"
            >
              <a-button type="danger">删除</a-button>
            </a-popconfirm>
          </span>
        </div>
      </template>
    </a-table>
    <a-modal
      :visible="showModal"
      title="课程详情配置"
      @ok="addCourse"
      @cancel="closeModal"
      width="60%"
      :body-style="bodystyle"
    >
      <exam-component
        :details="tempObject"
        @changed="handleChanged"
      ></exam-component>
    </a-modal>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { listData } from '../../../../utils/gereral-list'
  import { PlusOutlined } from '@ant-design/icons-vue'
  import ExamComponent from './exam-component.vue'
  export default {
    name: 'Article',
    components: { PlusOutlined, ExamComponent },
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
        listColumns: listData.listColumns,
        contents: [],
        tempIndex: 0,
        tempObject: null,
        showModal: false,
        bodystyle: {
          height: '680px',
          overflow: 'hidden',
          overflowY: 'scroll',
        },
      }
    },
    methods: {
      ...mapActions({
        getCourseContent: 'college/getCourseContent',
        saveCourseContent: 'college/saveCourseContent',
      }),
      saveCourseContentFun() {
        const data = {
          department: this.department,
          discipline: this.discipline,
          subject: '笔试课程',
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
      deleteCourse(index) {
        this.contents.splice(index, 1)
        this.saveCourseContentFun()
      },
      openEdit(index) {
        if (index !== -1) {
          this.tempIndex = index
          this.tempObject = this.contents[this.tempIndex]
        } else {
          const ele = {
            courseName: '',
            courseSet: '',
            presenter: '',
            presenter_image: '',
            presenter_intro: '',
            weight: 0,
            courseIntro: '',
            courseCalendar: [
              {
                item: '',
              },
            ],
            textbook: [
              {
                image_url: '',
                comment: '',
              },
            ],
            references: [
              {
                image_url: '',
                comment: '',
              },
            ],
          }
          this.tempObject = ele
          this.tempIndex = this.contents.length
        }
        this.showModal = true
      },
      handleChanged(value) {
        this.tempObject = value
      },
      addCourse() {
        this.contents[this.tempIndex] = this.tempObject
        this.saveCourseContentFun()
        this.closeModal()
      },
      closeModal() {
        this.showModal = false
      },
      getCourseContentFun() {
        const query = {
          department: this.department,
          discipline: this.discipline,
          subject: '笔试课程',
        }
        this.getCourseContent({
          query: query,
          callback: (res) => {
            if (res && res.code === 0 && res.data) {
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
    .card-input {
      margin-top: 20px;
      .top-title {
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 10px;
      }
    }
  }
  .add-btn {
    text-align: right;
    margin-bottom: 20px;
  }
</style>
