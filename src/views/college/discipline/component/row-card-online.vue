<template>
  <div class="card-container" v-if="onlineListDetailCard">
    <div class="card-image">
      <div>视频封面：</div>
      <image-upload
        v-bind:value="onlineListDetailCard.image_url"
        @fileUploaded="handleFileUpload"
      ></image-upload>
    </div>
    <div class="card-text">
      <div class="card-input">
        <div style="width: 109px">标题：</div>
        <a-input v-model:value="onlineListDetailCard.title"></a-input>
      </div>
      <div class="card-input">
        <div style="width: 109px">链接：</div>
        <a-input v-model:value="onlineListDetailCard.link"></a-input>
      </div>
      <div class="card-input">
        <div style="width: 93px">权重：</div>
        <a-input-number
          v-model:value="onlineListDetailCard.weight"
        ></a-input-number>
      </div>
    </div>
  </div>
  <div class="btn-group">
    <a-button
      style="margin-right: 10px"
      @click="saveOnline(cardIndex)"
      type="primary"
    >
      保存
    </a-button>
    <a-popconfirm title="确定删除吗？" @confirm="() => deleteOnline(cardIndex)">
      <a-button type="danger">删除</a-button>
    </a-popconfirm>
  </div>
</template>

<script>
  import ImageUpload from '../../../../components/image-upload.vue'
  export default {
    name: 'RowCardOnline',
    props: {
      onlineListDetail: {
        type: Object,
      },
      cardIndex: {
        type: Number,
      },
    },
    components: { ImageUpload },
    data() {
      return {
        onlineListDetailCard: {
          title: '',
          weight: 0,
          link: '',
          image_url: '',
        },
      }
    },
    methods: {
      saveOnline(cardIndex) {
        this.$emit('callSave', {
          cardIndex: cardIndex,
          onlineItem: this.onlineListDetailCard,
        })
      },
      handleFileUpload(e) {
        this.onlineListDetailCard.image_url =
          'https://www.group-je.com/file/' + e
      },
      deleteOnline(cardIndex) {
        this.$emit('callSave', { cardIndex: cardIndex })
      },
    },
    watch: {
      onlineListDetail: {
        handler(newVal) {
          if (newVal) {
            this.onlineListDetailCard = JSON.parse(JSON.stringify(newVal))
          }
        },
        deep: true,
        immediate: true,
      },
    },
    mounted() {
      this.onlineListDetailCard = JSON.parse(
        JSON.stringify(this.onlineListDetail)
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
    text-align: right;
  }
</style>
