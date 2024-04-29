<template>
  <div class="card-container">
    <div class="card-text">
      <div class="card-input">
        <div style="width: 120px">Q:</div>
        <a-input v-model:value="databaseQADetailCard.q"></a-input>
      </div>
      <div class="card-input">
        <div style="width: 120px">A:</div>
        <a-textarea v-model:value="databaseQADetailCard.a"></a-textarea>
      </div>
      <div class="card-input">
        <div style="width: 109px">权重：</div>
        <a-input-number
          v-model:value="databaseQADetailCard.weight"
        ></a-input-number>
      </div>
    </div>
  </div>
  <div class="btn-group">
    <a-button
      style="margin-right: 10px"
      @click="saveDataBaseQaFun"
      type="primary"
    >
      提交
    </a-button>
    <a-popconfirm
      title="确定删除吗？"
      @confirm="() => deleteDataBaseQaFun(databaseQADetailCard._id)"
    >
      <a-button type="danger">删除</a-button>
    </a-popconfirm>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    name: 'RowCardQA',
    props: {
      databaseQADetail: {
        type: Object,
      },
      index: {
        type: Number,
      },
    },
    components: {},
    data() {
      return {
        databaseQADetailCard: {
          department: '',
          name: '',
          description: '',
          avatar: '',
          weight: 0,
        },
      }
    },
    methods: {
      ...mapActions({
        saveDataBaseQa: 'college/saveDataBaseQa',
        deleteDataBaseQa: 'college/deleteDataBaseQa',
      }),
      saveDataBaseQaFun() {
        this.saveDataBaseQa({
          data: this.databaseQADetailCard,
          callback: (res) => {
            if (res) {
              this.$message.success('提交成功。')
              this.$emit('update')
            }
          },
        })
      },
      deleteDataBaseQaFun(id) {
        if (id) {
          this.deleteDataBaseQa({
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
      handleFileUpload(e) {
        this.databaseQADetailCard.avatar = e
      },
    },
    watch: {
      databaseQADetail: {
        handler(newVal) {
          if (newVal) {
            this.databaseQADetailCard = JSON.parse(JSON.stringify(newVal))
          }
        },
        deep: true,
        immediate: true,
      },
    },
    mounted() {
      this.databaseQADetailCard = JSON.parse(
        JSON.stringify(this.databaseQADetail)
      )
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
    margin-left: 110px;
  }
</style>
