<template>
  <div class="card-container">
    <div class="card-image">
      <image-upload
        v-bind:value="lifeDetail.image_url"
        @fileUploaded="handleFileUpload"
      ></image-upload>
    </div>
    <div class="card-text">
      <div class="card-input">
        <div style="width: 120px">描述：</div>
        <a-textarea v-model:value="lifeDetailCard.description"></a-textarea>
      </div>
    </div>
  </div>
  <div class="btn-group">
    <a-button style="margin-right: 10px" @click="saveLifeFun" type="primary">
      提交
    </a-button>
    <a-popconfirm
      title="确定删除吗？"
      @confirm="() => deleteLifeFun(lifeDetailCard._id)"
    >
      <a-button type="danger">删除</a-button>
    </a-popconfirm>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import ImageUpload from '../../../../components/image-upload.vue'
  export default {
    name: 'RowCard',
    props: {
      lifeDetail: {
        type: Object,
      },
      index: {
        type: Number,
      },
    },
    components: { ImageUpload },
    data() {
      return {
        lifeDetailCard: {
          department: '',
          description: '',
          image_url: '',
        },
      }
    },
    methods: {
      ...mapActions({
        saveLife: 'introduction/saveLife',
        deleteLife: 'introduction/deleteLife',
      }),
      saveLifeFun() {
        this.saveLife({
          data: this.lifeDetailCard,
          callback: (res) => {
            if (res) {
              this.$message.success('提交成功。')
              this.$emit('update')
            }
          },
        })
      },
      deleteLifeFun(id) {
        if (id) {
          this.deleteLife({
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
        this.lifeDetailCard.image_url = 'https://www.group-je.com/file/' + e
      },
    },
    watch: {
      lifeDetail: {
        handler(newVal) {
          if (newVal) {
            this.lifeDetailCard = JSON.parse(JSON.stringify(newVal))
          }
        },
        deep: true,
        immediate: true,
      },
    },
    mounted() {
      this.lifeDetailCard = JSON.parse(JSON.stringify(this.lifeDetail))
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
