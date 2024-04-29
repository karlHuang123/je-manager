<template>
  <div class="card-container">
    <div class="card-text">
      <div class="card-input">
        <div style="width: 120px">标题:</div>
        <a-input v-model:value="applyDetailCard.title"></a-input>
      </div>
      <div class="card-input">
        <div style="width: 120px">内容:</div>
        <a-textarea
          v-model:value="applyDetailCard.context"
          rows="3"
        ></a-textarea>
      </div>
    </div>
  </div>
  <div class="btn-group">
    <a-button style="margin-right: 10px" @click="saveOnline" type="primary">
      提交
    </a-button>
    <a-popconfirm
      title="确定删除吗？"
      @confirm="() => deleteOnline(applyDetailCard._id)"
    >
      <a-button type="danger">删除</a-button>
    </a-popconfirm>
  </div>
</template>

<script>
  export default {
    name: 'RowCardApply',
    props: {
      applyDetail: {
        type: Object,
      },
      cardIndex: {
        type: Number,
      },
    },
    components: {},
    data() {
      return {
        applyDetailCard: {
          title: '',
          context: '',
        },
      }
    },
    methods: {
      saveOnline() {
        this.$emit('callSave', {
          cardIndex: this.cardIndex,
          applyItem: this.applyDetailCard,
        })
      },
      deleteOnline() {
        this.$emit('callSave', { cardIndex: this.cardIndex })
      },
    },
    watch: {
      applyDetail: {
        handler(newVal) {
          if (newVal) {
            this.applyDetailCard = JSON.parse(JSON.stringify(newVal))
          }
        },
        deep: true,
        immediate: true,
      },
    },
    mounted() {
      this.applyDetailCard = JSON.parse(JSON.stringify(this.applyDetail))
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
