<template>
  <div class="card-container">
    <div class="card-image">
      <image-upload
        v-bind:value="memberDetail.image_url"
        @fileUploaded="handleFileUpload"
      ></image-upload>
    </div>
    <div class="card-text">
      <div class="card-input">
        <div style="width: 120px">姓名：</div>
        <a-input v-model:value="memberDetailCard.name"></a-input>
      </div>
      <div class="card-input">
        <div style="width: 120px">简介：</div>
        <a-textarea v-model:value="memberDetailCard.description"></a-textarea>
      </div>
      <div class="card-input">
        <div style="width: 120px">href：</div>
        <a-input v-model:value="memberDetailCard.link"></a-input>
      </div>
      <div class="card-input">
        <div style="width: 120px">分类</div>
        <a-select
          v-model:value="memberDetailCard.tag"
          @change="handleChange"
          mode="multiple"
          style="width: 100%"
          placeholder="请选择分类"
          :max-tag-text-length="8"
        >
          <a-select-option
            v-for="(item, index) in options"
            :key="index"
            :value="item.name"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </div>
    </div>
  </div>
  <div class="btn-group">
    <a-button
      style="margin-right: 10px"
      @click="saveQualifyCaseFun"
      type="primary"
    >
      提交
    </a-button>
    <a-popconfirm
      title="确定删除吗？"
      @confirm="() => deleteQualifyCaseFun(memberDetailCard._id)"
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
      memberDetail: {
        type: Object,
      },
      index: {
        type: Number,
      },
      department: {
        type: String,
      },
    },
    components: { ImageUpload },
    data() {
      return {
        memberDetailCard: {
          department: '',
          name: '',
          description: '',
          image_url: '',
          link: '',
          tag: [],
        },
        options: [],
      }
    },
    methods: {
      ...mapActions({
        saveQualifyCase: 'introduction/saveQualifyCase',
        deleteQualifyCase: 'introduction/deleteQualifyCase',
        getMemberTag: 'college/getTags',
      }),
      saveQualifyCaseFun() {
        this.saveQualifyCase({
          data: this.memberDetailCard,
          callback: (res) => {
            if (res) {
              this.$message.success('提交成功。')
              this.$emit('update')
            }
          },
        })
      },
      deleteQualifyCaseFun(id) {
        if (id) {
          this.deleteQualifyCase({
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
        this.memberDetailCard.image_url = e
      },
      handleChange(value) {
        this.memberDetailCard.tag = value
      },
      getMemberTagListFun() {
        this.getMemberTag({
          department: this.department,
          callback: (res) => {
            if (res && res.code === 0) {
              this.options = res.data || []
            }
          },
        })
      },
    },
    watch: {
      memberDetail: {
        handler(newVal) {
          if (newVal) {
            this.memberDetailCard = JSON.parse(JSON.stringify(newVal))
          }
        },
        deep: true,
        immediate: true,
      },
      department: {
        handler(newVal) {
          if (newVal) {
            this.getMemberTagListFun()
          }
        },
        immediate: true,
        deep: true,
      },
    },
    mounted() {
      this.memberDetailCard = JSON.parse(JSON.stringify(this.memberDetail))
      this.getMemberTagListFun()
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
