<template>
  <a-tooltip placement="topLeft" title="支持.jpg, .png, .gif格式">
    <div>
      <a-upload
        list-type="picture-card"
        class="avatar-uploader"
        @change="onImageChange"
        :fileList="fileList"
        :customRequest="uploadImage"
        accept=".jpg,.png,.gif"
        @preview="handlePreview"
        @remove="deleteImage"
      >
        <div v-if="fileList.length < length">
          <PlusOutlined />
          <div class="ant-upload-text">Upload</div>
        </div>
      </a-upload>
      <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
        <img alt="example" style="width: 100%" :src="previewImage" />
      </a-modal>
    </div>
  </a-tooltip>
</template>

<script>
  import { defineComponent } from 'vue'
  import { mapActions } from 'vuex'
  import { PlusOutlined } from '@ant-design/icons-vue'
  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  }
  export default defineComponent({
    props: {
      value: {
        type: String,
      },
      imageIndex: {
        type: Number,
        default: 0,
      },
      length: {
        type: Number,
        default: 1,
      },
    },
    components: { PlusOutlined },
    data() {
      return {
        fileList: [],
        tempImage: '',
        previewVisible: false,
        previewImage: null,
      }
    },
    methods: {
      ...mapActions({
        uploadFile: 'general/uploadFile',
      }),
      onImageChange(e) {
        this.fileList = e.fileList
      },
      uploadImage(data) {
        const formData = new FormData()
        formData.append('file', data.file)
        this.saveImage(formData)
      },
      saveImage(formData) {
        this.uploadFile({
          data: formData,
          callback: (res) => {
            this.tempImage = res.data
            this.$message.success('上传成功！')
            this.fileList[0].status = 'done'
            this.$emit('fileUploaded', res.data)
          },
        })
      },
      deleteImage() {
        this.$emit('fileUploaded', '')
      },
      handleCancel() {
        this.previewVisible = false
      },
      async handlePreview(file) {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj)
        }
        this.previewImage = file.url || file.preview
        this.previewVisible = true
      },
    },
    watch: {
      value: {
        handler(newName) {
          if (newName) {
            this.fileList = [
              {
                url: newName,
                uid: this.imageIndex.toString(),
              },
            ]
          } else {
            this.fileList = []
          }
        },
        deep: true,
        immediate: true,
      },
    },
    mounted() {
      if (this.value) {
        this.fileList = [
          {
            url: this.value,
            uid: this.imageIndex.toString(),
          },
        ]
      }
    },
  })
</script>

<style>
  .upload-container {
  }
</style>
