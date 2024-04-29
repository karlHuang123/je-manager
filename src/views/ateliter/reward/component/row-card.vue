<template>
  <div class="card-container">
    <div class="card-text">
      <div class="card-input">
        <div style="width: 120px">时间：</div>
        <a-input v-model:value="rewardDetailCard.time"></a-input>
      </div>
      <div class="card-input">
        <div style="width: 120px">奖项名称：</div>
        <a-input v-model:value="rewardDetailCard.tag"></a-input>
      </div>
      <div class="card-input">
        <div style="width: 120px">奖项描述：</div>
        <a-textarea v-model:value="rewardDetailCard.description"></a-textarea>
      </div>
    </div>
  </div>
  <div class="btn-group">
    <a-button style="margin-right: 10px" @click="saveRewardFun" type="primary">
      提交
    </a-button>
    <a-popconfirm
      title="确定删除吗？"
      @confirm="() => deleteRewardFun(rewardDetailCard._id)"
    >
      <a-button type="danger">删除</a-button>
    </a-popconfirm>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    name: 'RowCardReward',
    props: {
      rewardDetail: {
        type: Object,
      },
      index: {
        type: Number,
      },
    },
    components: {},
    data() {
      return {
        rewardDetailCard: {
          time: '',
          description: '',
        },
      }
    },
    methods: {
      ...mapActions({
        saveReward: 'ateliter/saveReward',
        deleteReward: 'ateliter/deleteReward',
      }),
      saveRewardFun() {
        this.saveReward({
          data: this.rewardDetailCard,
          callback: (res) => {
            if (res) {
              this.$message.success('提交成功。')
              this.$emit('update')
            }
          },
        })
      },
      deleteRewardFun(id) {
        if (id) {
          this.deleteReward({
            data: {
              _id: id,
            },
            callback: (res) => {
              if (res) {
                this.$message.success('删除成功。')
                this.$emit('update')
              }
            },
          })
        } else {
          this.$emit('update', this.index)
          this.$message.success('删除成功')
        }
      },
    },
    watch: {
      rewardDetail: {
        handler(newVal) {
          if (newVal) {
            this.rewardDetailCard = JSON.parse(JSON.stringify(newVal))
          }
        },
        deep: true,
        immediate: true,
      },
    },
    mounted() {
      this.rewardDetailCard = JSON.parse(JSON.stringify(this.rewardDetail))
    },
  }
</script>
<style lang="less" scoped>
  .card-container {
    display: flex;
    align-items: center;
    .card-image {
      width: 120px;
    }
    .card-text {
      flex: 1;
      margin-left: auto;
      .card-input {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
      }
    }
  }
  .btn-group {
    margin-top: 20px;
    margin-left: 120px;
  }
</style>
