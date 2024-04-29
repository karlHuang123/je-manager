<template>
  <div>
    <div class="department-select">
      <div class="department-title">类别选择：</div>
      <a-select
        default-value="建筑大类"
        style="width: 120px"
        @change="handleDepartmentChange"
      >
        <a-select-option
          v-for="(item, index) in departmentList"
          v-bind:key="index"
        >
          {{ item.label }}
        </a-select-option>
      </a-select>
    </div>
    <div class="news-container">
      <div class="news-nav" style="width: 300px">
        <div class="main-title">课程列表</div>
        <div
          class="side-element"
          v-bind:class="{ active: this.tempKey === index }"
          v-for="(ele, index) in courseList"
          v-bind:key="ele ? ele._id : index"
        >
          <div class="news-title" @click="changeItem(index, ele.discipline)">
            <a-tooltip placement="top" :title="ele.discipline">
              <div class="news-title">{{ ele.discipline }}</div>
            </a-tooltip>
          </div>
          <a-button
            style="margin-right: 10px; margin-left: auto"
            type="primary"
            @click="editDiscipline(index, ele.discipline)"
          >
            编辑
          </a-button>
          <a-popconfirm
            title="确定删除吗？"
            @confirm="deleteDisciplineFun(ele._id, index)"
          >
            <a-button style="margin-right: 10px" type="danger">删除</a-button>
          </a-popconfirm>
        </div>
        <div>
          <a-button type="primary" @click="openAddCourse">
            <PlusOutlined />
            添加课程
          </a-button>
        </div>
      </div>
      <div class="news-nav">
        <div class="main-title">内容</div>
        <div v-if="courseList.length !== 0">
          <div
            class="side-element"
            v-for="(ele, index) in subList"
            v-bind:class="{ active: this.subject === ele.label }"
            v-bind:key="index"
          >
            <div class="news-title" @click="changeSubject(ele.label)">
              {{ ele.label }}
            </div>
          </div>
        </div>
      </div>
      <div class="spin" v-if="!showSide">
        <a-spin />
      </div>
      <div class="news-side" v-if="courseList.length !== 0 && showSide">
        <discipline-intro
          :department="department"
          :discipline="discipline"
          v-if="subject === '学科介绍'"
        ></discipline-intro>
        <discipline-structure
          :department="department"
          :discipline="discipline"
          v-if="subject === '课程架构'"
        ></discipline-structure>
        <discipline-comment
          :department="department"
          :discipline="discipline"
          v-if="subject === '授课内容'"
        ></discipline-comment>
        <online
          :department="department"
          :discipline="discipline"
          v-if="subject === '线上试听'"
        ></online>
      </div>
    </div>
    <a-modal
      :visible="showAddModal"
      title="课程名称"
      @ok="addCourse"
      @cancel="closeCourse"
    >
      <a-input
        v-model:value="discipline"
        placeholder="请输入课程名称"
      ></a-input>
    </a-modal>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import DisciplineIntro from './component/discipline-intro.vue'
  import DisciplineStructure from './component/discipline-structure.vue'
  import DisciplineComment from './component/discipline-comment.vue'
  import Online from './component/online.vue'
  import { PlusOutlined } from '@ant-design/icons-vue'
  import { listData } from '../../../utils/gereral-list'
  export default {
    name: 'Lesson',
    components: {
      DisciplineIntro,
      DisciplineStructure,
      DisciplineComment,
      Online,
      PlusOutlined,
    },
    data() {
      return {
        department: 'architecture',
        subject: '学科介绍',
        discipline: '',
        courseList: [],
        showAddModal: false,
        showSide: true,
        subList: [
          {
            label: '学科介绍',
            value: 'intro',
          },
          {
            label: '课程架构',
            value: 'structure',
          },
          {
            label: '授课内容',
            value: 'content',
          },
          {
            label: '线上试听',
            value: 'online',
          },
        ],
        departmentList: listData.departmentList,
        tempKey: 0,
        tempId: null,
      }
    },
    methods: {
      ...mapActions({
        getDisciplineList: 'college/getDisciplineList',
        saveDiscipline: 'college/saveDiscipline',
        deleteDiscipline: 'college/deleteDiscipline',
      }),
      initMemberList() {
        this.courseList = []
      },
      changeItem(index, discipline) {
        this.showSide = false
        this.tempKey = index
        this.discipline = discipline
        this.subject = '学科介绍'
        this.tempObject = this.courseList[index]
        setTimeout(() => {
          this.showSide = true
        }, 500)
      },
      changeSubject(subject) {
        this.subject = subject
      },
      newsDetailChanged(value) {
        this.courseList[this.tempKey].images[value.index] = value.image
        this.tempObject = this.courseList[this.tempKey]
      },
      handleImageUpdated(value) {
        this.courseList[this.tempKey].images.splice(value, 1)
      },
      deleteDisciplineFun(id, index) {
        if (this.courseList.length > 1) {
          this.tempKey = index > 0 ? index - 1 : index + 1
          this.discipline = this.courseList[this.tempKey].discipline
        } else {
          this.tempKey = 0
          this.discipline = ''
        }
        if (id) {
          this.deleteDiscipline({
            data: {
              _id: id,
            },
            callback: (res) => {
              if (res) {
                this.getDisciplineListFun('delete')
              }
            },
          })
        } else {
          this.courseList.splice(index, 1)
        }
      },
      handleDepartmentChange(value) {
        this.department = this.departmentList[value].value
        this.getDisciplineListFun('init')
      },
      openAddCourse() {
        this.tempId = null
        this.discipline = ''
        this.showAddModal = true
      },
      editDiscipline(index, discipline) {
        this.discipline = discipline
        this.tempId = this.courseList[index]._id
        this.showAddModal = true
        this.changeItem(index, discipline)
      },
      closeCourse() {
        this.showAddModal = false
      },
      addCourse() {
        let data = null
        if (this.tempId) {
          data = {
            _id: this.tempId,
            department: this.department,
            discipline: this.discipline,
          }
        } else {
          data = {
            department: this.department,
            discipline: this.discipline,
          }
        }
        this.saveDiscipline({
          data: data,
          callback: (res) => {
            if (res && res.code === 0) {
              this.$message.success(this.tempId ? '修改成功。' : '添加成功。')
              this.getDisciplineListFun('add')
            }
            this.closeCourse()
          },
        })
      },
      addNewImage() {
        const element = {
          url: '',
          comment: '',
        }
        this.courseList[this.tempKey].images.push(element)
      },
      submitNews() {
        this.saveDiscipline({
          data: this.courseList[this.tempKey],
          callback: (res) => {
            if (res) {
              this.$message.success('提交成功。')
              this.getDisciplineListFun()
            }
          },
        })
      },
      getDisciplineListFun(anchor) {
        this.getDisciplineList({
          department: this.department,
          callback: (res) => {
            if (
              res.data &&
              typeof res.data.length === 'number' &&
              res.data.length !== 0
            ) {
              this.courseList = res.data
              switch (anchor) {
                case 'add':
                  this.tempKey = this.courseList.length - 1
                  break
                case 'delete':
                  break
                default:
                  this.tempKey = 0
                  break
              }
              this.discipline = this.courseList[this.tempKey].discipline
              this.tempObject = this.courseList[this.tempKey]
              this.changeItem(this.tempKey, this.discipline)
            } else {
              this.initMemberList()
            }
          },
        })
      },
    },
    mounted() {
      this.initMemberList()
      this.getDisciplineListFun('init')
    },
  }
</script>
<style lang="less" scoped>
  .department-select {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  .news-container {
    display: flex;
    .news-nav {
      width: 200px;
      margin-right: 10px;
      .side-element {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        font-size: 18px;
        padding: 5px;
      }
    }
    .news-side {
      padding: 0 30px;
      flex: 1;
      .news-main-input {
        margin-bottom: 40px;
        font-size: 18px;
        div {
          margin-bottom: 10px;
        }
      }
      .image-title {
        font-size: 26px;
        font-weight: bold;
      }
    }
    .news-card-list-container {
      margin-top: 50px;
    }
  }
  .add-new {
    text-align: center;
  }
  .delete-date {
    margin-left: 20px;
    cursor: pointer;
  }
  .active {
    box-shadow: 4px 5px 10px 0 lightgrey;
  }
  .main-title {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .spin {
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .news-title {
    width: auto;
    padding-right: 10px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;
  }
  .news-title:hover {
    color: #1890ff;
  }
</style>
