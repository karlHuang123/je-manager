<template>
  <div class="courseStructure-container">
    <div>
      <div class="essay-context">
        <h3>实技介绍:</h3>
        <a-textarea v-model:value="contents.context" rows="5"></a-textarea>
      </div>
      <div class="image-title">
        <h2>实技图片</h2>
        <div>
          <a-button type="primary" @click="addApply">
            <PlusOutlined />
            添加图片
          </a-button>
        </div>
      </div>
      <div class="card-ele-container">
        <div
          class="card-ele"
          v-for="(item, index) in contents.images"
          v-bind:key="index"
          @click="getIndex(index)"
        >
          <image-upload
            v-bind:value="item.image_url"
            @fileUploaded="handleFileUpload"
          ></image-upload>
          <div>
            <a-popconfirm
              title="确定删除吗？"
              @confirm="() => deleteImage(index)"
            >
              <a-button style="width: 104px" type="danger">
                <CloseOutlined />
                删除
              </a-button>
            </a-popconfirm>
          </div>
        </div>
      </div>
    </div>
    <div class="add-btn">
      <a-button type="primary" @click="saveCourseContentFun">保存实技</a-button>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { PlusOutlined, CloseOutlined } from '@ant-design/icons-vue'
  import ImageUpload from '../../../../components/image-upload.vue'
  export default {
    name: 'Essay',
    components: { PlusOutlined, CloseOutlined, ImageUpload },
    props: {
      department: {
        type: String,
      },
      discipline: {
        type: String,
      },
    },
    data() {
      return {
        contents: {
          context: '',
          images: [
            {
              image_url: '',
            },
          ],
        },
        tempImageIndex: 0,
      }
    },
    methods: {
      ...mapActions({
        getCourseContent: 'college/getCourseContent',
        saveCourseContent: 'college/saveCourseContent',
      }),
      addApply() {
        const element = {
          image_url: '',
        }
        this.contents.images.push(element)
      },
      getIndex(index) {
        this.tempImageIndex = index
      },
      deleteImage(index) {
        this.contents.images.splice(index, 1)
      },
      handleFileUpload(e) {
        this.contents.images[this.tempImageIndex].image_url =
          'https://www.group-je.com/file/' + e
      },
      saveCourseContentFun() {
        const data = {
          department: this.department,
          discipline: this.discipline,
          subject: '实技',
          contents: this.contents,
        }
        this.saveCourseContent({
          data: data,
          callback: (res) => {
            if (res && res.code === 0) {
              this.$message.success('修改成功。')
              this.getCourseContentFun()
            } else {
              this.$message.error('修改失败，请稍后再试。')
            }
          },
        })
      },
      getCourseContentFun() {
        const query = {
          department: this.department,
          discipline: this.discipline,
          subject: '实技',
        }
        this.getCourseContent({
          query: query,
          callback: (res) => {
            if (res && res.code === 0 && res.data) {
              this.contents = res.data
            }
          },
        })
      },
    },
    mounted() {
      this.getCourseContentFun()
    },
  }
</script>
<style lang="less" scoped>
  .courseStructure-container {
    margin-top: 20px;
    .comment-header {
      margin-top: 10px;
    }
    .essay-context {
      margin-bottom: 20px;
    }
    .image-title {
      display: flex;
      div {
        flex: 1;
        text-align: right;
      }
    }
    .card-list-container {
      padding: 20px;
    }
    .card-ele-container {
      display: flex;
      width: 100%;
      flex-wrap: wrap;
    }
    .card-ele {
      margin-bottom: 20px;
      margin-right: 10px;
    }
  }
  .add-new {
    text-align: center;
  }
  .example {
    text-align: center;
    border-radius: 4px;
    margin-bottom: 20px;
    padding: 30px 50px;
    margin: 20px 0;
  }
  .add-btn {
    text-align: center;
    margin-top: 20px;
  }
</style>
