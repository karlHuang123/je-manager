<template>
  <div class="courseStructure-container">
    <div class="main-title">基本信息</div>
    <div class="card-container" v-if="detailsComponent">
      <div class="card-image">
        <div>老师照片：</div>
        <image-upload
          v-bind:value="detailsComponent.presenter_image"
          @fileUploaded="handleFileUpload"
        ></image-upload>
      </div>
      <div class="card-text">
        <div class="card-input">
          <div style="width: 109px">课程名称：</div>
          <a-input
            v-model:value="detailsComponent.courseName"
            @change="handleDetailsChanged"
          ></a-input>
        </div>
        <div class="card-input">
          <div style="width: 93px">权重：</div>
          <a-input-number
            v-model:value="detailsComponent.weight"
            @change="handleDetailsChanged"
          ></a-input-number>
        </div>
        <div class="card-input">
          <div style="width: 109px">课程设置：</div>
          <a-input
            v-model:value="detailsComponent.courseSet"
            @change="handleDetailsChanged"
          ></a-input>
        </div>
        <div class="card-input">
          <div style="width: 109px">主讲人：</div>
          <a-input
            v-model:value="detailsComponent.presenter"
            @change="handleDetailsChanged"
          ></a-input>
        </div>
        <div class="card-input">
          <div style="width: 109px">主讲人介绍：</div>
          <a-textarea
            v-model:value="detailsComponent.presenter_intro"
            @change="handleDetailsChanged"
          ></a-textarea>
        </div>
        <div class="card-input">
          <div style="width: 109px">课程简介：</div>
          <a-textarea
            v-model:value="detailsComponent.courseIntro"
            @change="handleDetailsChanged"
          ></a-textarea>
        </div>
      </div>
    </div>
    <div class="card-course-arrange">
      <div class="main-title">
        课程安排
        <div class="btn-course">
          <a-button type="primary" @click="addCalendar">
            <PlusOutlined />
            添加课程安排
          </a-button>
        </div>
      </div>
      <div class="course-arrange-container">
        <div
          class="card-input course-input"
          v-for="(ele, index) in detailsComponent.courseCalendar"
          v-bind:key="index"
        >
          <div style="width: 80px">第{{ index + 1 }}回：</div>
          <a-textarea
            style="margin-right: 10px"
            v-model:value="ele.item"
            @change="handleDetailsChanged"
          ></a-textarea>
          <a-popconfirm
            title="确定删除吗？"
            @confirm="deleteCourseArrange(index)"
          >
            <a-button type="danger"><CloseOutlined /></a-button>
          </a-popconfirm>
        </div>
      </div>
    </div>
    <div class="card-course-arrange">
      <div class="main-title">
        课程教材
        <div class="btn-course" style="margin-bottom: 10px">
          <a-button type="primary" @click="addTextbook">
            <PlusOutlined />
            添加课程教材
          </a-button>
        </div>
      </div>
      <div class="course-textbook-container">
        <div
          class="textbook-ele"
          v-for="(ele, index) in detailsComponent.textbook"
          v-bind:key="index"
        >
          <div class="card-image" @click="getIndex(index)">
            <image-upload
              v-bind:value="ele.image_url"
              @fileUploaded="handleFileUploadTextbook"
            ></image-upload>
          </div>
          <div class="card-text">
            <div class="card-input">
              <a-textarea
                v-model:value="ele.comment"
                @change="handleDetailsChanged"
              ></a-textarea>
            </div>
            <a-popconfirm title="确定删除吗？" @confirm="deleteTextbook(index)">
              <a-button style="margin-right: 10px" type="danger">
                <CloseOutlined />
              </a-button>
            </a-popconfirm>
          </div>
        </div>
      </div>
    </div>
    <div class="card-course-arrange">
      <div class="main-title">
        参考教材
        <div class="btn-course" style="margin-bottom: 10px">
          <a-button type="primary" @click="addReference">
            <PlusOutlined />
            添加参考教材
          </a-button>
        </div>
      </div>
      <div class="course-textbook-container">
        <div
          class="textbook-ele"
          v-for="(ele, index) in detailsComponent.references"
          v-bind:key="index"
        >
          <div class="card-image" @click="getIndex(index)">
            <image-upload
              v-bind:value="ele.image_url"
              @fileUploaded="handleFileUploadReferences"
            ></image-upload>
          </div>
          <div class="card-text">
            <div class="card-input">
              <a-textarea
                v-model:value="ele.comment"
                @change="handleDetailsChanged"
              ></a-textarea>
            </div>
            <a-popconfirm
              title="确定删除吗？"
              @confirm="deleteReference(index)"
            >
              <a-button style="margin-right: 10px" type="danger">
                <CloseOutlined />
              </a-button>
            </a-popconfirm>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ImageUpload from '../../../../components/image-upload.vue'
  import { CloseOutlined, PlusOutlined } from '@ant-design/icons-vue'
  export default {
    name: 'ExamComponent',
    components: { ImageUpload, CloseOutlined, PlusOutlined },
    props: {
      details: {
        type: Object,
      },
    },
    watch: {
      details: {
        handler(newVal) {
          if (newVal) {
            this.detailsComponent = JSON.parse(JSON.stringify(newVal))
          }
        },
      },
    },
    data() {
      return {
        detailsComponent: {
          courseName: '',
          courseSet: '',
          presenter: '',
          presenter_image: '',
          presenter_intro: '',
          courseIntro: '',
          weight: 0,
          courseCalendar: [
            {
              item: '',
            },
          ],
          textbook: [
            {
              image_url: '',
              comment: '',
            },
          ],
          references: [
            {
              image_url: '',
              comment: '',
            },
          ],
        },
        tempKey: null,
      }
    },
    methods: {
      getIndex(index) {
        this.tempKey = index
      },
      handleFileUpload(e) {
        this.detailsComponent.presenter_image =
          'https://www.group-je.com/file/' + e
        this.$emit('changed', this.detailsComponent)
      },
      handleFileUploadTextbook(e) {
        this.detailsComponent.textbook[this.tempKey].image_url =
          'https://www.group-je.com/file/' + e
        this.$emit('changed', this.detailsComponent)
      },
      handleFileUploadReferences(e) {
        this.detailsComponent.references[this.tempKey].image_url =
          'https://www.group-je.com/file/' + e
        this.$emit('changed', this.detailsComponent)
      },
      addCalendar() {
        const ele = {
          item: '',
        }
        this.detailsComponent.courseCalendar.push(ele)
      },
      deleteCourseArrange(index) {
        if (this.detailsComponent.courseCalendar.length > 1) {
          this.detailsComponent.courseCalendar.splice(index, 1)
          this.handleDetailsChanged()
        } else {
          this.$message.error('至少保留一项课程安排。')
        }
      },
      addTextbook() {
        const ele = {
          image_url: '',
          comment: '',
        }
        this.detailsComponent.textbook.push(ele)
      },
      deleteTextbook(index) {
        this.detailsComponent.textbook.splice(index, 1)
        this.handleDetailsChanged()
      },
      addReference() {
        const ele = {
          image_url: '',
          comment: '',
        }
        this.detailsComponent.references.push(ele)
      },
      deleteReference(index) {
        this.detailsComponent.references.splice(index, 1)
        this.handleDetailsChanged()
      },
      handleDetailsChanged() {
        this.$emit('changed', this.detailsComponent)
      },
    },
    mounted() {
      if (this.details) {
        this.detailsComponent = JSON.parse(JSON.stringify(this.details))
      }
    },
  }
</script>
<style lang="less" scoped>
  .courseStructure-container {
    .card-container {
      display: flex;
      .card-text {
        flex: 1;
        margin-left: 20px;
        display: grid;
        grid-template-columns: 1fr 1fr;
      }
    }
    .card-course-arrange {
      .course-arrange-container {
        margin-top: 20px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        .course-input {
          display: flex;
          align-items: center;
        }
      }
    }
    .course-textbook-container {
      .textbook-ele {
        display: flex;
        margin-bottom: 10px;
        .card-text {
          flex: 1;
          text-align: right;
        }
      }
    }
    .card-input {
      margin-bottom: 10px;
      padding: 0 10px;
      .top-title {
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 10px;
      }
    }
  }
  .add-btn {
    text-align: center;
    margin-top: 20px;
  }
  .btn-course {
    text-align: right;
    padding-right: 10px;
  }
</style>
