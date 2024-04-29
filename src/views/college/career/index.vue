<template>
  <div class="career-container">
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
    <div class="department-select">
      <div class="department-title">类目选择：</div>
      <a-radio-group name="radioGroup" :default-value="1">
        <a-radio
          v-for="(item, index) in categoryList"
          v-bind:key="index"
          :value="item.value"
          @change="handleCategoryChanged"
        >
          {{ item.label }}
        </a-radio>
      </a-radio-group>
    </div>
    <div class="example" v-if="loading">
      <a-spin />
    </div>
    <div v-else>
      <div
        class="card-list-container"
        v-for="(item, index) in careerList"
        v-bind:key="index"
      >
        <row-card
          :careerDetail="item"
          :index="index"
          @update="getCareersListFun"
        ></row-card>
      </div>
      <div class="add-new">
        <a-button style="margin-right: 10px" @click="addNew" type="primary">
          <PlusOutlined />
          添加
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import RowCard from './component/row-card.vue'
  import { PlusOutlined } from '@ant-design/icons-vue'
  import { listData } from '../../../utils/gereral-list'
  export default {
    name: 'career',
    components: {
      RowCard,
      PlusOutlined,
    },
    data() {
      return {
        department: 'architecture',
        category: 1,
        careerList: [],
        loading: false,
        departmentList: listData.departmentList,
        categoryList: [
          {
            label: '留学方式',
            value: 1,
          },
          {
            label: '择校',
            value: 2,
          },
          {
            label: '备考',
            value: 3,
          },
          {
            label: '留学生活分享',
            value: 4,
          },
        ],
      }
    },
    methods: {
      ...mapActions({
        getCareersList: 'college/getCareersList',
      }),
      initCareersList() {
        this.careerList = []
        const element = {
          department: this.department,
          category: this.category,
          title: '',
          description: '',
          link: '',
          weight: 0,
        }
        this.careerList.push(element)
      },
      handleDepartmentChange(value) {
        this.department = this.departmentList[value].value
        this.getCareersListFun()
      },
      handleCategoryChanged(e) {
        this.category = e.target.value
        this.getCareersListFun()
      },
      addNew() {
        const element = {
          department: this.department,
          category: this.category,
          title: '',
          description: '',
          link: '',
          weight: 0,
        }
        this.careerList.push(element)
      },
      getCareersListFun(value) {
        this.loading = true
        if (value) {
          this.careerList.splice(value, 1)
          this.loading = false
        } else {
          this.getCareersList({
            query: {
              department: this.department,
              category: this.category,
            },
            callback: (res) => {
              if (
                res.data &&
                typeof res.data.length === 'number' &&
                res.data.length !== 0
              ) {
                this.careerList = res.data
                this.loading = false
              } else {
                this.loading = false
                this.initCareersList()
              }
            },
          })
        }
      },
    },
    mounted() {
      this.getCareersListFun()
    },
  }
</script>
<style lang="less" scoped>
  .career-container {
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
