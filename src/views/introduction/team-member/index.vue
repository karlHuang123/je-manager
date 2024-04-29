<template>
  <div class="member-container">
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
      v-for="(item, index) in memberList"
      v-bind:key="index"
    >
      <row-card
        :memberDetail="item"
        :index="index"
        :department="department"
        @update="getMemberListFun"
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
    name: 'TeamMember',
    components: {
      RowCard,
      PlusOutlined,
    },
    data() {
      return {
        department: 'architecture',
        memberList: [],
        departmentList: listData.departmentList,
      }
    },
    methods: {
      ...mapActions({
        getMemberList: 'introduction/getMemberList',
      }),
      initMemberList() {
        this.memberList = []
        const element = {
          department: this.department,
          name: '',
          description: '',
          avatar: '',
          weight: 0,
          tag: [],
        }
        this.memberList.push(element)
      },
      handleDepartmentChange(value) {
        this.department = this.departmentList[value].value
        this.getMemberListFun()
      },
      addNew() {
        const element = {
          department: this.department,
          name: '',
          description: '',
          avatar: '',
          weight: 0,
          tag: [],
        }
        this.memberList.push(element)
      },
      getMemberListFun(value, tag = []) {
        if (value) {
          this.memberList.splice(value, 1)
        } else {
          this.getMemberList({
            data: {
              department: this.department,
              tags: tag,
            },
            callback: (res) => {
              if (
                res.data &&
                typeof res.data.length === 'number' &&
                res.data.length !== 0
              ) {
                this.memberList = res.data
              } else {
                this.initMemberList()
              }
            },
          })
        }
      },
    },
    mounted() {
      this.initMemberList()
      this.getMemberListFun()
    },
  }
</script>
<style lang="less" scoped>
  .member-container {
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
