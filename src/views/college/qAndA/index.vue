<template>
  <div class="databaseQA-container">
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
    <div class="example" v-if="loading">
      <a-spin />
    </div>
    <div v-else>
      <div
        class="card-list-container"
        v-for="(item, index) in databaseQAList"
        v-bind:key="index"
      >
        <row-card
          :databaseQADetail="item"
          :index="index"
          @update="getDataBaseQaListFun"
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
    name: 'databaseQA',
    components: {
      RowCard,
      PlusOutlined,
    },
    data() {
      return {
        department: 'architecture',
        databaseQAList: [],
        loading: false,
        departmentList: listData.departmentList,
      }
    },
    methods: {
      ...mapActions({
        getDataBaseQaList: 'college/getDataBaseQaList',
      }),
      initDataBaseQaList() {
        this.databaseQAList = []
        const element = {
          department: this.department,
          title: '',
          description: '',
          link: '',
          weight: 0,
        }
        this.databaseQAList.push(element)
      },
      handleDepartmentChange(value) {
        this.department = this.departmentList[value].value
        this.getDataBaseQaListFun()
      },
      addNew() {
        const element = {
          department: this.department,
          title: '',
          description: '',
          link: '',
          weight: 0,
        }
        this.databaseQAList.push(element)
      },
      getDataBaseQaListFun(value) {
        this.loading = true
        if (value) {
          this.databaseQAList.splice(value, 1)
          this.loading = false
        } else {
          this.getDataBaseQaList({
            department: this.department,
            callback: (res) => {
              if (
                res.data &&
                typeof res.data.length === 'number' &&
                res.data.length !== 0
              ) {
                this.databaseQAList = res.data
                this.loading = false
              } else {
                this.loading = false
                this.initDataBaseQaList()
              }
            },
          })
        }
      },
    },
    mounted() {
      this.getDataBaseQaListFun()
    },
  }
</script>
<style lang="less" scoped>
  .databaseQA-container {
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
