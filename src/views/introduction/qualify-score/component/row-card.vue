<template>
  <div class="card-container">
    <div class="card-image">
      <image-upload
        v-bind:value="qualifyScoreDetail.image_url"
        @fileUploaded="handleFileUpload"
      ></image-upload>
    </div>
    <div class="card-text">
      <div class="card-input">
        <div style="width: 109px">学校：</div>
        <a-input
          style="width: 250px"
          v-model:value="qualifyScoreDetailCard.college"
        ></a-input>
      </div>
      <div class="card-input">
        <div style="width: 109px">时间：</div>
        <a-input
          style="width: 250px"
          v-model:value="qualifyScoreDetailCard.year"
        ></a-input>
      </div>
      <div class="card-input">
        <div style="width: 109px">人数：</div>
        <a-input-number
          v-model:value="qualifyScoreDetailCard.people_count"
        ></a-input-number>
      </div>
      <div class="card-input">
        <div style="width: 109px">权重：</div>
        <a-input-number
          v-model:value="qualifyScoreDetailCard.weight"
        ></a-input-number>
      </div>
    </div>
  </div>
  <div class="btn-group">
    <a-button
      style="margin-right: 10px"
      @click="saveQualifyScoreFun"
      type="primary"
    >
      提交
    </a-button>
    <a-popconfirm
      title="确定删除吗？"
      @confirm="() => deleteQualifyScoreFun(qualifyScoreDetailCard._id)"
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
      qualifyScoreDetail: {
        type: Object,
      },
      index: {
        type: Number,
      },
    },
    components: { ImageUpload },
    data() {
      return {
        qualifyScoreDetailCard: {
          department: '',
          name: '',
          description: '',
          image_url: '',
          year: '',
          weight: 0,
        },
      }
    },
    methods: {
      ...mapActions({
        saveQualifyScore: 'introduction/saveQualifyScore',
        deleteQualifyScore: 'introduction/deleteQualifyScore',
      }),
      saveQualifyScoreFun() {
        this.saveQualifyScore({
          data: this.qualifyScoreDetailCard,
          callback: (res) => {
            if (res) {
              this.$message.success('提交成功。')
              this.$emit('update')
            }
          },
        })
      },
      deleteQualifyScoreFun(id) {
        if (id) {
          this.deleteQualifyScore({
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
        this.qualifyScoreDetailCard.image_url = e
      },
    },
    watch: {
      qualifyScoreDetail: {
        handler(newVal) {
          if (newVal) {
            this.qualifyScoreDetailCard = JSON.parse(JSON.stringify(newVal))
          }
        },
        deep: true,
        immediate: true,
      },
    },
    mounted() {
      this.qualifyScoreDetailCard = JSON.parse(
        JSON.stringify(this.qualifyScoreDetail)
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
    margin-left: 120px;
  }
</style>
