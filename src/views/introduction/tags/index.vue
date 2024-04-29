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
    <div class="add-new">
      <label for="">标签名称：</label>
      <a-input
        style="width: 120px; margin-left: 10px"
        v-model:value="inputTag"
      ></a-input>
      <a-button style="margin-left: 10px" @click="addNewTag" type="primary">
        <PlusOutlined />
        保存标签
      </a-button>
    </div>
    <div class="tag-list">
      <div class="tag-ele" v-for="(item, index) in memberTagList" :key="index">
        <span>{{ item.name }}</span>
        <a-popconfirm
          title="确定删除吗？"
          @confirm="() => deleteMemberTagFun(item.name)"
        >
          <i class="ri-delete-bin-2-line"></i>
        </a-popconfirm>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { PlusOutlined } from '@ant-design/icons-vue'
  import { listData } from '../../../utils/gereral-list'
  export default {
    name: 'TeamMember',
    components: {
      PlusOutlined,
    },
    data() {
      return {
        department: 'architecture',
        memberTagList: [],
        departmentList: listData.departmentList,
        inputTag: '',
      }
    },
    methods: {
      ...mapActions({
        getMemberTag: 'college/getTags',
        saveMemberTag: 'college/saveTag',
        deleteMemberTag: 'college/deleteTag',
      }),
      handleDepartmentChange(value) {
        this.department = this.departmentList[value].value
        this.getMemberTagListFun()
      },
      addNewTag() {
        const temp = this.memberTagList.filter((item) => {
          return item.name === this.inputTag.trim()
        })
        if (temp.length > 0) {
          this.$message.error(`“${this.inputTag}”标签已经存在`)
        } else {
          this.saveMemberTag({
            data: {
              department: this.department,
              name: this.inputTag.trim(),
            },
            callback: (res) => {
              if (res && res.code === 0) {
                this.$message.success('保存成功。')
                this.inputTag = ''
                this.getMemberTagListFun()
              }
            },
          })
        }
      },
      deleteMemberTagFun(name) {
        this.deleteMemberTag({
          data: {
            department: this.department,
            name: name,
          },
          callback: (res) => {
            if (res && res.code === 0) {
              this.$message.success('删除成功。')
              this.getMemberTagListFun()
            }
          },
        })
      },
      getMemberTagListFun() {
        this.getMemberTag({
          department: this.department,
          callback: (res) => {
            if (res && res.code === 0) {
              this.memberTagList = res.data || []
            }
          },
        })
      },
    },
    mounted() {
      this.getMemberTagListFun()
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
    display: flex;
    text-align: left;
    margin-top: 10px;
    align-items: center;
  }
  .tag-list {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    .tag-ele {
      display: flex;
      align-items: center;
      border: 1px solid black;
      border-radius: 4px;
      padding: 2px 4px;
      margin: 10px 10px 0 0;
      i {
        cursor: pointer;
        margin-left: 10px;
      }
    }
  }
</style>
