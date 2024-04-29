<template>
  <div class="designer-container">
    <div
      class="card-list-container"
      v-for="(item, index) in rewardList"
      v-bind:key="index"
    >
      <row-card
        :rewardDetail="item"
        :index="index"
        @update="getRewardListFun"
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
  import { PlusOutlined } from '@ant-design/icons-vue'
  import RowCard from './component/row-card.vue'
  export default {
    name: 'Reward',
    components: { PlusOutlined, RowCard },
    data() {
      return {
        rewardList: [],
      }
    },
    methods: {
      ...mapActions({
        getRewardList: 'ateliter/getRewardList',
      }),
      initRewardList() {
        this.rewardList = []
        const element = {
          time: '',
          description: '',
          tag: '',
        }
        this.rewardList.push(element)
      },
      addNew() {
        const element = {
          time: '',
          description: '',
          tag: '',
        }
        this.rewardList.push(element)
      },
      getRewardListFun() {
        this.getRewardList({
          callback: (res) => {
            if (
              res.data &&
              typeof res.data.length === 'number' &&
              res.data.length !== 0
            ) {
              this.rewardList = res.data
            } else {
              this.initRewardList()
            }
          },
        })
      },
    },
    mounted() {
      this.getRewardListFun()
    },
  }
</script>
<style lang="less" scoped>
  .designer-container {
    .designer-list-title {
      font-size: 28px;
      font-size: bold;
      margin-bottom: 20px;
    }
    .card-list-container {
      margin-top: 10px;
    }
  }
  .add-new {
    text-align: center;
  }
</style>
