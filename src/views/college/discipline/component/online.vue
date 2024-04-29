<template>
  <div class="onlineList-container">
    <div class="main-title">线上试听</div>
    <div class="example" v-if="loading">
      <a-spin />
    </div>
    <div v-else>
      <div
        class="card-list-container"
        v-for="(item, index) in onlineList"
        v-bind:key="index"
      >
        <row-card-online
          :onlineListDetail="item"
          :cardIndex="index"
          @callSave="handleCallSave"
        ></row-card-online>
      </div>
      <div class="add-new">
        <a-button style="margin-right: 10px" @click="addNew" type="primary">
          <PlusOutlined />
          添加视频
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import RowCardOnline from './row-card-online.vue'
  import { PlusOutlined } from '@ant-design/icons-vue'
  export default {
    name: 'Online',
    components: {
      RowCardOnline,
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
        onlineList: [],
      }
    },
    methods: {
      ...mapActions({
        getOnlineList: 'college/getOnlineList',
        saveOnlineList: 'college/saveOnlineList',
      }),
      initOnlineList() {
        this.onlineList = []
        const element = {
          title: '',
          weight: 0,
          link: '',
          image_url: '',
        }
        this.onlineList.push(element)
      },
      addNew() {
        const element = {
          title: '',
          weight: 0,
          link: '',
          image_url: '',
        }
        this.onlineList.push(element)
      },
      handleCallSave(value) {
        if (value.onlineItem) {
          this.onlineList[value.cardIndex] = value.onlineItem
          this.saveOnlineListFun()
        } else {
          this.onlineList.splice(value.cardIndex, 1)
          this.saveOnlineListFun()
        }
      },
      saveOnlineListFun() {
        this.saveOnlineList({
          data: {
            department: this.department,
            discipline: this.discipline,
            online_experience: this.onlineList,
          },
          callback: (res) => {
            if (res) {
              this.$message.success('修改成功。')
              this.getOnlineListFun()
            }
          },
        })
      },
      getOnlineListFun(value) {
        this.loading = true
        if (value) {
          this.onlineList.splice(value, 1)
          this.loading = false
        } else {
          this.getOnlineList({
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
                this.onlineList = res.data
                this.loading = false
              } else {
                this.loading = false
                this.initOnlineList()
              }
            },
          })
        }
      },
    },
    mounted() {
      this.getOnlineListFun()
    },
  }
</script>
<style lang="less" scoped>
  .onlineList-container {
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
