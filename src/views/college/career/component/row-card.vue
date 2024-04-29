<template>
  <div class="card-container">
    <div class="card-text">
      <div class="card-input">
        <div style="width: 120px">标题：</div>
        <a-input v-model:value="careerDetailCard.title"></a-input>
      </div>
      <div class="card-input">
        <div style="width: 120px">链接：</div>
        <a-input v-model:value="careerDetailCard.link"></a-input>
      </div>
      <div class="card-input">
        <div style="width: 120px">描述：</div>
        <a-textarea v-model:value="careerDetailCard.description"></a-textarea>
      </div>
      <div class="card-input">
        <div style="width: 109px">权重：</div>
        <a-input-number
          v-model:value="careerDetailCard.weight"
        ></a-input-number>
      </div>
    </div>
  </div>
  <div class="btn-group">
    <a-button style="margin-right: 10px" @click="saveCareerFun" type="primary">
      提交
    </a-button>
    <a-popconfirm
      title="确定删除吗？"
      @confirm="() => deleteCareerFun(careerDetailCard._id)"
    >
      <a-button type="danger">删除</a-button>
    </a-popconfirm>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    name: 'RowCard',
    props: {
      careerDetail: {
        type: Object,
      },
      index: {
        type: Object,
      },
    },
    components: {},
    data() {
      return {
        careerDetailCard: {
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
        saveCareer: 'college/saveCareer',
        deleteCareer: 'college/deleteCareer',
      }),
      saveCareerFun() {
        this.saveCareer({
          data: this.careerDetailCard,
          callback: (res) => {
            if (res) {
              this.$message.success('提交成功。')
              this.$emit('update')
            }
          },
        })
      },
      deleteCareerFun(id) {
        if (id) {
          this.deleteCareer({
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
        this.careerDetailCard.avatar = e
      },
    },
    watch: {
      careerDetail: {
        handler(newVal) {
          if (newVal) {
            this.careerDetailCard = JSON.parse(JSON.stringify(newVal))
          }
        },
        deep: true,
        immediate: true,
      },
    },
    mounted() {
      this.careerDetailCard = JSON.parse(JSON.stringify(this.careerDetail))
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
