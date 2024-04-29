<template>
  <div class="index-container">
    <!-- <version-information /> -->
    <div class="carousel-container">
      <div
        class="carousel-ele"
        v-for="(item, index) in carouselList"
        :key="index"
      >
        <img :src="item.image_url" alt="" />
        <div class="flex" style="margin-top: 10px">
          <div>权重：{{ item.weight }}</div>
          <div>
            <a-button
              style="margin: 0 5px"
              @click="editCarousel(item)"
              type="primary"
            >
              编辑
            </a-button>
          </div>
          <div>
            <span>
              <a-popconfirm
                title="确定删除该轮播图吗？"
                @confirm="() => deleteCarouselFun(item.image_url)"
              >
                <a-button type="danger">删除</a-button>
              </a-popconfirm>
            </span>
          </div>
        </div>
      </div>
      <div class="add-btn">
        <a-button
          style="margin-right: 10px"
          @click="addCarousel"
          type="primary"
        >
          <PlusOutlined />
          添加轮播图
        </a-button>
      </div>
    </div>
    <a-modal
      :visible="showModal"
      title="首页轮播图上传"
      @ok="addCourse"
      @cancel="closeModal"
      width="40%"
    >
      <div class="input-container">
        <image-upload
          v-bind:value="
            carouselDetail.image_url
              ? carouselDetail.image_url.includes('https')
                ? carouselDetail.image_url
                : 'https://www.group-je.com/file/' + carouselDetail.image_url
              : ''
          "
          @fileUploaded="handleFileUpload"
        ></image-upload>
        <div class="card-input">
          <div style="width: 109px">权重：</div>
          <a-input-number
            v-model:value="carouselDetail.weight"
          ></a-input-number>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
  // import VersionInformation from './components/VersionInformation'
  import ImageUpload from '../../components/image-upload.vue'
  import { PlusOutlined } from '@ant-design/icons-vue'
  import { mapActions } from 'vuex'
  export default {
    name: 'Index',
    components: { ImageUpload, PlusOutlined },
    data() {
      return {
        carouselList: [],
        carouselDetail: {
          image_url: '',
          weight: 0,
        },
        showModal: false,
      }
    },
    methods: {
      ...mapActions({
        getCarousel: 'general/getCarousel',
        saveCarousel: 'general/saveCarousel',
        deleteCarousel: 'general/deleteCarousel',
      }),
      getCarouselFun() {
        this.getCarousel({
          callback: (res) => {
            this.carouselList = res.data || []
          },
        })
      },
      handleFileUpload(e) {
        this.carouselDetail.image_url = e
      },
      addCourse() {
        this.saveCarousel({
          data: this.carouselDetail,
          callback: (res) => {
            if (res) {
              this.$message.success('上传成功！')
              this.closeModal()
              this.getCarouselFun()
            } else {
              this.$message.error(res.message)
              this.closeModal()
            }
          },
        })
      },
      addCarousel() {
        this.showModal = true
      },
      editCarousel(src) {
        this.carouselDetail = src
        this, (this.showModal = true)
      },
      deleteCarouselFun(src) {
        this.deleteCarousel({
          data: {
            image_url: src,
          },
          callback: (res) => {
            if (res) {
              this.$message.success('删除成功！')
              this.getCarouselFun()
            }
          },
        })
      },
      closeModal() {
        this.carouselDetail = {
          image_url: '',
          weight: 0,
        }
        this.showModal = false
      },
    },
    mounted() {
      this.getCarouselFun()
    },
  }
</script>
<style lang="less" scoped>
  .carousel-container {
    display: flex;
    .add-btn {
      margin-left: 10px;
      margin-top: 20px;
    }
    .carousel-ele {
      width: 200px;
      margin: 20px;
      img {
        width: 100%;
      }
    }
  }
  .input-container {
    display: flex;
    .card-input {
      margin-left: 20px;
    }
  }
  .flex {
    display: flex;
  }
</style>
