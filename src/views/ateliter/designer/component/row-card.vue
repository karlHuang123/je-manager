<template>
  <div class="card-container">
    <div class="card-image">
      <image-upload
        v-bind:value="designerDetail.avatar"
        @fileUploaded="handleFileUpload"
      ></image-upload>
    </div>
    <div class="card-text">
      <div class="card-input">
        <div style="width: 120px">姓名：</div>
        <a-input v-model:value="designerDetailCard.name"></a-input>
      </div>
      <div class="card-input">
        <div style="width: 120px">头衔：</div>
        <a-input v-model:value="designerDetailCard.title"></a-input>
      </div>
      <div class="card-input">
        <div style="width: 120px">描述：</div>
        <a-textarea v-model:value="designerDetailCard.description"></a-textarea>
      </div>
    </div>
  </div>
  <div class="btn-group">
    <a-button
      style="margin-right: 10px"
      @click="saveDesignerFun"
      type="primary"
    >
      提交
    </a-button>
    <a-popconfirm
      title="确定删除吗？"
      @confirm="() => deleteDesignerFun(designerDetailCard._id)"
    >
      <a-button type="danger">删除</a-button>
    </a-popconfirm>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import ImageUpload from '../../../../components/image-upload.vue'
  export default {
    name: 'RowCardDesigner',
    props: {
      designerDetail: {
        type: Object,
      },
      index: {
        type: Number,
      },
    },
    components: { ImageUpload },
    data() {
      return {
        designerDetailCard: {
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
        saveDesigner: 'ateliter/saveDesigner',
        deleteDesigner: 'ateliter/deleteDesigner',
      }),
      saveDesignerFun() {
        this.saveDesigner({
          data: this.designerDetailCard,
          callback: (res) => {
            if (res) {
              this.$message.success('提交成功。')
              this.$emit('update')
            }
          },
        })
      },
      deleteDesignerFun(id) {
        if (id) {
          this.deleteDesigner({
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
        this.designerDetailCard.avatar = e
      },
    },
    watch: {
      designerDetail: {
        handler(newVal) {
          if (newVal) {
            this.designerDetailCard = JSON.parse(JSON.stringify(newVal))
          }
        },
        deep: true,
        immediate: true,
      },
    },
    mounted() {
      this.designerDetailCard = JSON.parse(JSON.stringify(this.designerDetail))
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
