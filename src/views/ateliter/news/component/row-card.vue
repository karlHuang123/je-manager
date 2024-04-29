<template>
  <div class="card-container">
    <div class="card-image">
      <image-upload
        v-bind:value="newsDetailCard.url"
        @fileUploaded="handleFileUpload"
      ></image-upload>
    </div>
    <div class="card-text">
      <div class="card-input">
        <div style="width: 120px">注释：</div>
        <a-input
          v-model:value="newsDetailCard.comment"
          @change="handleCommentChanged"
          :disabled="index === 0"
        ></a-input>
      </div>
      <div class="btn-group">
        <a-popconfirm title="确定删除吗？" @confirm="deleteImage">
          <a-button type="danger">删除</a-button>
        </a-popconfirm>
      </div>
    </div>
  </div>
</template>

<script>
  import ImageUpload from '../../../../components/image-upload.vue'
  export default {
    name: 'RowCardNews',
    props: {
      newsDetail: {
        type: Object,
      },
      index: {
        type: Number,
      },
    },
    components: { ImageUpload },
    data() {
      return {
        newsDetailCard: {
          url: '',
          comment: '',
        },
      }
    },
    methods: {
      handleCommentChanged() {
        this.$emit('changed', { image: this.newsDetailCard, index: this.index })
      },
      handleFileUpload(e) {
        this.newsDetailCard.url = 'https://www.group-je.com/file/' + e
        this.$emit('changed', { image: this.newsDetailCard, index: this.index })
      },
      deleteImage() {
        this.$emit('updateImage', this.index)
      },
    },
    watch: {
      newsDetail: {
        handler(newVal) {
          if (newVal) {
            this.newsDetailCard = JSON.parse(JSON.stringify(newVal))
          }
        },
        deep: true,
        immediate: true,
      },
    },
    mounted() {
      this.newsDetailCard = JSON.parse(JSON.stringify(this.newsDetail))
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
    text-align: right;
  }
</style>
