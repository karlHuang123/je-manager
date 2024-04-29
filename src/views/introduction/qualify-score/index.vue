<template>
  <div class="qualifyScore-container">
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
    <div
      class="card-list-container"
      v-for="(item, index) in qualifyScoreList"
      v-bind:key="index"
    >
      <row-card
        :qualifyScoreDetail="item"
        :index="index"
        @update="getQualifyScoreListFun"
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
    name: 'QualifyScore',
    components: {
      RowCard,
      PlusOutlined,
    },
    data() {
      return {
        department: 'architecture',
        qualifyScoreList: [],
        departmentList: listData.departmentList,
      }
    },
    methods: {
      ...mapActions({
        getQualifyScoreList: 'introduction/getQualifyScoreList',
      }),
      initQualifyScoreList() {
        this.qualifyScoreList = []
        const element = {
          department: this.department,
          name: '',
          description: '',
          image_url: '',
          weight: 0,
          year: '',
        }
        this.qualifyScoreList.push(element)
      },
      handleDepartmentChange(value) {
        this.department = this.departmentList[value].value
        this.getQualifyScoreListFun()
      },
      addNew() {
        const element = {
          department: this.department,
          name: '',
          description: '',
          image_url: '',
          weight: 0,
          year: '',
        }
        this.qualifyScoreList.push(element)
      },
      getQualifyScoreListFun(value) {
        if (value) {
          this.qualifyScoreList.splice(value, 1)
        } else {
          this.getQualifyScoreList({
            department: this.department,
            callback: (res) => {
              if (
                res.data &&
                typeof res.data.length === 'number' &&
                res.data.length !== 0
              ) {
                this.qualifyScoreList = res.data
              } else {
                this.initQualifyScoreList()
              }
            },
          })
        }
      },
    },
    mounted() {
      this.initQualifyScoreList()
      this.getQualifyScoreListFun()
    },
  }
</script>
<style lang="less" scoped>
  .qualifyScore-container {
    .department-select {
      display: flex;
      align-items: center;
    }
    .card-list-container {
      padding: 20px;
    }
  }
  .add-new {
    text-align: center;
  }
</style>
