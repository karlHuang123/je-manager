<template>
  <div class="raise-container">
    <div class="select-group">
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
      <div class="department-select" v-if="courseList.length !== 0">
        <div class="department-title">课程选择：</div>
        <a-select
          :defaultValue="0"
          v-model:value="discipline"
          style="width: 160px"
          @change="handleCourseChange"
        >
          <a-select-option
            v-for="(item, index) in courseList"
            v-bind:key="index"
          >
            {{ item.discipline }}
          </a-select-option>
        </a-select>
      </div>
    </div>
    <div
      class="card-list-container"
      v-for="(item, index) in raiseList"
      v-bind:key="index"
    >
      <row-card
        :raiseDetail="item"
        :index="index"
        @update="getRaiseListFun"
      ></row-card>
    </div>
    <div class="add-new">
      <a-button style="margin-right: 10px" @click="addNew" type="primary">
        <PlusOutlined />
        添加
      </a-button>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import RowCard from './component/row-card.vue'
  import { PlusOutlined } from '@ant-design/icons-vue'
  import { listData } from '../../../utils/gereral-list'
  export default {
    name: 'Raise',
    components: {
      RowCard,
      PlusOutlined,
    },
    data() {
      return {
        department: 'architecture',
        discipline: '',
        raiseList: [],
        courseList: [],
        departmentList: listData.departmentList,
      }
    },
    methods: {
      ...mapActions({
        getDisciplineList: 'college/getDisciplineList',
        getRaiseList: 'college/getRaiseList',
      }),
      initRaiseList() {
        this.raiseList = []
        const element = {
          department: this.department,
          discipline: this.discipline,
          college_name: '',
          link: '',
          image_url: '',
          weight: 0,
          showDiscipline: false,
        }
        this.raiseList.push(element)
      },
      handleDepartmentChange(value) {
        this.department = this.departmentList[value].value
        this.getDisciplineListFun()
      },
      handleCourseChange(value) {
        this.discipline = this.courseList[value].discipline
        this.getRaiseListFun()
      },
      addNew() {
        const element = {
          department: this.department,
          discipline: this.discipline,
          college_name: '',
          link: '',
          image_url: '',
          weight: 0,
        }
        this.raiseList.push(element)
      },
      getDisciplineListFun() {
        this.showDiscipline = false
        this.getDisciplineList({
          department: this.department,
          callback: (res) => {
            if (
              res.data &&
              typeof res.data.length === 'number' &&
              res.data.length !== 0
            ) {
              this.courseList = res.data
              this.discipline = this.courseList[0].discipline
              this.showDiscipline = true
              this.getRaiseListFun()
            }
          },
        })
      },
      getRaiseListFun(value) {
        if (value) {
          this.raiseList.splice(value, 1)
        } else {
          this.getRaiseList({
            department: this.department,
            callback: (res) => {
              if (res.data && JSON.stringify(res.data) !== '{}') {
                if (res.data[this.discipline]) {
                  this.raiseList = res.data[this.discipline]
                } else {
                  this.initRaiseList()
                }
              } else {
                this.initRaiseList()
              }
            },
          })
        }
      },
    },
    mounted() {
      this.getDisciplineListFun()
    },
  }
</script>
<style lang="less" scoped>
  .raise-container {
    .department-select {
      display: flex;
      align-items: center;
      margin-right: 20px;
    }
    .card-list-container {
      padding: 20px;
    }
  }
  .add-new {
    text-align: center;
  }
  .select-group {
    display: flex;
  }
</style>
