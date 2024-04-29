<template>
  <div class="card-container">
    <div class="card-image">
      <image-upload
        v-bind:value="
          raiseDetail.image_url
            ? 'https://www.group-je.com/file/' + raiseDetail.image_url
            : ''
        "
        @fileUploaded="handleFileUpload"
      ></image-upload>
    </div>
    <div class="card-text">
      <div class="card-input">
        <div style="width: 120px">学校名称：</div>
        <a-input v-model:value="raiseDetailCard.college_name"></a-input>
      </div>
      <div class="card-input">
        <div style="width: 120px">链接：</div>
        <a-input v-model:value="raiseDetailCard.link"></a-input>
      </div>
      <div class="card-input">
        <div style="width: 109px">权重：</div>
        <a-input-number v-model:value="raiseDetailCard.weight"></a-input-number>
      </div>
    </div>
  </div>
  <div class="btn-group">
    <a-button style="margin-right: 10px" @click="saveRaiseFun" type="primary">
      提交
    </a-button>
    <a-popconfirm
      title="确定删除吗？"
      @confirm="() => deleteRaiseFun(raiseDetailCard._id)"
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
      raiseDetail: {
        type: Object,
      },
      index: {
        type: Number,
      },
    },
    components: { ImageUpload },
    data() {
      return {
        raiseDetailCard: {
          department: '',
          discipline: '',
          college_name: '',
          link: '',
          image_url: '',
          weight: 0,
          category: 1,
        },
      }
    },
    methods: {
      ...mapActions({
        saveRaise: 'college/saveRaise',
        deleteRaise: 'college/deleteRaise',
      }),
      saveRaiseFun() {
        this.saveRaise({
          data: this.raiseDetailCard,
          callback: (res) => {
            if (res) {
              this.$message.success('提交成功。')
              this.$emit('update')
            }
          },
        })
      },
      deleteRaiseFun(id) {
        if (id) {
          this.deleteRaise({
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
        this.raiseDetailCard.image_url = e
      },
    },
    watch: {
      raiseDetail: {
        handler(newVal) {
          if (newVal) {
            this.raiseDetailCard = JSON.parse(JSON.stringify(newVal))
          }
        },
        deep: true,
        immediate: true,
      },
    },
    mounted() {
      this.raiseDetailCard = JSON.parse(JSON.stringify(this.raiseDetail))
      console.log(this.raiseDetailCard)
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
