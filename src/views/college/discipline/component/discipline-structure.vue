<template>
  <div class="courseStructure-container">
    <div class="main-title">课程架构</div>
    <div class="example" v-if="loading">
      <a-spin />
    </div>
    <div v-else>
      <div
        class="card-list-container"
        v-for="(item, index) in courseStructure"
        v-bind:key="index"
      >
        <row-card-structure
          :courseStructureDetail="item"
          :cardIndex="index"
          @callSave="handleCallSave"
        ></row-card-structure>
      </div>
      <div class="add-new">
        <a-button style="margin-right: 10px" @click="addNew" type="primary">
          <PlusOutlined />
          添加课程
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import RowCardStructure from './row-card-structure.vue'
  import { PlusOutlined } from '@ant-design/icons-vue'
  export default {
    name: 'DisciplineStructure',
    components: {
      RowCardStructure,
      PlusOutlined,
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
      }
    },
    methods: {
      ...mapActions({
        getCourseStructure: 'college/getCourseStructure',
        saveCourseStructure: 'college/saveCourseStructure',
      }),
      initCourseStructure() {
        this.courseStructure = []
        const element = {
          course_name: '',
          weight: 0,
          items: [
            {
              majorCourse: '',
            },
          ],
        }
        this.courseStructure.push(element)
      },
      addNew() {
        const element = {
          course_name: '',
          weight: 0,
          items: [
            {
              majorCourse: '',
            },
          ],
        }
        this.courseStructure.push(element)
      },
      handleCallSave(value) {
        if (value.courseItem) {
          this.courseStructure[value.cardIndex] = value.courseItem
          this.saveCourseStructureFun()
        } else {
          if (this.courseStructure.length > 1) {
            this.courseStructure.splice(value.cardIndex, 1)
            this.saveCourseStructureFun()
          } else {
            this.$message.error('至少保留一门课程。')
          }
        }
      },
      saveCourseStructureFun() {
        this.saveCourseStructure({
          data: {
            department: this.department,
            discipline: this.discipline,
            structures: this.courseStructure,
          },
          callback: (res) => {
            if (res) {
              this.$message.success('修改成功。')
              this.getCourseStructureFun()
            }
          },
        })
      },
      getCourseStructureFun(value) {
        this.loading = true
        if (value) {
          this.courseStructure.splice(value, 1)
          this.loading = false
        } else {
          this.getCourseStructure({
            query: {
              department: this.department,
              discipline: this.discipline,
            },
            callback: (res) => {
              if (
                res.data &&
                typeof res.data.length === 'number' &&
                res.data.length !== 0
              ) {
                this.courseStructure = res.data
                this.loading = false
              } else {
                this.loading = false
                this.initCourseStructure()
              }
            },
          })
        }
      },
    },
    mounted() {
      this.getCourseStructureFun()
    },
  }
</script>
<style lang="less" scoped>
  .courseStructure-container {
    .department-select {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      font-size: 16px;
      font-weight: bold;
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
