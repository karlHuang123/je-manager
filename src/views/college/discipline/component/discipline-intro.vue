<template>
  <div>
    <div class="main-title">学科介绍</div>
    <div class="intro-container">
      <div class="intro-image">
        <div class="intro-title">学科封面：</div>
        <image-upload
          v-bind:value="introDetail.image_url"
          @fileUploaded="handleFileUpload"
        ></image-upload>
      </div>
      <div class="intro-text">
        <div class="intro-input">
          <div class="intro-title">学科介绍内容：</div>
          <a-textarea
            v-model:value="introDetail.description"
            rows="5"
          ></a-textarea>
        </div>
      </div>
    </div>
    <div class="btn-group">
      <a-button @click="saveDisciplineIntroFun" type="primary">提交</a-button>
    </div>
  </div>
</template>

<script>
  import ImageUpload from '../../../../components/image-upload.vue'
  import { mapActions } from 'vuex'
  export default {
    name: 'DisciplineIntro',
    props: {
      department: {
        type: String,
      },
      discipline: {
        type: String,
      },
    },
    components: { ImageUpload },
    data() {
      return {
        introDetail: {
          image_url: '',
          description: '',
        },
      }
    },
    methods: {
      ...mapActions({
        getDisciplineIntro: 'college/getDisciplineIntro',
        saveDisciplineIntro: 'college/saveDisciplineIntro',
      }),
      handleFileUpload(e) {
        this.introDetail.image_url = 'https://www.group-je.com/file/' + e
      },
      deleteImage() {
        this.introDetail.image_url = ''
      },
      getDisciplineIntroFun() {
        this.getDisciplineIntro({
          query: {
            department: this.department,
            discipline: this.discipline,
          },
          callback: (res) => {
            if (res && res.data) {
              this.introDetail = res.data
            } else {
              this.introDetail = {
                image_url: '',
                description: '',
              }
            }
          },
        })
      },
      saveDisciplineIntroFun() {
        this.saveDisciplineIntro({
          data: {
            department: this.department,
            discipline: this.discipline,
            image_url: this.introDetail.image_url,
            description: this.introDetail.description,
          },
          callback: (res) => {
            if (res && res.code === 0) {
              this.$message.success('保存成功。')
            } else {
              this.$message.error('保存失败，请稍后再尝试。')
            }
          },
        })
      },
    },
    watch: {
      department: {
        handler(newVal) {
          if (newVal) {
            this.getDisciplineIntroFun()
          }
        },
        deep: true,
        immediate: true,
      },
      discipline: {
        handler(newVal) {
          if (newVal) {
            this.getDisciplineIntroFun()
          }
        },
        deep: true,
        immediate: true,
      },
    },
    mounted() {
      this.getDisciplineIntroFun()
    },
  }
</script>
<style lang="less" scoped>
  .intro-container {
    display: flex;
    margin-top: 30px;
    .intro-image {
      width: 120px;
    }
    .intro-title {
      margin-bottom: 10px;
      font-size: 18px;
    }
    .intro-text {
      flex: 1;
      margin-left: auto;
      .intro-input {
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
