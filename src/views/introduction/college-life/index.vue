<template>
  <div class="life-container">
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
      v-for="(item, index) in lifeList"
      v-bind:key="index"
    >
      <row-card
        :lifeDetail="item"
        :index="index"
        @update="getLifeListFun"
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
    name: 'CollegeLife',
    components: {
      RowCard,
      PlusOutlined,
    },
    data() {
      return {
        department: 'architecture',
        lifeList: [],
        departmentList: listData.departmentList,
      }
    },
    methods: {
      ...mapActions({
        getLifeList: 'introduction/getLifeList',
      }),
      initLifeList() {
        this.lifeList = []
        const element = {
          department: this.department,
          name: '',
          description: '',
          image_url: '',
          weight: 0,
        }
        this.lifeList.push(element)
      },
      handleDepartmentChange(value) {
        this.department = this.departmentList[value].value
        this.getLifeListFun()
      },
      addNew() {
        const element = {
          department: this.department,
          name: '',
          description: '',
          image_url: '',
          weight: 0,
        }
        this.lifeList.push(element)
      },
      getLifeListFun(value) {
        if (value) {
          this.lifeList.splice(value, 1)
        } else {
          this.getLifeList({
            department: this.department,
            callback: (res) => {
              if (
                res.data &&
                typeof res.data.length === 'number' &&
                res.data.length !== 0
              ) {
                this.lifeList = res.data
              } else {
                this.initLifeList()
              }
            },
          })
        }
      },
    },
    mounted() {
      this.initLifeList()
      this.getLifeListFun()
    },
  }
</script>
<style lang="less" scoped>
  .life-container {
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
